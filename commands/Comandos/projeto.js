const Discord = require("discord.js")
const config = require('../../config.json')

module.exports = {
  name: "projeto", // Coloque o nome do comando
  description: "Cria um projeto", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,


  run: async (client, interaction,) => {

 

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


    
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
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

