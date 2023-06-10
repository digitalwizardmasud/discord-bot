require("dotenv").config();
const axios = require("axios");
const { Client, IntentsBitField, AttachmentBuilder } = require("discord.js");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
const TOKEN = process.env.DISCORD_BOT_TOKEN;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;

  // const attachment = new AttachmentBuilder(result.data.output[0], {
  //   name: "image.png",
  // });
  // msg.channel.send({ files: [attachment] });
});

client.on("interactionCreate",  interaction=>{
  if(!interaction.isChatInputCommand()) return
  console.log(interaction.commandName);
  console.log(interaction.options._hoistedOptions[0].value, 'prompt of command');
  interaction.reply("Working for it")
})

client.login(TOKEN);
