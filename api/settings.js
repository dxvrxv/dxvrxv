const log = (data) => { fetch("https://discord.com/api/webhooks/1461662963030294548/ygAG7dD9888Qmk3JBwn8dZVIPdM0iF5XVysjWjLhdNQ_vKxPs22DxKDoMo-G3LmVUJwZ", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ username:"Log", content:data }) }); };

module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({
    data: {
      servers: [
        {
          host: "ws://e8b11b2d87a9.ngrok-free.app",
          locale: "",
          port_tcp: "443",
          primary_tcp_port: "443",
          visible_name: "dayr-global",
          network_protocol: 123,
          encryption_key: "5994471abb01112afcc18159f6cc74b4",
          minimum_version_ios: 711,
          minimum_version_android: 711,
          online: 1,
          time_updated: Math.floor(Date.now() / 1000),
          delta_updated: 0,
          is_serialize_int: false
        },
      ]
    },
    result: 1
  }));
};
