const { SlashCommandBuilder } = require('discord.js');
const { embed_builder: { start_race } } = require('../Utils/embed-builder');
const { GetRaceID } = require('../Utils/utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dog-start-race')
		.setDescription('Create a new dog race')
		.addNumberOption(option =>
			option.setName('dogs')
				.setMinValue(2)
				.setMaxValue(6)
				.setDescription('Number of dogs competing')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('wager-message')
				.setDescription('Set a text wager on the race embed'))
		.addBooleanOption(option =>
			option.setName('user-limit')
				.setDescription('Limit to 1 entry per user?'))
		.addBooleanOption(option =>
			option.setName('auto-start')
				.setDescription('Start the race immediately when max players join'))
		.addBooleanOption(option =>
			option.setName('dog-handicap')
				.setDescription('Randomise all dog stats? Good when you keep losing...')),


	async execute(interaction, client) {
		await interaction.deferReply({ ephemeral: true });
		try {
			if (client[interaction.user.id] && (await interaction.channel.messages.fetch(client[interaction.user.id]?.message_id)).status !== 404) {
				console.log(`[Start Race] ${interaction.user.username} Already had a current race`);
				await interaction.editReply({ content: `You already have an existing race\nRace #${client[interaction.user.id].unique_race_id}`, ephemeral: true });
				return;
			}
			const race_id = GetRaceID();
			console.log(`${interaction.user.username} Initiated race`);

			const player_amount = interaction.options.getNumber('dogs');
			const raw_bool = interaction.options.getBoolean('user-limit');
			const limit_players = raw_bool === null ? true : raw_bool;
			const raw_autostart = interaction.options.getBoolean('auto-start');
			const auto_start = raw_autostart === null ? true : raw_autostart;
			const raw_handicap = interaction.options.getBoolean('dog-handicap');
			const handicap_mode = raw_handicap === null ? false : raw_handicap;
			const raw_wager = interaction.options.getString('wager-message');
			const wager_text = raw_wager === null ? 'TrenchATop is the best\nTrenchATop is number 1!\n- Endorsed by King Unt' : raw_wager;

			await interaction.editReply({ content: 'Successfully Started a Race' });
			console.log(`[Start Race] ${interaction.user.username} Started a new race`);
			const message_id = await interaction.channel.send({ embeds: [start_race.embed(interaction.user, player_amount, limit_players, auto_start, handicap_mode, wager_text, race_id)], components: [...start_race.buttons(player_amount, interaction.user.id)] });
			client[interaction.user.id] = {
				message_id: message_id,
				racing_players: 0,
				max_players: player_amount,
				unique_race_id: race_id,
				participating_dogs: [],
				participating_users: [],
				limit_users: limit_players,
				auto_start: auto_start,
				wager_text: wager_text,
				handicap_mode: handicap_mode,
				[`signup_button_${interaction.user.id}_1`]: false,
				[`signup_button_${interaction.user.id}_2`]: false,
				[`signup_button_${interaction.user.id}_3`]: false,
				[`signup_button_${interaction.user.id}_4`]: false,
				[`signup_button_${interaction.user.id}_5`]: false,
				[`signup_button_${interaction.user.id}_6`]: false,
			};
		}
		catch (err) {
			if (err.code === 10008) {
				client[interaction.user.id] = false;
				await interaction.editReply({ content: 'We found your race was deleted\nPlease resend this command' });
			}
			else {
				console.log(err);
				await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
			}

		}
	},
};
