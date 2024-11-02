const { ApplicationCommandOptionType } = require("discord.js");
const fs = require("fs");
const path = require("path");

const activitiesPath = path.join(__dirname, "../data/activities.json");
const activitiesData = JSON.parse(fs.readFileSync(activitiesPath, "utf-8"));

module.exports = {
  name: "menu",
  description: "Multiple choice command",
  options: [
    {
      name: "activity",
      description: "Activity name",
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: "Gaming",
          value: "gaming",
        },
        {
          name: "Cooking",
          value: "cooking",
        },
        {
          name: "Reading",
          value: "reading",
        },
      ],
    },
  ],
  async execute(interaction) {
    const choice = interaction.options.getString("activity");
    console.log(choice);
    const activities = activitiesData.choices[choice];
    console.log(activities);
    const activitiesList = activities.join("\n- ");
    await interaction.reply(activitiesList);
  },
};
