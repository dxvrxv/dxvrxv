const server = { online: 0, messages: [
    { id: 0, text: "Welcome", channel: 1, uid: -1, name: "Server", role: 0 }
] };
const player = {};

module.exports = async(req, res) => {
    const { channel, text, name, uid } = JSON.parse(atob(new URL(req.url, `http://${req.headers.host}`).searchParams.get("data")));
    if (player[name] && player[name].isOnline) {
        if (text) {
            const msgId = server.messages.length;
            server.messages.push({ id: msgId, text, channel, name, uid, role: player[name].role || 0 });
            Object.keys(player).forEach(p => player[p].push(msgId));
        }
    } else {
        res.end(JSON.stringify({ online: server.online, messages: server.messages }));
        player[name] = { messages: [[], []], isOnline: true, role: name == "dxvrxv" ? 1 : 0 }
        return
    }
    clearTimeout(player[name].timeout);
    player[name].timeout = setTimeout(() => player[name].isOnline = false, 15000);
    res.end(JSON.stringify({ online: server.online, messages: server.messages.filter(msg => player[name].messages[0].includes(msg.id)) }));
    player[name].messages[0] = [];
}
