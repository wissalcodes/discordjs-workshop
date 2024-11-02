const { ApplicationCommandOptionType } = require("discord.js");
const { execute } = require("./hey");
const fs = require("fs");
const path = require("path");
module.exports = {
  name: "add-points",
  description: "Adds points to a user.",
  options: [
    {
      name: "user",
      description: "User to add the points to.",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "points",
      description: "Points to add tto the user.",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const pointsToAdd = interaction.options.getInteger("points");
    console.log(user, pointsToAdd);
    const filePath = path.join(__dirname, "../data/points.json");
    let data;
    try {
      data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
      console.error(`There was an issue reading from file ${filePath}`);
      interaction.reply("There was an error accessing data");
      return;
    }
    if (!data.users[user.id]) {
      data.users[user.id] = { points: 0 };
    }
    data.users[user.id].points += pointsToAdd;
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error writing points data: ", error);
      await interaction.reply("Error updating the points");
      return;
    }

    await interaction.reply(`${pointsToAdd} were added to the user ${user.id}`);
  },
};
