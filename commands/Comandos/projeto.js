const Discord = require("discord.js")
const config = require('../../config.json')

module.exports = {
  name: "projeto", // Coloque o nome do comando
  description: "Cria um projeto", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  options: [
    {
        name: "nome",
        description: "Insira o nome da categoria",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "outro",
        description: "[OUTRO] Coloque o nome do novo tipo de projeto",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "sufixo",
        description: "[OUTRO] Coloque o sufixo da categoria",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    },
  ],

  run: async (client, interaction,) => {

    let nome_title = interaction.options.getString("nome");
    let outro_title = interaction.options.getString("outro");
    let suffix = interaction.options.getString("sufixo");
    let opc1 = "RPG: 🎮"
    let opc1Desc = "Cria um servidor padrão para jogar com amigos."
    let opc2 = "Amigos: ✨"
    let opc2Desc = "Cria um servidor padrão para amigos."

    let painel = new Discord.ActionRowBuilder().addComponents(
        new Discord.StringSelectMenuBuilder()
        .setCustomId("painel_project")
        .setPlaceholder("Clique aqui!")
        .addOptions(
            {
                label: `${opc1}`,
                description: `${opc1Desc}`,
                value: "opc1"
            },
            {
                label:`${opc2}`,
                description: `${opc2Desc}`,
                value: "opc2"
            }
        ),
        
        
    );

    module.exports.nome_title = nome_title;
    module.exports.outro_title = outro_title;
    module.exports.suffix = suffix;

    
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
        if (suffix && outro_title !== null) {

            let embed_1 = new Discord.EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`Opa! Parece que você preencheu os campos "outro" e "sufixo", portanto a categoria ${outro_title} com o sufixo ${suffix }foi criada.`)
            .setColor(config.color)
            .setTitle(`⚙ || Você criou uma categoria especial.`)
        
            interaction.channel.send({ embeds: [embed_1], components: [], ephemeral: true })
            
            
       
        setTimeout(() => {
            interaction.channel.bulkDelete(1)
        }, 150000)
    } else {
   

        if (suffix || outro_title !== null) {
            let embed = new Discord.EmbedBuilder()

            .setColor(config.color)
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setDescription(`🔺: Você preencheu o campo outro ou sufixo mas não completou a configuração, por isso não irei salvar seu campo!
            ✅: Não se preocupe, o **nome** do seu projeto ainda está gravado. Abra um canal aqui no servidor selecionando uma das opções abaixo:`);
    
    
           
            interaction.reply({ content: `.`, ephemeral: true })
            interaction.channel.send({ embeds: [embed], components: [painel] })
            setTimeout(() => {
                interaction.deleteReply()
            }, 100000)
        } else {
            let embed = new Discord.EmbedBuilder()

            .setColor(config.color)
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setDescription(`Abra um canal aqui no servidor selecionando uma das opções abaixo:`);

           
            interaction.reply({ content: `Aqui está, ${interaction.user}`, ephemeral: true })
            interaction.channel.send({ embeds: [embed], components: [painel] })
            setTimeout(() => {
                interaction.deleteReply()
            }, 100000)
    }
    }
  
}

  }
}
