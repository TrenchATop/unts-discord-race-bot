const { SlashCommandBuilder } = require('discord.js');
const { GetDogMetadata } = require('../Utils/blockfrost');
const { embed_builder } = require('../Utils/embed-builder');
const banned_stats = [
	'asset ID',
	'Class',
	'background',
	'chain',
	'coat',
	'eyes',
	'head',
	'name',
	'special',
	'mouth',
	'save Your Dogo',
];
module.exports = {
	data: new SlashCommandBuilder()
		.setName('dog-check-stats')
		.setDescription('Get the stats lineup for x dog')
		.addNumberOption(option =>
			option.setName('dog-id')
				.setMinValue(1)
				.setMaxValue(1000)
				.setDescription('Dog ID Number')
				.setRequired(true)),


	async execute(interaction, client) {
		await interaction.deferReply();
		try {
			console.log(`[Dog Stat] ${interaction.user.username} Checked dog stat`);
			const dog_number = interaction.options.getNumber('dog-id');
			const dog_metadata = await GetDogMetadata(dog_number);
			if (!dog_metadata) {
				console.log(`[Dog Stat] ${interaction.user.username} Entered bad dog number : ${dog_number}`);
				await interaction.editReply(`Dog does not exist\nDog Number: \`${dog_number}\``);
				return;
			}
			const dog_keys = Object.keys(dog_metadata);
			const dog_stats = [];

			for (let i = 0; i < dog_keys.length; i++) {
				if (!banned_stats.some(r => dog_keys[i].includes(r))) {
					dog_stats.push(`**${dog_keys[i]}:** ${dog_metadata[dog_keys[i]]}`);
				}
			}
			dog_stats.push(`ID: ${dog_metadata['asset ID']}`);
			await interaction.editReply({ embeds: [embed_builder.dog_stats.embed({ stats: dog_stats.join('\n'), name: dog_metadata.name, image: dog_metadata['save Your Dogo'] })] });
		}
		catch (err) {
			console.log(err);
			await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });

		}
	},
};