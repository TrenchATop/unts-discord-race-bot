const { RunThroughRace } = require('../Race-Simulation/simulate');

module.exports = {
	data: {
		name: 'confirm_button',
	},
	async execute(interaction, client) {
		if (interaction.customId.split('_')[1] !== 'modal') {
			await interaction.deferReply({ ephemeral: true });
		}
		try {
			const embed_race_organiser_id = interaction.customId.split('_')[2];
			if (interaction.customId.split('_')[1] === 'modal' || client[embed_race_organiser_id]?.racing_players === client[embed_race_organiser_id]?.max_players) {
				console.log('Do nothing lol');
			}
			else if (interaction.user.id !== embed_race_organiser_id) {
				console.log(`[Start Race] ${interaction.user.username} Did not create the race`);
				await interaction.editReply({ content: `You did not create this race\nRace was started by <@${embed_race_organiser_id}>` });
				return;
			}
			await interaction.message.edit({ components: [] });
			console.log(`[Start Race] ${interaction.user.username} Started their race`);
			await interaction.editReply({ content: 'Race shall commence!' });
			RunThroughRace(interaction, client[embed_race_organiser_id].participating_dogs, client[embed_race_organiser_id].handicap_mode, client[embed_race_organiser_id].unique_race_id);
			client[embed_race_organiser_id] = false;
		}
		catch (err) {
			console.log(err, '\n');
			await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });

		}
	},
};