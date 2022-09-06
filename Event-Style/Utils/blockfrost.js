const Blockfrost = require('@blockfrost/blockfrost-js');
const { blockfrost_token } = require('../config.json');
const API = new Blockfrost.BlockFrostAPI({
	projectId: blockfrost_token,
});
const policy_id = '13b1e946ae6fd21e77a40de3005716a753d01fd69a70f389d0fb07b3';
const dog_name = 'ChainsOnDogs';
module.exports.GetDogMetadata = async (input_dog_id) => {
	try {
		let asset_hex_name;
		if (Number.isInteger(input_dog_id)) {
			asset_hex_name = policy_id + Buffer.from(dog_name + input_dog_id).toString('hex');
		}
		else if (input_dog_id.includes(policy_id)) {
			asset_hex_name = input_dog_id;
		}
		else if (input_dog_id.includes('ChainsOnDogs') || input_dog_id.includes('chainsondogs')) {
			asset_hex_name = policy_id + Buffer.from(input_dog_id).toString('hex');
		}
		else {
			asset_hex_name = policy_id + Buffer.from(dog_name + input_dog_id).toString('hex');
		}
		const blockfrost_response = await API.assetsById(asset_hex_name);
		delete blockfrost_response.onchain_metadata.image;
		delete blockfrost_response.onchain_metadata.Age;

		return blockfrost_response.onchain_metadata;
	}
	catch (err) {
		if (err.status_code === 404) {
			return false;
		}
		console.error(input_dog_id, err);
		return false;
	}
};
