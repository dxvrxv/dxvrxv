const server = {};
const player = {
    [1337]: { userid: 1337, username: "dxvrxv", userdata: {} },
    [1000]: { userid: 1000, username: "dx_bot", userdata: { iconId: "ozk", position: { y: 1.6074578934414, x: 4.4045622496041 }, helpdata: {
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
  } } }
};

module.exports = (req, res) => {
    const { userid, allyid, userdata } = JSON.parse(atob(new URL(req.url, `http://${req.headers.host}`).searchParams.get("data")));
    if (player[userid]) {
        if (userdata) { Object.assign(player[userid], { userdata }); res.json(player); }
        else if (allyid) res.json(player[allyid].helpdata);
        else res.json(player[userid]);
    } else res.json({ notFound: true });
}
