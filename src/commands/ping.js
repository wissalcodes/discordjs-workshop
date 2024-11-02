module.exports = {
  name: "ping",
  description: "Returns pong.",
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
