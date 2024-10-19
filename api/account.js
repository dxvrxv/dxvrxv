const server = {};
const player = {
    [1337]: { userid: 1337, username: "dxvrxv", online: false, position: {}, armor: {}, health: {} }
};

module.exports = (req, res) => {
    const { userid, x, y, armor } = JSON.parse(atob(new URL(req.url, `http://${req.headers.host}`).searchParams.get("data")));
    if (player[userid]) {
        if (x && y && armor) Object.assign(player[userid], { x, y, armor });
        res.json(player[userid]);
    }
    else res.json({ message: "User ID not found" });
}
