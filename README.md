# TempleOS Bot
This is a personal chat bot project for my Facebook messenger groups with friends. Its name is TempleOS bot because my group of friends has an ironic obsession with [Temple OS](http://www.templeos.org/). "Install TempleOS" always ends up being our team name for events.

This project uses the [Facebook Chat API](https://github.com/Schmavery/facebook-chat-api) project to interface with Facebook because their official API doesn't allow the use of chat bots in group chats yet.

## Usage
This is still in early development, so I have no idea why you'd want to use it yourself. Here's how you'd go about it anyway:

1. Have the latest stable version of [Node](https://nodejs.org/en/) installed.
2. Clone this repo.
3. Run `npm install` to install the node dependencies.
4. Fill out `config/config.js` with your Facebook username and password.
5. Run `node ./src/getAppState.js` to sign into Facebook and save the app state.
6. Run `node ./index.js` to run the bot. It should connect to FB, listen to chats that it is in and respond accordingly.
