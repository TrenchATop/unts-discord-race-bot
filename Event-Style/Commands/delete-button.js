module.exports = {
	data: {
		name: 'delete_button',
	},
	async execute(interaction, client) {
		await interaction.deferReply({ ephemeral: true });
		try {
			const embed_race_organiser_id = interaction.customId.split('_')[2];
			if (interaction.user.id !== embed_race_organiser_id) {
				console.log(`[Delete] ${interaction.user.username} Did not create the race`);
				await interaction.editReply({ content: `You did not create this race\nRace was started by <@${embed_race_organiser_id}>` });
				return;
			}
			await interaction.message.delete();
			console.log(`[Delete] ${interaction.user.username} Deleted their race`);
			client[interaction.user.id] = false;
			await interaction.editReply({ content: 'Successfully deleted race' });
		}
		catch (err) {
			console.error(err);
			await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};