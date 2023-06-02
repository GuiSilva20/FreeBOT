const Discord = require("discord.js")

const config = require("./config.json");


const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds
  ]
});

module.exports = client

client.on('interactionCreate', (interaction, ) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

    cmd.run(client, interaction)

  }
})

client.on('ready', () => {
  
  console.log(`🔥 Estou online em ${client.user.username}!`)
})


client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)


/////////////////////////////////////////////////////////////////////////////// Comando projeto

client.on("interactionCreate", (interaction) => {
    
    

  if (interaction.isStringSelectMenu()) {

    if (interaction.customId === "painel_project") {
    

     
      
    


      let opc = interaction.values[0] ///Opções padrão/menu.
   
      if (opc === "opc1") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção


    
        let off = `canal-offline`;
        let jogos = `memes`;
        let voice = `jogos`;
        let rpg_doc = `documentos`
        let rpg_image = `imagens`
        let rpg_roll = `dados`
        let rpg_warning = `avisos`
        let voice_off = `📺: Offline`
        let voice_on = `✨: Sessão`
        
        //let id = interaction.guild.roles.cache.get("1105588315484332032")
        function ignite() {
        let title = "🤖: Chat Offline."
        createChannel(title)
      }
      ignite()
     
async function createChannel(title) {
  console.log(title)
  interaction.guild.channels.create({
    name: `${title}`,
    type: Discord.ChannelType.GuildCategory,
     
  })
  createChats(title)
 

}

 function createChats(title) {

  if(title == '🤖: Chat Offline.') {
  setTimeout(() => {
    let lastCategoryChannel = interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildCategory).last();
    const createChannels = async () => {
      interaction.guild.channels.create({
        name: voice_off,
        type: Discord.ChannelType.GuildVoice,
     

      }),
      interaction.guild.channels.create({
        name: voice_on,
        type: Discord.ChannelType.GuildVoice,
   

      }),
      interaction.guild.channels.create({
        name: off,
        type: Discord.ChannelType.GuildText,
        parent: lastCategoryChannel,

      }),
      interaction.guild.channels.create({
        name: jogos,
        type: Discord.ChannelType.GuildText,
        parent: lastCategoryChannel,
     
      }),
       interaction.guild.channels.create({
        name: voice,
        type: Discord.ChannelType.GuildText,
        parent: lastCategoryChannel,
      }).then( () => {
        interaction.reply({ content: `✅ A categoria foi criada com sucesso.`, ephemeral: true })
        interaction.channel.bulkDelete(3)
        let title = "🗡️: RPG"
        createChannel(title)
        
    })
    }
    console.log(lastCategoryChannel)
    createChannels()

    
    
  }, 1000)
}else if(title == "🗡️: RPG") {
  setTimeout(() => {
    let lastCategoryChannel = interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildCategory).last();
    const createChannels = async () => {
      interaction.guild.channels.create({
        name: rpg_doc,
        type: Discord.ChannelType.GuildText,
        parent: lastCategoryChannel,

      }),
      interaction.guild.channels.create({
        name: rpg_image,
        type: Discord.ChannelType.GuildText,
        parent: lastCategoryChannel,

      }),
       interaction.guild.channels.create({
        name: rpg_roll,
        type: Discord.ChannelType.GuildText,
        parent: lastCategoryChannel,
 
      }).then( () => {
        interaction.reply({ content: `✅ A categoria foi criada com sucesso.`, ephemeral: true })
        interaction.channel.bulkDelete(3)
        
        
    }),
    interaction.guild.channels.create({
      name: rpg_warning,
      type: Discord.ChannelType.GuildText,
      parent: lastCategoryChannel,
    }).then( () => {
      interaction.reply({ content: `✅ A categoria foi criada com sucesso.`, ephemeral: true })
      interaction.channel.bulkDelete(3)
      
      
  })
    
    }
   
    createChannels()

    
    
  }, 1000)
  
}

 
}
       
      




      }else if (opc === "opc2") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção


  
              interaction.reply({ content: `Em construção..`, ephemeral: true })
              interaction.channel.bulkDelete(3)
              
        




      }
    }
    
  }
 
})

  //Fim do comando projeto