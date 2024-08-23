function createElement(d) {
    let create = (e) => {
        const data = e.slice(2).reduce((acc, arg) => (Array.isArray(arg) ? (acc[0] = arg) : (typeof arg === 'object' && !Array.isArray(arg) ? (acc[1] = arg) : null), acc), [[], {}]);
        const node = Object.assign((typeof e[0] == "string" ? document.querySelector(e[0]) : e[0]).appendChild(document.createElement(e[1])), data[1]);
        data[0]?.forEach(e => create([node, ...e]));
        data[1].oncreated && data[1].oncreated(node);
    }; (!Array.isArray(d[0])) ? create(d) : d.forEach(create);
};
function updateElement(...d) {
    d.forEach(e => {
        const data = e.slice(1).reduce((acc, arg) => (Array.isArray(arg) ? (acc[0] = arg) : (typeof arg === 'object' && !Array.isArray(arg) ? (acc[1] = arg) : null), acc), [[], {}]);
        const node = Object.assign((typeof e[0] == "string" ? document.querySelector(e[0]) : e[0]), data[1]);
        data[1].onupdated && data[1].onupdated(node);
        data[0]?.forEach(e => createElement([node, ...e]));
    });
};
function deleteElement() {};
function selectElement() {};

const Database = {};

// Testing
const Repository = {
    Web: {
        Root: function() {
            return [
                ["head", "meta", { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" }],
                ["head", "link", { href: "style.css", rel: "stylesheet" }],
                ["body", "header", [
                    ["pre", { textContent: "                                   ..                                                                  \n                             < .z@8\"`                                   x=~                            \n   x.    .        u.    u.    !@88E           u.    u.      uL   ..    88x.   .e.   .e.     u.    u.   \n .@88k  z88u    x@88k u@88c.  '888E   u     x@88k u@88c.  .@88b  @88R '8888X.x888:.x888   x@88k u@88c. \n~\"8888 ^8888   ^\"8888\"\"8888\"   888E u@8NL  ^\"8888\"\"8888\" '\"Y888k/\"*P   `8888  888X '888k ^\"8888\"\"8888\" \n  8888  888R     8888  888R    888E`\"88*\"    8888  888R     Y888L       X888  888X  888X   8888  888R  \n  8888  888R     8888  888R    888E .dN.     8888  888R      8888       X888  888X  888X   8888  888R  \n  8888  888R     8888  888R    888E~8888     8888  888R      `888N      X888  888X  888X   8888  888R  \n  8888 ,888B .   8888  888R    888E '888&    8888  888R   .u./\"888&    .X888  888X. 888~   8888  888R  \n \"8888Y 8888\"   \"*88*\" 8888\"   888E  9888.  \"*88*\" 8888\" d888\" Y888*\"  `%88%``\"*888Y\"     \"*88*\" 8888\" \n  `Y\"   'YP       \"\"   'Y\"   '\"888*\" 4888\"    \"\"   'Y\"   ` \"Y   Y\"       `~     `\"          \"\"   'Y\"   \n                                \"\"    \"\"                                                               " }],
                    ["nav", [
                        ["input", { id: "nav-btn", type: "checkbox" }],
                        ["label", { htmlFor: "nav-btn", innerHTML: "<svg><path>" }],
                        ["div", Object.entries(this.Page).reduce((o, [k, v]) => (Array.isArray(v) ? o.push([k]) : typeof v == "object" && o.push([k, Object.keys(v)]), o), []).map(([k, s]) => ["div", [["button", { innerHTML: k + (s ? "<svg><path>" : ""), onclick: () => !s && Page.Load(k) }], ...(s ? [["div", s.map(v => ["span", { textContent: v, onclick: () => Page.Load(k, v) }])]] : [])]])]
                    ]]
                ]],
                ["body", "main"]
            ]
        },
        Page: {
            Home: [["h2", { textContent: "Home" }]],
            About: [],
            Tools: {
                ["Number System Conversion"]: [
                    ["h2", { textContent: "Number System Conversion" }],
                    ["div", [
                        ["div", { style: "width: fit-content;" }, [
                            ["select", { id: "fromBase", onchange: (e) => document.getElementById("inputBase").textContent = "(" + e.target.value + ")" }, [
                                ["option", { value: "2", textContent: "Binary (2)" }],
                                ["option", { value: "10", textContent: "Decimal (10)" }],
                                ["option", { value: "8", textContent: "Octal (8)" }],
                                ["option", { value: "16", textContent: "Hexadecimal (16)" }]
                            ]],
                            ["span", { textContent: "->"}],
                            ["select", { id: "toBase", oncreated: (e) => e.value = "10", onchange: (e) => document.getElementById("outputBase").textContent = "(" + e.target.value + ")" }, [
                                ["option", { value: "2", textContent: "Binary (2)" }],
                                ["option", { value: "10", textContent: "Decimal (10)" }],
                                ["option", { value: "8", textContent: "Octal (8)" }],
                                ["option", { value: "16", textContent: "Hexadecimal (16)" }]
                            ]],
                            ["div", { style: "display: flex; position: relative; align-items: center; border: 1px solid #999;" }, [
                                ["input", { id: "input", style: "width: 100%;", placeholder: "Input" }],
                                ["span", { id: "inputBase", oncreated: (e) => e.textContent = "(" + document.getElementById("fromBase").value + ")" }]
                            ]],
                            ["button", { style: "width: 100%;", textContent: "Convert", onclick: (e) => {
                                [ document.getElementById("output").value, document.getElementById("steps").innerText ] = ConvertNumberSystem(document.getElementById("input").value.trim(), parseInt(document.getElementById("fromBase").value), parseInt(document.getElementById("toBase").value))
                            } }],
                            ["div", { style: "display: flex; position: relative; align-items: center; border: 1px solid #999;" }, [
                                ["input", { id: "output", style: "width: 100%;", disabled: true, placeholder: "Output" }],
                                ["span", { id: "outputBase", oncreated: (e) => e.textContent = "(" + document.getElementById("toBase").value + ")" }]
                            ]],
                            ["div", { id: "steps", style: "width: 100%; height: fit-content; border: 1px solid #999;" }]
                        ]]
                    ]]
                ]
            },
            Games: {},
            Projects: {}
        }
    }
};


function ConvertNumberSystem(value, fromBase, toBase, step = false) {
    if (!value || isNaN(fromBase) || isNaN(toBase) || fromBase < 2 || fromBase > 16 || toBase < 2 || toBase > 16) return ["", "Enter valid values for input."];
    if (!value.split("").every(c => "0123456789ABCDEF".slice(0, fromBase).includes(c.toUpperCase()))) return ["", "Invalid input for specified Base."];
    try {
        let steps = [], decimalValue = 0;
        if (fromBase !== 10) {
            let power = value.length - 1;
            steps.push(`${value} (${fromBase}) to Decimal:`);
            for (let i = 0; i < value.length; i++) {
                const digit = parseInt(value[i], fromBase);
                decimalValue += digit * Math.pow(fromBase, power);
                steps.push(`(${digit} * ${fromBase}^${power})${i < value.length - 1 ? ` + ` : ` = `}`);
                power--;
            }
            steps.push(`${decimalValue} (10)`);
        } else decimalValue = parseInt(value, fromBase);
        let result = "";
        if (toBase !== 10) {
            let tempDecimal = decimalValue;
            steps.push(`${decimalValue} (10) to Base ${toBase}:`);
            let reverseResult = "";
            while (tempDecimal > 0) {
                const remainder = tempDecimal % toBase;
                reverseResult += "0123456789ABCDEF".slice(0, toBase)[remainder];
                steps.push(`${tempDecimal} / ${toBase} = ${Math.floor(tempDecimal / toBase)} -> ${remainder}`);
                tempDecimal = Math.floor(tempDecimal / toBase);
            }
            result = reverseResult.split("").reverse().join("");
            steps.push(`${result} (${toBase})`);
        } else result = decimalValue.toString(toBase).toUpperCase();
        return [ result, steps.join("\n") ];
    } catch (err) { alert("Error: " + err.message); }
}
