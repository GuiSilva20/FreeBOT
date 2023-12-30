const Discord = require("discord.js")
const config = require("../../config.json");
const { user } = require("../..");


module.exports = {
    name: "set", // Coloque o nome do comando
    description: "Adiciona moedas", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,

    options: [

        {
            name: "set",
            description: "Defina add para somar e remove para subtrair.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },

        {
            name: "jade",
            description: "Moedas de jade",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },



    ],



    run: async (client, interaction,) => {

   
            const set = interaction.options.getString("set");
            const jade = interaction.options.getString("jade");
            let message = null
            if(set == "add") {
                message = `✅ O comando usado foi ${set}, e as moedas adicionadas foram ${jade}!`
            }else if(set == "remove") {
                message = `⛔ O comando usado foi ${set}, e as moedas foram ${jade}`
            }


            interaction.reply({ content: `${message}`, ephemeral: true });
            return;
        
    }
}