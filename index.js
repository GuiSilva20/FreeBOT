const Discord = require("discord.js");
const mongoose = require("mongoose");
const config = require("./config.json");
const files = require('./src/schemas/files');
const storage = require("./src/schemas/storage");
const battle = require("./src/schemas/battle");
const classes = require("./src/schemas/classes")
const battleM = require("./src/schemas/battle")
const battleFile = require("./src/schemas/bfile")
const { exec } = require('child_process');
const xpModel = require('./src/schemas/xp');
const { saveReply, reply } = require('./handler/fileReply')
const text = require('./generic.json')

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds
  ]
});
let user
let local
module.exports = client;

mongoose.connect(config.mongooseID, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((m) => {
  console.log(`[${config.name}] connected successfully.`);
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.type === Discord.InteractionType.ApplicationCommand) {
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.reply(`Error`);

    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
    cmd.run(client, interaction);
  }

  if (interaction.isCommand) {
    user = interaction.user.id
    local = interaction
  }

  if (interaction.isStringSelectMenu) {
    if (interaction.customId === "editMenu") {
      const historyData = await files.findOne({ discordID: interaction.user.id })
      if (interaction.isMessageComponent) {
        const selectedValue = interaction.values[0]; // Assuming it's a single select menu
        if (selectedValue === 'visual') {

          const modal = new Discord.ModalBuilder()
            .setCustomId("modal")
            .setTitle("Formulário");

          const pergunta1 = new Discord.TextInputBuilder()
            .setCustomId("pergunta1") // Coloque o ID da pergunta
            .setLabel("Nome") // Coloque a pergunta
            .setMaxLength(100) // Máximo de caracteres para a resposta
            .setMinLength(2) // Mínimo de caracteres para a respósta
            .setPlaceholder(`Nome atual: ${historyData.nome}`) // Mensagem que fica antes de escrever a resposta
            .setRequired(false) // Deixar para responder obrigatório (true | false)
            .setStyle(Discord.TextInputStyle.Short); // Tipo de resposta (Short | Paragraph)

          const pergunta2 = new Discord.TextInputBuilder()
            .setCustomId("pergunta2") // Coloque o ID da pergunta
            .setLabel("Descrição") // Coloque a pergunta
            .setMaxLength(4000) // Máximo de caracteres para a resposta
            .setMinLength(15) // Mínimo de caracteres para a respósta
            .setPlaceholder(`Descrição atual: ${historyData.desc}`) // Mensagem que fica antes de escrever a resposta
            .setRequired(false) // Deixar para responder obrigatório (true | false)
            .setStyle(Discord.TextInputStyle.Paragraph); // Tipo de resposta (Short | Paragraph)    

          const pergunta3 = new Discord.TextInputBuilder()
            .setCustomId("pergunta3") // Coloque o ID da pergunta
            .setLabel("Imagem") // Coloque a pergunta
            .setMaxLength(4000) // Máximo de caracteres para a resposta
            .setMinLength(10) // Mínimo de caracteres para a respósta
            .setPlaceholder(`Utilize /icon para ver sua imagem atual.`) // Mensagem que fica antes de escrever a resposta
            .setRequired(false) // Deixar para responder obrigatório (true | false)
            .setStyle(Discord.TextInputStyle.Paragraph); // Tipo de resposta (Short | Paragraph) 

          modal.addComponents(
            new Discord.ActionRowBuilder().addComponents(pergunta1),
            new Discord.ActionRowBuilder().addComponents(pergunta2),
            new Discord.ActionRowBuilder().addComponents(pergunta3)
          )

          try {
            return await interaction.showModal(modal)
          } catch (error) {
            //
            let desc = `${error}`
            errorLog(desc)
            let embed = new Discord.EmbedBuilder()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
              .setTitle("❌: Operação cancelada.")
              .setDescription(`Ocorreu um erro durante o carregamento do comando.`)
              .setColor("Red");

            // Send the message with the buttons
            await interaction.reply({ embeds: [embed], components: [], ephemeral: true });


          }


        }
      }

    }
  }


  if (interaction.isModalSubmit()) {

    if (interaction.customId === "modal") {

      let resposta1 = interaction.fields.getTextInputValue("pergunta1")
      let resposta2 = interaction.fields.getTextInputValue("pergunta2")
      let resposta3 = interaction.fields.getTextInputValue("pergunta3")
      const historyData = await files.findOne({ discordID: interaction.user.id })
      let isEmpty1 = false
      let isEmpty2 = false
      let isEmpty3 = false
      if (resposta1 === undefined || !resposta1) {
        resposta1 = historyData.nome
        isEmpty1 = true

      }
      if (resposta2 === undefined || !resposta2) {
        resposta2 = historyData.desc
        isEmpty2 = true

      }
      if (resposta3 === undefined || !resposta3) {
        resposta3 = historyData.image
        isEmpty3 = true
      } else {
        let isURL = false
        let url = ''
        try {
          // Create a new URL object
          url = new URL(resposta3);
          if (url) {
            isURL = true
          }
          // Continue with the rest of the program
        } catch (error) {
          if (error.code === 'ERR_INVALID_URL') {
            // If there is an error, set the description of the red flag
            Log(text["imgError.title"], text["imgError.desc"],  text["genericColor.danger"], interaction)
            errorLog(text["imgError.title"], text["imgError.desc"], interaction)
            return;
          } else {
            // If there is a different error, handle it appropriately
            console.error(error);
            return;
          }
        }
        if (isURL) {
          if (!url.pathname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            Log(text["imgError.title"], text["imgError.desc"],text["genericColor.danger"], interaction)
            return;
          }
        }
      }

      if (isEmpty1 === true && isEmpty2 === true && isEmpty3 === true) {
        Log(text["fullEmpty.title"], text["fullEmpty.desc"], text["genericColor.warning"], interaction)
      }
      console.log('BASIC INFO SUBMIT'.blue)
      console.log('Nome: ', resposta1)
      console.log('Desc: ', resposta2)
      console.log('Image: ', resposta3)
      postFile(resposta1, resposta2, resposta3, interaction)
    }
  }
});

async function postFile(r1, r2, r3, interaction) {
  const updateQuery = {
    $set: {
      'nome': r1,
      'desc': r2,
      'image': r3
    }
  };
  
  const updatedData = await files.findOneAndUpdate(
    { discordID: interaction.user.id },
    updateQuery,
    { new: true }
  );

  saveReply(interaction)
  if (reply) {
    console.log("Reply:", reply);
  } else {
    console.log("Reply is not defined");
  }
  Log(text["fullyEdited.title"], text["fullyEdited.desc"], text["genericColor.success"], interaction)

}

async function errorLog(title, desc, interaction) {
  const logMessage = client.channels.cache.find(channel => channel.id === '1173716807274737734')
  let embed1 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setTitle(`${title}`)
    .setDescription(`${desc} || **USER**: ${interaction.user}`)
    .setColor("Red")
    .setTimestamp();
  logMessage.send({ embeds: [embed1], ephemeral: true })
}

async function Log(title, desc, color, interaction) {
  let embed1 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setTitle(`${title}`)
    .setDescription(`${desc}`)
    .setColor(color)
    .setTimestamp();

  interaction.reply({ embeds: [embed1], components: [], ephemeral: true })
}






client.on('ready', async () => {
  console.log(`🔥 ${config.name} online em ${client.user.username}!`);
});

client.slashCommands = new Discord.Collection();

require('./handler')(client);

client.login(config.token);
