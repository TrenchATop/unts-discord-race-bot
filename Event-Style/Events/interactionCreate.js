module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		const command = client.commands.get(interaction.commandName) || client.commands.get(interaction.customId) || client.commands.find(cmd => interaction.customId.includes(cmd.data.name));

		if (!command) return;

		try {
			await command.execute(interaction, client);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};
