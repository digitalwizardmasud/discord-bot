require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [{
    name:'imagine',
    description:'Generate a image with your imagination',
	options: [
        {
            type: ApplicationCommandOptionType.String,
            name: "prompt",
            description: "Your imagination",
            required: true
        }
    ]
}];
const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.DISCORD_BOT_ID, process.env.DISCORD_SERVER_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();