const GetRandomNumber = () => {
	return Math.floor(Math.random() * (100 - 80) + 80);
};
const GetRandomTime = (min, max) => {
	return Number(`${Math.floor(Math.random() * (max - min) + min)}${Math.floor(Math.random() * (100 - 0) + 0)}`);
};

module.exports.obstacles = [
	{
		item: 'A-Frame',
		trait: 'Agility',
		image: 'https://media.discordapp.net/attachments/967052528195870800/1009356284195262504/unknown.png',
		number: GetRandomNumber(),
		time: [9, 9],
	},
	{
		item: 'Dog Walk',
		trait: 'Agility',
		image: 'https://media.discordapp.net/attachments/967052528195870800/1009356284195262504/unknown.png',
		number: GetRandomNumber(),
		time: [9, 9],
	},
	{
		item: 'Seesaw',
		trait: 'Charisma',
		image: 'https://media.discordapp.net/attachments/967052528195870800/1009356284195262504/unknown.png',
		number: GetRandomNumber(),
		time: GetRandomTime(),
	},
	{
		item: 'Crossover',
		trait: 'Charisma',
		image: 'https://media.discordapp.net/attachments/967052528195870800/1009356284195262504/unknown.png',
		number: GetRandomNumber(),
		time: GetRandomTime(),
	},
	{
		item: 'Tunnel',
		trait: 'Constitution',
		image: 'https://media.discordapp.net/attachments/967052528195870800/1009356284195262504/unknown.png',
		number: GetRandomNumber(),
		time: GetRandomTime(),
	},
	{
		item: 'Collapsed Tunnel',
		trait: 'Constitution',
		image: 'https://media.discordapp.net/attachments/967052528195870800/1009356284195262504/unknown.png',
		number: GetRandomNumber(),
		time: GetRandomTime(),
	},
	{
		item: 'Broad Jump',
		trait: 'Strength',
		image: 'https://media.discordapp.net/attachments/967052528195870800/1009356284195262504/unknown.png',
		number: GetRandomNumber(),
		time: GetRandomTime(),
	},
	{
		item: 'Tire Jump',
		trait: 'Strength',
		image: 'https://media.discordapp.net/attachments/967052528195870800/1009356284195262504/unknown.png',
		number: GetRandomNumber(),
		time: GetRandomTime(),
	},
	{
		item: 'Pause Table',
		trait: 'Wisdom',
		image: 'https://media.discordapp.net/attachments/967052528195870800/1009356284195262504/unknown.png',
		number: GetRandomNumber(),
		time: GetRandomTime(),
	},
	{
		item: 'Weave Poles',
		trait: 'Wisdom',
		image: 'https://media.discordapp.net/attachments/967052528195870800/1009356284195262504/unknown.png',
		number: GetRandomNumber(),
		time: GetRandomTime(),
	},
];