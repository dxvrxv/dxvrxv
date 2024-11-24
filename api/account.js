const server = {};
const player = {
    [18959306]: { userid: 18959306, username: "dxvrxv", userdata: {
        position: { y: 1.6074578934414, x: 4.4045622496041 },
        china_season: 10,
        emba_event: 10,
        wearWeaponList: [ 'ks23', 'muha', 'shmel' ],
        apMax: 5,
        apRegen: 1,
        armorId: 'tactical_armor',
        hp: 100,
        speed: 3,
        apStart: 2,
        halloween: 1,
        name: 'dxvrxv',
        armorDep: 90,
        apMove: 1,
        armorIconId: 'hw_werewolf_form',
        icon: 'naked',
        new_year: 1
    } },
    [1000]: { userid: 1000, username: "dx_bot", userdata: {
        position: { y: 1.6074578934414, x: 4.4045622496041 },
        china_season: 10,
        emba_event: 10,
        wearWeaponList: [ 'ks23', 'muha', 'shmel' ],
        apMax: 5,
        apRegen: 1,
        armorId: 'tactical_armor',
        hp: 100,
        speed: 3,
        apStart: 2,
        halloween: 1,
        name: 'dxvrxv',
        armorDep: 90,
        apMove: 1,
        armorIconId: 'hw_werewolf_form',
        icon: 'naked',
        new_year: 1
    } }
};

module.exports = (req, res) => {
    const { userid, helpid, userdata } = JSON.parse(atob(new URL(req.url, `http://${req.headers.host}`).searchParams.get("data")));
    if (player[userid]) {
        if (userdata) { Object.assign(player[userid], { userdata }); res.json(player); }
        else if (helpid) res.json(player[helpid].userdata);
        else res.json(player[userid]);
    } else res.json({ notFound: true });
}
