const Discord = require("discord.js")
const config = require("../../config.json")
const battleM = require("../../src/schemas/battle")
const moongose = require('mongoose')

module.exports = {
  name: "battlemode", // Coloque o nome do comando
  description: "Ativa a sessão.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  

  run: async (client, interaction,) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
        let isOn = await battleM.findOne({id: 1})
        console.log(isOn)
        if(isOn.battleMode == false) {
            try {
                const updatedData = await battleM.findOneAndUpdate(
                    {id: 1},
                    { $set: {battleMode: true} },
                    { new: true }
                );
                let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`Olá ${interaction.user}, o modo sessão está ativo, nenhuma ficha poderá sofrer alterações neste periodo.`)
                .setColor(config.color);
        
        
            interaction.reply({ embeds: [embed] })
                return updatedData;
            } catch (error) {
                console.error(error);
                throw error;
            }
        
        } else if (isOn.battleMode == true) {
            try {
                const updatedData = await battleM.findOneAndUpdate(
                    {id: 1},
                    { $set: {battleMode: false} },
                    { new: true }
                );
                let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`Olá ${interaction.user}, o modo de criação está ativo, as fichas poderão ser alteradas.`)
                .setColor(config.color);
        
        
            interaction.reply({ embeds: [embed] })
                return updatedData;
            } catch (error) {
                console.error(error);
                throw error;
            }
        
        }
       
    }
  }
}