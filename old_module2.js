function CreateElement(d) {
    function create(e) {
        const data = e.slice(2).reduce((p, c) => (Array.isArray(c) ? (p[0] = c) : (typeof c == "object" && !Array.isArray(c) ? (p[1] = c) : null), p), [[], {}]);
        const node = Object.assign((typeof e[0] == "string" ? document.querySelector(e[0]) : e[0]).appendChild(document.createElement(e[1])), data[1]);
        data[0]?.forEach(e => typeof e == "string" ? node.append(e) : create([node, ...e]));
        data[1].oncreated && data[1].oncreated(node);
    }; (!Array.isArray(d[0])) ? create(d) : d.forEach(create);
}
function UpdateElement(...d) {
    d.forEach(e => {
        const data = e.slice(1).reduce((p, c) => (Array.isArray(c) ? (p[0] = c) : (typeof c == "object" && !Array.isArray(c) ? (p[1] = c) : null), p), [[], {}]);
        const node = Object.assign((typeof e[0] == "string" ? document.querySelector(e[0]) : e[0]), data[1]);
        data[0]?.forEach(e => typeof e == "string" ? node.append(e) : CreateElement([node, ...e]));
        data[1].onupdated && data[1].onupdated(node);
    });
}
function ConvertNumberSystem(input, base, step) {
    if (!input || isNaN(base[0]) || isNaN(base[1]) || base[0] < 2 || base[0] > 16 || base[1] < 2 || base[1] > 16 || ![...input.toUpperCase()].every(c => "0123456789ABCDEF".slice(0, base[0]).includes(c))) return ["", "Invalid input."];
    let output = [], decimal = parseInt(input, base[0]);
    output.push(input + "_" + base[0]);
    if (base[0] !== 10) output.push(input.split("").reverse().map((d, i) => `(${parseInt(d, base[0])} * ${base[0]}^${i})${i == 0 ? " = " : " + "}`).reverse().join("\n") + decimal + "_10");
    if (base[1] !== 10) output.push((f = (d, s = []) => d ? f(Math.floor(d / base[1]), [...s, `${d} / ${base[1]} = ${Math.floor(d / base[1])} -> ${d % base[1]}`]) : s)(decimal).join("\n"));
    output.push(decimal.toString(base[1]).toUpperCase() + "_" + base[1]);
    return [decimal.toString(base[1]).toUpperCase(), step ? output.join("\n") : null];
}
const Database = {
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoc29qcm12dHRvZHpzbHV0cHRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMzQ2OTcsImV4cCI6MjAzNjcxMDY5N30.AuzooWsIxmyttMRN_eIRdG6hDQWCfGj-SPR6fmxmuvY",
    select: async (table, filter) => (await fetch(`https://bhsojrmvttodzslutpto.supabase.co/rest/v1/${table}?${filter}`, { headers: { 'apikey': Database.key, 'Authorization': `Bearer ` + Database.key } })).json(),
    update: async (table, filter, data) => (await fetch(`https://bhsojrmvttodzslutpto.supabase.co/rest/v1/${table}?${filter}`, { method: 'PATCH', headers: { 'apikey': Database.key, 'Authorization': `Bearer ${Database.key}`, 'Content-Type': 'application/json' }, body: JSON.stringify(data) })).json()
}
function CreateParticle(canvas) {
    canvas.style = "position: absolute; inset: 0; z-index: -2;";
    const ctx = canvas.getContext("2d");

    const particle = {
        List: [],
        Max: 50,
        ConnectDistance: 100,
        Repulse: { Distance: 100, Speed: 5 }
    }

    class Particle {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }

        draw() {
            ctx.fillStyle = "#64ceff";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }

    function init() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particle.List.length = 0;
        for (let i = 0; i < particle.Max; i++) particle.List.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2));
    }

    function anim() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particle.List.forEach(p => {p.update(); p.draw()});
        connectParticles();
        requestAnimationFrame(anim)
    }

    function connectParticles() {
        for (let a = 0; a < particle.List.length; a++) {
            for (let b = a + 1; b < particle.List.length; b++) {
                const dx = particle.List[a].x - particle.List[b].x;
                const dy = particle.List[a].y - particle.List[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < particle.ConnectDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / particle.ConnectDistance})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particle.List[a].x, particle.List[a].y);
                    ctx.lineTo(particle.List[b].x, particle.List[b].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    init();
    anim();
}
