const Discord = require("discord.js")
const config = require("../../config.json")

module.exports = {
  name: "ajuda", // Coloque o nome do comando
  description: "Ajuda os usuários", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,


  run: async (client, interaction,) => {



  const embed = new Discord.EmbedBuilder()
  .setAuthor({
    name: "Mestre",
  })
  .setTitle("Iniciando o RPG.")
  .setDescription("Olá! Parece que sua jornada está começando por aqui.\nEstou aqui para te ajudar nessa jornada.\n\n\n> **Como começar?**\nVocê pode começar utilizando o comando ``/sistemas``, assim poderá entender mais sobre a criação de fichas do RPG e semelhantes. Quando estiver pronto, utilize o comando ``/ficha``, isso irá criar o seu canal especial para que possamos juntos criar um novo personagem. Sendo um RPG criado para o *Discord*, não utilizamos PDF's para trabalhar, portanto, tudo pode ser acessado utilizando comandos que eu ofereço. \n\n> **Comandos**\n ```\n/ajuda - Este é o comando que você está utilizando.\n/sistemas - Disponibiliza uma lista de comandos que explica os diferentes sistemas\n/trama - Disponibiliza os arcos acontecidos\n/status - Recebe o status do seu personagem [Incompleto]\n\n```")
  .setImage("https://i.pinimg.com/564x/3d/0b/e8/3d0be898de57ad1a74f7cc20d13bc498.jpg")
  .setColor(config.color)
  .setFooter({
    text: "Guia de ajuda",
  });


    interaction.reply({ embeds: [embed] })
  }
}