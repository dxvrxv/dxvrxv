const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoc29qcm12dHRvZHpzbHV0cHRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMzQ2OTcsImV4cCI6MjAzNjcxMDY5N30.AuzooWsIxmyttMRN_eIRdG6hDQWCfGj-SPR6fmxmuvY"; // Your Supabase API Key
const SUPABASE_URL = "https://bhsojrmvttodzslutpto.supabase.co";

async function db(action, table, filter = "", data = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?${filter}`;
  const headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json"
  };
  switch (action) {
    case "select":
      return await (await fetch(url, { method: "GET", headers })).json();
    case "insert":
      return await fetch(url, { method: "POST", headers, body: JSON.stringify(data) });
    default:
      throw new Error("Invalid action");
  }
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "GET") {
  try {
    const data = await db("select", "comment");
    res.status(200).json(data); // ✅ This must be an array
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


    if (req.method === "POST") {
      let body = "";
      req.on("data", chunk => body += chunk);
      req.on("end", async () => {
        try {
          const payload = JSON.parse(body);
          const { name, presence, comment } = payload;

          if (!name || !comment) {
            return res.status(400).json({ error: "Name and comment are required" });
          }
          const now = new Date();
          const time = now.toLocaleTimeString("en-GB", { hour12: false });
          await db("insert", "comment", "", { name, presence, comment, time });
          return res.status(201).json({ success: true });
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
      });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
