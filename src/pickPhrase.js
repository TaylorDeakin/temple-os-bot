const pickPhrase = phrases =>
    phrases[Math.floor(Math.random() * phrases.length)];

module.exports = pickPhrase;
