function CreateElement(...e){e.forEach(e=>{let t=[{},[]],a=e[1].match(/([a-z1-6]+)(?:#([\w-]+))?(?:\.([\w.-]+))?/i),i=document.createElement(a[1]);e.slice(2).forEach(e=>Array.isArray(e)&&e.length?t[1].push(e):"object"==typeof e&&Object.assign(t[0],e)),("string"==typeof e[0]?document.querySelector(e[0]):e[0]).appendChild(Object.assign(i,a[2]&&{id:a[2]},a[3]&&{className:a[3].replace(/\\./g," ")},t[0])),t[1].forEach(e=>CreateElement([i,...e])),t[0].oncreated && t[0].oncreated(i)})};
function UpdateElement(...e){e.forEach(e=>{let t=[{},[]],a="string"==typeof e[0]?document.querySelector(e[0]):e[0];e.slice(1).forEach(e=>Array.isArray(e)&&e.length?t[1].push(e):"object"==typeof e&&Object.assign(t[0],e)),Object.entries(t[0]).forEach(([e,t])=>"object"==typeof t?Object.assign(a[e],t):a[e]=t),t[1].forEach(e=>CreateElement([a,...e]))})};
function CreateParticle(canvas, config) {
    canvas.width = window.innerWidth, canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d"), fps = { count: 0, last: 0, frame: 0 }, mouse = { x: 0, y: 0 };
    const particles = Array.from({ length: 80 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * (2 - 0.5) + 0.5, vx: (Math.random() - 0.5) * 1, vy: (Math.random() - 0.5) * 1 }));
    (animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.x += p.vx, p.y += p.vy, p.x = (p.x + canvas.width) % canvas.width, p.y = (p.y + canvas.height) % canvas.height; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = Math.hypot(p.x - mouse.x, p.y - mouse.y) <= p.r ? "#F00" : "#0FF"; ctx.fill(); ctx.closePath(); });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.hypot(dx, dy);
                if (dist < 100) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(0, 255, 255, ${1 - dist / 100})`; ctx.lineWidth = 0.5; ctx.stroke(); ctx.closePath(); };
            }
        }
        const now = performance.now(); fps.frame++;
        if (now - fps.last >= 1000) Object.assign(fps, { count: fps.frame, frame: 0, last: now });
        ctx.fillText(fps.count, 5, canvas.height - 5);
        requestAnimationFrame(animate);
    })();
    window.addEventListener("mousemove", e => (mouse.x = e.clientX - canvas.offsetLeft, mouse.y = e.clientY - canvas.offsetTop));
    window.addEventListener("resize", () => Object.assign(canvas, { width: window.innerWidth, height: window.innerHeight }));
};
(Page = {
    Load: function(...pg) { !this.Loaded && (this.Loaded = true, CreateElement(...this.Root())); UpdateElement(["main", { innerHTML: "" }, ...pg.reduce((pv, cv) => pv?.[cv], this)], ["header > div", { className: "" }]); },
    Root: function() {
        return [
            ["head", "meta", { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" }],
            ["head", "link", { href: "index.css", rel: "stylesheet" }],
            ["body", "root", ["header", { innerHTML: `<pre></pre><div onclick="this.classList.toggle('active')"><svg><path>` }, ["nav", ...Object.entries(this).reduce((pv, [ck, cv]) => (Array.isArray(cv) ? pv.push([ck]) : typeof cv == "object" && pv.push([ck, Object.keys(cv)]), pv), []).map(([k, v]) => ["div", ["button", { innerHTML: k + (v ? "<svg><path>" : ""), onclick: () => !v && Page.Load(k) }], v ? ["ul", ...v.map(o => ["li", { textContent: o, onclick: () => Page.Load(k, o) }])] : undefined])]], ["main"]],
            ["body", "canvas", { oncreated: CreateParticle }]
        ];
    },
    Home: [["h2", { textContent: "Home" }]],
    About: [["h2", { textContent: "About" }]],
    Tools: {
        ["Day R Promocode"]: [],
        ["Tool 2"]: [],
        ["Tool 3"]: []
    },
    Services: {
        ["Service 1"]: [],
        ["Service 2"]: [],
        ["Service 3"]: []
    },
    Contact: {
        ["Contactetettstestset"]: [],
        ["Contact"]: [],
    }
})["Load"]("Home");