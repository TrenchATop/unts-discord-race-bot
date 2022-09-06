const { EmbedBuilder, ActionRowBuilder } = require('discord.js');

module.exports.GetUserIDFromMention = (mention) => {
	const matches = mention.matchAll(/^<@!?(\d+)>$/g).next().value;
	if (!matches) return;
	const id = matches[1];
	return id;
};
module.exports.UpdateRaceEmbed = async (message, current_racers, user_username, dog_name, dog_id, button_num) => {
	try {
		const embedTwoEmbeds = EmbedBuilder.from(message.embeds[0]);
		const button_first = ActionRowBuilder.from(message.components[0]);
		const button_second = ActionRowBuilder.from(message.components[1]);
		const button_start = ActionRowBuilder.from(message.components[2]);
		embedTwoEmbeds.addFields(
			{ name: `${dog_name} [${dog_id}]`, value: `${user_username}` },
		);
		if (current_racers === 2) {
			button_start.components[0].setDisabled(false);
		}
		if (button_num > 3) {
			button_second.components[button_num - 4].setDisabled(true);
		}
		else {
			button_first.components[button_num - 1].setDisabled(true);
		}
		await message.edit({ embeds: [embedTwoEmbeds], components: [button_first, button_second, button_start] });
	}
	catch (err) {
		console.error(err);
	}
};
let current_races = 0;

module.exports.GetRaceID = () => {
	current_races++;
	return String(current_races).padStart(4, '0');
};