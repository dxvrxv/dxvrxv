const server = {};
const player = {
    [1337]: { userid: 1337, username: "dxvrxv", userdata: {} },
    [1000]: { userid: 1000, username: "dx_bot", userdata: {} }
};

module.exports = (req, res) => {
    const { userid, userdata } = JSON.parse(atob(new URL(req.url, `http://${req.headers.host}`).searchParams.get("data")));
    if (player[userid]) {
        if (userdata) { Object.assign(player[userid], { userdata }); res.json(player); }
        else if (inviteid) res.json(player[inviteid]);
        else res.json(player[userid]);
    } else res.json({ notFound: true });
}
