const words = require('./word-variants');
const getSenderName = require('./api-subroutines/getSenderName');
const fetch = require('node-fetch');
/**
 * A lexicon of questions asked and their answers as functions.
 * These entries are parsed *in order* by processMessage.js
 * Once a match is found, the search is ended.
 *
 * The lexicon is made up of an array of entries.
 *
 * Each lexicon entry has an array of question parts that make the up whole question.
 * Each lexicon entry also has an answer function that is called if the question matches.
 * The question parts are in order and are only matched once.
 *
 * Each question part is made up of an array of variants. These are phrases that generally have
 * the same meaning and could individually make up that part of the question.
 */
const lexicon = [
    /* Go away */
    {
        questionParts: [
            ['go away', 'go to bed', 'shutdown', 'logout', 'fuck off'],
            words.me,
        ],
        answer: (event, api, stopListening) => {
            api.sendMessage('I can see when I\'m not wanted.', event.threadID, () => {
                api.sendMessage('Bye!', event.threadID);
                stopListening();
            });
        },
    },
    /* Someone asks what the time is */
    {
        questionParts: [
            ['Whats', 'Do you know'],
            ['time?', 'time'],
        ],
        answer: (event, api) => {
            const time = new Date().toLocaleTimeString('en-US', {
                hour12: false,
                hour: 'numeric',
                minute: 'numeric',
            });
            api.sendMessage(`Right now it's ${time}.`, event.threadID);
        },
    },
    /* Someone says hi to me */
    {
        questionParts: [
            ['Hey', 'Hi', 'Sup', 'Yo', 'Kia Ora', 'Hows it going'],
            words.me,
        ],
        answer: (event, api) => {
            getSenderName(api, event).then((name) => {
                api.sendMessage(`Hey ${name}`, event.threadID);
            });
        },
    },
    /* Someone says marco */
    {
        questionParts: [['marco']],
        answer: (event, api) => api.sendMessage('Polo!', event.threadID),
    },
    /* Someone asks a question I don't know the answer to */
    {
        questionParts: [
            words.me,
            ['?'],
        ],
        answer: (event, api) => {
            api.sendMessage('I don\'t know. Let\'s ask the magic 8 ball.', event.threadID, () => {
                fetch(`https://8ball.delegator.com/magic/JSON/${encodeURIComponent(event.body)})`)
                    .then(res => res.json())
                    .then(res => api.sendMessage(`It says "${res.magic.answer}"`, event.threadID));
            });
        },
    },
];

module.exports = lexicon;
