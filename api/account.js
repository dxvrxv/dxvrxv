const server = {};
const player = {
    [1337]: {
        userid: 1337,
        username: "dxvrxv",
        userdata: {
            // iconId: "",
            // health: 0,
            // weapon: {},
            // effect: {},
            // armorId: "",
            // armorDep: 0,
            // armorVal: 0,
            // apStart: 0,
            // apRegen: 0,
            // apMax: 0,
            // apMove: 0,
            // speed: 0,
            // position: {
            //     x: 0,
            //     y: 0
            // }
        }
    }
};
module.exports = (req, res) => {
    const { userid, userdata } = JSON.parse(atob(new URL(req.url, `http://${req.headers.host}`).searchParams.get("data")));
    if (player[userid]) {
        if (userdata) Object.assign(player[userid], { userdata });
        res.json(player);
    } else res.json({ notFound: true });
}
