const { embed_builder: { start_race } } = require('../Utils/embed-builder');

module.exports = {
	data: {
		name: 'signup_button',
	},
	async execute(interaction, client) {
		try {
			if (client[interaction.customId.split('_')[2]][interaction.customId]) {
				await interaction.reply({ content: 'This button is already in use.\nPlease be patient for your turn\nI bet your dog is more patient than you', ephemeral: true });
			}
			else if (client[interaction.customId.split('_')[2]].participating_users.includes(interaction.user.id) && client[interaction.customId.split('_')[2]].limit_users) {
				await interaction.reply({ content: 'You have already entered the race!', ephemeral: true });
			}
			else {
				client[interaction.customId.split('_')[2]][interaction.customId] = true;
				await interaction.showModal(start_race.modal(interaction.customId.replace('button', 'modal')));
				console.log(`[Show Modal] ${interaction.user.username} Showing modal`);
				setTimeout(() => {
					client[interaction.customId.split('_')[2]][interaction.customId] = false;
				}, 30000);
			}
		}
		catch (err) {
			console.error(err);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });

		}
	},
};