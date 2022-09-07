# Chain On Dogs Racing Bot
Bot built for the cheeky unts discord server

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 16.17.0

# Getting started
- Clone the repository
```
git clone https://github.com/TrenchATop/unts-discord-race-bot.git
```
- Install dependencies
```
cd unts-discord-race-bot
npm install
```
- Add config tokens
```
cd Event-Style
Update the values reflected below
```
```json
{
    "bot_token": "discord_bot_token",
    "bot_id": "discord_bot_id",
    "guild_id": "discord_server_id",
    "blockfrost_token": "blockfrost_mainnet_token",
    "open_ai_key": "openai_key"
}
```
| config | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `bot_token`                   | This is the discord bot token, can be found in https://discord.com/developers/ -> [your application] -> bot                  |
| `bot_id`                   | This is the unique id given to your bot, right click the bot and select `copy id`      |
| `guild_id`                   | This is your server (guild) id, right click your server icon and select `copy id`        |
| `blockfrost_token`                   | Your blockfrost token, found in https://blockfrost.io/dashboard        |
| `open_ai_key`                   | Your secrect key from Open Ai https://beta.openai.com/account/api-keys                                         |
# Running the bot
- First time?
You must deploy slash commands to your server
```
 cd Deploy
 node deploy-slash-commands
```
- Actually running..
```
(if in /Deploy) cd .. 
node run-unt-bot
```
