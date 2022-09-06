const { embed_builder: { simulate_race } } = require('../Utils/embed-builder');
const { DogWinningReason } = require('../Utils/open-ai');
const { GetSixObstacles, GetExtraDogInfo, DogsThroughObstacles, SortWinners } = require('./tools');
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.RunThroughRace = async (message, all_racing_dogs, handicap_mode, race_id) => {
	try {
		const [race_obstacles, race_obstacles_embed_message] = GetSixObstacles();
		const racing_dogs = GetExtraDogInfo(all_racing_dogs, handicap_mode);
		await message.followUp({ embeds: [simulate_race.overview_embed(race_obstacles_embed_message.join('\n'), race_id)] });

		const race_results_text = DogsThroughObstacles(race_obstacles, racing_dogs);
		for (const { obstacle_texts, obstacle_image } of race_results_text) {
			await sleep(4000);
			await message.followUp({ embeds: [simulate_race.obstacle_embed(obstacle_texts, obstacle_image, race_id)] });
		}
		await sleep(3000);

		const [race_sorted, winners_gif, winner_name, winner_class ] = SortWinners(racing_dogs);
		race_sorted.unshift('🏁 Results 🏁\n');
		await message.followUp({ embeds: [simulate_race.winner_embed(race_sorted.join('\n'), winners_gif, race_id)] });
		await sleep(5000);
		await message.followUp({ embeds: [simulate_race.winner_reason_embed((await DogWinningReason(winner_name, winner_class)).data.choices[0].text.trim(), winner_name)] });
	}
	catch (err) {
		await message.followUp('error simulating race');
		console.error(err);
	}
};