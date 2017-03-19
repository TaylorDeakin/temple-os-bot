const lexicon = require('../lexicon');
const msgWithAttachment = require('./msg-with-attachment');
const { escapeSpecialChars, removeUnwantedChars } = require('../string-tools');

/**
 * Process the message from an event based on the lexicon
 * @param {object} event The Facebook message event
 * @param {function} api The api to respond with
 */
const processMessage = (event, api, stopListening) => {
    if (event.attachments.length > 0) {
        return msgWithAttachment(event, api);
    }

    /* Parse the lexicon entries into a regular expression */
    const entriesAsRegex = lexicon.map((entry) => {
        const joinedQParts = entry.questionParts.map((qPart) => {
            const escapedQuestionPartOptions = qPart.map(p =>
                removeUnwantedChars(escapeSpecialChars(p)));
            return `(${escapedQuestionPartOptions.join('|')})`;
        });
        /* Either a non whitespace character or the end of the line before and after the regex */
        return `(\\W+|^)${joinedQParts.join('(\\W+|\\W+.+\\W+)')}(\\W+|$)`;
    });

    /* Iterate over each regular expression checking if it matches */
    for (let i = 0; i < entriesAsRegex.length; i++) {
        const userMsg = removeUnwantedChars(event.body);
        if (new RegExp(entriesAsRegex[i], 'i').test(userMsg)) {
            lexicon[i].answer(event, api, stopListening);
            break;
        }
    }
};

module.exports = processMessage;
