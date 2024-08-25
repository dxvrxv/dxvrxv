setTimeout(async () => {
    (Data = { ...{ Repository: (await Database.select("data", "key=eq.Repository"))[0].value } });
    (Page = { ...{ Load: function(...d) { !this.Inited && (this.Inited = true, CreateElement(Function(`return ${Data.Repository.Web.Root}()`)())); UpdateElement(["main", { innerHTML: "" }, (r => r?.length == 0 ? [["h2", { textContent: "404" }]] : r)(d.reduce((a, v) => a?.[v], this))], ["#nav-btn", { checked: false }]); } }, ...Function(`return ${Data.Repository.Web.Page}`)() })["Load"]("Home");
}, 100);
