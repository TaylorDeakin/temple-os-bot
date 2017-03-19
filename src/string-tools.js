/**
 * Put two backslashes in front of any chars to escape
 * @param {string} str The string to escape
 */
const escapeSpecialChars = (str) => {
    const regexCharsToEscape = ['?', '.'];
    let res = str;
    regexCharsToEscape.forEach((char) => {
        let indexOfChar = res.indexOf(char);
        while (indexOfChar !== -1) {
            res = `${res.substr(0, indexOfChar)}\\\\${res.substr(indexOfChar, res.length)}`;
            indexOfChar = (res.indexOf(char) !== indexOfChar) ? -1 : res.indexOf(char);
        }
    });
    return res;
};

/**
 * Remove unwanted chars from a string
 * @param {string} str The string to remove chars from
 */
const removeUnwantedChars = (str) => {
    let res = str;
    const charsToRemove = ['\''];
    charsToRemove.forEach((char) => {
        let indexOfChar = res.indexOf(char);
        while (indexOfChar !== -1) {
            res = res.substr(0, indexOfChar) + res.substr(indexOfChar + 1, res.length);
            indexOfChar = (res.indexOf(char) !== indexOfChar) ? -1 : res.indexOf(char);
        }
    });
    return res;
};

module.exports = { escapeSpecialChars, removeUnwantedChars };
