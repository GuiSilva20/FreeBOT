const Discord = require("discord.js")
const config = require("../../config.json")

module.exports = {
  name: "ajuda", // Coloque o nome do comando
  description: "Ajuda os usuários", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "comando",
      description: "Escreva o comando que deseja receber ajuda.",
      type: Discord.ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  run: async (client, interaction,) => {
    let com = interaction.options.getString("comando");
    let desc = ''
    if(com == null) {
      let reply = interaction.reply({
        "channel_id": `${interaction.channel_id}`,
        "tts": false,
        "content": "",
        "thumbnail": {
          "url": `${ client.user.displayAvatarURL({ dynamic: true })}`,
          "height": 0,
          "width": 0
      },
        "tts": false,
        "embeds": [
          {
            "type": "rich",
            "title": `Olá, ${interaction.user.username}!`,
            "description": `Parece que você precisa de ajuda por aqui, não é? Certo! Vou te auxiliar. Logo abaixo existirá uma lista de todos os comandos que você pode utilizar no Kai. `,
            "color": 0xedeae9,
            "fields": [
              {
                "name": `📙: Obtendo ajuda em um comado`,
                "value": `Selecione a opção opcional \"comando\" no \`/ajuda\`  e escreva o nome do comando que deseja.  Ele deverá se parecer com isso: \`/ajuda\`  \`edit\` `
              },
              {
                "name": `📖: Comandos disponíveis.`,
                "value": `\`/ajuda\` : O comando que você está utilizando atualmente.
                \n\`/generate\` : Utilizado para criar uma ficha vazia que poderá ser editada *apenas* pelo jogador.
                \n \`/edit\` : Edita a ficha com o contúdo desejado através dos comandos.
                \n \`/set\` : Add ou Remove para adicionar ou remover Mana e Vida durante a campanha.`
                
              }
            ]
            }
        ]
    });

    return;
    };
    
  
    if(com.includes('/')) {
      desc = `Você deve remover a \`/\` ao digitar o comando que deseja receber ajuda. \n
      - Exemplo: \n
      \`/ajuda\` \`roll\``;

      redFlag(desc);
      return;
    } else {
      desc = `Ops, parece que esta parte do comando ainda está em construção... volte em 150 anos!`
      redFlag(desc);
    }

    async function redFlag(obj) {
      let embed = new Discord.EmbedBuilder()
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setTitle("🔒: Comando inválido.")
      .setDescription(`❌: ${obj}`)
      .setColor("Red");

  interaction.reply({ embeds: [embed], ephemeral: true });
  return;
  }


   

  }
}