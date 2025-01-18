const log = async (data) => await fetch("https://discord.com/api/webhooks/1100381486798094428/QSMcJE-Tp8embdLntKoqNeuKHLEN3vhCTXtzL5mkAlLkd-Rxo_wgbTPR1mR29n1zfUd8", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "Log", content: data }) });

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "GET") {
    const { text } = req.query;
    if (text) {
      await log(text);
      res.status(200).send("ok");
    } else {
      res.status(400).send("notok");
    }
  } else {
    res.status(405).send("notoktoo");
  }
};
