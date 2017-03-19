/**
 * Check to see if a message matches a certain criteria.
 * It has to have at least one of each group of words.
 * For example, if phraseGroups is
 * [
 *   ['Hello', 'Hi', 'Hey'], ['Will', 'World', 'Mate']
 * ]
 *
 * Then the following phrases return true
 * 'Hi Will'
 * 'Hello World!'
 * 'Hey Mate'
 * 'Hello world mate will'
 *
 * But the following do not
 * 'Will'
 * 'Will is the greatest person ever'
 *
 * @param {string} msg The message to check
 * @param {array} phraseGroups The groups of phrases to check against
 */
const phraseMatcher = (msg, phraseGroups) => {
    const matchedPhraseGroups = phraseGroups.filter(phraseGroup =>
    phraseGroup.filter((phrase) => {
        const regex = `(\\W|^)${phrase.toLowerCase()}(\\W|$)`;
        return new RegExp(regex, 'gi').test(msg);
    }).length > 0);

    return matchedPhraseGroups.length === phraseGroups.length;
};

module.exports = phraseMatcher;
