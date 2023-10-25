const Discord = require("discord.js");
const config = require("../../config.json");
const battleM = require("../../src/schemas/battle");
const player = require("../../src/schemas/bfile");
const powers = require("../../src/schemas/powers")
const mongoose = require("mongoose");

module.exports = {
  name: "roll",
  description: "Roll a dice.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "dados",
      description: "Defina o dado",
      type: Discord.ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "poderes",
      description: "Insira o ID da habilidade",
      type: Discord.ApplicationCommandOptionType.String,
      required: false,
    }
  ],


  run: async (client, interaction) => {


    let roller = await player.findOne({ discordID: interaction.user.id })

    /*const newbattleFile = await powers.create({
    id: "a1",
    user: interaction.user.id,
    multiplier: 0.3,
    level: 1,
    cost: 10,
    dt: 15,
    effect: {
     doEffect: true,
     effectDamage: 150,
     additional: 2
    },

 }) */

    //newbattleFile

    if (!roller) {
      console.log(interaction.user.id)
      let embed = new Discord.EmbedBuilder()

        .setColor('Red')
        .setAuthor({ name: config.name, iconURL: config.kaiIcon })
        .setDescription(`❌: Apenas jogadores com personagens podem utilizar os dados.`);
      interaction.reply({ embeds: [embed] })

      return;
    }



    let inputMain = interaction.options.getString("dados");
    let abilityMain = interaction.options.getString("poderes");
    let results = [];
    let results2 = []
    let total = 0;
    let damage = 0
    let fail = false

    async function mainRoller(key, key2, dt) {

      if (key && key2) {
        const regex = /^(\d+)d(\d+)$/i;
        const match = key.match(regex);


        if (!match) {
          return await interaction.reply("Invalid input. Please use the format `XdY` (e.g., 1d10, 2d20).");
        }

        const numberOfDice = parseInt(match[1]);
        const numberOfSides = parseInt(match[2]);

        if (numberOfDice <= 0 || numberOfSides <= 0) {
          return await interaction.reply("Invalid input. Please use positive numbers for the dice and sides.");
        }



        for (let i = 0; i < numberOfDice; i++) {
          const roll = Math.floor(Math.random() * numberOfSides) + 1;
          results.push(roll);
          total += roll;
        }

        const rolls = dt;



        if (results.every(roll => roll < dt)) {
          fail = true;
        } else if (results.some(roll => roll >= dt)) {

          const regex = /^(\d+)d(\d+)$/i;
          const match2 = key2.match(regex);


          if (!match2) {
            return await interaction.reply("Invalid input. Please use the format `XdY` (e.g., 1d10, 2d20).");
          }

          const numberOfDice = parseInt(match2[1]);
          const numberOfSides = parseInt(match2[2]);

          if (numberOfDice <= 0 || numberOfSides <= 0) {
            return await interaction.reply("Invalid input. Please use positive numbers for the dice and sides.");
          }



          for (let i = 0; i < numberOfDice; i++) {
            const roll2 = Math.floor(Math.random() * numberOfSides) + 1;
            results2.push(roll2);
            damage += roll2;
          }
        }
        return;
      }
      const regex = /^(\d+)d(\d+)$/i;
      const match = key.match(regex);

      if (!match) {
        return await interaction.reply("Invalid input. Please use the format `XdY` (e.g., 1d10, 2d20).");
      }

      const numberOfDice = parseInt(match[1]);
      const numberOfSides = parseInt(match[2]);

      if (numberOfDice <= 0 || numberOfSides <= 0) {
        return await interaction.reply("Invalid input. Please use positive numbers for the dice and sides.");
      }



      for (let i = 0; i < numberOfDice; i++) {
        const roll = Math.floor(Math.random() * numberOfSides) + 1;
        results.push(roll);
        total += roll;
      }
    }


    if (!inputMain && !abilityMain) {
      let embed = new Discord.EmbedBuilder()

        .setColor('Red')
        .setAuthor({ name: config.name, iconURL: config.kaiIcon })
        .setDescription(`❌: Não é possivel rolar dados vazios.`);
      interaction.reply({ embeds: [embed] })

      return;
    }
    let input = null
    let ability = null
    if (inputMain) {
      input = interaction.options.getString("dados").toLowerCase();

    } else if (abilityMain) {
      ability = interaction.options.getString("poderes").toLowerCase();
    }


    let powerfinder = null
    let description = ''
    let say = ''
    let what = ''
    let firstdice = ''
    let modifier = ''
    let dt = 5
    let message = ''
    let organicSuccess = false


    if (ability) {
      powerfinder = await powers.findOne({ id: ability })
      if (!powerfinder) {
        let embed = new Discord.EmbedBuilder()

          .setColor('Red')
          .setAuthor({ name: config.name, iconURL: config.kaiIcon })
          .setDescription(`❌: Você utilizou uma habilidade inválida ou inexistente.`);
        interaction.reply({ embeds: [embed] })

        return;
      } else if (powerfinder.id == ability && interaction.user.id != powerfinder.user) {
        let embed = new Discord.EmbedBuilder()

          .setColor('Red')
          .setAuthor({ name: config.name, iconURL: config.kaiIcon })
          .setDescription(`❌: Você utilizou uma habilidade inválida ou inexistente.`);
        interaction.reply({ embeds: [embed] })

        return;
      }
      if (ability == powerfinder.id && interaction.user.id == powerfinder.user) {
        console.log('here')
        caster = {}
        ability = roller.dano.dano
        description = powerfinder.multiplier
        what = 'dano'
        firstdice = `${roller.estrutura.espirito}d20`
        modifier = `${roller.attributes.presença}`
        dt = powerfinder.dt
      }



      mainRoller(firstdice, ability, dt).then(async () => {
        let minus = powerfinder.cost
        await player.findOneAndUpdate(
          { discordID: userID },
          {
            $set: {
              mana: roller.mana - minus,
            }
          },
          { new: true }

        )

      })

      if (fail == true) {
        let embed = new Discord.EmbedBuilder()

          .setColor('Red')
          .setAuthor({ name: config.name, iconURL: config.kaiIcon })
          .setDescription(` **❌: Falha**
\n Sua habilidade falhou pois você rolou ${results}`);
        interaction.reply({ embeds: [embed] })
        fail = false;
        return;
      }
      async function constructor() {
        if (powerfinder.effect.doEffect == true) {
          console.log(interaction.user.id)
          if (results.includes(Number) && interaction.user.id == '333417048472551435') {
            organicSuccess = true
            console.log(organicSuccess)
          }
          message = `**${powerfinder.name}**
          \n ${powerfinder.desc}
          
          \n - **DANO**: ${organicSuccess ? Math.ceil(total + description * damage + powerfinder.effect.effectDamage) * powerfinder.effect.additional : Math.ceil(total + description * damage + powerfinder.effect.effectDamage)} de **${what}**
          \n - **MANA**: ${powerfinder.cost}
          \n Dev: ${results2} DAMAGE // ${results} DICE - THERE IS EFFECT
          \n ${damage} + ${description} x ${damage} + ${powerfinder.effect.effectDamage} ${organicSuccess ? 'x ' + powerfinder.effect.additional : ''}`
        } else {
          message = `**${powerfinder.name}**
          \n ${powerfinder.desc}
          
          \n Dev: ${results2} - THERE IS NO EFFECT`
        }
      }

      constructor()
      let embed = new Discord.EmbedBuilder()

        .setColor('Red')
        .setAuthor({ name: config.name, iconURL: config.kaiIcon })
        .setDescription(`${message}`);
      interaction.reply({ embeds: [embed] })

      organicSuccess = false
    }

    if (input) {
      input.toLowerCase()
      let filterContent = ''
      let picker = ''
      let outcome = 'Total'

      if (input == "int") {
        input = `${roller.estrutura.inteligencia}d20`
        filterContent = "INT"
        picker = `${roller.estrutura.inteligencia}d20`
      } else if (input == "for") {
        input = `${roller.estrutura.força}d20`
        filterContent = "FOR"
        picker = `${roller.estrutura.força}d20`
      } else if (input == "esp") {
        input = `${roller.estrutura.espirito}d20`
        filterContent = "ESP"
        picker = `${roller.estrutura.espirito}d20`
      } else if (input == "agi") {
        input = `${roller.estrutura.agilidade}d20`
        filterContent = "AGI"
        picker = `${roller.estrutura.agilidade}d20`
      }

      const regex = /^(\d+)d(\d+)$/i;
      const match = input.match(regex);

      if (!match) {
        return await interaction.reply("Invalid input. Please use the format `XdY` (e.g., 1d10, 2d20).");
      }

      const numberOfDice = parseInt(match[1]);
      const numberOfSides = parseInt(match[2]);

      if (numberOfDice <= 0 || numberOfSides <= 0) {
        return await interaction.reply("Invalid input. Please use positive numbers for the dice and sides.");
      }

      let results = [];
      let total = 0;

      for (let i = 0; i < numberOfDice; i++) {
        const roll = Math.floor(Math.random() * numberOfSides) + 1;
        results.push(roll);
        total += roll;
      }

      let embed = new Discord.EmbedBuilder()

        .setColor('Red')
        .setAuthor({ name: config.name, iconURL: config.kaiIcon })
        .setDescription(` ${filterContent}${filterContent ? ': ' : ''}${picker} 
    \n Seu dado foi ${numberOfDice}d${numberOfSides}: ${results.join(", ")}\n${outcome}: ${total}`);
      interaction.reply({ embeds: [embed] })

      filterContent = ''
      picker = ''
      outcome = 'Total'

    }
  }
};
