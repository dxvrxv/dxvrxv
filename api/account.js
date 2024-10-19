const server = {};
const player = {
    [1337]: { userid: 1337, username: "dxvrxv" }
};

module.exports = (req, res) => {
    const { userid } = JSON.parse(atob(new URL(req.url, `http://${req.headers.host}`).searchParams.get("data")));
    if (player[userid]) res.json(player[userid])
    else res.json({ message: "User ID not found" })
}
