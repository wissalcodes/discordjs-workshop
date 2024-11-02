module.exports = {
  name: "hey",
  description: "Replies with hey!",
  async execute(interaction) {
    await interaction.reply("Hey from SEC Bot!");
  },
};
