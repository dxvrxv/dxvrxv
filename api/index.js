const server = {
    online: 0,
    messages: [],
    privates: {}
};
const player = {
    [1337]: {
        userid: 1337,
        access: 0,
        username: "dxvrxv",
        isOnline: false,
        gamedata: {
            position: [0, 0],
            name: "",
        },
        messages: []
    }
};

module.exports = (req, res) => {
    
    const { userid, helpid, gamedata, content, channel } = JSON.parse( atob( new URL( req.url, `http://${ req.headers.host }` ).searchParams.get( "data" ) ) );
    
    if ( userid ) {
        
        if ( content && channel ) {
            const messageId = server.messages.length;
            server.messages.push( { userid, messageId, channel, content } );
            Object.keys( player ).forEach( uid => player[ uid ].messages.push( messageId ) );
        } else if ( gamedata ) Object.assign( player[ userid ], { gamedata } );

        res.json( {
            server: { online: server.online, messages: server.messages.filter( chat => player[ userid ].messages.includes( chat.messageId ) ) },
            player: Object.values( player ).map( p => ( { userid: p.userid, username: p.username, gamedata: p.gamedata } ) ),
            ...( helpid && { helper: { gamedata: player[ helpid ].gamedata } } )
        } );

        player[ userid ].messages = [];

    } else res.json( { notFound: true } );
}

/*
api?data={userid, content, channel}
    { server: { online, messages } }
api?data={userid, gamedata}
    { server: { online, messages }, player: { gamedata } }
api?data={userid, helpid}
    { helper: { gamedata } }
api?data={userid}
*/
