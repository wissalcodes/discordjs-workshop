require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { REST, Routes } = require("discord.js");

const commands = []; // Initialize the commands array

// Retrieve the commands from the "commands" folder
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

// Load each command file
for (const file of commandFiles) {
  // Use "for...of" to iterate over files
  const filePath = path.join(commandsPath, file); // Get the command file path
  const command = require(filePath); // Import the command from the file
  commands.push({
    name: command.name,
    description: command.description,
    options: command.options || [],
  });
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
      {
        body: commands,
      }
    );
    console.log("Slash commands registered successfully");
  } catch (error) {
    console.error("Error registering commands:", error);
  }
})();
