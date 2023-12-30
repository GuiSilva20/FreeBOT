const Discord = require("discord.js")
const config = require("../../config.json");
const { user } = require("../..");


module.exports = {
    name: "create", // Coloque o nome do comando
    description: "Cria o bestiário", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    options: [

        {
            name: "user",
            description: "Defina um usuário para receber um cargo.",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
    ],


    run: async (client, interaction,) => {

        let user = interaction.options.getUser("user");
        let message = "Iniciando criação do bestiário..."

     
        interaction.reply({ content: `${message}`, ephemeral: true });
        return;

    }
}
