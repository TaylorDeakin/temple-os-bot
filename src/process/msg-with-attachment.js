const fetch = require('node-fetch');

const proccessMsgWithAttachment = (event, api) => {
    event.attachments.forEach((attachment) => {
        if (attachment.type === 'share' && attachment.source === 'youtube.com') {
            fetch(attachment.facebookUrl)
            .then(res => res.text())
            .then((html) => {
                /* Extract url from Facebook's html response */
                const regex = new RegExp('document\\.location\\.replace\\("(.+)"\\);');
                /* Remove backslashes from url */
                const url = regex.exec(html)[1].replace(/\\\//g, '/');
                /* Send the url */
                api.sendMessage(`Here's a link to that video:\n${attachment.title}\n ${url}`, event.threadID);
            });
        }
    });
};

module.exports = proccessMsgWithAttachment;
