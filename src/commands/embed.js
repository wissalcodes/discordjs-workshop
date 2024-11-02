const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  name: "embed",
  description: "Sends an embed.",
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setAuthor({ name: "SEC Team" })
      .setDescription("Embed description")
      .setColor(Colors.Blurple)
      .addFields(
        {
          name: "Field title",
          value: "Field value",
          inline: true,
        },
        {
          name: "2nd Field title",
          value: "2nd Field value",
          inline: true,
        }
      );

    await interaction.reply({
      embeds: [embed],
    });
  },
};
