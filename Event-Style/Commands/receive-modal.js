const { GetDogMetadata } = require('../Utils/blockfrost');
const { UpdateRaceEmbed } = require('../Utils/utils');
const { execute } = require('./start-button');

module.exports = {
	data: {
		name: 'signup_modal',
	},
	async execute(interaction, client) {
		await interaction.deferReply({ ephemeral: true });
		try {
			const button_num = interaction.customId.split('_')[3];
			const race_organiser_id = interaction.customId.split('_')[2];
			const user_nft_id = interaction.fields.getTextInputValue('user_nft_id');
			const dog_metadata = await GetDogMetadata(user_nft_id);
			if (!dog_metadata) {
				console.log(`[Receive Modal] ${interaction.user.username} Entered bad dog : ${user_nft_id}`);
				await interaction.editReply(`Not a valid dog\nDog ID: \`${user_nft_id}\``);
				client[race_organiser_id][`${interaction.customId.replace('modal', 'button')}`] = false;
				return;
			}
			if (client[race_organiser_id].participating_dogs?.find(existing_dog => dog_metadata.name === existing_dog.name)) {
				console.log(`[Receive Modal] ${interaction.user.username} Entered duplicate dog : ${dog_metadata.name}`);
				await interaction.editReply(`This do has already entered\nDog ID: \`${dog_metadata.name} | ${dog_metadata['asset ID']}\``);
				client[race_organiser_id][`${interaction.customId.replace('modal', 'button')}`] = false;
				return;
			}
			if (client[race_organiser_id]?.participating_dogs?.length >= client[race_organiser_id].max_players) {
				console.log(`[Receive Modal] ${interaction.user.username} Entered an extra dog, not sneaky`);
				await interaction.editReply('This race is already full sorry');
				client[race_organiser_id][`${interaction.customId.replace('modal', 'button')}`] = false;
				return;
			}
			dog_metadata.racer_id = interaction.user.id
			client[race_organiser_id].racing_players++;
			client[race_organiser_id].participating_dogs.push(dog_metadata);
			client[race_organiser_id].participating_users.push(interaction.user.id);
			await UpdateRaceEmbed(interaction.message, client[race_organiser_id].racing_players, interaction.user, dog_metadata.name, dog_metadata['asset ID'].replace('ChainsOnDogs', ''), button_num);
			console.log(`[Receive Modal] ${interaction.user.username} Entered race with dog : ${dog_metadata.name} | ${dog_metadata['asset ID']}`);
			await interaction.editReply(`You entered \`${dog_metadata.name} [${dog_metadata['asset ID'].replace('ChainsOnDogs', '')}]\``);
			if (client[race_organiser_id]?.racing_players === client[race_organiser_id]?.max_players && client[race_organiser_id]?.auto_start) {
				await execute(interaction, client);
			}
		}
		catch (err) {
			console.error(err);
			await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });

		}
	},
};