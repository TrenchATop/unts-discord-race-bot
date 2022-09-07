const fs = require('node:fs');
const path = require('node:path');
const { bot_token } = require('./config.json');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({ partials: [Partials.Channel], intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences] });

client.UserInventoryCache = new Collection();

const eventsPath = path.join(__dirname, 'Events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'Commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Login to UNT BOT
client.login(bot_token)
	.then(() => console.log(`Ready! Logged in as ${client.user.tag}`))
	.catch((err) => console.log(`Error logging into client ${err.message}`));