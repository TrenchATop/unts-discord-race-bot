const { obstacles } = require('./assets');

const GetRandomNumber = () => {
	return Math.floor(Math.random() * (100 - 80) + 80);
};
const GetRandomLargerNumber = () => {
	return Math.floor(Math.random() * (594 - 480) + 480);
};
const PadTo2Digits = (num) => {
	return num.toString().padStart(2, '0');
};
const GetRandomTime = (min, max) => {
	return Number(`${Math.floor(Math.random() * ((max - 1) - min) + min)}${Math.floor(Math.random() * (100 - 10) + 10)}`);
};
const shuffle = (array) => {
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
};
module.exports.ConvertToTime = (time) => {
	const minutes = Math.floor(time / 60) === 0 ? '00' : Math.floor(time / 60);
	const raw_seconds = time % 60 === 0 ? '00' : time % 60;
	const seconds = Math.floor(raw_seconds);
	const milliseconds = raw_seconds.toString().split('.')[1]?.slice(0, 2) || '00';
	return `${PadTo2Digits(minutes)}:${PadTo2Digits(seconds)}:${milliseconds}`;
};

module.exports.GetSixObstacles = () => {
	const race_obstacles = [];
	const race_obstacles_embed_message = [];
	const chosen_numbers = [...obstacles.keys()];
	for (let i = 0; i < 6; i++) {
		const rand = Math.floor(Math.random() * (chosen_numbers.length));
		const chosen_obstacle = obstacles[chosen_numbers[rand]];
		race_obstacles.push(chosen_obstacle);
		race_obstacles_embed_message.push(`**${chosen_obstacle.item}:** ${chosen_obstacle.trait}`);
		chosen_numbers.splice(rand, 1);
	}
	return [race_obstacles, race_obstacles_embed_message];
};
const GetDogSum = (dog_object) => {
	let sum = 0;
	for (const el in dog_object) {
		sum += parseInt(dog_object[el]) || 0;
	}
	return sum;
};

module.exports.GetExtraDogInfo = ((test_dogs, handicap_mode) => {
	if (handicap_mode) {
		return test_dogs.map((dog) => ({
			'racer_id': dog.racer_id,
			'name': dog.name,
			'image': dog.image,
			'Age': dog.Age,
			'coat': dog.coat,
			'eyes': dog.eyes,
			'Class': dog.Class,
			'chain': dog.chain,
			'Wisdom': GetRandomNumber(),
			'Agility': GetRandomNumber(),
			'Charisma': GetRandomNumber(),
			'Strength': GetRandomNumber(),
			'asset ID': dog['asset ID'],
			'background': dog.background,
			'Constitution': GetRandomNumber(),
			'Intelligence': GetRandomNumber(),
			'save Your Dogo': dog['save Your Dogo'],
			trait_sum: GetRandomLargerNumber(),
			penalty_time: Math.floor((GetRandomLargerNumber() / 150) * 100),
			current_race_time: 0,
			race_passes: 0,
		}));
	}
	else {
		return test_dogs.map((dog) => ({
			...dog,
			trait_sum: GetDogSum(dog),
			penalty_time: Math.floor((GetDogSum(dog) / 150) * 100),
			current_race_time: 0,
			race_passes: 0,
		}));
	}
});
module.exports.DogsThroughObstacles = (race_obstacles, all_dogs) => {
	const ObstacleTexts = [];
	for (let i = 0; i < race_obstacles.length; i++) {
		const obstacle_texts = [];

		for (const dog of all_dogs) {
			const obstacle_time = GetRandomTime(...race_obstacles[i].time);

			const fail_or_pass = (dog[race_obstacles[i].trait] - race_obstacles[i].number >= 0) ? '🟢' : '🔴';
			if (fail_or_pass === '🟢') {
				dog.race_passes += 1;
				dog.current_race_time += obstacle_time;
			}
			else {
				dog.current_race_time += obstacle_time + dog.penalty_time;
			}
			obstacle_texts.push(`${fail_or_pass} ${this.ConvertToTime(dog.current_race_time / 100)} : ${dog.name} [${this.ConvertToTime(obstacle_time / 100)}] `);
		}
		const shuffled_texts = shuffle(obstacle_texts);
		shuffled_texts.unshift(`**${race_obstacles[i].item}:** Obstacle ${i + 1}/${race_obstacles.length} [${race_obstacles[i].number}]\n`);
		ObstacleTexts.push({ obstacle_texts: shuffled_texts.join('\n'), obstacle_image: race_obstacles[i].image });
	}
	return ObstacleTexts;
};
const WinnerEmojis = (num) => {
	switch (num) {
	case 1:
		return '🥇';
	case 2:
		return '🥈';
	case 3:
		return '🥉';
	case 4:
		return '4th';
	case 5:
		return '5th';
	case 6:
		return '6th';
	}
};
module.exports.SortWinners = (all_dogs) => {
	const sorted_winners = all_dogs.sort((x, y) => x.current_race_time - y.current_race_time);
	return [sorted_winners.map((dog, index) => `${WinnerEmojis(index + 1)} **${dog.name}:**  ` + `${this.ConvertToTime(dog.current_race_time / 100)}\n┗ ${dog.racer_id}`), sorted_winners[0]['save Your Dogo'], sorted_winners[0].name, sorted_winners[0].Class];
};
