// module.exports = async (req, res) => {
//     const { url } = req.query;
//     if (!url) return res.status(400).json({ error: 'URL parameter required' });
//     try {
//         const response = await fetch(`https://discord.com/api${url}`, { headers: { 'Authorization': `Bot ODgzOTg3MzMzMjgyNjY0NDk5.Gi3qG6.Q9eZYb-e67J64qRXHyegBNauzU10zUh76DNHRg` } });
//         const data = await response.json();
//         if (!response.ok) throw new Error(data.message || 'Fetch error');
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// const fetch = require('node-fetch');

// module.exports = async (req, res) => {
//     const { url } = req.query;
//     if (!url) return res.status(400).json({ error: 'URL parameter required' });

//     // Allow CORS
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//     // Handle preflight requests
//     if (req.method === 'OPTIONS') {
//         res.status(204).end(); // No content response
//         return;
//     }

//     try {
//         const response = await fetch(`https://discord.com/api${url}`, {
//             headers: { 'Authorization': `Bot ODgzOTg3MzMzMjgyNjY0NDk5.Gi3qG6.Q9eZYb-e67J64qRXHyegBNauzU10zUh76DNHRg` } // Replace YOUR_BOT_TOKEN_HERE with your actual bot token
//         });

//         const data = await response.json();
//         if (!response.ok) throw new Error(data.message || 'Fetch error');

//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'URL parameter required' });

    // Allow CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    // if (req.method === 'OPTIONS') {
    //     res.status(204).end(); // No content response
    //     return;
    // }

    // Discord Bot token
    const botToken = 'ODgzOTg3MzMzMjgyNjY0NDk5.Gi3qG6.Q9eZYb-e67J64qRXHyegBNauzU10zUh76DNHRg'; // Replace with your actual bot token

    try {
        if (req.method === 'GET') {
            // Handle GET request
            const response = await fetch(`https://discord.com/api${url}`, {
                headers: { 'Authorization': `Bot ${botToken}` }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Fetch error');

            res.status(200).json(data);
        } else if (req.method === 'POST') {
            // Handle POST request to send a message
            const { channelId, messageContent } = req.body;
            if (!channelId || !messageContent) return res.status(400).json({ error: 'channelId and messageContent are required' });

            const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bot ${botToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: messageContent })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error sending message');

            res.status(200).json(data);
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
