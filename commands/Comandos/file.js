const Discord = require("discord.js")
const config = require("../../config.json")
const file = require('../../src/schemas/files')
const moongose = require('mongoose')
const classes = require("../../src/schemas/classes")
const battleM = require("../../src/schemas/battle")
const battleFile = require("../../src/schemas/bfile")
const { exec } = require('child_process');
const battle = require("../../src/schemas/battle")


module.exports = {
    name: "ficha", // Coloque o nome do comando
    description: "Cria uma ficha.", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,



    run: async (client, interaction,) => {
        const userID = interaction.user.id
        const battleFiles = await battleFile.findOne({ discordID: userID })
        let findUser = await file.findOne({ discordID: userID })
        let locker = await battleM.findOne({ id: 1 })
        let hpColor = 0xff7d36
        let isDamaged = false
        let secData = battleFiles
        let bars = {
            highBar:0.6 * findUser.vida,
            halfBar: 0.5 * findUser.vida,
            lowBar:  Math.ceil(0.05 * findUser.vida)
        }
        let healthDialog = ''
        let footering = ''
        async function healthBar() {
            let data = findUser
      
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
            } else if(secData.vida == 0) {
                    hpColor = 0x1a1717
                    healthDialog = `☠️: 0 `
                    footering = `👁️: Sobrevida máxima é de -${data.vida} HP`
            }
        }
        async function dialog() {
            healthBar()
            let finderData = await battleFile.findOne({ discordID: userID })
            let sessionData = finderData
            interaction.reply({
                "channel_id": `${interaction.channel_id}`,
                "content": `Olá ${interaction.user}, o modo de campanha está ativo. Nenhum dado adicional do modo edição será salvo.`,
                "tts": false,
                "ephemeral": true,
                "embeds": [
                    {
                        "type": "rich",
                        "title": `🔒: Ficha de ${sessionData.nome} - Campanha ativa.`,
                        "description": `${sessionData.desc}`,
                        "color": hpColor,
                        "footer": {
                            "text": `${footering}`
                          },
                        "fields": [
                            {
                                "name": `🫀 : Vida`,
                                "value": `${healthDialog}`,
                                "inline": true
                            },
                            {
                                "name": `🌌: Mana`,
                                "value": `${sessionData.mana}`,
                                "inline": true
                            },
                            {
                                "name": `Atributos`,
                                "value": `
                                - Furtividade: ${sessionData.attributes.furtividade}
                             \n- Brutalidade: ${sessionData.attributes.brutalidade}`
                            }
                        ]
                    }
                ]
            });
            return;
        }
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
        if (locker.battleMode == true) {
            if (battleFiles) {
                if (isContentEqual(battleFiles.attributes, findUser.attributes) == false  || isContentEqual(battleFiles, findUser) == false && isDamaged == false ) {
                   console.log('here')
                    let foundData = findUser
                    const updatedData = await battleFile.findOneAndUpdate(
                        { discordID: userID },
                        {
                            $set: {
                                nome: foundData.nome,
                                classe: foundData.classe,
                                discordID: foundData.discordID,
                                vida: foundData.vida,
                                mana: foundData.mana,
                                desc: foundData.desc,
                                attributes: {
                                    furtividade: foundData.attributes.furtividade,
                                    brutalidade: foundData.attributes.brutalidade
                                }
                            }
                        },
                        { new: true }
                        
                    ).then(() => {
                        healthBar()
                        dialog()
                        return updatedData
                    })
                } else {
                    healthBar()
                    dialog()
                }


                return;
            } else if (findUser) {

                let foundData = findUser
                const newbattleFile = await battleFile.create({
                    nome: foundData.nome,
                    classe: foundData.classe,
                    discordID: foundData.discordID,
                    vida: foundData.vida,
                    mana: foundData.mana,
                    desc: foundData.desc,
                    attributes: {
                        furtividade: foundData.attributes.furtividade,
                        brutalidade: foundData.attributes.brutalidade
                    },
                }).then(() => {
                    dialog()
                })

            } else {
                let embed = new Discord.EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`Olá ${interaction.user}, sua ficha não foi criada. O modo de campanha bloqueia a criação de fichas, confirme que ele foi desativado antes de tentar novamente.`)
                    .setColor(config.color);


                interaction.reply({ embeds: [embed] })
            }



        } else {

            async function Updater(userID) {
                let isFound = await file.findOne({ discordID: userID })
                const data = isFound
              
                try {
                    const updatedData = await file.findOneAndUpdate(
                        { discordID: userID },
                        { $set: { vida: 100 + data.attributes.brutalidade * 10 } },
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
                    "content": `Olá ${interaction.user}, essa é a sua ficha:`,
                    "tts": false,
                    "embeds": [
                        {
                            "type": "rich",
                            "title": `Ficha de ${updatedData.nome}`,
                            "description": `${updatedData.desc}`,
                            "color": 0x00FFFF,
                            "fields": [
                                {
                                    "name": `🫀 : Vida`,
                                    "value": `${updatedData.vida <= 15 ? `🩸` + updatedData.vida : updatedData.vida}`,
                                    "inline": true
                                },
                                {
                                    "name": `🌌: Mana`,
                                    "value": `${updatedData.mana}`,
                                    "inline": true
                                },
                                {
                                    "name": `Atributos`,
                                    "value": `
                                - Furtividade: ${updatedData.attributes.furtividade}
                             \n- Brutalidade: ${updatedData.attributes.brutalidade}`
                                }
                            ]
                        }
                    ]
                });

                return;
            } else {
                const newFile = await file.create({
                    nome: interaction.user.username,
                    classe: 'teste',
                    discordID: interaction.user.id,
                    vida: 100,
                    mana: 50,
                    desc: '',
                    attributes: {
                        furtividade: 0,
                        brutalidade: 0
                    },


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

}