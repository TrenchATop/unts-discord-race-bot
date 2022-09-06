const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, ButtonStyle, TextInputStyle, inlineCode } = require('discord.js');

module.exports.embed_builder = {
	start_race: {
		embed(hosting_user, player_amount, user_limit, auto_start, handicap_mode, wager_text, race_id) {
			return new EmbedBuilder()
				.setColor('#05E508')
				.setFields(
					{ name: 'Hosted By:', value: `${hosting_user}` },
					{ name: 'Players:', value: `${player_amount}`, inline: true },
					{ name: 'One Entry:', value: `${user_limit}`, inline: true },
					{ name: 'Auto Start:', value: `${auto_start}`, inline: true },
					{ name: 'Handicap:', value: `${handicap_mode}`, inline: true },
				)
				.setDescription(`Wager:\n\`\`\`${wager_text}\`\`\``)
				.setTitle(`Race #${race_id}`);
		},
		buttons(player_amount, creator_id) {
			return [
				new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId(`signup_button_${creator_id}_1`)
							.setLabel('1')
							.setDisabled(player_amount < 1)
							.setStyle(ButtonStyle.Primary),
						new ButtonBuilder()
							.setCustomId(`signup_button_${creator_id}_2`)
							.setLabel('2')
							.setDisabled(player_amount < 2)
							.setStyle(ButtonStyle.Primary),
						new ButtonBuilder()
							.setCustomId(`signup_button_${creator_id}_3`)
							.setLabel('3')
							.setDisabled(player_amount < 3)
							.setStyle(ButtonStyle.Primary),
					),
				new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId(`signup_button_${creator_id}_4`)
							.setLabel('4')
							.setDisabled(player_amount < 4)
							.setStyle(ButtonStyle.Primary),
						new ButtonBuilder()
							.setCustomId(`signup_button_${creator_id}_5`)
							.setLabel('5')
							.setDisabled(player_amount < 5)
							.setStyle(ButtonStyle.Primary),
						new ButtonBuilder()
							.setCustomId(`signup_button_${creator_id}_6`)
							.setLabel('6')
							.setDisabled(player_amount < 6)
							.setStyle(ButtonStyle.Primary),
					),
				new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId(`confirm_button_${creator_id}`)
							.setLabel('Start')
							.setDisabled(true)
							.setStyle(ButtonStyle.Success),
						new ButtonBuilder()
							.setCustomId(`reset_button_${creator_id}`)
							.setLabel('Reset')
							.setDisabled(false)
							.setStyle(ButtonStyle.Secondary),
						new ButtonBuilder()
							.setCustomId(`delete_button_${creator_id}`)
							.setLabel('Delete')
							.setDisabled(false)
							.setStyle(ButtonStyle.Danger),
					),
			];
		},
		modal(custom_id) {
			return (new ModalBuilder()
				.setCustomId(custom_id)
				.setTitle('Doggie Signup'))
				.addComponents(
					new ActionRowBuilder()
						.addComponents(
							new TextInputBuilder()
								.setCustomId('user_nft_id')
								.setLabel('Your NFT ID')
								.setPlaceholder('Dog ID')
								.setRequired(true)
								.setStyle(TextInputStyle.Short),
						),
				);
		},
	},
	dog_stats: {
		embed(dog_in_question) {
			return new EmbedBuilder()
				.setColor('#36393E')
				.setTitle(dog_in_question.name)
				.setImage(dog_in_question.image)
				.setDescription(`${dog_in_question.stats}`);
		},
	},
	simulate_race: {
		overview_embed(current_obstacle_text, race_id) {
			return new EmbedBuilder()
				.setColor('#36393E')
				.setTitle(`Race #${race_id}`)
				.setDescription(`${current_obstacle_text}`);
		},
		obstacle_embed(current_obstacle_text, obstacle_image, race_id) {
			return new EmbedBuilder()
				.setColor('#36393E')
				.setTitle(`Race #${race_id}`)
				.setImage(obstacle_image)
				.setDescription(current_obstacle_text);
		},
		winner_embed(winners_list, winner_gif, race_id) {
			return new EmbedBuilder()
				.setColor('#53BCDE')
				.setTitle(`Race #${race_id}`)
				.setImage(winner_gif)
				.setDescription(`${winners_list}`);
		},
		winner_reason_embed(winners_list, dog_name) {
			return new EmbedBuilder()
				.setColor('#53BCDE')
				.setTitle(`Winner ${dog_name}`)
				.setDescription(`\`\`\`${winners_list}\`\`\``);
		},
	},
};
