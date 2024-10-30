const server = { online: 0, messages: [] };
const player = {
    [1337]: { userid: 1337, access: 0, username: "dxvrxv", isOnline: false, gamedata: { position: [0, 0] }, messages: [], timeout: null },
    [1000]: { userid: 1000, access: 0, username: "dx_bot", isOnline: false, gamedata: { position: [0, 0] }, messages: [], timeout: null },
};

async function db(action, table, filter = "", data = {}) {
    const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoc29qcm12dHRvZHpzbHV0cHRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMzQ2OTcsImV4cCI6MjAzNjcxMDY5N30.AuzooWsIxmyttMRN_eIRdG6hDQWCfGj-SPR6fmxmuvY";
    const url = `https://bhsojrmvttodzslutpto.supabase.co/rest/v1/${table}?${filter}`;
    const headers = { "apiKey": key, "Authorization": `Bearer ${key}`, "Content-Type": "application/json" };
    switch (action) {
        case "select": return await (await fetch(url, { method: "GET", headers })).json();
        case "insert": return await fetch(url, { method: "POST", headers, body: JSON.stringify(data) });
        case "update": return await fetch(url, { method: "PATCH", headers, body: JSON.stringify(data) });
        case "delete": return await fetch(url, { method: "DELETE", headers, body: JSON.stringify(data) });
        default: throw new Error("Invalid action");
    }
}

module.exports = async (req, res) => {
    const { userid, helpid, gamedata, content, channel } = JSON.parse( atob( new URL( req.url, `http://${ req.headers.host }` ).searchParams.get( "data" ) ) );

    if ( userid ) {

        if ( player[ userid ].isOnline ) {
            if ( content && channel ) {
                const messageId = server.messages.length;
                server.messages.push( { userid, messageId, channel, content } );
                Object.keys( player ).forEach( uid => player[ uid ].messages.push( messageId ) );
            } else if ( gamedata ) Object.assign( player[ userid ], { gamedata } );
    
            clearTimeout( player[ userid ].timeout );
            player[ userid ].timeout = setTimeout( () => player[ userid ].isOnline = false, 20000 );
            server.online = Object.values( player ).filter( p => p.isOnline ).length;
            res.json( {
                server: { online: server.online, messages: server.messages.filter( chat => player[ userid ].messages.includes( chat.messageId ) ) },
                player: Object.values( player ).filter(p => p.isOnline).map( p => ( { userid: p.userid, username: p.username, gamedata: { armorIconId: p.gamedata?.armorIconId || "", position: p.gamedata.position } } ) ),
                ...( helpid && { helper: { gamedata: player[ helpid ].gamedata } } )
            } );
    
            player[ userid ].messages = [];

        } else {

            player[ userid ].isOnline = true;
            server.online = Object.values( player ).filter( p => p.isOnline ).length;
            res.json( { server, player: Object.values( player ).map( p => ( { userid: p.userid, username: p.username, gamedata: { armorIconId: p.gamedata?.armorIconId || "", position: p.gamedata.position } } ) ) } )

        }
        
    } else res.json( { notFound: true } );

}
