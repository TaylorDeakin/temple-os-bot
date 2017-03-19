const fs = require("fs");
const login = require("facebook-chat-api");
const getAppState = require('./src/getAppState');
const words = require('./src/words');
const phraseMatcher = require('./src/phraseMatcher');
const tryUnderstandChat = require('./src/tryUnderstandChat');

login({appState: JSON.parse(fs.readFileSync('config/appState.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    /* Listen to chats */
    const stopListening = api.listen((err, event) => {
        if(err) return console.error(err);

        tryUnderstandChat(api, event, stopListening);

        api.markAsRead(event.threadID, err => {
            if(err) console.error(err);
        });
    });
});
