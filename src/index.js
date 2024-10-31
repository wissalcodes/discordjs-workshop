const { Client, IntentsBitField } = require("discord.js");
require("dotenv").config();
// create an instance of the bot to interact with the discord API
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.username} is online`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction.commandName);
  if (interaction.commandName == "hey") {
    interaction.reply("Heyyy!");
  }
  if (interaction.commandName == "ping") {
    interaction.reply("pong");
  }
  if (interaction.commandName == "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;
    interaction.reply(`The sum is ${num1 + num2}`);
  }
  if (interaction.commandName == "choose") {
    const choice = interaction.options.get("choice").value;
    console.log(choice);
  }
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) {
    return;
  }
  console.log(msg.content);
  msg.reply("Hey there...");
});
client.login(process.env.TOKEN);
