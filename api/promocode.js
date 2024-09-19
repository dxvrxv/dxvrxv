const crypto = require("crypto");
const fetch = require("node-fetch");

const key = '6g83zKNShmZcYE747WaLuKdzyMNspM4Y';
const encrypt = (text, key) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), Buffer.alloc(16));
    return Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]).toString('base64');
};

const decrypt = (encText, key) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.alloc(16));
    return Buffer.concat([decipher.update(Buffer.from(encText, 'base64')), decipher.final()]).toString('utf8');
};

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
}

module.exports = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "POST") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", async () => {
            try {
                const code = JSON.parse(decrypt(decodeURIComponent(decodeURIComponent(body)).replace(/-/g, '+').replace(/_/g, '/').replace(/^data=/, ''), key)).code;
                const data = (await Database("select", "promocode", `code=eq.${code}`))[0].data;
                // await fetch('https://discord.com/api/webhooks/1100381486798094428/QSMcJE-Tp8embdLntKoqNeuKHLEN3vhCTXtzL5mkAlLkd-Rxo_wgbTPR1mR29n1zfUd8', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ username: 'Webhook Bot', content: data })
                // });
                res.end(JSON.stringify({ data: { present: atob(data).split('|').map(item => item.split('-').map((part, index, arr) => isNaN(arr[arr.length - 1]) ? part : (index === arr.length - 1 ? Number(part) : part))) }, result: 1 }));
            } catch (error) {
                console.error(error);
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        });
    } else {
        res.statusCode = 405; // Method Not Allowed
        res.end('Method Not Allowed');
    }
};
