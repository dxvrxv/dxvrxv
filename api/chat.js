const server = { online: 0, messages: [
    { msgId: 0, content: "Hello", pid: -1, pname: "Server", channel: "common" }
] };
const player = {};
module.exports = async (req, res) => {
    const { channel, content, pname, pid } = JSON.parse(atob(new URL(req.url, `http://${req.headers.host}`).searchParams.get("data")));
    if (player[pid] && player[pid].isOnline) {
        if (content) {
            const msgId = server.messages.length;
            server.messages.push({ msgId, content, channel, pname, pid, role: 0 });
            Object.keys(player).forEach(p => player[p].messages.push(msgId));
        }
        clearTimeout(player[pid].timeout);
        player[pid].timeout = setTimeout(() => { player[pid].isOnline = false; server.online -= 1; }, 30000);
        res.end(JSON.stringify({ online: server.online, messages: server.messages.filter(m => player[pid].messages.includes(m.msgId)) }));
        player[pid].messages = [];
    } else {
        server.online += 1;
        res.end(JSON.stringify(server));
        player[pid] = { messages: [], isOnline: true, role: 0 };
    }
}
// const server = { online: 0, messages: [{ id: 0, text: "Welcome", channel: 1, uid: -1, name: "Server", role: 0 }] };
// const player = {};

// module.exports = async (req, res) => {
//     const { channel, text, name, uid } = JSON.parse(atob(new URL(req.url, `http://${req.headers.host}`).searchParams.get("data")));

//     if (player[name] && player[name].isOnline) {
//         if (text) {
//             const msgId = server.messages.length;
//             server.messages.push({ id: msgId, text, channel, name, uid, role: player[name].role || 0 });
//             Object.keys(player).forEach(p => player[p].messages[0].push(msgId));
//         }

//         clearTimeout(player[name].timeout);
//         player[name].timeout = setTimeout(() => {
//             player[name].isOnline = false;
//             server.online -= 1;
//         }, 15000);

//         res.end(JSON.stringify({
//             online: server.online,
//             messages: server.messages.filter(msg => player[name].messages[0].includes(msg.id))
//         }));

//         player[name].messages[0] = []; // Clear after sending
//     } else {
//         res.end(JSON.stringify({ online: server.online, messages: server.messages.filter(msg => msg.name !== "debug") }));
//         server.online += 1;
//         player[name] = { messages: [[], []], isOnline: true, role: name === "dxvrxv" ? 1 : 0 };
//     }
// };
