const Discord = require("discord.js")
const config = require("../../config.json");
const { user } = require("../..");


module.exports = {
  name: "addrole", // Coloque o nome do comando
  description: "Dê um cargo", // Coloque a descrição do comando
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
      description: "Defina o cargo do usuário",
      type: Discord.ApplicationCommandOptionType.Role,
      required: true,
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
        if (!member.roles.cache.get(role_add.id)) {
          await member.roles.add(role_add);

          interaction.reply({ content: `✅ Cargo ${role_add.name} adicionado para ${user_add.username}!`, ephemeral: true });

        } else if (member.roles.cache.get(role_add.id)) {

          interaction.reply({ content: `❓: Parece que o cargo ${role_add.name} já pertence a ${user_add.username}!`, ephemeral: true });
        }
      } catch (e) {
        console.log(e);
        interaction.reply({ content: "❌: Ocorreu um erro ao adicionar o cargo ao usuário", ephemeral: true });
      }
    }
  }
}