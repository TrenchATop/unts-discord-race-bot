const GetRandomNumber = () => {
	return Math.floor(Math.random() * (100 - 80) + 80);
};

module.exports.obstacles = [
	{
		item: 'A-Frame',
		trait: 'Agility',
		image: 'https://media.discordapp.net/attachments/955041012621926440/1011145326922580069/a_frame.gif',
		number: GetRandomNumber(),
		time: [9, 10],
	},
	{
		item: 'Dog Walk',
		trait: 'Agility',
		image: 'https://media.discordapp.net/attachments/955041012621926440/1011145327660769310/dog_walk.gif',
		number: GetRandomNumber(),
		time: [28, 30],
	},
	{
		item: 'Seesaw',
		trait: 'Charisma',
		image: 'https://media.discordapp.net/attachments/955041012621926440/1011145329242030150/seesaw.gif',
		number: GetRandomNumber(),
		time: [9, 10],
	},
	{
		item: 'Crossover',
		trait: 'Charisma',
		image: 'https://media.discordapp.net/attachments/981462731406340126/1016489079212363856/crossover.gif',
		number: GetRandomNumber(),
		time: [18, 20],
	},
	{
		item: 'Tunnel',
		trait: 'Constitution',
		image: 'https://media.discordapp.net/attachments/955041012621926440/1011145330210902017/tunnel.gif',
		number: GetRandomNumber(),
		time: [9, 10],
	},
	{
		item: 'Collapsed Tunnel',
		trait: 'Constitution',
		image: 'https://media.discordapp.net/attachments/955041012621926440/1011145327300071464/collapsed_tunnel.gif',
		number: GetRandomNumber(),
		time: [10, 12],
	},
	{
		item: 'Spread Jumps',
		trait: 'Intelligence',
		image: 'https://media.discordapp.net/attachments/981462731406340126/1011231823768059924/spread_jump.gif',
		number: GetRandomNumber(),
		time: [9, 10],
	},
	{
		item: 'Panel Jump',
		trait: 'Intelligence',
		image: 'https://media.discordapp.net/attachments/955041012621926440/1011145328352821308/panel_jump.gif',
		number: GetRandomNumber(),
		time: [7, 8],
	},
	{
		item: 'Broad Jump',
		trait: 'Strength',
		image: 'https://media.discordapp.net/attachments/981462731406340126/1011231824137179136/lava.gif',
		number: GetRandomNumber(),
		time: [7, 8],
	},
	{
		item: 'Tire Jump',
		trait: 'Strength',
		image: 'https://media.discordapp.net/attachments/955041012621926440/1011145329841819658/tire_jump.gif',
		number: GetRandomNumber(),
		time: [10, 12],
	},
	{
		item: 'Pause Table',
		trait: 'Wisdom',
		image: 'https://media.discordapp.net/attachments/955041012621926440/1011145328868724806/pause_table.gif',
		number: GetRandomNumber(),
		time: [18, 20],
	},
	{
		item: 'Weave Poles',
		trait: 'Wisdom',
		image: 'https://media.discordapp.net/attachments/955041012621926440/1011145330651312158/wave_poles.gif',
		number: GetRandomNumber(),
		time: [14, 16],
	},
];