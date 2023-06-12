require("dotenv").config();

const {
  Client,
  IntentsBitField,
  AttachmentBuilder,
  Events,
  EmbedBuilder,
} = require("discord.js");
const textToImage = require("./utils/textToImage");
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

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.user.bot) return;
  
  try {
    interaction.reply("Processing...");
    const res = await textToImage(interaction.options._hoistedOptions[0].value);

    const embeds = res.map(item=>{
      return new EmbedBuilder().setImage(item).setURL("https://google.com")
    })
    await interaction.editReply({content:interaction.options._hoistedOptions[0].value, embeds: [...embeds] });
  } catch (err) {
    console.log(err);
  }
});

client.on(Events.MessageCreate, (message) => {
  if (message.author.bot) return;
  const exampleEmbed = new EmbedBuilder()
    .setTitle("Enjoy your Life")
    .setURL("https://google.com")
    .setColor("Random")
    .setDescription(message.content);
  const embed1 = new EmbedBuilder()
    .setTitle("Embed1")
    .setImage("https://i.ibb.co/zV0KSYq/free-photo-of-city-road-man-love.jpg")
    .setURL("https://google.com");
  const embed2 = new EmbedBuilder()
    .setTitle("Embed2")
    .setImage("https://i.ibb.co/8sjQqT0/8.png")
    .setURL("https://google.com");

  message.channel.send({ embeds: [exampleEmbed, embed1, embed2] });
});

client.login(TOKEN);
