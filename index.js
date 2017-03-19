const fs = require('fs');
const login = require('facebook-chat-api');
const tryUnderstandChat = require('./src/tryUnderstandChat');

login({ appState: JSON.parse(fs.readFileSync('config/appState.json', 'utf8')) }, (loginErr, api) => {
    if (loginErr) return console.error(loginErr);

    /* Listen to chats */
    const stopListening = api.listen((listenErr, event) => {
        if (listenErr) return console.error(listenErr);

        tryUnderstandChat(api, event, stopListening);

        api.markAsRead(event.threadID, (markReadErr) => {
            if (markReadErr) console.error(markReadErr);
        });
    });
});
