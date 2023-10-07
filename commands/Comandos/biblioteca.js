const Discord = require("discord.js")
const config = require("../../config.json")
const battleM = require("../../src/schemas/battle")
const gods = require("../../src/schemas/gods")
const moongose = require('mongoose')

const activeInteractions = new Set();

module.exports = {
    name: "biblioteca", // Coloque o nome do comando
    description: "Acesse informações", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,



    run: async (client, interaction,) => {


        if (activeInteractions.has(interaction.user.id)) {
            let embed = new Discord.EmbedBuilder()

                .setColor('Red')
                .setAuthor({ name: config.name, iconURL: config.kaiIcon })
                .setDescription(`❌: Você já está na biblioteca, rapazinho. Termine a sua busca para iniciar uma nova.
                A biblioteca sempre é renovada após 1 minuto e 30 segundos caso você esteja tendo problemas, aguarde.`);
            interaction.reply({ embeds: [embed], ephemeral: true })
            return;
        }

        /*const newGod = await gods.create({
            id: "1",
            name: "Asura",
            symbol: "🦉",
            element: "Lua",
            desc: "Lorem ipsum.",
            image: "https://cdn.discordapp.com/attachments/1159963341385650176/1159969216603103332/23_Sem_Titulo_20231006180555_polarr.jpg?ex=6532f484&is=65207f84&hm=134ee8e5a31af7afad11f8a9a3bfef2cde044333e92a1f663adbfb601284277a&",
            kinddom: "Lunaris"
    
    
        })*/
        activeInteractions.add(interaction.user.id);
        let reply = await interaction.reply({
            "content": "",
            "tts": false,
            "ephemeral": true,
            "components": [
                {
                    "type": 1,
                    "components": [
                        {
                            "custom_id": `main`,
                            "placeholder": `Início`,
                            "options": [
                                {
                                    "label": `Deuses`,
                                    "value": "gods",
                                    "description": `Acesse informações sobre os deuses de hazen.`,
                                    "emoji": {
                                        "id": null,
                                        "name": `🌌`
                                    },
                                    "default": false
                                },
                                {
                                    "label": `Classes`,
                                    "value": "classe",
                                    "description": `Acesse informações sobre as classes`,
                                    "emoji": {
                                        "id": null,
                                        "name": `⚔`
                                    },
                                    "default": false
                                },
                                {
                                    "label": `Raças`,
                                    "value": "species",
                                    "description": `Acesse informações sobre as raças`,
                                    "emoji": {
                                        "id": null,
                                        "name": `🦋`
                                    },
                                    "default": false
                                },
                                {
                                    "label": `Sistemas`,
                                    "value": "system",
                                    "description": `Acesse informações sobre o sistema`,
                                    "emoji": {
                                        "id": null,
                                        "name": `⚙`
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


        interaction.channel.createMessageComponentCollector()
            .on('collect', async (c) => {
                await c.deferUpdate();
                const selectedValue = c.values[0];


                if (selectedValue === 'gods') {
                    let godList = null
                    try {
                        godList = await gods.find();
                    } catch (error) {
                        console.error("Error in Mongoose operation:", error);

                    }

                    let godOptions = godList.map(god => {
                        return {
                            "label": `${god.name}`,
                            "value": `${god.id}`,
                            "description": `${god.option}`,
                            "emoji": {
                                "id": null,
                                "name": `${god.symbol}`
                            },
                        };
                    });


                    godOptions = JSON.stringify(godOptions);
                    const parsedGodOptions = JSON.parse(godOptions);
                    console.log(parsedGodOptions)





                    await interaction.editReply({
                        "content": "",
                        "tts": false,
                        "components": [
                            {
                                "type": 1,
                                "components": [
                                    {
                                        "custom_id": `main`,
                                        "placeholder": `Início`,
                                        "options": parsedGodOptions,
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
                                "title": `Biblioteca`,
                                "description": `Você acessou a área dos deuses, selecione o deus que deseja saber mais.`,
                                "color": 0x894007,
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

                    })

                    const collector = interaction.channel.createMessageComponentCollector()
                    collector.on('collect', async (c) => {
                        ('came')
                        const godValue = c.values[0];
                        if (godValue && godValue != "end") {
                            let id = godValue
                            let godData = null
                            try {
                                godData = await gods.findOne({ id: id })
                            } catch (error) {
                                console.error("Error in Mongoose operation:", error);
                            }
                            await interaction.editReply({
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
                            const endCollector = interaction.channel.createMessageComponentCollector();

                            endCollector.on('collect', async (c) => {
                                const cancel = c.values[0];
                                if (cancel === "end") {
                                    try {
                                        let embed = new Discord.EmbedBuilder()

                                            .setColor('Red')
                                            .setAuthor({ name: config.name, iconURL: config.kaiIcon })
                                            .setDescription(`🔒: Interação encerrada.`);
                                            await interaction.followUp({ embeds: [embed], ephemeral: true });

                                        setTimeout(async () => {
                                            await interaction.deleteReply();
                                            activeInteractions.delete(interaction.user.id);
                                        }, 2000);
                                      
                                    } catch (error) {
                                        console.error("An error occurred inside the if statement:", error);
                                    }
                                }
                            });

                            collector.on('end', collected => {
                                // This function will be called when the collector ends (times out)
                                // You can perform cleanup tasks here if necessary
                                console.log(`Collector ended. Collected ${collected.size} interactions.`);
                            });
                        }
                    })


                }
            })
            
           

        setTimeout(async () => {
            if(interaction && !interaction.delete) {
                return
            }else{
                try {
                    let embed = new Discord.EmbedBuilder()

                        .setColor('Red')
                        .setAuthor({ name: config.name, iconURL: config.kaiIcon })
                        .setDescription(`🔒: Interação encerrada.`);
                        await interaction.followUp({ embeds: [embed], ephemeral: true });

                    setTimeout(async () => {
                        await interaction.deleteReply();
                        activeInteractions.delete(interaction.user.id);
                    }, 90000);
                  
                } catch (error) {
                    console.error("An error occurred inside the if statement:", error);
                }
            }
      
        }, 7000);




    }
}