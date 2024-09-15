const crypto = require("crypto");
const key = '6g83zKNShmZcYE747WaLuKdzyMNspM4Y';
async function Database(action, table, filter = "", data = {}) {
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
};
const encrypt = (text, key) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), Buffer.alloc(16));
  return cipher.update(text, 'utf8', 'base64') + cipher.final('base64');
};
const decrypt = (encText, key) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.alloc(16));
  return decipher.update(encText, 'base64', 'utf8') + decipher.final('utf8');
};
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      const code = JSON.parse(atob(body)).code;
      let data = await Database("select", "promocode", "code=eq." + code);
      if (data.length > 0) res.end(JSON.stringify({ tes_code: data[0].data }));
      else res.end({"status": "code not found"});
    });
  }
}
