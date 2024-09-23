const enc = (data, key) => [Crypto.createCipheriv("aes-256-cbc", Buffer.from(key), Buffer.alloc(16))].map(k => Buffer.concat([k.update(data, "utf8"), k.final()]).toString("base64")).join("");
const dec = (data, key) => [Crypto.createCipheriv("aes-256-cbc", Buffer.from(key), Buffer.alloc(16))].map(k => Buffer.concat([k.update(Buffer.from(data, "base64")), k.final()]).toString("utf8")).join("");
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
    res.end(req);
}
