module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify({
    data: {
      servers: [
        {
          host: "wss://6ea881e74575.ngrok-free.app",
          locale: "",
          port_tcp: 443,
          primary_tcp_port: 443,
          visible_name: "dayr-global",
          network_protocol: 123,
          encryption_key: "",
          minimum_version_ios: 711,
          minimum_version_android: 711,
          online: 1,
          time_updated: Math.floor(Date.now() / 1000),
          delta_updated: 0,
          is_serialize_int: false
        }
      ]
    },
    result: 1
  }));
};
