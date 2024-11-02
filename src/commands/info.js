const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "info",
  description: "Get information about the server or a user in the server.",
  options: [
    {
      name: "user",
      description: "Select a user to get their information",
      type: ApplicationCommandOptionType.User,
      required: false,
    },
    {
      name: "server",
      description: "Get information about the server",
      type: ApplicationCommandOptionType.Boolean,
      required: false,
    },
  ],
  async execute(interaction) {
    try {
      const user = interaction.options.getUser("user");
      const serverInfo = interaction.options.getBoolean("server");

      if (user) {
        await interaction.reply(
          `User info:\nUsername: ${user.username}\nID: ${user.id}`
        );
      } else if (serverInfo) {
        const { name, memberCount } = interaction.guild;
        await interaction.reply(
          `Server info: \nServer name: ${name}\nMember count: ${memberCount}`
        );
      } else {
        await interaction.reply(
          "Please specify either a user or choose to get server information."
        );
      }
    } catch (error) {
      console.error("Error executing info command:", error);
      await interaction.reply({
        content: "There was an error executing the command.",
        ephemeral: true,
      });
    }
  },
};
