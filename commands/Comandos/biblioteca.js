const Discord = require("discord.js")
const config = require("../../config.json")
const battleM = require("../../src/schemas/battle")
const gods = require("../../src/schemas/gods")
const moongose = require('mongoose')
const storage = require("../../src/schemas/storage")


module.exports = {
    name: "biblioteca", // Coloque o nome do comando
    description: "Acesse informações", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,



    run: async (client, interaction,) => {

        let reply = { }

            await interaction.reply({
                "content": "",
                "tts": false,
                "ephemeral": false,
                "embeds": [
                    {
                        "type": "rich",
                        "title": `Biblioteca`,
                        "description": `Olá viajante, meu nome é Kai e eu irei te auxiliar nesta jornada. Selecione abaixo qual área de conhecimento você deseja acessar.`,
                        "color": 0x00FFFF,
                        "thumbnail": {
                            "url": `https://cdn.discordapp.com/attachments/1159963341385650176/1159963516946624562/30e19afd4788f5e3aead8ff9ca8bece2.jpg?ex=6532ef35&is=65207a35&hm=f2993a22b0890f4cb89e777a95eaa3fd4ed156e3da9008305795d47c90bbf2e3&`,
                            "height": 0,
                            "width": 0
                        },
                        "author": {
                            "name": `Kai`,
                            "icon_url": `https://cdn.discordapp.com/attachments/1159963341385650176/1159965660793810965/OIG.FITfX4xM_ScW.h.jpeg?ex=6532f134&is=65207c34&hm=465a14e921fc0ea4a184fc48aee898f11d02b8e45471d24099913f95596bb006&`
                        }
                    }
                ]
            });
    
         return;
                                await editando.edit({
                                    "content": "",
                                    "tts": false,
                                    "components": [
                                        {
                                            "type": 1,
                                            "components": [
                                                {
                                                    "custom_id": `back`,
                                                    "placeholder": `Menu`,
                                                    "options": [
                                                        {
                                                            "label": `Encerrar`,
                                                            "value": `end`,
                                                            "description": `Você deve encerrar se quiser retornar a usar o comando.`,
                                                            "emoji": {
                                                                "id": null,
                                                                "name": `❌`
                                                            },
                                                            "default": false
                                                        }
                                                    ],
                                                    "min_values": 1,
                                                    "max_values": 1,
                                                    "type": 3
                                                }
                                            ]
                                        }
                                    ],
                                    "embeds": [
                                        {
                                            "type": "rich",
                                            "title": `${godData.symbol} ${godData.name}`,
                                            "description": `${godData.desc}`,
                                            "color": 0x020c0c,
                                            "fields": [
                                                {
                                                    "name": `Elemento`,
                                                    "value": `${godData.element}`,
                                                    "inline": true
                                                },
                                                {
                                                    "name": `Reino`,
                                                    "value": `${godData.kingdom}`,
                                                    "inline": true
                                                },
                                                {
                                                    "name": `Símbolo`,
                                                    "value": `${godData.symbol}`,
                                                    "inline": true
                                                }
                                            ],
                                            "image": {
                                                "url": `${godData.image}`,
                                                "height": 0,
                                                "width": 0
                                            }
                                        }
                                    ],
    
                                })
                           
    
    }
}