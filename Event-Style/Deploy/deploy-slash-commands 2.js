const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { guild_id, bot_id, bot_token } = require('../config.json');

const commands = [];
const commandFiles = fs.readdirSync('../Commands').filter((file) => file.endsWith('.js'));

// for (const file of commandFiles) {
// 	const command = require(`../Commands/${file}`);
// 	commands.push(command.data.toJSON());
// }
const command = require('../Commands/start-race.js');
commands.push(command.data.toJSON());
const second_command = require('../Commands/check-stats.js');
commands.push(second_command.data.toJSON());
const rest = new REST({ version: '10' }).setToken(bot_token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(bot_id, guild_id),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	}
	catch (error) {
		console.error(error);
	}
})();
