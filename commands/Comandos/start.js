const Discord = require("discord.js")
const config = require("../../config.json");

module.exports = {
  name: 'registrar', // Coloque o nome do comando
  description: 'Registre-se no servidor.', // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const fire = interaction.guild.roles.cache.get('1107733741650063370')


    if (fire) { 
        let embed_1 = new Discord.EmbedBuilder()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`Você não pode se registrar enquanto possui a tag "${fire.name}"`)
        .setColor(config.color)
        .setTitle(`😿 || Não posso te ajudar...`)
    
        interaction.channel.send({ embeds: [embed_1], components: [], ephemeral: true })
    }else{
    const roles = {
        registrado: interaction.guild.roles.cache.get('1105591295398920192'), 
        cargo: {
            programador: interaction.guild.roles.cache.get('1105588272127815792'), 
            modelador: interaction.guild.roles.cache.get('1105588315484332032'),
            teamleader: interaction.guild.roles.cache.get('1106661114223268063')
        },
        estilo: {
            presencial: interaction.guild.roles.cache.get('1105588362598944819'), 
            remoto: interaction.guild.roles.cache.get('1105588404365832213'), 
            hibrido: interaction.guild.roles.cache.get('1105588767118602335') 
        }
    }

    const canal = {
        logs: interaction.guild.channels.cache.get('1104116860678586410'), 
    }

    if (interaction.member.roles.cache.get(roles.registrado.id)) return interaction.reply({ ephemeral: true, embeds: [
        new Discord.EmbedBuilder()
        .setColor('Red')
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`Você já está registrado!`)
    ] })

    const embedOne = new Discord.EmbedBuilder()
    .setColor('White')
    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
    .setDescription(`Clique no botão abaixo para começar seu registro!`)

    const button = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
        .setCustomId('iniciarRegistro' + interaction.id)
        .setEmoji('✅')
        .setLabel('Iniciar!')
        .setStyle(Discord.ButtonStyle.Primary)
    )

    interaction.reply({ ephemeral: true, embeds: [embedOne], components: [button] }).then( () => {
        const filter = (i) => i.customId === 'iniciarRegistro' + interaction.id
        interaction.channel.createMessageComponentCollector({ max: 1, filter: filter })
        .on('collect', (c) => {
            c.deferUpdate()
            const embedIdade = new Discord.EmbedBuilder()
            .setColor('White')
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setDescription(`**Selecione seu cargo!**\n\n*Opções selecionadas: -*`)

            const idadeButton = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                .setCustomId('Programador' + interaction.id)
                .setEmoji('🤖')
                .setLabel('Programador')
                .setStyle(Discord.ButtonStyle.Primary),

                new Discord.ButtonBuilder()
                .setCustomId('Modelador' + interaction.id)
                .setEmoji('🧊')
                .setLabel('Modelador')
                .setStyle(Discord.ButtonStyle.Primary),
                
                new Discord.ButtonBuilder()
                .setCustomId('Time' + interaction.id)
                .setEmoji('🌍')
                .setLabel('Team Leader')
                .setStyle(Discord.ButtonStyle.Primary)
                
            )

            let cargoSelecionado

            interaction.editReply({ ephemeral: true, embeds: [embedIdade], components: [idadeButton] }).then( () => {
                const filter = (i) => i.customId === 'Programador' + interaction.id || i.customId === 'Modelador' + interaction.id || 
                 i.customId === 'Time' + interaction.id
                 interaction.channel.createMessageComponentCollector({ max: 1, filter: filter })
                .on('collect', (c) => {
                    c.deferUpdate()

                    if (c.customId === 'Programador' + interaction.id) {
                        cargoSelecionado = roles.cargo.programador
                    } else if (c.customId === 'Modelador' + interaction.id) {
                        cargoSelecionado = roles.cargo.modelador
                    } else if (c.customId === 'Time' + interaction.id) {
                        cargoSelecionado = roles.cargo.teamleader
               
                    }

                    const embedGenero = new Discord.EmbedBuilder()
                    .setColor('White')
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription(`**Selecione uma modalidade:**\n\n*Opções selecionadas: ${cargoSelecionado}*`)

                    const generoButton = new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                    .setCustomId('Presencial' + interaction.id)
                    .setEmoji('👔')
                    .setLabel('Presencial')
                    .setStyle(Discord.ButtonStyle.Primary),

                    new Discord.ButtonBuilder()
                    .setCustomId('Remoto' + interaction.id)
                    .setEmoji('🏡')
                    .setLabel('Remoto')
                    .setStyle(Discord.ButtonStyle.Primary),

                    new Discord.ButtonBuilder()
                    .setCustomId('Hibrido' + interaction.id)
                    .setEmoji('🎡')
                    .setLabel('Hibrido')
                    .setStyle(Discord.ButtonStyle.Primary)
                    )

                    let modeloSelecionado

                    interaction.editReply({ ephemeral: true, embeds: [embedGenero], components: [generoButton] }).then( () => {
                        const filter = (i) => i.customId === 'Presencial' + interaction.id || i.customId === 'Presencial' + interaction.id || i.customId === 'Hibrido' + interaction.id 
                        interaction.channel.createMessageComponentCollector({ max: 1, filter: filter })
                        .on('collect', (c) => {
                            c.deferUpdate()
                            if (c.customId === 'Presencial' + interaction.id) {
                                modeloSelecionado = roles.estilo.presencial
                            } else if (c.customId === 'Remoto' + interaction.id) {
                                modeloSelecionado = roles.estilo.remoto
                            } else if (c.customId === 'Hibrido' + interaction.id) {
                                modeloSelecionado = roles.estilo.hibrido
                            }

                            const embedConcluirRegistro = new Discord.EmbedBuilder()
                            .setColor('White')
                            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                            .setDescription(`**Confira as opções selecionadas e prossiga com seu registro!**\n\n*Opções selecionadas: ${cargoSelecionado} e ${modeloSelecionado}.*`)

                            const concluirRegistroButton = new Discord.ActionRowBuilder().addComponents(
                                new Discord.ButtonBuilder()
                                .setCustomId('sim' + interaction.id)
                                .setEmoji('✅')
                                .setStyle(Discord.ButtonStyle.Primary),
            
                                new Discord.ButtonBuilder()
                                .setCustomId('nao' + interaction.id)
                                .setEmoji('❌')
                                .setStyle(Discord.ButtonStyle.Primary),
                            )

                            interaction.editReply({ ephemeral: true, embeds: [embedConcluirRegistro], components: [concluirRegistroButton] }).then( () => {
                                const filter = (i) => i.customId === 'sim' + interaction.id || i.customId === 'nao' + interaction.id
                                interaction.channel.createMessageComponentCollector({ max: 1, filter: filter })
                                .on('collect', (c) => {
                                    c.deferUpdate()

                                    if (c.customId === 'sim' + interaction.id) {
                                        const embedSim = new Discord.EmbedBuilder()
                                        .setColor('White')
                                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                                        .setDescription(`**Seu registro foi concluído!**\n\n*Cargos recebidos: \`${cargoSelecionado.name}\`, \`${modeloSelecionado.name}\` e \`${roles.registrado.name}\`.*`)

                                        interaction.editReply({ ephemeral: true, embeds: [embedSim], components: [] })                                        

                                        interaction.member.roles.add(cargoSelecionado.id)
                                        interaction.member.roles.add(modeloSelecionado.id)
                                        interaction.member.roles.add(roles.registrado.id)

                                        const embedLog = new Discord.EmbedBuilder()
                                        .setColor('White')
                                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                                        .setDescription(`**Usuário registrado:** ${interaction.user} (${interaction.user.id}).\n**Cargos Recebidos:** \`${cargoSelecionado.name}\`, \`${modeloSelecionado.name}\` e \`${roles.registrado.name}\`.`)

                                        canal.logs.send({ embeds: [embedLog] })

                                    } else if (c.customId === 'nao' + interaction.id) {
                                        const embedNao = new Discord.EmbedBuilder()
                                        .setColor('White')
                                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                                        .setDescription(`**Seu registro foi cancelado!**`)

                                        interaction.editReply({ ephemeral: true, embeds: [embedNao], components: [] })
                                    }
                                })
                            })
                        })
                    })
                })
            })
        })
    })
  }
}
}