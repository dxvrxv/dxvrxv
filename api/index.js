const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'URL parameter required' });

    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.status(204).end();
        return;
    }

    try {
        const response = await fetch(`https://discord.com/api${url}`, {
            headers: { 'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}` }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Fetch error');

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*'); // Allows all origins
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
