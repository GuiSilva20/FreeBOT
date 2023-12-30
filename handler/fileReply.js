const Discord = require("discord.js")
const config = require("../config.json");
const text = require("../generic.json")
const moongose = require('mongoose')
const classes = require("../src/schemas/classes")
const battleMmodel = require("../src/schemas/battle")
const battleFileModel = require("../src/schemas/bfile")
const fileModel = require('../src/schemas/files')
const battleModel = require("../src/schemas/battle")
const storageModel = require("../src/schemas/storage")
const xpModel = require('../src/schemas/xp');
const menuModel = require('../src/schemas/menu');
const { exec } = require('child_process');
let reply;

async function saveReply(interaction) {
    console.log('FILE REPLY')
    const store = await storageModel.findOne({ playerID: interaction.user.id })
    const sessionData = await fileModel.findOne({discordID: interaction.user.id})
    const channel = await interaction.client.channels.fetch(store.channelID);
    const message = await channel.messages.fetch(store.messageID);
    const counter = await xpModel.findOne({ level: sessionData.level + 1 })
    const changeMaker = await classes.findOne({ ID: "CRI" })
    let MAorPC = '[MA]🌌: Mana'
    if (sessionData.classe == changeMaker.nome) {
        MAorPC = '[PC]⚙️: P. de Criação'
    }
    
  reply = message.edit({
    "channel_id": `${interaction.channel_id}`,
    "tts": false,
    "ephemeral": false,
    "fetchReply": true,
    "embeds": [
        {
            "type": "rich",
            "title": `Ficha de ${sessionData.nome}`,
            "description": `${sessionData.desc} \n - Caminho de estudo: ${sessionData.studyPath}`,
            "color": 0x098700,
            "thumbnail": {
                "url": `${sessionData.image}`,
                "height": 0,
                "width": 0
            },
            "footer": {
                "text": `Level: ${sessionData.level} - ${sessionData.xp}/${counter.xp} `
            },
            "fields": [
                {
                    "name": `[HP] 🫀 : Vida`,
                    "value": `${sessionData.vida}`,
                    "inline": true
                },
                {
                    "name": `${MAorPC}`,
                    "value": `${sessionData.mana}`,
                    "inline": true
                },
                {
                    "name": '\u200B',
                    "value": '\u200B',
                    "inline": true
                },
                {
                    "name": `[SPE]🧝‍♂️: Raça`,
                    "value": `${sessionData.species}`,
                    "inline": true
                },
                {
                    "name": `[CLA] 🏹: Classe`,
                    "value": `${sessionData.classe}`,
                    "inline": true
                },
                {
                    "name": '\u200B',
                    "value": '\u200B',
                    "inline": true
                },
                {
                    "name": `[DEF] 🛡️: Defesa`,
                    "value": `${sessionData.DEF}`,
                    "inline": true
                },
                {
                    "name": `[DES]⌛: Desvio `,
                    "value": `${sessionData.DES}`,
                    "inline": true
                },
                {
                    "name": '\u200B',
                    "value": '\u200B',
                    "inline": true
                },
                {
                    "name": `💨: AGI`,
                    "value": `\n**${sessionData.estrutura.agilidade}**
                        `,
                    "inline": true
                },
                {
                    "name": `🔮: ESP`,
                    "value": `
                       **${sessionData.estrutura.espirito}**
                      `,
                    "inline": true
                },

                {
                    "name": `🧬: FOR`,
                    "value": `**${sessionData.estrutura.força}**  `,
                    "inline": true
                },
                {
                    "name": `🧠: INT`,
                    "value": ` **${sessionData.estrutura.inteligencia}**`,
                    "inline": true
                },
                {
                    "name": `🍃: SAB`,
                    "value": ` **${sessionData.estrutura.sabedoria}**`,
                    "inline": true
                },
                {
                    "name": '\u200B',
                    "value": '\u200B',
                    "inline": true
                },
                {
                    "name": `🔢: Pontos de Custo`,
                    "value": `${sessionData.cost}`,
                    "inline": true
                },
                {
                    "name": `⚔️: Dano`,
                    "value": `${sessionData.dano.dano}`,
                    "inline": true
                }
            ]
        }
    ]
  });
}

module.exports = { saveReply, reply };