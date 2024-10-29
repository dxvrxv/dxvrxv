const fetch = require('node-fetch'); // Ensure 'node-fetch' is installed

module.exports = async (req, res) => {
  const data = new URL(req.url, `http://${req.headers.host}`).searchParams.get("data");
  const { content } = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));
  
  await fetch('https://discord.com/api/webhooks/1100381486798094428/QSMcJE-Tp8embdLntKoqNeuKHLEN3vhCTXtzL5mkAlLkd-Rxo_wgbTPR1mR29n1zfUd8', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });

  res.json({ content });
};
