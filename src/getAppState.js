const fs = require('fs');
const login = require('facebook-chat-api');
const config = require('../config/config');

const getAppState = login({ email: config.email, password: config.password }, (err, api) => {
    if (err) return console.error(err);
    fs.writeFileSync('config/appState.json', JSON.stringify(api.getAppState()));
});

module.exports = getAppState;
