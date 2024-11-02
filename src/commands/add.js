const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
  name: "add",
  description: "adds 2 numbers.",
  options: [
    {
      name: "first-number",
      description: "The first number",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "second-number",
      description: "The second number",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  async execute(interaction) {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;
    await interaction.reply(`The sum is ${num1 + num2}`);
  },
};
