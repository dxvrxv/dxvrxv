const server = { online: 0, messages: [] };
const player = {
    [1337]: {
        userid: 1337,
        access: 0,
        username: "dxvrxv",
        isOnline: false,
        gamedata: {
            position: [0, 0]
        },
        messages: [],
        timeout: null
    }
};

module.exports = (req, res) => {
    const { userid, helpid, gamedata, content, channel } = JSON.parse( atob( new URL( req.url, `http://${ req.headers.host }` ).searchParams.get( "data" ) ) );

    if ( userid ) {

        if ( player[ userid ].isOnline ) {
            if ( content && channel ) {
                const messageId = server.messages.length;
                server.messages.push( { userid, messageId, channel, content } );
                Object.keys( player ).forEach( uid => player[ uid ].messages.push( messageId ) );
            } else if ( gamedata ) Object.assign( player[ userid ], { gamedata } );
    
            clearTimeout( player[ userid ].timeout );
            player[ userid ].timeout = setTimeout( () => player[ userid ].isOnline = false );
    
            res.json( {
                server: { online: server.online, messages: server.messages.filter( chat => player[ userid ].messages.includes( chat.messageId ) ) },
                player: Object.values( player ).map( p => ( { userid: p.userid, username: p.username, gamedata: { armorIconId: p.gamedata?.armorIconId || "", position: p.gamedata.position } } ) ),
                ...( helpid && { helper: { gamedata: player[ helpid ].gamedata } } )
            } );
    
            player[ userid ].messages = [];

        } else {

            player[ userid ].isOnline = true;
            res.json( { server, player: Object.values( player ).map( p => ( { userid: p.userid, username: p.username, gamedata: { armorIconId: p.gamedata?.armorIconId || "", position: p.gamedata.position } } ) ) } )
            
        }

    } else res.json( { notFound: true } );

}
