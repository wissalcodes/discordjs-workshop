// run this file everytime a new command is added to the bot
require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
const commands = [
  {
    name: "hey",
    description: "Replies with hey!",
  },
  {
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
  },
  {
    name: "ping",
    description: "Returns pong.",
  },
  {
    name: "choose",
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
            name: "Cooking",
            value: "cooking",
          },
        ],
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commands... ");
    await rest.put(
      Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
      {
        body: commands,
      }
    );
    console.log("added slash commands");
  } catch (error) {
    console.log(error);
  }
})();
