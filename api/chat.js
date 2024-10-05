// const usedIds = new Set();
// const randomID = () => {
//     if (usedIds.size >= 9999) throw new Error("All IDs used.");
//     let id;
//     do { id = Math.floor(Math.random() * 9999) + 1; } while (usedIds.has(id));
//     usedIds.add(id);
//     return id;
// };
// const messages = [ { msgId: randomID(), channel: 1, text: "Welcome", userId: -1, userName: "Server", flag: 0 } ];
// const players = {};
// module.exports = async (req, res) => {
//     const { channel, text, userName, flag } = JSON.parse(atob(new URL(req.url, `http://${req.headers.host}`).searchParams.get("data")));
//     if (players[userName]) {
//         if (text) {
//             const msgObj = { msgId: randomID(), channel, text, userId: players.length, userName, flag: flag || 0 }
//             messages.push(msgObj); Object.keys(players).forEach(p => players[p].push(msgObj));
//         }
//     } else { res.end(JSON.stringify(messages)); players[userName] = []; return }
//     res.end(JSON.stringify(players[userName]));
//     players[userName] = [];
// };

const usedIds = new Set();
const randomID = () => {
    if (usedIds.size >= 9999) throw new Error("All IDs used.");
    let id;
    do { id = Math.floor(Math.random() * 9999) + 1; } while (usedIds.has(id));
    usedIds.add(id);
    return id;
};

const messages = [{ msgId: randomID(), channel: 1, text: "Welcome", userId: -1, userName: "Server", flag: 0 }];
const players = {};
const timeouts = {};  // To track player timeouts

const removePlayer = (userName) => {
    delete players[userName];
    delete timeouts[userName];
};

module.exports = async (req, res) => {
    const { channel, text, userName, flag } = JSON.parse(atob(new URL(req.url, `http://${req.headers.host}`).searchParams.get("data")));

    // If the player exists, reset their timeout
    if (players[userName]) {
        clearTimeout(timeouts[userName]);

        if (text) {
            const msgObj = { msgId: randomID(), channel, text, userId: players.length, userName, flag: flag || 0 };
            messages.push(msgObj);
            Object.keys(players).forEach(p => players[p].push(msgObj));
        }
    } else {
        // If player is new, initialize their message array
        res.end(JSON.stringify(messages));
        players[userName] = [];
    }

    // Start a new 20-second timeout for the player
    timeouts[userName] = setTimeout(() => removePlayer(userName), 20000);

    res.end(JSON.stringify(players[userName]));
    players[userName] = [];
};
