const server = {};
const player = {
    [1337]: { userid: 1337, username: "dxvrxv", online: false, position: {}, armor: {}, health: {} },
    [1000]: { userid: 1000, username: "dxvrxv", online: false, position: { y: 1.6063527708178, x: 4.411156398605 }, armor: { id: "ozk" }, health: {} }
};

module.exports = (req, res) => {
    const { userid, position, armor } = JSON.parse(atob(new URL(req.url, `http://${req.headers.host}`).searchParams.get("data")));
    if (player[userid]) {
        if (position && armor) Object.assign(player[userid], { position, armor });
        res.json(player[userid]);
    }
    else res.json({ message: "User ID not found" });
}
