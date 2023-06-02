const Discord = require("discord.js")
const config = require("../../config.json");
const { user } = require("../..");


module.exports = {
  name: "removerole", // Coloque o nome do comando
  description: "Remova um cargo", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  options: [

    {
      name: "user",
      description: "Defina um usuário para receber um cargo.",
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },

    {
      name: "role",
      description: "Defina o cargo a ser removido. Caso esteja vazio, o BOT removerá todos.",
      type: Discord.ApplicationCommandOptionType.Role,
      required: false,
    },



  ],



  run: async (client, interaction,) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageRoles)) {
      interaction.reply({ content: `❎: Parece que você não pode usar esse comando, tem certeza que digitou corretamete?`, ephemeral: true })
    } else {
      const user_add = interaction.options.getUser("user");
      const role_add = interaction.options.getRole("role");




      try {

        const member = await interaction.guild.members.fetch(user_add);

        if ( interaction.options.getRole("role") === null){
            await member.roles.remove(member.roles.cache);

            interaction.reply({ content: `✅ **Todos os cargos** foram removidos de ${user_add.username}!`, ephemeral: true });
            const fire = interaction.guild.roles.cache.get('1107733741650063370')
            await member.roles.add(fire.id)

        } else if (member.roles.cache.get(role_add.id)) {

          await member.roles.remove(role_add);
    

          interaction.reply({ content: `✅ Cargo ${role_add.name} removido de ${user_add.username}!`, ephemeral: true });

        } else if (!member.roles.cache.get(role_add.id)) {

          interaction.reply({ content: `❓: Parece que o cargo ${role_add.name} não pertence a ${user_add.username}!`, ephemeral: true });
        }
      } catch (e) {
        console.log(e);
        interaction.reply({ content: "❌: Ocorreu um erro ao remover o cargo do usuário", ephemeral: true });
      }
    }
  }
}