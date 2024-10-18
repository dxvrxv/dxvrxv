const server = { online: 0, messages: [] };
const player = {};
module.exports = (req, res) => {
    const { username, userid, content, channel } = JSON.parse(atob(new URL(req.url, `http://${req.headers.host}`).searchParams.get("data")));
    if (player[userid] && player[userid].isOnline) {
        if (content) {
            const msgId = server.messages.length;
            server.messages.push({ msgId, content, channel, username, userid });
            Object.keys(player).forEach(id => player[id].messages.push(msgId));
        }
        clearTimeout(player[userid].timeout);
        player[userid].timeout = setTimeout(() => { player[userid].isOnline = false; server.online -= 1 }, 30000);
        res.json({ online: server.online, messages: server.messages.filter(m => player[userid].messages.includes(m.msgId)) });
        player[userid].messages = [];
    } else {
        server.online += 1;
        res.json(server);
        player[userid] = { messages: [], isOnline: true }
    }
}
