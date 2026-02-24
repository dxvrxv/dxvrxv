async function db(action, table, filter = "", data = {}) {
    const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVveXR4eXJ4dnl1ZG9maGd5YnJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDEyNzEsImV4cCI6MjA4NTM3NzI3MX0.5Dk3769W3OS23gzJke-GQ3aF4RJWt0lOXliIIVtRiLQ";
    const url = `https://eoytxyrxvyudofhgybrf.supabase.co/rest/v1/${table}?${filter}`;
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
    try {
        const { userId, name, login } = req.query;

        if (!userId || !name || !login) {
            return res.status(400).json({ error: "userId, name and login are required" });
        }

        // Check if user exists
        const existing = await db("select", "users", `id=eq.${userId}&select=id`);

        if (existing && existing.length > 0) {
            return res.status(200).json({
                success: false,
                message: "User already exists",
                userId
            });
        }

        // Insert new user
        await db("insert", "users", "", {
            id: userId,
            name,
            login
        });

        return res.status(200).json({
            success: true,
            insertedId: userId,
            name,
            login
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
