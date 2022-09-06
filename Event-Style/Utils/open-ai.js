const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
	apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const wtf_one = ['[take a pee', 'take a poop', 'sniff a butt', 'eat a strange mushroom', 'have a lie down', 'have a scratch', 'chase his tail', 'lick his balls', 'vomit a little bit', 'eat a poop', 'chase a cat', 'bark at nothing', 'fart']
const wtf_two = ['beer', 'drugs', 'sleep', 'kibble', 'pats', 'meat pies', 'KFC'];
// ${wtf_one[wtf_one.length * Math.random() | 0]}
// Prompt: Write a ridiculous and humourous report about why Nico Dogerty won the obstacle course! Their class is stray.
// Report: Nico Dogerty had prepared for this race by having copious amount of meat pies. His background as a Stray helped him know how to get ahead of the rest of the pack. He completed each obstacle with ease and grace and even stopped to eat a strange mushroom along the way. In the end he was victorious because every other participant was simply no match for his physical ability and good looks. 
const prompt = (dog_name, dog_class) => {
	return `Prompt: Write a silly yet intense report about why Pixie Zoomer won his heat! His class is Tyke. 
	Report: Pixie Zoomer took a left and a right turn yet still managed to stay on track, he is a little mischievous, probably because he is a Tyke. The other dogs all got distracted by a butterfly that looked like an eggplant.

	Prompt: Write a ridiculous and humourous report about why ${dog_name} won the obstacle course! Their class is ${dog_class}.
	Report:`;
};
module.exports.DogWinningReason = async (dog_name, dog_class) => {
	return await openai.createCompletion(
		{
			model: 'text-davinci-002',
			prompt: prompt(dog_name, dog_class),
			temperature: 0.8,
			max_tokens: 200,
			top_p: 1.0,
			frequency_penalty: 0.5,
			presence_penalty: 0.0,
		},
	);
};