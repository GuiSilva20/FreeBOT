const Discord = require("discord.js")
const config = require("../../config.json")
const file = require('../../src/schemas/files')
const moongose = require('mongoose')
const classes = require("../../src/schemas/classes")
const battleM = require("../../src/schemas/battle")
const battleFile = require("../../src/schemas/bfile")
const { exec } = require('child_process');
const battle = require("../../src/schemas/battle")
const storage = require("../../src/schemas/storage")
const xpModel = require('../../src/schemas/xp');

module.exports = {
    name: "generate", // Coloque o nome do comando
    description: "Cria uma ficha.", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,



    run: async (client, interaction,) => {
        const userID = interaction.user.id
        const triggering = await storage.exists({ playerID: userID })
        
        console.log(triggering)

        //Finding ids
        if (triggering) {
            const info = await storage.findOne({ playerID: userID })
            let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`Sua ficha já existe. Caso possua problemas em encontrá-la, acesse o canal <#${info.channelID}> e verifique os **fixados**`)
                .setColor(config.color);

            interaction.reply({ embeds: [embed] });
            return;
        } else {
            const creator = await file.create({
                nome: "Vazio",
                classe: "Vazio",
                level: 1,
                image: "https://cdn.discordapp.com/attachments/1159963341385650176/1159965660793810965/OIG.FITfX4xM_ScW.h.jpeg?ex=656115b4&is=654ea0b4&hm=4e29c9a532d473f71877d9a51c926d6e532415d8a059809a773710729d436389&",
                discordID: interaction.user.id,
                vida: 100,
                mana: 50,
                desc: "Vazio",
                elemento: "Vazio",
                elementoID: 0,
                estrutura: {
                    força: 0,
                    agilidade: 0,
                    espirito: 0,
                    inteligencia: 0,
                    sabedoria: 0,
                },
                attributes: {
                    ESP: {
                        vontade: 0,
                        conjuracao: 0,
                        intimidaçao: 0,
                        presenca: 0,
                    },
                    SAB: {
                        percepcao: 0,
                        sobrevivencia: 0,
                        localizacao: 0,
                        crime: 0,
                    },
                    INT: {
                        intuicao: 0,
                        diplomacia: 0,
                        atualidades: 0,
                    },
                    AGI: {
                        atletismo: 0,
                        acrobacia: 0,
                        furtividade: 0,
                        reflexos: 0,
                        pericia: 0,
                    },
                    FOR: {
                        vigor: 0,
                        brutalidade: 0,
                        fortitude: 0,
                    },
                },
                dano: {
                    danoTotal: 1,
                    dano: "1d20",
                },
            });
          
        }

        // const battleFiles = await battleFile.findOne({ discordID: userID })

        // let locker = await battleM.findOne({ id: 1 })
        let hpColor = 0xff7d36
   
        let findUser = await file.findOne({ discordID: userID })
        
        if (findUser.discordID == interaction.user.id) {
            dialog(findUser);
        }
        let healthDialog = ''
        let footering = ''
        async function healthBar() {
            let data = findUser
            let bars = {
                highBar: 0.6 * findUser.vida,
                halfBar: 0.5 * findUser.vida,
                lowBar: Math.ceil(0.05 * findUser.vida)

            }


            let secData = battleFiles
            if (!secData) {
                hpColor = 0x098700
                healthDialog = `🥝: Calculando a vida... `
                footering = `👁️: Reenvie o comando para obter os dados.`
                return;
            }
            if (secData.vida >= bars.highBar) { //100%
                hpColor = 0x098700
                healthDialog = `🌿: ${secData.vida} `
                footering = `👁️: Machucado com: ${bars.halfBar} HP`
            } else if (secData.vida <= bars.halfBar && secData.vida > bars.lowBar) { //60%
                hpColor = 0xa94207
                healthDialog = `🩸: ${secData.vida} `
                footering = `👁️: Gravemente machucado com: ${bars.lowBar}`
            } else if (secData.vida <= bars.lowBar && secData.vida != 0) { //20%
                hpColor = 0xe50707
                healthDialog = `🚑: ${secData.vida} `
                footering = `👁️: Sobrevida ao atingir 0 HP.`
            } else if (secData.vida == 0) {
                hpColor = 0x1a1717
                healthDialog = `☠️: 0 `
                footering = `👁️: Sobrevida máxima é de -${data.vida} HP`
            }
        }

        async function dialog(findUser) {
            //healthBar()

            // console.log(healthDialog + 'HealthDialog //' + battleFiles.vida + 'SecData.vida')
            let finderData = findUser
            let counter = await xpModel.findOne({ level: findUser.level + 1})
            let sessionData = finderData
            let reply = interaction.reply({
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
                                "name": `[MA]🌌: Mana`,
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
                                "name": `⚔️: Dano`,
                                "value": `${sessionData.dano.dano}`,
                                "inline": true
                            }
                        ]
                    }
                ]
            });

            const message = await interaction.fetchReply()
        
    
            async function generateSequentialID() {
                const existingStorage = await storage.find({}).sort({ id: -1 }).limit(1);
                const highestID = existingStorage.length > 0 ? existingStorage[0].id : 0;
                return highestID + 1;
            }
            const storing = await storage.create({
                id: await generateSequentialID(),
                name: `${interaction.user.username}`,
                info: "fileMessage",
                messageID:`${message.id}`,
                channelID: `${interaction.channel.id}`,
                playerID: interaction.user.id,
            })

            return;
        }
        return;
        function isContentEqual(obj1, obj2) {
            const keys1 = Object.keys(obj1);
            const keys2 = Object.keys(obj2);

            if (keys1.length !== keys2.length) {
                return false;
            }

            for (let key of keys1) {
                if (obj1[key] !== obj2[key]) {
                    return false;
                }
            }

            return true;
        }




        let foundData = findUser
        const newbattleFile = await battleFile.create({
            nome: foundData.nome,
            classe: foundData.classe,
            image: foundData.image,
            discordID: foundData.discordID,
            vida: foundData.vida,
            mana: foundData.mana,
            desc: foundData.desc,
            elemento: foundData.elemento,
            elementoID: foundData.elementoID,
            estrutura: {
                força: foundData.estrutura.força,
                agilidade: foundData.estrutura.agilidade,
                espirito: foundData.estrutura.espirito,
                inteligencia: foundData.estrutura.inteligencia
            },
            attributes: {
                furtividade: foundData.attributes.furtividade,
                brutalidade: foundData.attributes.brutalidade,
                fortitude: foundData.attributes.fortitude,
                presença: foundData.attributes.presença,
                crime: foundData.attributes.crime,
                reflexos: foundData.attributes.reflexos,
                atualidades: foundData.attributes.atualidades,
                pericia: foundData.attributes.pericia
            },
            dano: {
                danoTotal: foundData.dano.danoTotal,
                dano: foundData.dano.dano
            }
        }).then(() => {
            dialog()
        })



        async function Updater(userID) {
            let isFound = await file.findOne({ discordID: userID })
            const data = isFound

            try {

                let calc = 1 + data.estrutura.força + Math.ceil(data.estrutura.espirito / 2)
                console.log(calc)
                const updatedData = await file.findOneAndUpdate(
                    { discordID: userID },
                    {
                        $set: {
                            vida: 100 + data.estrutura.força * 10,
                            mana: 50 + data.estrutura.espirito * 10
                        },
                        dano: {
                            danoTotal: calc,
                            dano: `${calc}d10`
                        }
                    },
                    { new: true }
                );
                return updatedData;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }





        if (findUser) {
            let userID = interaction.user.id
            await Updater(userID)
            const updatedData = await Updater(userID);
            interaction.reply({
                "channel_id": `${interaction.channel_id}`,
                "content": `Olá ${interaction.user}, você está no modo edição`,
                "tts": false,
                "ephemeral": false,
                "embeds": [
                    {
                        "type": "rich",
                        "title": `🪐: Ficha de ${updatedData.nome}`,
                        "description": `${updatedData.desc}`,
                        "color": 0xb71db7,
                        "thumbnail": {
                            "url": `${updatedData.image}`,
                            "height": 0,
                            "width": 0
                        },
                        "footer": {
                            "text": `${footering}`
                        },
                        "fields": [
                            {
                                "name": `🫀 : Vida`,
                                "value": `${updatedData.vida}`,
                                "inline": true
                            },
                            {
                                "name": `🌌: Mana`,
                                "value": `${updatedData.mana}`,
                                "inline": true
                            },
                            {
                                "name": '\u200B',
                                "value": '\u200B',
                                "inline": true
                            },
                            {
                                "name": '\u200B',
                                "value": '**Principais**',
                                "inline": true
                            },
                            {
                                "name": '\u200B',
                                "value": '**status**',
                                "inline": true
                            },
                            {
                                "name": '\u200B',
                                "value": '\u200B',
                                "inline": true
                            },
                            {
                                "name": `💨: AGI`,
                                "value": `\n**${updatedData.estrutura.agilidade}**
                                `,
                                "inline": true
                            },
                            {
                                "name": `🔮: ESP`,
                                "value": `
                               **${updatedData.estrutura.espirito}**
                              `,
                                "inline": true
                            },
                            {
                                "name": '\u200B',
                                "value": '\u200B',
                                "inline": true
                            },
                            {
                                "name": `🧬: FOR`,
                                "value": `**${updatedData.estrutura.força}**  `,
                                "inline": true
                            },
                            {
                                "name": `🧠: INT`,
                                "value": ` **${updatedData.estrutura.inteligencia}**`,
                                "inline": true
                            },
                            {
                                "name": '\u200B',
                                "value": '\u200B',
                                "inline": true
                            },
                            {
                                "name": `Atributos`,
                                "value": `
                                - Furtividade: ${updatedData.attributes.furtividade}
                             \n- Brutalidade: ${updatedData.attributes.brutalidade}
                             \n- Fortitude: ${updatedData.attributes.fortitude}
                             \n- Presença: ${updatedData.attributes.presença}
                             \n- Crime: ${updatedData.attributes.crime}
                             \n- Reflexos: ${updatedData.attributes.reflexos}
                             \n- Atualidades: ${updatedData.attributes.atualidades}
                             \n- Pericia: ${updatedData.attributes.pericia}`
                            },
                            {
                                "name": `⚔️: Dano`,
                                "value": `${updatedData.dano.dano}`,
                                "inline": true
                            }
                        ]
                    }
                ]
            });

            return;
        } else {
            /*/let embed = new Discord.EmbedBuilder()
             .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
             .setDescription(`Olá ${interaction.user}, essa é uma mensagem de teste para o comando de ficha. \n `)
             .setColor(config.color);
 
         interaction.reply({ embeds: [embed] });/*/

            const newFile = await file.create({
                nome: "Elysia",
                classe: "Mago-Assassino",
                discordID: interaction.user.id,
                vida: 0,
                mana: 0,
                desc: '',
                elemento: "[1] Luz Lunar",
                elementoID: 1,
                estrutura: {
                    força: 1,
                    agilidade: 2,
                    espirito: 3,
                    inteligencia: 2
                },
                attributes: {
                    furtividade: 0,
                    brutalidade: 0,
                    fortitude: 5,
                    presença: 5,
                    crime: 0,
                    reflexos: 10,
                    atualidades: 0,
                    pericia: 5
                },
                dano: {
                    danoTotal: 0,
                    dano: "0"
                },
                image: "https://cdn.discordapp.com/attachments/1159963341385650176/1159965660793810965/OIG.FITfX4xM_ScW.h.jpeg?ex=654ea0b4&is=653c2bb4&hm=0928faa9065d676470d5823f70008c9d94cd4c8b63e506555f7ae6b0bdb638a9&"


            })

            await Updater(userID).then(() => {
                let embed = new Discord.EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`Olá ${interaction.user}, essa é uma mensagem de teste para o comando de ficha. \n O nome salvo foi ${newFile.nome} `)
                    .setColor(config.color);

                interaction.reply({ embeds: [embed] });
            });





        }











    }
}