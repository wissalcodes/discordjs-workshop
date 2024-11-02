const { Client, IntentsBitField, Collection } = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

// create an instance of the bot to interact with the discord API
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
// initialise the client commands
client.commands = new Collection();

// load the commands into the client

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

// Load each command file
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file); // get the command file path
  const command = require(filePath); // import the command from the file

  // set the command to the client commands object
  if (command.name) {
    client.commands.set(command.name, command);
  } else {
    console.error(`The command at ${filePath} is missing!`);
  }
}

client.on("ready", (c) => {
  console.log(`${(c.user.username, c.user.id)} is online`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) {
    interaction.reply("Unknown command");
    return;
  }
  try {
    command.execute(interaction);
  } catch (error) {
    console.error(error);
    interaction.reply({ content: "There was an error executing the command." });
  }
});

client.on("messageCreate", (msg) => {
  console.log(msg.author.username);
});
client.login(process.env.TOKEN);
