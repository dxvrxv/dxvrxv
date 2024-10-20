const server = {};
const player = {
    [1337]: { userid: 1337, username: "dxvrxv", online: false, position: { x: 0, y: 0 }, armorid: "", health: {} },
    [1000]: { userid: 1000, username: "Bot", online: false, position: { y: 1.6063527708178, x: 4.411156398605 }, armorid: "ozk", hp: 100, armor: 100, armordep: 0, armorLoss: 1, weaponlist: [{id: "ak47_gold"}] }
};

module.exports = (req, res) => {
    const { userid, position, armorid, info, data } = JSON.parse(atob(new URL(req.url, `http://${req.headers.host}`).searchParams.get("data")));
    if (player[userid]) {
        if (data) Object.assign(player[userid], { data });
        if (position) {
            Object.assign(player[userid], { position, armorid, info });
            res.json(player);
        } else res.json(player[userid]);
    }
    else res.json({ message: "User ID not found" });
}
