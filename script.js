setTimeout(async () => {
    (Data = { ...{ Repository } });
    (Page = { ...{ Load: function(...d) { !this.Inited && (this.Inited = true, createElement(Data.Repository.Web.Root())); updateElement(["main", { innerHTML: "" }, (r => r?.length == 0 ? [["h2", { textContent: "404" }]] : r)(d.reduce((a, v) => a?.[v], this))], ["#nav-btn", { checked: false }]); } }, ...Data.Repository.Web.Page })["Load"]("Tools", "Number System Conversion");
}, 10);
