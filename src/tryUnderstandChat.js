const words = require('./words');
const phraseMatcher = require('./phraseMatcher');
const pickPhrase = require('./pickPhrase');
const getSenderName = require('./getSenderName');

const tryUnderstandChat = (api, event, stopListening) => {
    /* Someone told me to leave */
    if(phraseMatcher(event.body, [['go away', 'go to bed', 'shutdown', 'logout'], words.me])) {
        api.sendMessage(`Fine, I'll go to bed.`, event.threadID);
        api.sendMessage(`Night!`, event.threadID);
        return stopListening();
    }
    /* Someone said hi to me */
    else if(phraseMatcher(event.body, [words.greetings, words.me])) {
        getSenderName(api, event).then(name => {
            api.sendMessage(`${pickPhrase(words.greetings)} ${name}`, event.threadID);
        });
    /* Someone asked what the time is */
    } else if(phraseMatcher(event.body, [['time?']])) {
        const time = new Date().toLocaleTimeString('en-US', {
            hour12: false, 
            hour: 'numeric', 
            minute: 'numeric',
        });
        api.sendMessage(`Right now it's ${time}.`, event.threadID);
    /* Someone thanked me */
    } else if(phraseMatcher(event.body, [['Thanks', 'Cheers', 'thnx', 'chur'], words.me])) {
        api.sendMessage(`You're welcome`, event.threadID);
    }
};

module.exports = tryUnderstandChat;
