const getSenderName = (api, event) => new Promise((res, rej) => {
    api.getUserInfo(event.senderID, (err, obj) => {
        if(err) rej(console.error(err));
        res(obj[event.senderID].firstName);
    });
});

module.exports = getSenderName;
