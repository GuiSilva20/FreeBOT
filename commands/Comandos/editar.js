const Discord = require("discord.js")
const config = require("../../config.json");
const text = require("../../generic.json")
const moongose = require('mongoose')
const classes = require("../../src/schemas/classes")
const battleMmodel = require("../../src/schemas/battle")
const battleFileModel = require("../../src/schemas/bfile")
const fileModel = require('../../src/schemas/files')
const battleModel = require("../../src/schemas/battle")
const storageModel = require("../../src/schemas/storage")
const xpModel = require('../../src/schemas/xp');
const menuModel = require('../../src/schemas/menu');
const { exec } = require('child_process');
const mapAbbreviationToAttribute = require('../../src/schemas/skill');
const { saveReply, reply } = require('../../handler/fileReply');


module.exports = {
    name: "edit", // Coloque o nome do comando
    description: "Edita sua ficha de Hazen", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction,) => {
        const store = await storageModel.findOne({ playerID: interaction.user.id })
        const historyData = await fileModel.findOne({ discordID: interaction.user.id })
        const trigger = await battleMmodel.findOne({ id: 1 })



        if (!historyData) {
            return Flag(text["noFile.desc"], text["noFile.title"]);
        } else if (trigger.battleMode === true) {
            return Flag(text["battleMode.title"], text["battleMode.desc"]);
        } else {
            let editMenu = null
            try {
                editMenu = await menuModel.find({ id: 'editMenu' })
            } catch (error) {
                Flag(text["error.title"], text["error.desc"])
                Log(text["logError.title"], error)
            }

            if (editMenu.length === 0) {
                return Flag(text["emptyMenu.title"], text["emptyMenu.desc"])
            } else {
                const initialOptions = editMenu.map((cls) => ({
                    label: cls.name,
                    value: cls.value,
                    description: cls.desc,
                    emoji: cls.symbol
                }));

                const selectMenu = new Discord.StringSelectMenuBuilder()
                    .setCustomId('editMenu')
                    .setPlaceholder(`${text["genericMenu.placeholder"]}`)
                    .addOptions(initialOptions);

                const row = new Discord.ActionRowBuilder()
                    .addComponents(selectMenu);
                let embed = new Discord.EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setTitle(`${text["genericMenu.title"]}`)
                    .setDescription(`${text["genericMenu.desc"]}`)
                    .setColor(text["genericMenu.color"])

                interaction.reply({ embeds: [embed], components: [row], ephemeral: true })

                // 📢 LISTENER

                const collector = interaction.channel.createMessageComponentCollector({
                    filter: i => i.customId === 'editMenu',
                    time: 100000,
                });

                collector.on('collect', async (c) => {
                    const selectedValue = c.values[0];

                    if (selectedValue != null) {
                        collector.stop()

                        if (selectedValue == 'cancel') {
                            cancel()
                            return collector.stop();

                        } else if (selectedValue == 'visual') { // 👕; INFO
                            setTimeout(() => {
                                collector.stop()
                                interaction.deleteReply()
                            }, 1000);

                        } else if (selectedValue == 'atri') { // 🔢; ATRIBUTOS
                            await c.deferUpdate();
                            collector.stop()
                            let atriMenu = null
                            try {
                                atriMenu = await menuModel.find({ id: 'atriMenu' })
                            } catch (error) {
                                deferFlag(text["error.title"], text["error.desc"], text["emptyMenu.easterEgg"])
                                Log(text["logError.title"], error)
                            }

                            if (atriMenu.length === 0) {
                                return deferFlag(text["emptyMenu.title"], text["emptyMenu.desc"])
                            } else {

                            } const initialOptions = atriMenu.map((cls) => ({
                                label: cls.name,
                                value: cls.value,
                                description: cls.desc,
                                emoji: cls.symbol
                            }));

                            const selectMenu = new Discord.StringSelectMenuBuilder()
                                .setCustomId('atriMenu')
                                .setPlaceholder(`${text["genericMenu.placeholder"]}`)
                                .addOptions(initialOptions);

                            const classer = new Discord.ActionRowBuilder()
                                .addComponents(selectMenu);
                            let embed = new Discord.EmbedBuilder()
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setTitle(`${text["genericMenu.title"]}`)
                                .setDescription(`${text["genericMenu.desc"]}`)
                                .setColor(text["genericMenu.color"])

                            interaction.editReply({ embeds: [embed], components: [classer], ephemeral: true })

                            const collector1 = interaction.channel.createMessageComponentCollector({
                                filter: i => i.customId === 'atriMenu',
                                time: 100000,
                            });

                            collector1.on('collect', async (c) => {
                                await c.deferUpdate();
                                const selectedClass = c.values[0];
                                if (selectedClass != null) {
                                    if (selectedClass == "cancel") {
                                        cancel()
                                        return collector1.stop();
                                    }
                                    collector1.stop()
                                    let numMenu = null
                                    try {
                                        numMenu = await menuModel.find({ id: 'numMenu' })
                                    } catch (error) {
                                        deferFlag(text["error.title"], text["error.desc"])
                                        Log(text["logError.title"], error)
                                    }

                                    if (numMenu.length === 0) {
                                        return deferFlag(text["emptyMenu.title"], text["emptyMenu.desc"], text["emptyMenu.easterEgg"])
                                    } else {
                                        const initialOptions = numMenu.map((cls) => ({
                                            label: cls.name,
                                            value: cls.value,
                                            description: cls.desc,
                                            emoji: cls.symbol
                                        }));

                                        const selectMenu = new Discord.StringSelectMenuBuilder()
                                            .setCustomId('numMenu')
                                            .setPlaceholder(`${text["genericMenu.placeholder"]}`)
                                            .addOptions(initialOptions);

                                        const numbering = new Discord.ActionRowBuilder()
                                            .addComponents(selectMenu);
                                        let embed = new Discord.EmbedBuilder()
                                            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                            .setTitle(`${text["genericMenu.title"]}`)
                                            .setDescription(`${text["genericMenu.desc"]}`)
                                            .setColor(text["genericMenu.color"])

                                        interaction.editReply({ embeds: [embed], components: [numbering], ephemeral: true })

                                        const collector2 = interaction.channel.createMessageComponentCollector({
                                            filter: i => i.customId === 'numMenu',
                                            time: 100000,
                                        });


                                        collector2.on('collect', async (c) => {
                                            await c.deferUpdate();
                                            const selectedNum = c.values[0]
                                            if (selectedNum == "cancel") {
                                                cancel()
                                                return collector2.stop()
                                            } else {
                                                if (historyData.estrutura[selectedClass] == selectedNum) {
                                                    deferFlag(text["equalCost.title"], text["equalCost.desc"])
                                                } else {

                                                    let balance = historyData.cost
                                                    let holder = null
                                                    let num = selectedNum
                                                    const option = historyData.estrutura[selectedClass]
                                                    const sum = Object.values(historyData.estrutura).reduce((acc, value) => acc + value, 0);

                                                    if (num == "02") {
                                                        if (option > 0 - 2) {
                                                            holder = balance + 2
                                                            console.log(holder)
                                                            attributesCalc(interaction, selectedClass, selectedNum, holder)
                                                        } else {
                                                            deferFlag('Damnit', `${holder}`)
                                                        }

                                                    } else if (num == "01") { }
                                                }



                                            }

                                        })
                                    }

                                }
                            })
                        }
                    }
                })

            }
        }

        // 🔢: Funções 

        async function attributesCalc(id, attribute, info, balance) {
           
            let refValue = {
                hp: historyData.vida,
                ma: historyData.mana
            }
            let health = refValue.hp
            let maPoint = refValue.ma
            if (historyData.level == 6) {
                health = refValue.hp + 80
                maPoint = refValue.ma + 50
            } else if (historyData.level == 15) {
                health = refValue.hp + 95
                maPoint = refValue.ma + 300
            } else if (historyData.level == 20) {
                health = refValue.hp + 95 + 30
                maPoint = refValue.ma + 300 + 500
            }
            const updateQuery = {
                $set: {}
            };
            updateQuery.$set[attribute] = info;
            console.log(info)
            console.log('MANA', maPoint + historyData.estrutura.espirito * 10)

            const mainUpdate = await fileModel.findOneAndUpdate(
                { discordID: id },
                updateQuery,
                { new: true })

            setTimeout(async () => {
                try {
                    const data = historyData
                    let calc = 1 + data.estrutura.força + Math.ceil(data.estrutura.espirito / 2)
                    console.log('CALC:', calc)

                    const updatedData = await fileModel.findOneAndUpdate(
                        { discordID: id },
                        {
                            $set: {
                                vida: health + data.estrutura.força * 10,
                                mana: maPoint + data.estrutura.espirito * 10,
                                DEF: Math.ceil((data.estrutura.força * 5) + (data.estrutura.espirito * 5 / 2) + 2 + data.attributes.FOR.brutalidade),
                                DES: Math.ceil(data.estrutura.agilidade * 5 + data.attributes.SAB.percepcao),
                                cost: balance

                            },
                            dano: {
                                danoTotal: calc,
                                dano: `${calc}d10`
                            }
                        },
                        { new: true }
                    );

                    setTimeout(async () => {
                        saveReply(interaction)
                        deferFlag('Sucesso [TESTE]', `Sucesso porra`)
                        setTimeout(async () => {
                            saveReply(interaction)
                        }, 1500)
                    }, 750)

                } catch (error) {
                    console.error(error);
                    throw error;
                }

    
                
            }, 750)

        }

        async function cancel() {
            let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setTitle(`${text["genericCancel.title"]}`)
                .setDescription(`${text["buttonCancel.desc"]}`)
                .setColor("Red");
            await interaction.editReply({ embeds: [embed], components: [], ephemeral: true });
        }

        async function Flag(title, desc) {
            let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setTitle(`${title}`)
                .setDescription(`${desc}`)
                .setColor("Red")
            interaction.reply({ embeds: [embed], ephemeral: true })
            return;
        }

        async function noMatch(title, desc) {
            let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setTitle(`📛: Você não pode `)
                .setDescription(`${desc}`)
                .setColor("Orange")
            interaction.reply({ embeds: [embed], ephemeral: true })
            return;
        }

        async function deferFlag(title, desc, img) {
            if (title == text["emptyMenu.title"]) {
                let embed = new Discord.EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setTitle(`${title}`)
                    .setDescription(`${desc}`)
                    .setColor("Red")
                    .setImage(img)
                interaction.editReply({ embeds: [embed], components: [], ephemeral: true })
            } else {
                let embed = new Discord.EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setTitle(`${title}`)
                    .setDescription(`${desc}`)
                    .setColor("Red")
                interaction.editReply({ embeds: [embed], components: [], ephemeral: true })
            }
            return;
        }

        async function Log(title, desc) {
            const logMessage = client.channels.cache.find(channel => channel.id === '1173716807274737734')
            let embed1 = new Discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setTitle(`${title}`)
                .setDescription(`${desc} / ${interaction.user}]`)
                .setColor("Red")
                .setTimestamp();
            logMessage.send({ embeds: [embed1], ephemeral: true })
        }
    }
}