
const Discord = require("discord.js")
const config = require("../../config.json")
const inv = require("../../src/schemas/inv")
const file = require('../../src/schemas/files')
//const gold = require('../../src/schemas/gold')
const item = require('../../src/schemas/item')
const moongose = require('mongoose')

module.exports = {
  name: "inv", // Coloque o nome do comando
  description: "Inventário.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,



  run: async (client, interaction,) => {

    
    const user = interaction.user.id
    let invFinder = await inv.findOne({ id: user });
    let fileFinder = await file.findOne({ discordID: user });
    await item.create({
      id: user,
      name: "Adaga de aço",
      price: {
        coin: [3, 4, 6],
        quantity: [1, 1, 10] 
      },
      weight: 1,
      doesDamage: true,
      damge: 45,
      desc: "Uma adaga de aço comum, sem detalhes ou capacidades extraordinárias."
    })
    if (!fileFinder) {
      let embed = new Discord.EmbedBuilder()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`Você não pode possuir um inventário sem ter uma ficha.\n `)
        .setColor(config.color);

      interaction.reply({ embeds: [embed] });
    } else if (!invFinder && fileFinder) {
      let maxINV = Math.ceil(fileFinder.estrutura.força + 5 + (fileFinder.estrutura.agilidade/2));
      try{
        await inv.create({
          id: user,
          gold: "Teste",
          invMAX: `${maxINV}`,
          invUSE: "0",
          lotter: {
            item: "Vazio",
            jade:0,
             steel:0,
             gold:1,
             silver:1,
             bronze:0,
             iron:10,
          }
        })
      } catch(error) {
        console.log(error)
      }

      let embed = new Discord.EmbedBuilder()
      .setAuthor({ name: "Kai", iconURL: fileFinder.image })
      .setDescription(`Olá, ${fileFinder.nome}! Seu primeiro inventário foi criado, confira as informações abaixo:\n 
      Seus itens iniciais são:
      **Espaços**: 0/${maxINV}
      \n- Item: Vazio.\n- *Moedas*\n - Jade: 0\n - Aço Estige: 0 \n - Ouro: 1\n - Prata: 1\n - Bronze: 0\n - Ferro: 10   `)
      .setColor(config.color);

    interaction.reply({ embeds: [embed] });
    } else if (invFinder && fileFinder) {
      const coin = invFinder.lotter
      let totalCoin = null
      let totalReal = null
      let jadeReal = 7500.00 * coin.jade
      let steelReal = 1000.00 * coin.steel
      let goldReal = 150.00 * coin.gold
      let silverReal = 50.00 * coin.silver
      let bronzeReal = 10.00 * coin.bronze
      let ironReal = 1.00 * coin.iron
      async function bankCalc() {
        totalCoin = coin.jade + coin.steel + coin.gold + coin.silver + coin.bronze + coin.iron;
     
        totalReal = jadeReal  + steelReal + goldReal  + silverReal  + bronzeReal  + ironReal;

        
      }
     await bankCalc()


      let embed = new Discord.EmbedBuilder()
      .setAuthor({ name: "Kai", iconURL: fileFinder.image })
      .setTitle(`Inventário [${fileFinder.nome}]`)
      .setDescription(`\n 
      **Espaços**: ${invFinder.invUSE}/${invFinder.invMAX}

      \n- Item:
      \n- ${invFinder.lotter.item}
      \n- *Moedas*
      \n - Jade: ${coin.jade}
      \n  - R$${jadeReal}
      \n - Aço Estige: ${coin.steel}
      \n  - R$${steelReal}
      \n - Ouro: ${coin.gold}
      \n  - R$${goldReal}
      \n - Prata: ${coin.silver}
      \n  - R$${silverReal}
      \n - Bronze: ${coin.bronze}
      \n  - R$${bronzeReal}
      \n - Ferro: ${coin.iron}
      \n  - R$${ironReal}
      \n- **Total**: ${totalCoin} [R$${totalReal}]   `)
      .setColor(config.color);

    interaction.reply({ embeds: [embed] });
    }

  }
}