const words = require('./words');
const fetch = require('node-fetch');
const phraseMatcher = require('./phraseMatcher');
const pickPhrase = require('./pickPhrase');
const getSenderName = require('./getSenderName');

const tryUnderstandChat = (api, event, stopListening) => {
    if(event.attachments.length > 0) {
        event.attachments.forEach(attachment => {
            if(attachment.type === 'share' && attachment.source === 'youtube.com') {
                fetch(attachment.facebookUrl)
                .then(res => res.text())
                .then(html => {
                    /* Extract url from Facebook's html response */
                    const regex = new RegExp(`document\\.location\\.replace\\("(.+)"\\);`);
                    /* Remove backslashes from url */
                    const url = regex.exec(html)[1].replace(/\\\//g, "/");
                    /* Send the url */
                    api.sendMessage(`Here's a link to that video:\n${attachment.title}\n ${url}`, event.threadID)
                });
            }
        })
    }
    /* Someone told me to leave */
    if(phraseMatcher(event.body, [['go away', 'go to bed', 'shutdown', 'logout', 'fuck off'], words.me])) {
        api.sendMessage(`Fine, I'll go to bed.`, event.threadID, () => {
            api.sendMessage(`Night!`, event.threadID);
        });
        return stopListening();
    /* Someone asked what the time is */
    } else if(phraseMatcher(event.body, [['time?']])) {
        const time = new Date().toLocaleTimeString('en-US', {
            hour12: false, 
            hour: 'numeric', 
            minute: 'numeric',
        });
        api.sendMessage(`Right now it's ${time}.`, event.threadID);
    }
    /* Someone said lol */
    else if(phraseMatcher(event.body, [['lol', 'haha']])) {
        api.sendMessage('haha', event.threadID);
    }
    /* Someone said kek */
    else if(phraseMatcher(event.body, [['kek']])) {
        api.sendMessage('topkek', event.threadID);
    }
    /* topkek -> toptopkek */
    else if(/(top)+kek/.test(event.body)) {
        api.sendMessage(`top${event.body}`, event.threadID);
    }
    /* Someone said marco */
    else if(phraseMatcher(event.body, [['marco']])) {
        api.sendMessage('polo', event.threadID);
    }
    /* Someone asked a question that I don't know the asnwer to */
    else if(phraseMatcher(event.body, [words.me]) && event.body.includes('?')) {
        api.sendMessage(`I don't know. Let's ask the magic 8 ball.`, event.threadID, () => {
            fetch(`https://8ball.delegator.com/magic/JSON/${encodeURIComponent(event.body)})`)
                .then(res => res.json())
                .then(res => api.sendMessage(`It says "${res.magic.answer}"`, event.threadID));
        });
    }
    /* Someone said hi to me */
    else if(phraseMatcher(event.body, [words.greetings, words.me])) {
        getSenderName(api, event).then(name => {
            api.sendMessage(`${pickPhrase(words.greetings)} ${name}`, event.threadID);
        });
    /* Someone thanked me */
    } else if(phraseMatcher(event.body, [['Thanks', 'Cheers', 'thnx', 'chur'], words.me])) {
        api.sendMessage(`You're welcome`, event.threadID);
    }
};

module.exports = tryUnderstandChat;
