const Crypto = require("crypto");
const enc = (data, key) => [Crypto.createCipheriv("aes-256-cbc", Buffer.from(key), Buffer.alloc(16))].map(k => Buffer.concat([k.update(data, "utf8"), k.final()]).toString("base64")).join("");
const dec = (data, key) => [Crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), Buffer.alloc(16))].map(k => Buffer.concat([k.update(Buffer.from(data, "base64")), k.final()]).toString("utf8")).join("");
const log = (data) => fetch("https://discord.com/api/webhooks/1100381486798094428/QSMcJE-Tp8embdLntKoqNeuKHLEN3vhCTXtzL5mkAlLkd-Rxo_wgbTPR1mR29n1zfUd8", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "Log", content: data }) });
const key = "6g83zKNShmZcYE747WaLuKdzyMNspM4Y";
async function db(action, table, filter = "", data = {}) {
    const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoc29qcm12dHRvZHpzbHV0cHRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMzQ2OTcsImV4cCI6MjAzNjcxMDY5N30.AuzooWsIxmyttMRN_eIRdG6hDQWCfGj-SPR6fmxmuvY";
    const url = `https://bhsojrmvttodzslutpto.supabase.co/rest/v1/${table}?${filter}`;
    const headers = { "apiKey": key, "Authorization": `Bearer ${key}`, "Content-Type": "application/json" };
    switch (action) {
        case "select": return await (await fetch(url, { method: "GET", headers })).json();
        case "insert": return await fetch(url, { method: "POST", headers, body: JSON.stringify(data) });
        case "update": return await fetch(url, { method: "PATCH", headers, body: JSON.stringify(data) });
        case "delete": return await fetch(url, { method: "DELETE", headers, body: JSON.stringify(data) });
        default: throw new Error("Invalid action");
    }
}

module.exports = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method == "POST") {
        let body = "";
        req.on("data", c => body += c);
        req.on("end", async () => {
            try {
                if (body.split("=")[0] == "data") {
                    const code = JSON.parse(dec(decodeURIComponent(body).replace(/-/g, "+").replace(/_/g, "/").replace(/^data=/, ""), key)).code;
                    const data = (await db("select", "promocode", "code=eq." + code))[0];
                    if (data && data.remain > 0) {
                        db("update", "promocode", "code=eq." + code, { remain: data.remain - 1 });
                        res.status(200).end(enc(JSON.stringify({ data: { present: JSON.stringify(atob(data.content.split("|"))).map(d => d.split("-").map(v => isNaN(v) ? v : Number(v))) }, result: 1 })));
                    } else res.status(200).end("code doesn't exists or has expired");
                } else if (body.split("=")[0] == "setdata") {
                    const data = JSON.parse(atob(decodeURIComponent(body).replace(/^setdata=/, "")));
                    res.status(200).json(data);
                }
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        })
    }
}
