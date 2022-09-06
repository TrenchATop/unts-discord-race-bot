const { embed_builder: { start_race } } = require('../Utils/embed-builder');

module.exports = {
	data: {
		name: 'reset_button',
	},
	async execute(interaction, client) {
		await interaction.deferReply({ ephemeral: true });
		try {
			console.log(`[Reset] ${interaction.user.username} Tried to reset race`);
			const embed_race_organiser_id = interaction.customId.split('_')[2];
			const number_of_players = interaction.message.embeds[0].fields[1].value;
			if (interaction.user.id !== embed_race_organiser_id) {
				console.log(`[Reset] ${interaction.user.username} Did not create the race`);
				await interaction.editReply({ content: `You did not create this race\nRace was started by <@${embed_race_organiser_id}>` });
				return;
			}
			client[interaction.user.id] = {
				message_id: client[interaction.user.id].message_id,
				racing_players: 0,
				max_players: client[interaction.user.id],
				unique_race_id: client[interaction.user.id].unique_race_id,
				participating_dogs: [],
				participating_users: [],
				limit_users: client[interaction.user.id].limit_users,
				auto_start: client[interaction.user.id].auto_start,
				wager_text: client[interaction.user.id].wager_text,
				handicap_mode: client[interaction.user.id].handicap_mode,
				[`signup_button_${interaction.user.id}_1`]: false,
				[`signup_button_${interaction.user.id}_2`]: false,
				[`signup_button_${interaction.user.id}_3`]: false,
				[`signup_button_${interaction.user.id}_4`]: false,
				[`signup_button_${interaction.user.id}_5`]: false,
				[`signup_button_${interaction.user.id}_6`]: false,
			};

			console.log(`[Reset] ${interaction.user.username} Reset their race`);
			await interaction.message.edit({ embeds: [start_race.embed(`<@${embed_race_organiser_id}>`, number_of_players, client[interaction.user.id].limit_users, client[interaction.user.id].auto_start, client[interaction.user.id].handicap_mode, client[interaction.user.id].wager_text, client[interaction.user.id].unique_race_id)], components: [...start_race.buttons(number_of_players, embed_race_organiser_id)] });
			await interaction.editReply({ content: 'Successfully reset race' });
		}
		catch (err) {
			console.log(err);
			await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });

		}
	},
};