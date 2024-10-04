messages = [
    { author: "DX 1", content: "Test 1" },
    { author: "DX 2", content: "Test 2" },
    { author: "DX 3", content: "Test 3" },
    { author: "DX 4", content: "Test 4" },
    { author: "DX 5", content: "Test 5" },
    { author: "DX 6", content: "Test 6" }
];
module.exports = async (req, res) => {
  res.json(messages);
}
