document.getElementById('year').textContent = new Date().getFullYear();

// ---- icon set for services ----
const icons = {
drafting: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
misc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
connection: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.5 8.5l7 7"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><path d="M8.5 15.5l7-7"/></svg>',
estimation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>'
};

const services = [
{
    icon: icons.drafting,
    title: "Steel Drafting & Detailing",
    items: [
    "Anchor bolt setting plans & shop drawings for anchor bolts and levelling plates",
    "Embed layouts and details, with shop drawings for embed plates and angles",
    "Erection/framing plans at all floors and roof",
    "Elevations, sections and field-work information"
    ]
},
{
    icon: icons.misc,
    title: "Architectural Miscellaneous",
    items: [
    "Stair erection plans & elevations, with shop drawings for stairs, rails and landings",
    "Ladder layouts — elevator pit, roof access and cage ladders",
    "Handrail, guardrail, grating and floor plate layouts",
    "Joist modelling and deck layouts"
    ]
},
{
    icon: icons.connection,
    title: "Steel Connection Design",
    items: [
    "Connection design, review and analysis by a dedicated team",
    "Modelled and checked with StaadPro and current industry software",
    "Supports AISC / CISC / IS / BS / AS codes"
    ]
},
{
    icon: icons.estimation,
    title: "Estimations",
    items: [
    "Competitive bids — no guesswork on cost or performance",
    "Each job worked on specific man-hour cost and item method",
    "Advance Bill of Material (ABM) and material take-offs from 3D models"
    ]
}
];

function renderServiceGrid(targetId){
const el = document.getElementById(targetId);
el.innerHTML = services.map(s => `
    <div class="service-card">
    <div class="icon">${s.icon}</div>
    <h3>${s.title}</h3>
    <ul>${s.items.map(i => `<li>${i}</li>`).join('')}</ul>
    </div>
`).join('');
}
renderServiceGrid('homeServiceGrid');
renderServiceGrid('servicesGrid');

// ---- theme toggle ----
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
function applyTheme(theme){
if(theme === 'dark'){
    root.setAttribute('data-theme', 'dark');
    themeToggle.setAttribute('aria-label', 'Switch to light theme');
} else {
    root.removeAttribute('data-theme');
    themeToggle.setAttribute('aria-label', 'Switch to dark theme');
}
}
let savedTheme = null;
try { savedTheme = localStorage.getItem('gdc-theme'); } catch(e) {}
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
themeToggle.addEventListener('click', () => {
const isDark = root.getAttribute('data-theme') === 'dark';
const next = isDark ? 'light' : 'dark';
applyTheme(next);
try { localStorage.setItem('gdc-theme', next); } catch(e) {}
});

// ---- SPA view router ----
const viewIds = ['home','journey','services','projects','clients','contact'];
const views = {};
viewIds.forEach(id => { views[id] = document.getElementById(id); });

function showView(id){
if(!views[id]) id = 'home';
viewIds.forEach(v => views[v].classList.toggle('active', v === id));
document.querySelectorAll('.navlinks a').forEach(a => {
    const target = (a.getAttribute('href') || '').replace('#','');
    a.classList.toggle('active', target === id);
});
window.scrollTo(0,0);
}
function routeFromHash(){
const id = (location.hash || '#home').replace('#','');
showView(id);
}
window.addEventListener('hashchange', routeFromHash);
document.addEventListener('click', (e) => {
const link = e.target.closest('a[href^="#"]');
if(!link) return;
const id = link.getAttribute('href').replace('#','');
if(viewIds.includes(id)){
    e.preventDefault();
    if(location.hash === '#' + id){ showView(id); } else { location.hash = id; }
}
});
routeFromHash();

// ---- mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navlinks = document.getElementById('navlinks');
navToggle.addEventListener('click', () => navlinks.classList.toggle('open'));
navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navlinks.classList.remove('open')));

// ---- project register data ----
const projects = [
{n:"D-01", name:"110m Clear-Span Hangar, Indian Air Force", loc:"AFS Ambala", tag:"Defense"},
{n:"D-02", name:"2× 90m Clear-Span Hangars for Boeing", loc:"Palam", tag:"Defense"},
{n:"D-03", name:"75m Clear-Span Hangar, IAF", loc:"AFS Thanjavur", tag:"Defense"},
{n:"D-04", name:"75m Clear-Span Hangar, IAF", loc:"AFS Sirsa", tag:"Defense"},
{n:"D-05", name:"72m Clear-Span Hangar, IAF", loc:"AFS Bagdogra", tag:"Defense"},
{n:"D-06", name:"70m Clear-Span Hangar, IAF", loc:"AFS Car Nicobar, Andaman", tag:"Defense"},
{n:"D-07", name:"60m Clear-Span Hangar, Indian Coast Guard", loc:"Port Blair, Andaman", tag:"Defense"},
{n:"D-08", name:"45m Clear-Span Hangar, Indian Navy", loc:"Vizag", tag:"Defense"},
{n:"D-09", name:"50m Clear-Span Hangar, IAF", loc:"AFS Manasbal, J&K", tag:"Defense"},

{n:"M-01", name:"Depot Buildings — Workshop, Stabling Shed, Pit Wheel Lathe", loc:"Rapid Metro, Gurgaon", tag:"Metro"},
{n:"M-02", name:"Complete Depot Buildings", loc:"Patna Metro", tag:"Metro"},
{n:"M-03", name:"Workshop Extension, Yamuna Depot (DMRC)", loc:"New Delhi", tag:"Metro"},

{n:"A-01", name:'"Nautanki Mahal" — Kingdom of Dreams', loc:"Gurgaon", tag:"Auditorium"},
{n:"A-02", name:'"Sho-Shaa" Theatre, Kingdom of Dreams', loc:"Gurgaon", tag:"Auditorium"},
{n:"A-03", name:"Stage — 2010 Commonwealth Games Opening Ceremony", loc:"New Delhi", tag:"Auditorium"},
{n:"A-04", name:"75m×90m Pavilions, Milan Mela Project", loc:"Kolkata", tag:"Auditorium"},
{n:"A-05", name:"65m High Steel Clock Tower, Milan Mela Ground", loc:"Kolkata", tag:"Auditorium"},
{n:"A-06", name:"Aerospace Museum", loc:"Palam, New Delhi", tag:"Auditorium"},
{n:"A-07", name:"3,000-Capacity Hall, Bharat Soka Gakkai", loc:"Bilaspur, Haryana", tag:"Auditorium"},
{n:"A-08", name:"Agra International Trade Centre — 70K+50K sft halls", loc:"Agra", tag:"Auditorium"},
{n:"A-09", name:"16.5m Cantilever Stadium Roof, Jalpaiguri Sports Complex", loc:"West Bengal", tag:"Auditorium"},

{n:"P-01", name:"220 KV Substation, DHVBN", loc:"Manesar, Gurgaon", tag:"Power"},
{n:"P-02", name:"220 KV Substation, DHVBN", loc:"Rai, Sonipat", tag:"Power"},
{n:"P-03", name:"18 MW Straw-Fired Power Plant, Sukhbir Agro Energy", loc:"Ferozpur, Punjab", tag:"Power"},
{n:"P-04", name:"66/11kV GIS Substation, TPDDL Delhi (for Siemens)", loc:"Delhi", tag:"Power"},

{n:"W-01", name:"4.0 Lac sft Integrated ASRS Warehouse, ITC", loc:"Trichy", tag:"Warehouse"},
{n:"W-02", name:"4.0 Lac sft Integrated ASRS Warehouse, ITC", loc:"Kapurthala", tag:"Warehouse"},
{n:"W-03", name:"9 Warehouses, CONCOR", loc:"Multiple sites", tag:"Warehouse"},
{n:"W-04", name:"2.06 Lac sft Warehouse, VIP", loc:"Srirampur, Hooghly, WB", tag:"Warehouse"},
{n:"W-05", name:"1.92 Lac sft Warehouse, Firstplace", loc:"Talegaon, Pune", tag:"Warehouse"},
{n:"W-06", name:"1.1 Lac sft Warehouse, Daikin", loc:"Neemrana", tag:"Warehouse"},

{n:"F-01", name:"Rice Mill, Pre-Cleaning &amp; Conveyor System, Al Dahra Group", loc:"Abu Dhabi, UAE", tag:"Food"},
{n:"F-02", name:"Complete Rice Mill, Silo &amp; Packing Plant, Sukhbir Agro", loc:"Shahjahanpur, UP", tag:"Food"},
{n:"F-03", name:"Sortex &amp; Rice Conveying Support, 120 MTPH Mill, KRBL", loc:"Dhuri, Punjab", tag:"Food"},
{n:"F-04", name:"Rice Processing Unit — Sortex, Boiler House, Chimney", loc:"Nigeria", tag:"Food"},
{n:"F-05", name:"Rice Processing Unit — Sortex, Boiler House, Chimney", loc:"Ghana", tag:"Food"},
{n:"F-06", name:"CA Cold Storage, Fruit Master / Valley Fresh / Kashmir Premium Apple", loc:"Pulwama, J&K", tag:"Food"},
{n:"F-07", name:"50K MTon Wheat Storage Complex, Om Metals", loc:"Palanpur, Gujarat", tag:"Food"},
{n:"F-08", name:"50K MTon Wheat Storage Complex, Veerprabhu Marketing", loc:"Fatehpur, UP", tag:"Food"},
{n:"F-09", name:"50K MTon Wheat Storage Complex, RCC Hari Agro", loc:"Agra", tag:"Food"},

{n:"O-01", name:"4× G+4 Institutional Buildings, Centre of Excellence", loc:"Waknaghat, Shimla, HP", tag:"Offices"},
{n:"O-02", name:"Basement+G+6 HQ, Uttarakhand Jal Vidyut Nigam", loc:"Dehradun", tag:"Offices"},
{n:"O-03", name:"G+2 School Building, DPS Jhansi (55,000 sft)", loc:"Jhansi", tag:"Offices"},
{n:"O-04", name:"2-Storey Office Complex, NSG", loc:"Mumbai", tag:"Offices"},
{n:"O-05", name:"2-Storey Office Complex, NSG", loc:"Kolkata", tag:"Offices"},
{n:"O-06", name:"G+3 Library Building", loc:"Gotri, Baroda", tag:"Offices"},
{n:"O-07", name:"8× G+16 Towers, Seven Lamps Project, Vatika India Next", loc:"Gurgaon", tag:"Offices"},
{n:"O-08", name:"G+7 Office Building, LIC India", loc:"Ghaziabad", tag:"Offices"},

{n:"I-01", name:"GA CMA / Shop / PDC Buildings, General Motors", loc:"Talegaon, Maharashtra", tag:"PEB"},
{n:"I-02", name:"Factory Complex, Bosch", loc:"Manesar &amp; Sitarganj", tag:"PEB"},
{n:"I-03", name:"Extension Shed, TATA (TSPDL)", loc:"Pantnagar &amp; Ranjangaon", tag:"PEB"},
{n:"I-04", name:"Factory, RICO Auto Ltd.", loc:"Gurgaon", tag:"PEB"},
{n:"I-05", name:"Factory, Bajaj Auto Ltd.", loc:"Binola", tag:"PEB"},
{n:"I-06", name:"Factory, Sheela Foam Ltd.", loc:"Greater Noida", tag:"PEB"},
{n:"I-07", name:"Wagon Repair Workshop, Southern Railway", loc:"Chennai", tag:"PEB"},
{n:"I-08", name:"4-Storey Factory, Advance Tech Ltd.", loc:"Manesar, Gurgaon", tag:"PEB"},

{n:"C-01", name:"Extension Works, Ras Al Khaima White Cement", loc:"Ras Al Khaimah, UAE", tag:"Cement"},
{n:"C-02", name:"125m High Preheater Building, Zuary Cement", loc:"Yarraguntla, AP", tag:"Cement"},
{n:"C-03", name:"115m High Preheater Building, JSW Cement", loc:"Nandyal", tag:"Cement"},
{n:"C-04", name:"650m Long Wagon Loader, Zuary Cement", loc:"Yarraguntla, AP", tag:"Cement"},
{n:"C-05", name:"Clinker Transport — Conveyor Gallery &amp; Transfer Towers, Aditya Birla", loc:"Shambhupura, Rajasthan", tag:"Cement"},
{n:"C-06", name:"Complete Electrical Control Building, JSW", loc:"Toranagallu, Karnataka", tag:"Cement"},
{n:"C-07", name:"Design Review — Klin Foundation &amp; Preheater Tower, Al Jouf Cement", loc:"Saudi Arabia", tag:"Cement"},
{n:"C-08", name:"Wagon Loading System, Gharibwal Cement", loc:"Lahore, Pakistan", tag:"Cement"},

{n:"MI-01", name:"Screen House, Crusher House &amp; Conveyor Galleries, TISCO", loc:"Noamundi Iron Ore Mines", tag:"Mining"},
{n:"MI-02", name:"25 Ton Dumper Tipper Platform, Metso Minerals", loc:"India", tag:"Mining"},
{n:"MI-03", name:"Electrical Control &amp; Transformer Building", loc:"Noamundi", tag:"Mining"},

{n:"H-01", name:"25m &amp; 20m High Mast, Substation", loc:"Mundra, Gujarat", tag:"Masts"},
{n:"H-02", name:"20m High Mast, Pragati Maidan", loc:"New Delhi", tag:"Masts"},
{n:"H-03", name:"16m High Mast, IGI Airport", loc:"New Delhi", tag:"Masts"},
{n:"H-04", name:"15m &amp; 18m Mid-Hinged Mast, Floodlight Foundation", loc:"Mauritius", tag:"Masts"},
{n:"H-05", name:"22m High National Flagpole, SAIL Bhawan", loc:"Lodhi Road, New Delhi", tag:"Masts"},
];

const tagLabels = {
Defense:"Defense & Hangars", Metro:"Metro / Rail", Auditorium:"Large Span", Power:"Power",
Warehouse:"Warehouse", Food:"Food / Silo", Offices:"Institutional", PEB:"PEB Industrial",
Cement:"Heavy Industrial", Mining:"Mining", Masts:"High Mast"
};
const tagBlurbs = {
Defense:"Clear-span hangars for the Indian Air Force, Navy and Coast Guard.",
Metro:"Depot workshops and stabling sheds for metro rail networks.",
Auditorium:"Large-span auditoria, stages and cultural venues.",
Power:"Substations and power plant structures.",
Warehouse:"Large-format ASRS and logistics warehousing.",
Food:"Rice mills, silos and cold storage for food processing.",
Offices:"Institutional, office and group-housing buildings.",
PEB:"Pre-engineered factory and plant buildings.",
Cement:"Preheaters, silos and heavy cement-plant structures.",
Mining:"Crusher houses and material-handling structures.",
Masts:"High masts, flagpoles and lighting towers."
};
const sectorPhotos = [
"photo-1493476523860-a6de6ce1b0c3","photo-1609627016501-b862497c7294","photo-1600965581129-eef8a214ec9d",
"photo-1668886580919-ce45651f3ccf","photo-1531435338678-4ef2b632e95d","photo-1509024368907-57294758cfc5",
"photo-1562088997-ed2fbeef1cd6","photo-1441796522229-b3a3cb3d58fd","photo-1627922529156-41f27fb6f7ac",
"photo-1655268394982-ca9be301ab96","photo-1493476523860-a6de6ce1b0c3"
];

// sector highlight grid (counts computed from data)
const sectorGrid = document.getElementById('sectorGrid');
const tagOrder = Object.keys(tagLabels);
const counts = {};
projects.forEach(p => { counts[p.tag] = (counts[p.tag] || 0) + 1; });
sectorGrid.innerHTML = tagOrder.slice(0,6).map((tag, i) => `
<div class="sector-card" data-jump="${tag}">
    <div class="bg" style="background-image:url('https://images.unsplash.com/${sectorPhotos[i]}?w=900&q=75&auto=format&fit=crop');"></div>
    <div class="content">
    <div class="count">${counts[tag] || 0}+</div>
    <div class="name">${tagLabels[tag]}</div>
    <div class="blurb">${tagBlurbs[tag]}</div>
    </div>
</div>
`).join('');
sectorGrid.querySelectorAll('.sector-card').forEach(card => {
card.addEventListener('click', () => {
    const tag = card.dataset.jump;
    const btn = document.querySelector(`.filter-btn[data-filter="${tag}"]`);
    if(btn) btn.click();
    document.getElementById('filters').scrollIntoView({behavior:'smooth', block:'center'});
});
});

const registerBody = document.getElementById('registerBody');
function render(filter){
const list = filter === 'all' ? projects : projects.filter(p => p.tag === filter);
registerBody.innerHTML = list.map(p => `
    <div class="register-row">
    <span class="reg-no">${p.n}</span>
    <span class="reg-name">${p.name}</span>
    <span class="reg-loc">${p.loc}</span>
    <span class="reg-tag">${tagLabels[p.tag]}</span>
    </div>
`).join('');
}
render('all');

document.querySelectorAll('.filter-btn').forEach(btn => {
btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.filter);
});
});

// ---- contact form (front-end only demo) ----
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
contactForm.addEventListener('submit', (e) => {
e.preventDefault();
formSuccess.classList.add('show');
contactForm.reset();
});