const Discord = require("discord.js")
const config = require("../../config.json");
const { user } = require("../..");
const file = require('../../src/schemas/files')
const moongose = require('mongoose')
const classes = require("../../src/schemas/classes")
const battleM = require("../../src/schemas/battle")
const battleFile = require("../../src/schemas/bfile")
const { exec } = require('child_process');
const battle = require("../../src/schemas/battle")
const storage = require("../../src/schemas/storage")
const xpModel = require('../../src/schemas/xp');
const menuModel = require('../../src/schemas/menu');
const mapAbbreviationToAttribute = require('../../src/schemas/skill');
const { error } = require("console");


module.exports = {
    name: "idityt", // Coloque o nome do comando
    description: "Edita sua ficha de Hazen", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,


    run: async (client, interaction,) => {
        const store = await storage.findOne({ playerID: interaction.user.id })
        const historyData = await file.findOne({ discordID: interaction.user.id })
        
        const trigger = await battleM.findOne({ id: 1 })
        const classesModel = await classes.find()
        let id = null
        let info = null
        let num = null
        if (id) {
            const lowercaseId = id.toLowerCase();
        }

        let verifier = await file.findOne({ discordID: interaction.user.id })



        if (!verifier) {
            let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setTitle("🔒: Você não possui ficha.")
                .setDescription(`⚔️: Parece que algo deu errado por aqui, você tem certeza que possui uma ficha?`)
                .setColor("Red")
            interaction.reply({ embeds: [embed], ephemeral: true })
            return;
        }
        if (trigger.battleMode == true) {
            let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setTitle("🔒: Modo de campanha ativo.")
                .setDescription(`⚔️: As fichas não podem ser editadas durante o modo campanha, se deseja modificar o status do seu personagem utilize **/set**.`)
                .setColor("Red")
            interaction.reply({ embeds: [embed], ephemeral: true })
            return;
        } else {
            const editMenu = await menuModel.find({ id: 'editMenu' })
            if (editMenu.length === 0) {
                let desc = 'Não fui capaz de encontrar nenhuma opção para o menu.'
                redFlag(desc)
                return;
            }

            const initialOptions = editMenu.map((cls) => ({
                label: cls.name,
                value: cls.value,
                description: cls.desc,
                emoji: cls.symbol
            }));


            const selectMenu = new Discord.StringSelectMenuBuilder()
                .setCustomId('editMenu')
                .setPlaceholder('Escolha aqui...')
                .addOptions(initialOptions);

            const row = new Discord.ActionRowBuilder()
                .addComponents(selectMenu);
            let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setTitle("🖌️: Editor de ficha")
                .setDescription(`Por favor, selecione o que deseja aqui.`)
                .setColor("Yellow")
            // Send the message with the buttons
            //interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
//
           // const collector = interaction.channel.createMessageComponentCollector({
              //  filter: i => i.customId === 'editMenu',
              //  time: 100000, // Time in milliseconds to collect interactions
           // });
           // return;
               

                  

                        if (config.desc) {



                            info = config.desc

                            console.log(info)
                            const updateQuery = {
                                $set: {}
                            };
                            historyKeeper = historyData.desc
                            setter = 'desc'

                            updateQuery.$set[setter] = info;
                            console.log(historyKeeper)
                            const updatedData = await file.findOneAndUpdate(
                                { discordID: interaction.user.id },
                                updateQuery,
                                { new: true }
                            );
                            let returner = `${id.toUpperCase()}: ${info}`
                            return updatedData, Updater(interaction.user.id, returner, historyKeeper);

                        }
                    
            return;
            let controller = null


            let historyKeeper = ''


            const mappings = {
                ESP: ["vont", "conj", "intim", "pres"],
                SAB: ["perc", "sobr", "loc", "crim"],
                INT: ["intu", "diplom", "atual"],
                AGI: ["atl", "acro", "furt", "refl", "per"],
                FOR: ["vig", "brut", "fort"],
            };

            let identifier;
            const hasAbbreviation = Object.values(mappings)
                .flat()
                .some((abbreviation) => lowercaseId.includes(abbreviation));

            if (hasAbbreviation) {
                for (const category in mappings) {
                    if (mappings[category].includes(id)) {
                        identifier = mapAbbreviationToAttribute(lowercaseId, category);
                        break;
                    }
                }
                if (num == null) {
                    desc = "Para editar uma perícia é necessário inserir um número."
                    redFlag(desc)
                    return;
                } else {
                    let setter = `attributes.${identifier}`

                    const updateQuery = {
                        $set: {}
                    };

                    updateQuery.$set[setter] = num;
                    const updatedData = await file.findOneAndUpdate(
                        { discordID: interaction.user.id },
                        updateQuery,
                        { new: true }
                    );
                    let returner = `${id.toUpperCase()}: ${num}`
                    historyKeeper = historyData.attributes

                    return updatedData, Updater(interaction.user.id, returner, historyKeeper);

                }

            } else if (lowercaseId == 'atri') {

                let setter = ''


                const updateQuery = {
                    $set: {}
                };





                try {
                    const options = [
                        { label: 'Agilidade', emoji: '🌬️', value: 'agilidade' },
                        { label: 'Força', emoji: '💪', value: 'força' },
                        { label: 'Espirito', emoji: '💫', value: 'espirito' },
                        { label: 'Inteligencia', emoji: '🧠', value: 'inteligencia' },
                        { label: 'Sabedoria', emoji: '🪵', value: 'sabedoria' },
                        { label: 'Cancelar', emoji: '❌', value: 'x' },
                    ];

                    const selectMenu = new Discord.StringSelectMenuBuilder()
                        .setCustomId('classe')
                        .setPlaceholder('Escolha aqui...')
                        .addOptions(options);

                    const row = new Discord.ActionRowBuilder().addComponents(selectMenu);

                    let embed = new Discord.EmbedBuilder()
                        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                        .setTitle("🔢: Selecionando atributos")
                        .setDescription(`Por favor, selecione o atributo a ser alterado`)
                        .setColor("Green");

                    // Send the message with the buttons
                    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });

                    const collector = interaction.channel.createMessageComponentCollector({
                        filter: i => i.customId === 'classe',
                        time: 90000, // Time in milliseconds to collect interactions
                    });

                    collector.on('collect', async (c) => {
                        await c.deferUpdate();

                        const selectedValue = c.values[0];
                        if (selectedValue != null) {
                            // Convert the selected value to lowercase
                            const lowercaseValue = selectedValue.toLowerCase();
                            if (selectedValue == 'x') {
                                let embed = new Discord.EmbedBuilder()
                                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                    .setTitle("❌: Operação cancelada.")
                                    .setDescription(`O comando foi cancelado e nenhuma alteração foi salva.`)
                                    .setColor("Red");

                                // Send the message with the buttons
                                await interaction.editReply({ embeds: [embed], components: [], ephemeral: true });
                                return collector.stop();

                            }
                            setter = `estrutura.${lowercaseValue}`
                            historyKeeper = historyData.estrutura[lowercaseValue]
                            // Now you can do something with the lowercase value
                            console.log('Lowercase Value:', lowercaseValue);

                            // Call the classFinder function with the lowercase value
                            const followUpOptions = [
                                { label: 'Um', emoji: '1️⃣', value: '1' },
                                { label: 'Dois', emoji: '2️⃣', value: '2' },
                                { label: 'Três', emoji: '3️⃣', value: '3' },
                                { label: 'Quatro', emoji: '4️⃣', value: '4' },
                                { label: 'Cinco', emoji: '5️⃣', value: '5' },
                                { label: 'Seis', emoji: '6️⃣', value: '6' },
                                { label: 'Cancelar', emoji: '❌', value: 'x' },
                            ];

                            const followUpSelectMenu = new Discord.StringSelectMenuBuilder()
                                .setCustomId('followup')
                                .setPlaceholder('Escolha aqui...')
                                .addOptions(followUpOptions);

                            const followUpRow = new Discord.ActionRowBuilder().addComponents(followUpSelectMenu);

                            let followUpEmbed = new Discord.EmbedBuilder()
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setTitle("🔢: Selecionando atributos")
                                .setDescription(`Você escolheu ${selectedValue}. Agora, escolha uma opção de 1 a 6.`)
                                .setColor("Blue");

                            await interaction.editReply({ embeds: [followUpEmbed], components: [followUpRow] });
                            const followUpCollector = interaction.channel.createMessageComponentCollector({
                                filter: i => i.customId === 'followup',
                                time: 90000, // Time in milliseconds to collect interactions
                            });
                            let collected = null
                            followUpCollector.on('collect', async (c) => {
                                await c.deferUpdate();
                                const selNum = c.values[0]
                                collected = selNum
                                updateQuery.$set[setter] = collected;

                                if (collected == 'x') {
                                    let embed = new Discord.EmbedBuilder()
                                        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                        .setTitle("❌: Operação cancelada.")
                                        .setDescription(`O comando foi cancelado e nenhuma alteração foi salva.`)
                                        .setColor("Red");

                                    // Send the message with the buttons
                                    await interaction.editReply({ embeds: [embed], components: [], ephemeral: true });
                                    return collector.stop(), followUpCollector.stop();

                                }

                                const updatedData = await file.findOneAndUpdate(
                                    { discordID: interaction.user.id },
                                    updateQuery,
                                    { new: true }
                                );
                                let returner = `${id.toUpperCase()}: ${info}`
                                collector.stop();
                                followUpCollector.stop()
                                setTimeout(async () => {
                                    return updatedData, Updater(interaction.user.id, returner, historyKeeper);
                                }, 1500)


                            })



                        }
                    });

                    collector.on('end', (collected, reason) => {
                        if (reason === 'time') {
                            // Handle the case when the collector times out
                            console.log('Collector timed out.');
                        }
                    });

                } catch (error) {
                    console.error(error);
                    let desc = `Ocorreu um erro durante o processamento do comando..`;
                    // Assuming you have a function named redFlag for error handling
                    redFlag(desc);
                    return;
                }
            } else if (lowercaseId == "nome") {
                let setter = ''
                let caller = null

                const updateQuery = {
                    $set: {}
                };
                historyKeeper = historyData.nome
                setter = 'nome'

                updateQuery.$set[setter] = info;

                if (info == Number || num) {
                    let desc = `Não é possível inserir números no campo "Nome". Verifique se você preencheu corretamente os campos.`
                    redFlag(desc)
                    return;
                } else {


                    const updatedData = await file.findOneAndUpdate(
                        { discordID: interaction.user.id },
                        updateQuery,
                        { new: true }
                    );
                    let returner = `${id.toUpperCase()}: ${info}`
                    return updatedData, Updater(interaction.user.id, returner, historyKeeper);

                }
            } else if (lowercaseId == "desc") {
                let setter = ''
                let caller = null





                if (info || num || info && num) {
                    let desc = `Se você está tentando editar a descrição, você deve deixar os campos "info" e "num" vazios para obter sucesso.`
                    redFlag(desc)
                    return;
                } else {
                    const modal = new Discord.ModalBuilder()
                        .setCustomId("modal")
                        .setTitle("Formulário");

                    const pergunta1 = new Discord.TextInputBuilder()
                        .setCustomId("pergunta1") // Coloque o ID da pergunta
                        .setLabel("Insira a descrição aqui") // Coloque a pergunta
                        .setMaxLength(4000) // Máximo de caracteres para a resposta
                        .setMinLength(10) // Mínimo de caracteres para a respósta
                        .setPlaceholder("Era uma vez...") // Mensagem que fica antes de escrever a resposta
                        .setRequired(true) // Deixar para responder obrigatório (true | false)
                        .setStyle(Discord.TextInputStyle.Short); // Tipo de resposta (Short | Paragraph)

                    modal.addComponents(
                        new Discord.ActionRowBuilder().addComponents(pergunta1),
                    )

                    return await interaction.showModal(modal)

                    if (config.desc) {



                        info = config.desc

                        console.log(info)
                        const updateQuery = {
                            $set: {}
                        };
                        historyKeeper = historyData.desc
                        setter = 'desc'

                        updateQuery.$set[setter] = info;
                        console.log(historyKeeper)
                        const updatedData = await file.findOneAndUpdate(
                            { discordID: interaction.user.id },
                            updateQuery,
                            { new: true }
                        );
                        let returner = `${id.toUpperCase()}: ${info}`
                        return updatedData, Updater(interaction.user.id, returner, historyKeeper);

                    }
                }
            } else if (lowercaseId == "img") {
                if (num) {
                    let desc = `Não é possível inserir números no campo "Imagem". Verifique se você preencheu corretamente os campos.`
                    redFlag(desc)
                    return;
                }
                let isURL = false
                let url = ''
                try {
                    // Create a new URL object
                    url = new URL(info);
                    if (url) {
                        isURL = true
                    }
                    // Continue with the rest of the program
                } catch (error) {
                    if (error.code === 'ERR_INVALID_URL') {
                        // If there is an error, set the description of the red flag
                        let desc = `Insira uma URL válida para alterar sua imagem.`;
                        redFlag(desc);
                        return;
                    } else {
                        // If there is a different error, handle it appropriately
                        console.error(error);
                        return;
                    }
                }


                if (isURL) {
                    if (!url.pathname.match(/\.(jpg|jpeg|png|gif)$/i)) {
                        // If not, set the description of the red flag
                        let desc = `Insira uma URL válida para uma imagem (jpg, jpeg, png, gif).`;
                        redFlag(desc);
                        return;
                    }
                    let setter = ''

                    const updateQuery = {
                        $set: {}
                    };
                    historyKeeper = historyData.image
                    setter = 'image'

                    updateQuery.$set[setter] = info;

                    const updatedData = await file.findOneAndUpdate(
                        { discordID: interaction.user.id },
                        updateQuery,
                        { new: true }
                    );
                    let returner = `${id.toUpperCase()}: ${info}`
                    return updatedData, Updater(interaction.user.id, returner, historyKeeper);
                }
            } else if (lowercaseId == 'classe' || lowercaseId == 'classes') {
                try {
                    const classesModel = await classes.find();

                    if (classesModel.length === 0) {
                        message.reply('No classes found.');
                        return;
                    }



                    const options = classesModel.map((cls) => ({
                        label: cls.nome,
                        value: cls.ID, // Assuming 'nome' is the property you want to use as a value
                        description: cls.desc,
                    }));

                    const selectMenu = new Discord.StringSelectMenuBuilder()
                        .setCustomId('classe')
                        .setPlaceholder('Escolha aqui...')
                        .addOptions(options);

                    const row = new Discord.ActionRowBuilder()
                        .addComponents(selectMenu);
                    let embed = new Discord.EmbedBuilder()
                        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                        .setTitle("🧝‍♂️: Seleção de classes")
                        .setDescription(`Por favor, selecione a classe que deseja aqui.`)
                        .setColor("Green")
                    // Send the message with the buttons
                    interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
                } catch (error) {
                    console.error(error);
                    let desc = `Ocorreu um erro durante o processamento do comnando..`;
                    redFlag(desc);
                    return;
                }

                const collector = interaction.channel.createMessageComponentCollector()
                    .on('collect', async (c) => {
                        await c.deferUpdate();

                        const selectedValue = c.values[0];
                        if (selectedValue != null) {

                            classFinder(selectedValue)
                            collector.stop()
                        }
                    });

            } else {
                let desc = `O comando ${id} não é válido.`;
                redFlag(desc);
                return;
            }

            async function classFinder(id) {
                const classe = await classes.findOne({ ID: id })

                let setter = ''

                const updateQuery = {
                    $set: {}
                };
                historyKeeper = historyData.classe
                setter = 'classe'

                updateQuery.$set[setter] = classe.nome;


                const updatedData = await file.findOneAndUpdate(
                    { discordID: interaction.user.id },
                    updateQuery,
                    { new: true }
                );
                let returner = `${id.toUpperCase()}: ${classe.nome}`
                return updatedData, Updater(interaction.user.id, returner, historyKeeper, id);
            }

        }

async function errorLog(desc) {
    const logMessage = client.channels.cache.find(channel => channel.id === '1173716807274737734')
    let embed1 = new Discord.EmbedBuilder()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setTitle(`❌! [LOG] - ERROR`)
        .setDescription(`⚠️:**[ERROR]** ${desc} [Pego com */edit* || **USER**: ${interaction.user}]`)
        .setColor("Red")
        .setTimestamp();
    logMessage.send({ embeds: [embed1], ephemeral: true })
}

        async function Updater(obj1, obj2, obj3, obj4) {


            let classe = null

            let isFound = await file.findOne({ discordID: obj1 })
            if (lowercaseId == 'classe' || lowercaseId == 'classes') {
                classe = await classes.findOne({ ID: obj4 })
            } else {
                classe = await classes.findOne({ nome: `${isFound.classe}` })
            }
            let numberHP = classe.HP
            let numberMA = classe.MA
            const data = isFound
            let hpBase = numberHP
            let maBase = numberMA

            if (isFound.level == 6) {
                hpBase = numberHP + 80
                maBase = numberMA + 50
            } else if (isFound.level == 15) {
                hpBase = numberHP + 95
                maBase = numberMA + 300
            } else if (isFound.level == 20) {
                hpBase = numberHP + 95 + 30
                maBase = numberMA + 300 + 500
            }

            try {

                let calc = 1 + data.estrutura.força + Math.ceil(data.estrutura.espirito / 2)
                console.log('CALC:', calc)

                const updatedData = await file.findOneAndUpdate(
                    { discordID: obj1 },
                    {
                        $set: {
                            vida: hpBase + data.estrutura.força * 10,
                            mana: maBase + data.estrutura.espirito * 10,
                            DEF: Math.ceil((data.estrutura.força * 5) + (data.estrutura.espirito * 5 / 2) + 2 + data.attributes.FOR.brutalidade),
                            DES: Math.ceil(data.estrutura.agilidade * 5 + data.attributes.SAB.percepcao),

                        },
                        dano: {
                            danoTotal: calc,
                            dano: `${calc}d10`
                        }
                    },
                    { new: true }
                );

                return updatedData, await dialog(isFound, obj2, obj3);
            } catch (error) {
                console.error(error);
                throw error;
            }

        }
        async function dialog(findUser, messager, historic) {
            //healthBar()

            // console.log(healthDialog + 'HealthDialog //' + battleFiles.vida + 'SecData.vida')

            let finderData = findUser
            let counter = await xpModel.findOne({ level: findUser.level + 1 })
            let sessionData = finderData
            const channel = await interaction.client.channels.fetch(store.channelID);
            const message = await channel.messages.fetch(store.messageID);
            let reply = message.edit({
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
            await reply
            let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setTitle(`🆗: Ficha de ${sessionData.nome} editada com sucesso. `)
                .setDescription(`[Dados editados] ${messager}`)
                .setColor("Green")
            if (lowercaseId == "classes" || lowercaseId == "classe" || lowercaseId == "atri") {
                interaction.deleteReply()
                let msg = channel.send({ embeds: [embed], ephemeral: true }).then(msg => {
                    msg.delete({ timeout: 20000 })
                })



            } else {
                interaction.reply({ embeds: [embed], ephemeral: true })
            }
            refresher(findUser, messager, historic)
            log(findUser, historic)

            return;

        }

        async function refresher(findUser, messager, historic) {
            let finderData = findUser
            let counter = await xpModel.findOne({ level: findUser.level + 1 })
            let sessionData = finderData
            const channel = await interaction.client.channels.fetch(store.channelID);
            const message = await channel.messages.fetch(store.messageID);
            const changeMaker = await classes.findOne({ ID: "CRI" })
            let MAorPC = '[MA]🌌: Mana'
            if (sessionData.classe == changeMaker.nome) {
                MAorPC = '[PC]⚙️: P. de Criação'
            }
            let reply = message.edit({
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
        }
        async function log(findUser, historic) {
            const logMessage = client.channels.cache.find(channel => channel.id === '1173716807274737734')
            let finderData = findUser
            let sessionData = finderData
            let embed1 = new Discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setTitle(`[LOG] - /edit`)
                .setDescription(`**[LOG]: ** Ficha [${sessionData.nome}] editada por ${interaction.user.username} [${interaction.user.id}]: 
                \n id: ${id},
                \n info: ${info},
                \n num: ${num}
                \n ID Ficha: ${sessionData._id}
                \n [HISTORICO] ${id}: ${historic}`)
                .setColor("Yellow")
                .setTimestamp();
            logMessage.send({ embeds: [embed1], ephemeral: true })
        }
        async function redFlag(obj) {
            let embed = new Discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setTitle("🔒: Comando inválido.")
                .setDescription(`❌: ${obj}`)
                .setColor("Red")
            interaction.reply({ embeds: [embed], ephemeral: true })
            return;
        }
    }
}


