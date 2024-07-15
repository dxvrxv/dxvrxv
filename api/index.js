module.exports = async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'URL parameter required' });

    try {
        const response = await fetch(`https://discord.com/api${url}`, {
            headers: { 'Authorization': `Bot ODgzOTg3MzMzMjgyNjY0NDk5.Gi3qG6.Q9eZYb-e67J64qRXHyegBNauzU10zUh76DNHRg` }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Fetch error');

        res.setHeader('Access-Control-Allow-Origin', '*'); // Allows all origins
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
