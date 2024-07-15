// api/messages.js

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { channelId } = req.query;
    if (!channelId) return res.status(400).json({ error: 'Channel ID parameter required' });

    const DISCORD_TOKEN = "ODgzOTg3MzMzMjgyNjY0NDk5.Gi3qG6.Q9eZYb-e67J64qRXHyegBNauzU10zUh76DNHRg"; // Ensure you have this token set in Vercel environment variables

    try {
        const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages?limit=1`, {
            headers: { 'Authorization': `Bot ${DISCORD_TOKEN}` }
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        
        const data = await response.json();
        
        res.setHeader('Access-Control-Allow-Origin', '*'); // Allows all origins
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        res.status(200).json(data[0] || { message: 'No messages found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
