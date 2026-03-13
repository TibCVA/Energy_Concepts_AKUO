import { useState, useEffect, useRef } from "react";

const C = {
  navy: "#0C2340", navyLight: "#1A3A5C", teal: "#0E7C7B", tealLight: "#11A6A5",
  amber: "#D4952A", amberLight: "#F5BD4F", red: "#C4384B", green: "#2A7F62",
  slate: "#3E5060", text: "#1E293B", textMid: "#475569", textLight: "#64748B",
  bg: "#F6F7F9", card: "#FFFFFF", border: "#E2E6EC", borderLight: "#EEF1F5",
  highlight: "#E8F4F8",
};

const SECTIONS = [
  { id: "intro", label: "Vue d'ensemble", num: "00" },
  { id: "market", label: "Marché électrique", num: "01" },
  { id: "tech", label: "Technologies", num: "02" },
  { id: "revenue", label: "Revenue stack", num: "03" },
  { id: "lifecycle", label: "Cycle de projet", num: "04" },
  { id: "grid", label: "Réseau & permitting", num: "05" },
  { id: "finance", label: "Finance de projet", num: "06" },
  { id: "competition", label: "Concurrence", num: "07" },
  { id: "portfolio", label: "Effets de portefeuille", num: "08" },
  { id: "akuo", label: "Mission Akuo", num: "09" },
  { id: "method", label: "Méthodologie CVA", num: "10" },
];

function SectionTitle({ num, title, subtitle }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
        <span style={{ fontFamily: "monospace", fontSize: 13, color: C.teal, fontWeight: 500 }}>{num}</span>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: C.navy, letterSpacing: -0.5, margin: 0, lineHeight: 1.2 }}>{title}</h2>
      </div>
      {subtitle && <p style={{ fontSize: 13.5, color: C.textMid, margin: "4px 0 0 36px", lineHeight: 1.6, maxWidth: 600 }}>{subtitle}</p>}
      <div style={{ width: 50, height: 3, background: C.teal, marginTop: 14, borderRadius: 2, marginLeft: 36 }} />
    </div>
  );
}

function Card({ title, children, accent = C.navy, icon, noPad }) {
  return (
    <div style={{ background: C.card, borderRadius: 8, border: "1px solid " + C.border, marginBottom: 18, overflow: "hidden", boxShadow: "0 1px 3px rgba(12,35,64,0.04)" }}>
      {title && (
        <div style={{ padding: "14px 22px", borderBottom: "1px solid " + C.borderLight, display: "flex", alignItems: "center", gap: 10, background: accent + "08" }}>
          {icon && <span style={{ fontSize: 17 }}>{icon}</span>}
          <span style={{ fontWeight: 700, fontSize: 14, color: accent, letterSpacing: -0.2 }}>{title}</span>
        </div>
      )}
      <div style={{ padding: noPad ? 0 : "18px 22px", fontSize: 13.5, lineHeight: 1.7, color: C.text }}>{children}</div>
    </div>
  );
}

function Callout({ type = "info", children }) {
  const styles = {
    info: { bg: "#E8F4F8", border: C.teal, color: "#0A5E5D", icon: "💡" },
    warn: { bg: "#FEF7E6", border: C.amber, color: "#8B6914", icon: "⚠️" },
    akuo: { bg: "#FFF4EC", border: "#D4692A", color: "#8B4513", icon: "🎯" },
    key: { bg: "#EFF6FF", border: "#3B82F6", color: "#1E40AF", icon: "🔑" },
    so: { bg: "#F0FDF4", border: C.green, color: "#14532D", icon: "→" },
  };
  const s = styles[type];
  return (
    <div style={{ background: s.bg, borderLeft: "3px solid " + s.border, borderRadius: "0 6px 6px 0", padding: "12px 16px", margin: "14px 0", fontSize: 12.5, lineHeight: 1.65, color: s.color, display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
      <div>{children}</div>
    </div>
  );
}

function Def({ term, children }) {
  return (
    <div style={{ display: "flex", gap: 14, padding: "10px 0", borderBottom: "1px solid " + C.borderLight }}>
      <div style={{ fontWeight: 700, fontSize: 12.5, color: C.navy, minWidth: 130, flexShrink: 0 }}>{term}</div>
      <div style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

function MiniTag({ children, color = C.teal }) {
  return <span style={{ display: "inline-block", background: color + "14", color: color, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, marginRight: 4, marginBottom: 4 }}>{children}</span>;
}

function FlowBox({ label, sub, color = C.navy, small, width }) {
  return (
    <div style={{ background: color, color: "#fff", borderRadius: 6, padding: small ? "7px 10px" : "10px 14px", textAlign: "center", minWidth: width || (small ? 80 : 100), fontSize: small ? 10.5 : 12, fontWeight: 600, lineHeight: 1.3, flexShrink: 0 }}>
      {label}
      {sub && <div style={{ fontSize: small ? 9 : 10, fontWeight: 400, opacity: 0.8, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function FlowArrow({ vertical }) {
  if (vertical) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4px 0" }}>
      <div style={{ width: 2, height: 18, background: C.border }} />
      <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "7px solid " + C.textLight }} />
    </div>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "0 3px", flexShrink: 0 }}>
      <div style={{ width: 16, height: 2, background: C.border }} />
      <div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "7px solid " + C.textLight }} />
    </div>
  );
}

function ExpandBlock({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid " + C.borderLight, borderRadius: 6, marginTop: 10, overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", border: "none", background: open ? C.highlight : "#FAFBFC", padding: "10px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, fontWeight: 600, color: C.navy, textAlign: "left" }}>
        {title}
        <span style={{ fontSize: 16, color: C.textLight, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
      </button>
      {open && <div style={{ padding: "14px 16px", fontSize: 12.5, lineHeight: 1.65, color: C.text, borderTop: "1px solid " + C.borderLight }}>{children}</div>}
    </div>
  );
}

function MeritOrderSVG() {
  const techs = [
    { name: "Nucl.", cost: 12, mw: 63, color: "#6B21A8" },
    { name: "Hydro", cost: 5, mw: 25, color: "#0369A1" },
    { name: "Éolien", cost: 0, mw: 35, color: "#059669" },
    { name: "Solaire", cost: 0, mw: 45, color: "#D97706" },
    { name: "CCGT", cost: 45, mw: 40, color: "#DC2626" },
    { name: "TAC", cost: 80, mw: 15, color: "#991B1B" },
  ];
  const W=480,H=200,pad={t:20,r:20,b:40,l:50},cW=W-pad.l-pad.r,cH=H-pad.t-pad.b,maxC=95,totalMW=techs.reduce((s,t)=>s+t.mw,0);
  let cumX=0; const demandMW=180,demandX=pad.l+(demandMW/totalMW)*cW,marginalPrice=45,marginalY=pad.t+cH-(marginalPrice/maxC)*cH;
  return (
    <div style={{ background: "#F8FAFC", borderRadius: 8, padding: "16px 10px 8px", margin: "12px 0", overflowX: "auto" }}>
      <svg viewBox={"0 0 "+W+" "+H} style={{ width: "100%", maxWidth: 480, display: "block", margin: "0 auto" }}>
        <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H-pad.b} stroke={C.border} strokeWidth={1.5}/>
        <line x1={pad.l} y1={H-pad.b} x2={W-pad.r} y2={H-pad.b} stroke={C.border} strokeWidth={1.5}/>
        <text x={14} y={H/2} textAnchor="middle" fontSize={8.5} fill={C.textLight} transform={"rotate(-90,14,"+(H/2)+")"}>€/MWh</text>
        <text x={W/2} y={H-6} textAnchor="middle" fontSize={8.5} fill={C.textLight}>Capacité cumulée (GW)</text>
        {[20,40,60,80].map(v=>{const y=pad.t+cH-(v/maxC)*cH;return<g key={v}><line x1={pad.l} y1={y} x2={W-pad.r} y2={y} stroke={C.borderLight} strokeWidth={0.5} strokeDasharray="3,3"/><text x={pad.l-6} y={y+3} textAnchor="end" fontSize={8} fill={C.textLight} fontFamily="monospace">{v}</text></g>;})}
        {techs.map((t,i)=>{const bW=(t.mw/totalMW)*cW,bH=Math.max(((t.cost+8)/maxC)*cH,14),x=pad.l+cumX,y=pad.t+cH-bH;cumX+=bW;return<g key={i}><rect x={x+1} y={y} width={bW-2} height={bH} fill={t.color} rx={2} opacity={0.9}/><text x={x+bW/2} y={y+bH/2+1} textAnchor="middle" dominantBaseline="middle" fontSize={8} fill="#fff" fontWeight="600">{t.name}</text><text x={x+bW/2} y={y-5} textAnchor="middle" fontSize={7.5} fill={t.color} fontWeight="500" fontFamily="monospace">{t.cost===0?"≈0":t.cost}€</text></g>;})}
        <line x1={demandX} y1={pad.t-5} x2={demandX} y2={H-pad.b+5} stroke={C.navy} strokeWidth={1.5} strokeDasharray="5,3"/>
        <text x={demandX+4} y={pad.t+8} fontSize={8} fill={C.navy} fontWeight="600">Demande</text>
        <line x1={pad.l} y1={marginalY} x2={demandX} y2={marginalY} stroke={C.red} strokeWidth={1} strokeDasharray="3,2"/>
        <circle cx={demandX} cy={marginalY} r={3.5} fill={C.red}/>
        <text x={pad.l+4} y={marginalY-5} fontSize={7.5} fill={C.red} fontWeight="600">Prix spot = 45 €/MWh</text>
      </svg>
      <div style={{ fontSize: 11, color: C.textMid, textAlign: "center", marginTop: 4, lineHeight: 1.5, padding: "0 10px" }}>
        La dernière centrale appelée (CCGT ici) fixe le prix pour <em>toutes</em> les centrales. Solaire & éolien (coût marginal ≈ 0) captent la totalité du prix spot comme marge brute.
      </div>
    </div>
  );
}

function DuckCurveSVG() {
  const W=480,H=180,pad={t:25,r:20,b:35,l:45},cW=W-pad.l-pad.r,cH=H-pad.t-pad.b;
  const demand=[52,48,45,44,43,44,52,62,65,63,60,58,57,56,55,56,60,68,72,70,65,60,56,53];
  const solar=[0,0,0,0,0,0,0,2,12,22,30,35,36,34,28,18,8,1,0,0,0,0,0,0];
  const netDemand=demand.map((d,i)=>d-solar[i]);
  const maxV=80,toX=i=>pad.l+(i/23)*cW,toY=v=>pad.t+cH-(v/maxV)*cH;
  const pathD=arr=>arr.map((v,i)=>(i===0?"M":"L")+toX(i)+","+toY(v)).join(" ");
  const solarFill="M"+toX(0)+","+toY(0)+" "+solar.map((v,i)=>"L"+toX(i)+","+toY(v)).join(" ")+" L"+toX(23)+","+toY(0)+" Z";
  return (
    <div style={{ background: "#F8FAFC", borderRadius: 8, padding: "14px 10px 8px", margin: "12px 0", overflowX: "auto" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.textLight, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6, paddingLeft: 10 }}>Courbe de canard (Duck Curve) — profil journalier type</div>
      <svg viewBox={"0 0 "+W+" "+H} style={{ width: "100%", maxWidth: 480, display: "block", margin: "0 auto" }}>
        <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H-pad.b} stroke={C.border} strokeWidth={1}/>
        <line x1={pad.l} y1={H-pad.b} x2={W-pad.r} y2={H-pad.b} stroke={C.border} strokeWidth={1}/>
        {[0,6,12,18,23].map(h=><text key={h} x={toX(h)} y={H-pad.b+14} textAnchor="middle" fontSize={8} fill={C.textLight} fontFamily="monospace">{h}h</text>)}
        <text x={14} y={H/2} textAnchor="middle" fontSize={8} fill={C.textLight} transform={"rotate(-90,14,"+(H/2)+")"}>GW</text>
        <path d={solarFill} fill="#D9770622"/>
        <path d={pathD(demand)} fill="none" stroke={C.navy} strokeWidth={2}/>
        <path d={pathD(netDemand)} fill="none" stroke={C.amber} strokeWidth={2} strokeDasharray="5,3"/>
        <path d={pathD(solar)} fill="none" stroke="#D97706" strokeWidth={1.5}/>
        <text x={toX(20)} y={toY(demand[20])-6} fontSize={8} fill={C.navy} fontWeight="600">Demande brute</text>
        <text x={toX(18)+10} y={toY(netDemand[18])+14} fontSize={8} fill={C.amber} fontWeight="600">Demande résiduelle</text>
        <text x={toX(12)} y={toY(solar[12])-6} fontSize={8} fill="#D97706" fontWeight="600">Production solaire</text>
        <line x1={toX(17)} y1={toY(netDemand[17])} x2={toX(17)} y2={toY(demand[17])} stroke={C.red} strokeWidth={1} strokeDasharray="2,2"/>
        <text x={toX(17)+4} y={toY((netDemand[17]+demand[17])/2)+3} fontSize={7} fill={C.red} fontWeight="600">Rampe</text>
      </svg>
      <div style={{ display: "flex", gap: 8, marginTop: 8, padding: "0 10px", flexWrap: "wrap" }}>
        {[{c:"#D97706",t:"Creux solaire : prix s'effondrent en milieu de journée"},{c:C.amber,t:"Rampe du soir : montée brutale de demande résiduelle → prix peak"},{c:C.red,t:"Volatilité intra-day = opportunité pour le stockage (arbitrage)"}].map((item,i)=>(
          <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start", fontSize: 10.5, color: C.textMid, lineHeight: 1.4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: item.c, marginTop: 2, flexShrink: 0 }}/>{item.t}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionIntro() {
  return (<>
    <SectionTitle num="00" title="Vue d'ensemble" subtitle="De développeur pur à IPP intégré — le shift fondamental qui sous-tend toute la mission Akuo" />
    <Card title="Qu'est-ce qu'un IPP ?" icon="🏗️" accent={C.navy}>
      <p>Un <strong>Independent Power Producer (IPP)</strong> est un acteur privé qui développe, finance, construit et exploite des centrales de production d'électricité. Le terme couvre un spectre large :</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, margin: "14px 0" }}>
        {[
          { title: "Développeur pur", desc: "Développe le projet puis vend le SPV avant ou après construction. Revenus = marge de développement. Peu de capital immobilisé.", color: "#3B82F6", tag: "Asset-light" },
          { title: "IPP semi-intégré", desc: "Conserve certains actifs, en vend d'autres (build, partially hold). Equity sélective. Revenus mixtes.", color: C.teal, tag: "Transition" },
          { title: "IPP intégré", desc: "Conserve les actifs, injecte de l'equity, capte les revenus d'exploitation sur 20-30 ans. WACC = avantage compétitif.", color: C.navy, tag: "Asset-heavy" },
        ].map((m,i)=>(
          <div key={i} style={{ background: m.color+"08", borderRadius: 8, padding: 14, borderTop: "3px solid "+m.color }}>
            <MiniTag color={m.color}>{m.tag}</MiniTag>
            <div style={{ fontWeight: 700, fontSize: 13, color: m.color, margin: "6px 0 4px" }}>{m.title}</div>
            <div style={{ fontSize: 11.5, color: C.textMid, lineHeight: 1.55 }}>{m.desc}</div>
          </div>
        ))}
      </div>
      <Callout type="akuo"><strong>Akuo pré-Ardian :</strong> développeur pur — maximisation des revenus de développement, peu d'equity. <strong>Post-Ardian (juillet 2025) :</strong> bascule vers IPP intégré, equity at stake. Les critères changent : ce n'est plus la marge de dev qui compte mais le <strong>project IRR vs. hurdle rate</strong> et la <strong>récurrence des cash flows</strong>.</Callout>
    </Card>
    <Card title="Chaîne de valeur d'un projet renouvelable" icon="⛓️" accent={C.teal}>
      <div style={{ overflowX: "auto", padding: "10px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 650 }}>
          {[
            { label: "Origination", sub: "Site, foncier, études", color: C.navy, metric: "DEVEX" },
            { label: "Développement", sub: "Permitting, études, grid", color: C.navyLight, metric: "DEVEX" },
            { label: "FID", sub: "Go/No-go", color: C.amber, metric: "Decision" },
            { label: "Construction", sub: "EPC, procurement", color: C.teal, metric: "CAPEX" },
            { label: "COD", sub: "Mise en service", color: C.green, metric: "Milestone" },
            { label: "Exploitation", sub: "O&M, monitoring, OT", color: "#0D9488", metric: "OPEX" },
            { label: "Vente d'énergie", sub: "Revenue stack, EMS", color: C.amber, metric: "Revenus" },
          ].map((s,i)=>(
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <FlowBox label={s.label} sub={s.sub} color={s.color} small />
              {i<6&&<FlowArrow/>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
        <div style={{ background: "#FEF2F2", borderRadius: 6, padding: "10px 14px" }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: C.red }}>← Phase cash-out (2-7 ans)</div>
          <div style={{ fontSize: 11, color: C.textMid, marginTop: 2 }}>Dépenses sans revenus. Capital à risque. Time-to-COD = variable critique.</div>
        </div>
        <div style={{ background: "#F0FDF4", borderRadius: 6, padding: "10px 14px" }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: C.green }}>Phase cash-in (20-35 ans) →</div>
          <div style={{ fontSize: 11, color: C.textMid, marginTop: 2 }}>Revenus récurrents. Qualité dépend du revenue stack (secured vs. merchant).</div>
        </div>
      </div>
    </Card>
    <Card title="Glossaire structurant" icon="📖" accent={C.slate}>
      <Def term="SPV">Special Purpose Vehicle — société projet dédiée à un seul actif. L'unité de base du M&A dans les renouvelables : on achète/vend le SPV, pas l'actif physique.</Def>
      <Def term="EPC">Engineering, Procurement & Construction — contrat clé en main de construction. Le contractant assume le risque de coût et de délai (lump sum turnkey).</Def>
      <Def term="O&M">Operations & Maintenance — maintenance préventive et corrective, surveillance des équipements. Peut être internalisé ou externalisé (OEM ou tiers).</Def>
      <Def term="OT">Operational Technology — couche de contrôle temps réel : SCADA, capteurs, automatisation. Critique pour la performance et le monitoring à distance.</Def>
      <Def term="EMS">Energy Management System — optimisation en temps réel du dispatch, trading intra-day, participation aux marchés de flexibilité. Le « cerveau » de la valorisation.</Def>
      <Def term="COD">Commercial Operation Date — date de mise en service commerciale. Point d'inflexion cash-out → cash-in.</Def>
      <Def term="FID">Final Investment Decision — décision de lancer la construction. Pré-requis : permis, financement, offtake sécurisé.</Def>
    </Card>
  </>);
}

function SectionMarket() {
  return (<>
    <SectionTitle num="01" title="Marché électrique" subtitle="Comment se forme le prix de l'électricité, et pourquoi c'est le point de départ de toute analyse renouvelable" />
    <Card title="Le merit order : formation des prix spot" icon="📊" accent={C.navy}>
      <p>L'électricité se vend sur un marché de gros (wholesale) où le prix est fixé <strong>heure par heure</strong> par le merit order. Les centrales sont classées par coût marginal croissant et appelées dans cet ordre jusqu'à satisfaire la demande. La dernière unité appelée — la <em>marginale</em> — fixe le prix pour toutes.</p>
      <MeritOrderSVG />
      <Callout type="key"><strong>Conséquence fondamentale :</strong> les ENR (coût marginal ≈ 0) sont toujours appelées en premier. Elles ne fixent pas le prix — elles le subissent. Leur rentabilité dépend du prix fixé par les fossiles marginales. Plus il y a d'ENR, plus elles poussent les fossiles hors du merit order → le prix baisse → <strong>effet de cannibalization</strong>.</Callout>
    </Card>
    <Card title="Duck curve et volatilité intra-day" icon="🦆" accent={C.amber}>
      <p>La pénétration massive du solaire crée un profil caractéristique de la demande résiduelle (demande brute – production ENR), surnommé la « duck curve » :</p>
      <DuckCurveSVG />
      <Callout type="info"><strong>Pourquoi c'est stratégique :</strong> La duck curve crée un spread intra-day entre prix creux (midi) et prix peak (rampe du soir). Ce spread est la raison d'être économique du <strong>stockage batterie</strong> : acheter aux creux, revendre aux peaks.</Callout>
    </Card>
    <Card title="Capture price vs. wholesale price" icon="⚠️" accent={C.red}>
      <p>La distinction la plus critique pour la rentabilité réelle :</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "12px 0" }}>
        <div style={{ background: C.navy+"08", borderRadius: 8, padding: 14, borderTop: "3px solid "+C.navy }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: C.navy }}>Prix wholesale moyen</div>
          <div style={{ fontSize: 11.5, color: C.textMid, marginTop: 4, lineHeight: 1.55 }}>Moyenne arithmétique du prix spot sur toutes les heures (baseload). Le prix « titre » du marché.</div>
        </div>
        <div style={{ background: C.amber+"12", borderRadius: 8, padding: 14, borderTop: "3px solid "+C.amber }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: C.amber }}>Capture price</div>
          <div style={{ fontSize: 11.5, color: C.textMid, marginTop: 4, lineHeight: 1.55 }}>Moyenne du prix spot <strong>pondérée par le profil de production</strong> réel. Le prix que le producteur capte <em>réellement</em>. Toujours ≤ wholesale pour ENR.</div>
        </div>
      </div>
      <p>Le <strong>capture ratio</strong> = capture price / wholesale price. Un ratio de 0.75 = le solaire ne capte que 75% du prix moyen. Ce ratio se dégrade avec la pénétration — c'est la <strong>cannibalization</strong>.</p>
      <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", margin: "10px 0", padding: 12, background: "#FFF7ED", borderRadius: 6, border: "1px solid #FED7AA" }}>
        <FlowBox label="+ de solaire" color="#D97706" small/>
        <FlowArrow/>
        <FlowBox label="Production corrélée" color="#B45309" small/>
        <FlowArrow/>
        <FlowBox label="Prix bas midi" color="#92400E" small/>
        <FlowArrow/>
        <FlowBox label="Capture price ↓" color="#78350F" small/>
      </div>
      <ExpandBlock title="📐 Prix négatifs — quand le producteur paie pour injecter">
        <p>Dans les marchés matures (Allemagne, Espagne, Australie), les prix spot deviennent <strong>négatifs</strong> certaines heures : les producteurs <em>paient</em> pour injecter. Raison : production ENR + nucléaire (inflexible) &gt; demande, et les coûts d'arrêt/redémarrage &gt; perte liée aux prix négatifs.</p>
        <p style={{marginTop:8}}><strong>Impact :</strong> les contrats CfD/complément de rémunération suspendent souvent les paiements pendant les heures de prix négatifs. Un projet avec 5-10% d'heures à prix négatif voit sa rentabilité significativement impactée.</p>
      </ExpandBlock>
      <ExpandBlock title="📐 Basis risk et marchés zonaux">
        <p>Dans un marché <strong>zonal</strong> (Nordics, Italie), le prix diffère par zone géographique selon les congestions réseau. Le <strong>basis risk</strong> = risque que le prix local ≠ le prix du contrat de couverture (souvent indexé sur le prix national/hub). Un PPA indexé sur le prix national ne protège pas contre un effondrement local.</p>
      </ExpandBlock>
    </Card>
  </>);
}

function SectionTech() {
  const techs = [
    { name: "Solaire PV", icon: "☀️", color: "#D97706",
      kpis: [["Load factor","12-22%","Ratio énergie produite / capacité max théorique"],["CAPEX","500-700 €/kWc","Utility-scale, 2025"],["LCOE","30-55 €/MWh","Plus bas que le CCGT dans la plupart des marchés"],["Durée de vie","30-35 ans","Dégradation ~0.4%/an"],["Time to permit","1-4 ans","1 an Pologne, 3-4 ans France"]],
      strengths: "LCOE le plus bas, rapidité de construction (6-12 mois post-FID), modularité (1 MW à 500 MW), risque technique quasi-nul.",
      risks: "Cannibalization forte (capture ratio en baisse), production concentrée midi, dépendance foncière (5-7 ha/MWc).",
      so_what: "Technologie par défaut. La question est « à quel capture price » et « quelle route-to-market pour protéger les revenus »." },
    { name: "Éolien onshore", icon: "🌬️", color: "#0369A1",
      kpis: [["Load factor","22-35%","Dépend du site et hauteur de mât"],["CAPEX","1 000-1 400 €/kW","Turbines 5-7 MW onshore, 2025"],["LCOE","40-70 €/MWh","Plus élevé mais meilleur capture price"],["Durée de vie","25-30 ans","Repowering possible à mi-vie"],["Time to permit","3-7 ans","Goulot n°1 en Europe de l'Ouest"]],
      strengths: "Profil complémentaire au solaire (hiver, nuit) → meilleur capture ratio. Repowering des sites matures = pipeline à moindre risque.",
      risks: "Acceptabilité sociale (bruit, paysage, biodiversité), permitting long et contentieux, recours juridiques (~20-30% annulation en France).",
      so_what: "Moins de volume que le solaire, mais capture price supérieur. Le right to win dépend de la capacité locale de permitting." },
    { name: "Stockage batterie (BESS)", icon: "🔋", color: "#7C3AED",
      kpis: [["Technologie","Li-ion LFP","Dominant pour stationnaire (durée, sécurité, coût)"],["CAPEX","200-350 €/kWh","Divisé par 3 en 5 ans"],["Durée typique","1-4 heures","2h standard, 4h pour capacity/arbitrage"],["Cycles de vie","5 000-8 000","~15-20 ans pour 1 cycle/jour"],["Revenue model","Value stacking","Empilement de services multiples"]],
      strengths: "Actif de flexibilité par excellence. Multiples revenue streams (arbitrage, FCR, aFRR, capacity, tolling). Co-location = améliore le capture price du parc ENR.",
      risks: "Business model complexe, revenues non contractualisables long terme (sauf tolling), dégradation des ancillary revenues avec montée BESS installé.",
      so_what: "Pas une 4ème technologie comparable — c'est un actif d'optimisation de portefeuille. Sa valeur dépend du market design et de la volatilité des prix." },
  ];
  return (<>
    <SectionTitle num="02" title="Technologies" subtitle="Solaire PV, éolien onshore et stockage batterie — les trois actifs du périmètre Akuo" />
    {techs.map((t,idx)=>(
      <Card key={idx} title={t.icon+" "+t.name} accent={t.color} noPad>
        <div style={{padding:"16px 22px"}}>
          <div style={{background:"#F8FAFC",borderRadius:6,overflow:"hidden",marginBottom:14,border:"1px solid "+C.borderLight}}>
            {t.kpis.map(([k,v,note],i)=>(
              <div key={i} style={{display:"flex",padding:"8px 14px",borderBottom:i<t.kpis.length-1?"1px solid "+C.borderLight:"none",alignItems:"center"}}>
                <div style={{width:120,fontWeight:600,fontSize:11.5,color:t.color,flexShrink:0}}>{k}</div>
                <div style={{width:120,fontWeight:700,fontSize:12.5,color:C.navy,flexShrink:0,fontFamily:"monospace"}}>{v}</div>
                <div style={{fontSize:11,color:C.textLight,flex:1}}>{note}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
            <div style={{background:"#F0FDF4",borderRadius:6,padding:"10px 14px"}}>
              <div style={{fontSize:11,fontWeight:700,color:C.green}}>✓ Forces</div>
              <div style={{fontSize:11.5,color:C.text,marginTop:3,lineHeight:1.55}}>{t.strengths}</div>
            </div>
            <div style={{background:"#FEF2F2",borderRadius:6,padding:"10px 14px"}}>
              <div style={{fontSize:11,fontWeight:700,color:C.red}}>✗ Risques</div>
              <div style={{fontSize:11.5,color:C.text,marginTop:3,lineHeight:1.55}}>{t.risks}</div>
            </div>
          </div>
          <Callout type="so"><strong>So what :</strong> {t.so_what}</Callout>
        </div>
      </Card>
    ))}
    <Card title="Co-location et actifs hybrides" icon="🔗" accent={C.teal}>
      <p>La <strong>co-location</strong> = stockage installé sur le même site qu'un parc ENR, partageant le raccordement réseau. Triple avantage :</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:10}}>
        {[{t:"Capture price amélioré",d:"Le BESS stocke la surproduction midi et revend au peak du soir → le parc capte le prix peak.",c:C.amber},{t:"Coûts partagés",d:"Un seul raccordement, un seul poste de transfo, un seul O&M → économies CAPEX + OPEX.",c:C.teal},{t:"Curtailment évité",d:"Si le réseau sature, le BESS absorbe l'excédent au lieu de le perdre.",c:C.green}].map((item,i)=>(
          <div key={i} style={{background:item.c+"08",borderRadius:6,padding:12,borderTop:"3px solid "+item.c}}>
            <div style={{fontWeight:700,fontSize:11.5,color:item.c,marginBottom:4}}>{item.t}</div>
            <div style={{fontSize:11,color:C.textMid,lineHeight:1.5}}>{item.d}</div>
          </div>
        ))}
      </div>
    </Card>
  </>);
}

function SectionRevenue() {
  return (<>
    <SectionTitle num="03" title="Revenue stack" subtitle="Les quatre routes-to-market — du plus sécurisé au plus exposé au prix de marché" />
    <Card title="L'empilement des revenus" icon="💰" accent={C.green} noPad>
      <div style={{padding:"16px 22px"}}><p>Le <strong>revenue stack</strong> = combinaison de contrats et d'expositions de marché qui monétisent la production. Axe n°3 de la segmentation CVA (Geography × Technology × <strong>Revenue stack</strong> × Entry route).</p></div>
      {[
        {label:"Support public / auction",risk:1,color:C.green,bank:"Très élevée",desc:"Tarif garanti par appel d'offres public : FiT, CfD ou complément de rémunération. Durée 15-20 ans. Revenus totalement prévisibles.",detail:"FiT = tarif fixe complet. CfD = strike price, settlement vs. spot. Complément de rémunération = prime au-dessus du spot (France, CRE). Tend à disparaître pour les grandes centrales au profit de mécanismes plus market-based."},
        {label:"PPA privé (corporate / utility)",risk:2,color:C.teal,bank:"Élevée",desc:"Contrat bilatéral long terme (7-15 ans) avec industriel ou utility. Prix fixe ou indexé.",detail:"Structures : pay-as-produced (risque volume au buyer), baseload PPA (producteur livre un profil plat → balancing nécessaire), virtual/financial PPA (settlement financier, pas de livraison physique — utilisé par corporates multi-sites). La qualité du counterparty (rating crédit) détermine la bankabilité."},
        {label:"Hybride (secured + merchant)",risk:3,color:C.amber,bank:"Modérée",desc:"Part contractualisée (PPA/auction) + part en exposition merchant. Équilibre risque/upside.",detail:"Ratio typique 50-70% secured / 30-50% merchant. La partie secured bankabilise le projet, la partie merchant offre l'upside. De plus en plus courant : corporates ne veulent pas 100% du volume, et les producteurs veulent garder de l'exposition prix."},
        {label:"Merchant + value stacking",risk:4,color:C.red,bank:"Faible",desc:"100% exposé au prix spot. Pas de contrat long terme. Revenus dépendent de la volatilité et du niveau des prix.",detail:"Vente day-ahead ou intra-day. Complété par ancillary services (FCR/aFRR/mFRR), capacity market, tolling. Le value stacking = empiler ces revenus. Surtout pertinent pour le BESS."},
      ].map((r,i)=>(
        <div key={i} style={{borderBottom:i<3?"1px solid "+C.borderLight:"none"}}>
          <div style={{display:"flex"}}>
            <div style={{width:6,background:r.color,flexShrink:0}}/>
            <div style={{padding:"16px 22px",flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{fontWeight:700,fontSize:14,color:r.color}}>{r.label}</div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:10.5,color:C.textLight}}>Risque</span>
                  <span style={{fontFamily:"monospace",fontSize:12}}>{"●●●●".split("").map((d,j)=><span key={j} style={{color:j<r.risk?r.color:C.borderLight}}>●</span>)}</span>
                  <span style={{fontSize:10.5,color:C.textLight,marginLeft:8}}>Bankabilité : <strong>{r.bank}</strong></span>
                </div>
              </div>
              <p style={{fontSize:12.5,lineHeight:1.6,color:C.text,margin:0}}>{r.desc}</p>
              <ExpandBlock title="Détail : structures et mécanismes"><p>{r.detail}</p></ExpandBlock>
            </div>
          </div>
        </div>
      ))}
      <div style={{padding:"12px 22px",background:"#FAFBFC",display:"flex",justifyContent:"space-between",fontSize:10.5,fontWeight:600,color:C.textLight}}>
        <span>← Visibilité long terme · Bankabilité · Levier dette élevé</span>
        <span>Upside potentiel · Exposition prix · Compétences trading →</span>
      </div>
    </Card>
    <Card title="Glossaire des mécanismes" icon="📖" accent={C.slate}>
      <Def term="FiT">Feed-in Tariff — tarif d'achat garanti 15-20 ans. En voie de disparition pour les grandes centrales.</Def>
      <Def term="CfD">Contract for Difference — strike price fixé par auction, settlement vs. spot. Protège producteur ET consommateur.</Def>
      <Def term="Ancillary services">FCR (fréquence primaire, secondes), aFRR (réserve automatique, minutes), mFRR (réserve manuelle). Le BESS excelle sur FCR/aFRR.</Def>
      <Def term="Capacity market">Rémunération pour être disponible en cas de pic. UK, France, Pologne. Revenue additionnel pour BESS et assets flexibles.</Def>
      <Def term="Tolling">Le propriétaire du BESS met l'actif à disposition d'un trader contre un loyer fixe. Revenus prévisibles.</Def>
      <Def term="Shape risk">Décalage profil production (intermittent) vs. profil livraison (baseload PPA). Coût de balancing qui érode la marge.</Def>
    </Card>
  </>);
}

function SectionLifecycle() {
  return (<>
    <SectionTitle num="04" title="Cycle de projet & entry routes" subtitle="Les trois chemins pour constituer un portefeuille et les métriques de coût / temps associées" />
    <Card title="Les 3 entry routes" icon="🔄" accent={C.navy}>
      {[
        {icon:"🌱",label:"Greenfield",color:C.green,desc:"Développement from scratch : site, foncier (bail emphytéotique 30-40 ans), permis, raccordement, construction.",pros:"Meilleur contrôle sur design et coûts. Marge de développement captée. Calibrage actif sur le revenue stack visé.",cons:"Time-to-COD long (3-7 ans). DEVEX à risque si le projet échoue. Hit rate < 100%.",metric:"DEVEX : 30-100 k€/MW · Hit rate : 30-70%"},
        {icon:"🔧",label:"Brownfield / Repowering",color:C.teal,desc:"Reprendre un site existant pour moderniser (repowering = remplacement turbines plus performantes) ou augmenter la capacité. Foncier sécurisé, grid existant, permitting simplifié.",pros:"Time-to-COD réduit (1-3 ans). Risque permitting atténué. En éolien, le repowering peut doubler la production avec moins de turbines.",cons:"Disponibilité limitée (parc vieillissant). Négociation propriétaire. Contraintes techniques héritées.",metric:"DEVEX : 15-50 k€/MW · Time-to-COD : 1-3 ans"},
        {icon:"🤝",label:"M&A / Platform build-up",color:C.navy,desc:"Racheter des SPV (projets), un portefeuille d'actifs ou une plateforme entière (équipe + pipeline + actifs). Accès instantané au marché.",pros:"Pas de time-to-COD pour les actifs en opération. Pipeline dérisqué. Acquisition équipe locale et relations. Parfois seul moyen d'entrer dans un nouveau marché.",cons:"Prime d'acquisition (marge de dev captée par le vendeur). Risque d'intégration. Due diligence coûteuse.",metric:"Premium : 100-300 k€/MW (ready-to-build) · Closing : 3-6 mois"},
      ].map((r,i)=>(
        <div key={i} style={{display:"flex",gap:0,borderRadius:8,overflow:"hidden",border:"1px solid "+r.color+"22",marginBottom:10}}>
          <div style={{background:r.color,color:"#fff",padding:"16px 14px",minWidth:110,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:28}}>{r.icon}</span>
            <div style={{fontWeight:700,fontSize:14,marginTop:6}}>{r.label}</div>
          </div>
          <div style={{padding:"14px 18px",flex:1}}>
            <p style={{fontSize:12.5,lineHeight:1.6,color:C.text,margin:"0 0 10px"}}>{r.desc}</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
              <div style={{background:"#F0FDF4",borderRadius:6,padding:"8px 12px"}}><div style={{fontSize:10,fontWeight:700,color:C.green}}>✓ Avantages</div><div style={{fontSize:11,color:C.textMid,marginTop:3,lineHeight:1.5}}>{r.pros}</div></div>
              <div style={{background:"#FEF2F2",borderRadius:6,padding:"8px 12px"}}><div style={{fontSize:10,fontWeight:700,color:C.red}}>✗ Limites</div><div style={{fontSize:11,color:C.textMid,marginTop:3,lineHeight:1.5}}>{r.cons}</div></div>
            </div>
            <div style={{fontSize:11,background:r.color+"0A",borderRadius:4,padding:"6px 10px",fontWeight:500,color:r.color,fontFamily:"monospace"}}>{r.metric}</div>
          </div>
        </div>
      ))}
      <Callout type="key"><strong>Question n°5 de la RFP :</strong> le ratio optimal greenfield / M&A par pays dépend du time-to-market cible, de la capacité locale de développement, du prix des actifs et de la maturité du pipeline existant.</Callout>
    </Card>
    <Card title="Métriques de coût et de temps" icon="📐" accent={C.teal}>
      <Def term="DEVEX">Development Expenditure — coûts pré-FID : études, permitting, foncier, consultants, juridique. 2-5% du CAPEX. Capital 100% à risque.</Def>
      <Def term="CAPEX">Capital Expenditure — coût de construction : équipements, BOS, EPC, raccordement. En €/kWc, €/kW ou €/kWh.</Def>
      <Def term="OPEX">Coûts d'exploitation annuels : O&M, assurance, loyer foncier, monitoring, taxes. En €/kW/an ou €/MWh. Internalisation O&M = -15-25% vs. contrat externe.</Def>
      <Def term="Hit rate">% de projets atteignant COD. ~30% éolien France → ~70% solaire Pologne. Impacte directement le coût réel par MW sécurisé.</Def>
      <Def term="Time to COD">Durée origination → COD. Chaque mois de retard = DEVEX porté plus longtemps + risque d'obsolescence des conditions marché.</Def>
    </Card>
  </>);
}

function SectionGrid() {
  return (<>
    <SectionTitle num="05" title="Réseau & permitting" subtitle="Les deux goulots d'étranglement du développement — accès réseau et autorisations administratives" />
    <Card title="Accès au réseau : le goulot critique" icon="🔌" accent="#6B21A8">
      <p>Un actif ENR ne vaut <em>rien</em> sans connexion réseau. Le raccordement est le facteur limitant n°1 dans de nombreux marchés.</p>
      <Def term="Grid connection">Raccordement physique au réseau transport (HTA/HTB) ou distribution. Nécessite demande formelle, étude de faisabilité, convention, travaux physiques.</Def>
      <Def term="Queue / file d'attente">Demande >> capacité dans beaucoup de pays. Italie ~200 GW en attente, Grèce ~45 GW. Les « queue raiders » bloquent le système.</Def>
      <Def term="Curtailment">Ordre du TSO de réduire/stopper la production quand le réseau sature. 2-8% de production annuelle dans les zones congestionnées = revenus perdus.</Def>
      <Def term="TSO / DSO">TSO = réseau haute tension national. DSO = réseau basse/moyenne tension local. ENR utility-scale → TSO ou HTA.</Def>
      <Def term="Renforcement réseau">Investissements TSO pour augmenter la capacité de transport. Horizon 5-15 ans. Si à charge du développeur → impact CAPEX.</Def>
      <Callout type="warn"><strong>Enjeu stratégique :</strong> sécuriser du grid en avance = avantage compétitif majeur. Dans les marchés congestionnés, le point de raccordement peut valoir plus que le projet lui-même. Critère de « right to win » dans le Step 2.</Callout>
    </Card>
    <Card title="Permitting : le facteur temps et le facteur pays" icon="📋" accent={C.navy}>
      <p>Le permitting est le processus d'obtention des autorisations. C'est le facteur n°1 de différenciation entre marchés.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,margin:"14px 0"}}>
        {[{t:"Environnement",d:"Études d'impact, faune/flore, zones protégées. Friction n°1 pour l'éolien.",c:C.green,icon:"🌿"},{t:"Urbanisme",d:"PLU/POS, distances, hauteur, zones agricoles. Baux emphytéotiques.",c:C.teal,icon:"🏘️"},{t:"Raccordement",d:"Convention TSO/DSO, étude de capacité, contribution aux travaux.",c:"#6B21A8",icon:"⚡"},{t:"Recours",d:"Oppositions de tiers. 70%+ des éoliens français font l'objet d'un recours. Durée 18-24 mois.",c:C.red,icon:"⚖️"}].map((item,i)=>(
          <div key={i} style={{background:item.c+"08",borderRadius:6,padding:12,borderTop:"3px solid "+item.c}}>
            <div style={{fontSize:16,marginBottom:4}}>{item.icon}</div>
            <div style={{fontWeight:700,fontSize:11.5,color:item.c,marginBottom:4}}>{item.t}</div>
            <div style={{fontSize:11,color:C.textMid,lineHeight:1.5}}>{item.d}</div>
          </div>
        ))}
      </div>
      <Callout type="so"><strong>So what :</strong> Un marché avec un LCOE attractif mais 6 ans de permitting et 30% de hit rate peut être moins rentable qu'un marché plus cher avec 2 ans et 70%. Le Step 1 évalue la « regulatory and execution risk » pour filtrer en amont.</Callout>
    </Card>
  </>);
}

function SectionFinance() {
  return (<>
    <SectionTitle num="06" title="Finance de projet" subtitle="IRR, WACC, hurdle rates et structure de financement — les concepts qui déterminent le go/no-go" />
    <Card title="Métriques de rentabilité" icon="📈" accent={C.navy}>
      <Def term="Project IRR">Taux qui annule la VAN des cash flows projet (CAPEX → revenus → OPEX sur la durée de vie). Rentabilité intrinsèque avant levier. Benchmark : 6-10% unlevered selon pays/risque.</Def>
      <Def term="Equity IRR">IRR sur les seuls flux actionnaire (après service dette). Plus élevé grâce au levier. Benchmark : 8-14%. KPI n°1 de décision d'investissement.</Def>
      <Def term="Hurdle rate">Rentabilité minimum exigée. Varie par pays (risque souverain, FX), technologie (maturité), revenue stack (sécurisation). IRR &lt; hurdle → no-go.</Def>
      <Def term="WACC">Coût moyen pondéré du capital (equity + dette). Avantage compétitif structurel : WACC à 5% vs. 7% = différence entre gagner ou perdre un auction. Le backing Ardian améliore le WACC d'Akuo.</Def>
      <Def term="LCOE">Levelized Cost of Energy = (CAPEX amortis + OPEX + financement) / MWh produits sur la durée de vie. LCOE &lt; capture price = marge positive.</Def>
      <Def term="DSCR">Debt Service Coverage Ratio = cash flow / service dette. Minimum 1.2x exigé par les prêteurs. Contrainte sur le levier maximum.</Def>
    </Card>
    <Card title="Structure de financement type" icon="🏦" accent={C.teal}>
      <p>Les projets ENR sont financés en <strong>project finance</strong> (non-recourse) : la dette est portée par le SPV, remboursée par les cash flows, sans recours sur le bilan du sponsor.</p>
      <div style={{display:"flex",gap:16,margin:"14px 0",flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:180,background:"#EFF6FF",borderRadius:8,padding:16,textAlign:"center"}}>
          <div style={{fontSize:32,fontWeight:800,color:"#1E40AF",fontFamily:"monospace"}}>70-85%</div>
          <div style={{fontSize:13,fontWeight:700,color:"#1E40AF",marginTop:2}}>Dette senior</div>
          <div style={{fontSize:11,color:C.textMid,marginTop:6,lineHeight:1.5,textAlign:"left"}}>Banques, fonds dette infra, green bonds. Taux : Euribor + 120-200 bps. Durée 15-20 ans. Levier dépend de la bankabilité de l'offtake.</div>
        </div>
        <div style={{flex:1,minWidth:180,background:"#F0FDF4",borderRadius:8,padding:16,textAlign:"center"}}>
          <div style={{fontSize:32,fontWeight:800,color:C.green,fontFamily:"monospace"}}>15-30%</div>
          <div style={{fontSize:13,fontWeight:700,color:C.green,marginTop:2}}>Equity sponsor</div>
          <div style={{fontSize:11,color:C.textMid,marginTop:6,lineHeight:1.5,textAlign:"left"}}>IPP (Akuo) + fonds infra (Ardian). Capital à risque — dernier remboursé, premier impacté. L'equity IRR est le rendement sur cette tranche.</div>
        </div>
      </div>
      <Callout type="key"><strong>Bankabilité :</strong> CfD 20 ans = levier 80-85%. 100% merchant = levier 50-60% max. La différence de levier impacte directement l'equity IRR. C'est pourquoi le revenue stack est un axe de segmentation.</Callout>
    </Card>
  </>);
}

function SectionCompetition() {
  return (<>
    <SectionTitle num="07" title="Concurrence & consolidation" subtitle="Qui sont les acteurs, comment le marché se structure, et où Akuo se positionne" />
    <Card title="Typologie des acteurs" icon="🏢" accent={C.navy}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"10px 0"}}>
        {[
          {t:"Utilities intégrées",ex:"EDF RE, Iberdrola, Enel, Ørsted, RWE",d:"Bilan massif, WACC bas (investment grade), trading desk intégré. Mais lents et bureaucratiques. Actifs en auction.",c:"#1E40AF",tag:"WACC advantage"},
          {t:"Grands IPP indépendants",ex:"Neoen, Voltalia, BayWa r.e., ERG, Lightsource bp",d:"Agilité + accès capital. Peer group direct d'Akuo. Spécialisés par région/techno. Valorisés sur pipeline + MW.",c:C.green,tag:"Peer group Akuo"},
          {t:"Développeurs purs / locaux",ex:"Nombreux acteurs par pays",d:"Équipes légères, connaissance terrain. Vendent les projets aux IPP/utilities. Cibles d'acquisition naturelles.",c:C.amber,tag:"M&A targets"},
          {t:"Fonds infra / financial sponsors",ex:"Ardian, Brookfield, Macquarie, GIP, CDPQ",d:"Capital patient, objectifs 8-12% net IRR. Assemblent des plateformes. Ardian = sponsor d'Akuo.",c:"#7C3AED",tag:"Ardian = sponsor Akuo"},
        ].map((a,i)=>(
          <div key={i} style={{borderRadius:8,padding:16,border:"1px solid "+a.c+"20",borderTop:"3px solid "+a.c}}>
            <MiniTag color={a.c}>{a.tag}</MiniTag>
            <div style={{fontWeight:700,fontSize:13.5,color:a.c,margin:"6px 0 2px"}}>{a.t}</div>
            <div style={{fontSize:10.5,color:C.textLight,fontStyle:"italic",marginBottom:6}}>{a.ex}</div>
            <div style={{fontSize:11.5,color:C.text,lineHeight:1.55}}>{a.d}</div>
          </div>
        ))}
      </div>
      <Callout type="warn"><strong>Consolidation :</strong> les développeurs purs n'ont pas les bilans pour l'equity at stake. Les utilities rachètent du pipeline. Les fonds assemblent des plateformes. Akuo+Ardian doit se positionner comme <strong>consolidateur</strong> ou risque de devenir cible.</Callout>
    </Card>
    <Card title="Right to win — concept clé du Step 2" icon="🎯" accent={C.teal}>
      <p>Le right to win évalue la capacité <em>réelle</em> d'Akuo à performer dans un segment, benchmarqué contre les meilleurs locaux. Pas « est-ce attractif ? » mais « est-ce qu'Akuo peut y gagner ? »</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,margin:"12px 0"}}>
        {[{t:"Capabilities",items:["Force équipe locale","Track record permitting","Relations politiques/admin","Sourcing foncier"],c:C.navy},{t:"Market access",items:["Réseau PPAs/offtakers","Position queues grid","Accès aux auctions","Partenariats locaux"],c:C.teal},{t:"Operating model",items:["Développement internalisé ?","EPC géré en interne ?","O&M / OT maîtrisé ?","Energy management propre ?"],c:C.amber}].map((col,i)=>(
          <div key={i} style={{background:col.c+"06",borderRadius:6,padding:12,borderTop:"3px solid "+col.c}}>
            <div style={{fontWeight:700,fontSize:12,color:col.c,marginBottom:8}}>{col.t}</div>
            {col.items.map((item,j)=><div key={j} style={{fontSize:11,color:C.textMid,padding:"3px 0",display:"flex",gap:6,alignItems:"center"}}><div style={{width:4,height:4,borderRadius:"50%",background:col.c,flexShrink:0}}/>{item}</div>)}
          </div>
        ))}
      </div>
    </Card>
  </>);
}

function SectionPortfolio() {
  return (<>
    <SectionTitle num="08" title="Effets de portefeuille" subtitle="Pourquoi l'assemblage du portefeuille compte autant que la qualité individuelle des projets" />
    <Card title="Diversification et complémentarité" icon="🧩" accent={C.navy}>
      <p>Un portefeuille d'actifs ENR n'est pas une simple somme de projets. Les <strong>effets de portefeuille</strong> créent (ou détruisent) de la valeur au niveau agrégé :</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"14px 0"}}>
        {[
          {t:"Diversification géographique",d:"Corrélation météo faible entre pays → volatilité production réduite → meilleur profil cash flow → meilleur rating crédit → WACC réduit.",icon:"🌍",c:C.navy},
          {t:"Complémentarité technologique",d:"Solaire (diurne, été) + éolien (variable, hiver) = profil plus plat → capture price moyen du portefeuille supérieur à la somme des individuels.",icon:"⚡",c:C.teal},
          {t:"Route-to-market synergies",d:"Portefeuille diversifié = PPAs shaped (livraison plus plate) possibles → meilleure valorisation. L'EMS optimise au niveau portefeuille, pas projet par projet.",icon:"💰",c:C.amber},
          {t:"Absorption coûts fixes",d:"Country manager + bureau + juridique coûtent autant pour 50 MW que 500 MW. Taille critique par pays = enjeu de profitabilité. Trop de pays × trop peu de MW = dilution des marges.",icon:"📊",c:C.red},
        ].map((item,i)=>(
          <div key={i} style={{borderRadius:8,padding:14,border:"1px solid "+item.c+"20",borderLeft:"4px solid "+item.c}}>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}><span style={{fontSize:18}}>{item.icon}</span><span style={{fontWeight:700,fontSize:13,color:item.c}}>{item.t}</span></div>
            <div style={{fontSize:12,color:C.text,lineHeight:1.6}}>{item.d}</div>
          </div>
        ))}
      </div>
      <Callout type="akuo"><strong>Trade-off central (question n°9) :</strong> Akuo est dans 3 régions, 10+ pays. Diversification = bénéfices portefeuille (météo, régulation, FX) mais <strong>coûts fixes de complexité</strong> (équipes, bureaux, compliance, management attention). L'enjeu = trouver le point optimal. La méthodologie CVA traite ce sujet dans le Step 3.</Callout>
    </Card>
  </>);
}

function SectionAkuo() {
  return (<>
    <SectionTitle num="09" title="Mission Akuo" subtitle="Le contexte spécifique de la mission — de la RFP aux questions stratégiques" />
    <Card title="Le défi stratégique" icon="🎯" accent={C.navy} noPad>
      <div style={{padding:"16px 22px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
          {[
            {label:"Point de départ",color:C.navy,items:["2 GW en opération","Pipeline global","Développeur pur historiquement","Acquisition Ardian juillet 2025","3 régions, 10+ pays"]},
            {label:"Ambition 2030",color:C.teal,items:["5 GW opération / construction","IPP intégré, equity at stake","Pipeline auto-régénérant","Modèle opérationnel optimisé","Capital allocation disciplinée"]},
            {label:"Ce qui change",color:C.amber,items:["Critères = IRR vs. marge dev","Besoin de recurring cash flows","WACC = avantage compétitif","Capital à risque → discipline accrue","Consolidation = opportunité"]},
          ].map((col,i)=>(
            <div key={i} style={{background:col.color+"08",borderRadius:8,padding:14,borderTop:"3px solid "+col.color}}>
              <div style={{fontWeight:700,fontSize:13,color:col.color,marginBottom:8}}>{col.label}</div>
              {col.items.map((item,j)=><div key={j} style={{fontSize:11.5,color:C.text,padding:"3px 0",display:"flex",gap:6,alignItems:"flex-start",lineHeight:1.4}}><div style={{width:4,height:4,borderRadius:"50%",background:col.color,marginTop:5,flexShrink:0}}/>{item}</div>)}
            </div>
          ))}
        </div>
      </div>
      <div style={{background:"#FAFBFC",padding:"16px 22px",borderTop:"1px solid "+C.borderLight}}>
        <div style={{fontWeight:700,fontSize:14,color:C.navy,marginBottom:12}}>Les 9 questions stratégiques de la RFP</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 16px"}}>
          {[["Sélection pays","Stay / accelerate / exit / enter"],["Forces & faiblesses","Diagnostic par pays"],["Facteurs clés de succès","Position vs. concurrence"],["Cible de pipeline","MW par pays"],["Mix greenfield / M&A","Ratio par pays et techno"],["Rôle dans la consolidation","Consolidateur ou cible ?"],["Make or buy","Dev, EPC, O&M, OT, EMS"],["Effets de portefeuille","Géo, techno, route-to-market"],["Diversification vs. complexité","3 régions, 10+ pays"]].map(([q,d],i)=>(
            <div key={i} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:"1px solid "+C.borderLight,alignItems:"center"}}>
              <div style={{background:C.navy,color:"#fff",borderRadius:4,width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0}}>{i+1}</div>
              <div><span style={{fontWeight:600,fontSize:12,color:C.navy}}>{q}</span> <span style={{fontSize:11,color:C.textLight}}>— {d}</span></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:"16px 22px"}}>
        <div style={{fontWeight:700,fontSize:14,color:C.navy,marginBottom:10}}>Périmètre géographique</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div style={{background:C.navy+"08",borderRadius:8,padding:14}}>
            <div style={{fontWeight:700,fontSize:12,color:C.navy,marginBottom:6}}>Groupe A — pays de présence</div>
            <div style={{fontSize:11.5,color:C.text,lineHeight:1.7}}>
              <MiniTag color={C.navy}>Europe Ouest</MiniTag> France (+ DOM-TOM), Portugal<br/>
              <MiniTag color={C.teal}>Europe Est</MiniTag> Pologne, Croatie, Monténégro, Serbie, Kosovo, Macédoine du Nord, Grèce, Bulgarie<br/>
              <MiniTag color={C.amber}>LatAm</MiniTag> Uruguay, Chili, Rép. Dominicaine<br/>
              <MiniTag color={C.textLight}>Autre</MiniTag> Nouvelle-Zélande
            </div>
          </div>
          <div style={{background:C.teal+"08",borderRadius:8,padding:14}}>
            <div style={{fontWeight:700,fontSize:12,color:C.teal,marginBottom:6}}>Groupe B — pays adjacents</div>
            <div style={{fontSize:11.5,color:C.text,lineHeight:1.7}}>Italie, Royaume-Uni, Allemagne — et tout autre marché pertinent.<br/><br/><strong style={{color:C.red}}>US hors périmètre</strong> — explicitement exclu.</div>
          </div>
        </div>
      </div>
    </Card>
    <Card title="Deliverables attendus" icon="📦" accent={C.teal}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        {[{num:"I",t:"State of the Market",d:"Pays par pays : macro, supply/demand, mégatrends, data centers, coûts ENR, grid, régulation, permitting, route-to-market, concurrence, scénarios.",c:C.navy},{num:"II",t:"Country Benchmarks",d:"Comparaison inter-pays : équipes, permitting, offtake, soutien politique, coût du capital.",c:C.teal},{num:"III",t:"Conclusions",d:"Gaps, North Star, postures par pays, technologies, revenue stack, make-or-buy, plan d'implémentation.",c:C.amber}].map((d,i)=>(
          <div key={i} style={{borderRadius:8,padding:14,border:"1px solid "+d.c+"22",borderTop:"3px solid "+d.c}}>
            <div style={{fontWeight:800,fontSize:20,color:d.c,fontFamily:"monospace"}}>{d.num}</div>
            <div style={{fontWeight:700,fontSize:13,color:d.c,margin:"4px 0 6px"}}>{d.t}</div>
            <div style={{fontSize:11,color:C.textMid,lineHeight:1.55}}>{d.d}</div>
          </div>
        ))}
      </div>
    </Card>
  </>);
}

function SectionMethod() {
  return (<>
    <SectionTitle num="10" title="Méthodologie CVA" subtitle="Notre approche en 3 étapes — de l'univers pays au plan d'action par segment" />
    <Card title="Architecture de la méthodologie" icon="🏛️" accent={C.navy}>
      <p style={{marginBottom:14}}>Segmentation en <strong>4 axes</strong> converties en une <strong>unité commune d'analyse</strong>, et process en <strong>3 étapes</strong> (filtrage pays → scoring opportunités → réconciliation portefeuille).</p>
      <div style={{background:"#F8FAFC",borderRadius:8,padding:"16px 20px",border:"1px solid "+C.borderLight,marginBottom:16}}>
        <div style={{fontSize:11.5,fontWeight:700,color:C.textLight,textTransform:"uppercase",letterSpacing:0.5,marginBottom:10}}>Unité commune d'analyse</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,flexWrap:"wrap"}}>
          {[{l:"Géographie",s:"Pays / zone",c:C.navy},{l:"Technologie",s:"Solar / Wind / BESS",c:C.teal},{l:"Revenue stack",s:"Auction → Merchant",c:C.amber},{l:"Entry route",s:"GF / BF / M&A",c:C.green}].map((a,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
              <FlowBox label={a.l} sub={a.s} color={a.c} small width={110}/>
              {i<3&&<span style={{fontSize:18,color:C.textLight,fontWeight:300}}>×</span>}
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:10,fontSize:11,color:C.textMid}}>Chaque cellule (ex : <em>Pologne × Solaire × PPA privé × Greenfield</em>) est scorée et comparée like-for-like</div>
      </div>
    </Card>
    {[
      {step:"Step 1",title:"Geography filtering",color:C.navy,icon:"🌍",question:"Quels pays sont intrinsèquement attractifs, compatibles avec les guardrails stratégiques et scalables ?",unit:"Géographie + strategic fit",output:"Keep / Reserve / Drop",criteria:[["Market depth & growth","Installé, commissioning, ambitions 2030, tender cadence, CAPEX adressable"],["Power market economics","Wholesale & capture prices, cannibalization, curtailment, spreads"],["Route-to-market depth","Schemes/auctions, PPA depth, merchant feasibility, hedging, EMS maturity"],["Regulatory & execution risk","Permitting duration & hit rate, grid access, political support"],["Competition & consolidation","Developer density, utility presence, M&A access, partnerability"],["Strategic fit & scalability","Recurring origination, footprint relevance, FX, diversification"]],templates:"Templates 1A + 1B + 1C"},
      {step:"Step 2",title:"Opportunity filtering",color:C.teal,icon:"🔬",question:"Dans les pays shortlistés, quelles cellules d'opportunité offrent le meilleur fit risque-ajusté ?",unit:"Géo × Techno × Revenue stack × Entry route",output:"Segments prioritaires + mix greenfield/M&A",criteria:[["Technology-specific viability","Resource, captured price, site availability, load factors, repowering"],["Revenue stack attractiveness","Price vs. cost, tenor, counterparty quality, merchant upside, value stacking"],["Entry route attractiveness","DEVEX, time-to-permit, brownfield readiness, M&A availability"],["Capital efficiency & hurdle fit","CAPEX intensity, time to COD, IRR range, downside resilience"],["Portfolio contribution","Diversification, complementarity, synergies, fixed cost absorption"],["Akuo right to win","Local team, permitting capability, offtake access, role in dev/EPC/O&M/OT/EMS"]],templates:"Templates 2A + 2B + 2C"},
      {step:"Step 3",title:"Final intercomparison",color:C.amber,icon:"📋",question:"Comment réconcilier les meilleures opportunités et le footprint actuel en une vue cohérente ?",unit:"Top opportunities + footprint + platform implications",output:"Posture par pays + target ambition + trade-offs",criteria:[["Portfolio optimization","Diversification vs. concentration, corrélation, FX, régulation"],["Capital allocation","Par pays/techno/revenue stack, séquencement investissements"],["Operating model","Internalisation vs. externalisation par maillon"],["Implementation roadmap","Actions prioritaires, quick wins vs. investissements structurels"],["Risk management","Scénarios, plan de contingence"],["Ambition setting","MW cibles par pays et technologie, milestones 2026-2030"]],templates:"Consolidation cross-pays"},
    ].map((s,idx)=>(
      <Card key={idx} title={s.icon+" "+s.step+" — "+s.title} accent={s.color} noPad>
        <div style={{padding:"16px 22px"}}>
          <div style={{background:s.color+"08",borderRadius:6,padding:"10px 14px",marginBottom:14,border:"1px solid "+s.color+"18"}}>
            <div style={{fontSize:11,fontWeight:700,color:s.color,marginBottom:4}}>Question adressée</div>
            <div style={{fontSize:12.5,color:C.text,fontStyle:"italic",lineHeight:1.5}}>{s.question}</div>
          </div>
          <div style={{display:"flex",gap:12,marginBottom:14}}>
            <div style={{flex:1,fontSize:11.5}}><span style={{fontWeight:700,color:C.textLight}}>Unité : </span><span style={{color:C.text}}>{s.unit}</span></div>
            <div style={{flex:1,fontSize:11.5}}><span style={{fontWeight:700,color:C.textLight}}>Output : </span><span style={{color:s.color,fontWeight:600}}>{s.output}</span></div>
          </div>
          <div style={{fontSize:11.5,fontWeight:700,color:C.textLight,marginBottom:8}}>6 critères d'évaluation</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 12px"}}>
            {s.criteria.map(([name,detail],i)=>(
              <div key={i} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:"1px solid "+C.borderLight,alignItems:"flex-start"}}>
                <div style={{background:s.color,color:"#fff",borderRadius:3,width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0,marginTop:1}}>{i+1}</div>
                <div><div style={{fontWeight:700,fontSize:11.5,color:C.navy}}>{name}</div><div style={{fontSize:10.5,color:C.textLight,lineHeight:1.4,marginTop:1}}>{detail}</div></div>
              </div>
            ))}
          </div>
          <div style={{marginTop:10,fontSize:11,color:C.textLight,fontStyle:"italic"}}>📄 {s.templates}</div>
        </div>
      </Card>
    ))}
    <Callout type="so"><strong>Logique d'ensemble :</strong> Step 1 réduit l'univers pays → Step 2 compare les cellules d'opportunité → Step 3 réconcilie en portefeuille cohérent. Chaque étape a 6 critères complémentaires : Step 1 = attractivité marché, Step 2 = fit avec Akuo et ses hurdles, Step 3 = cohérence portefeuille et implémentation.</Callout>
  </>);
}

const SECTION_MAP = {intro:SectionIntro,market:SectionMarket,tech:SectionTech,revenue:SectionRevenue,lifecycle:SectionLifecycle,grid:SectionGrid,finance:SectionFinance,competition:SectionCompetition,portfolio:SectionPortfolio,akuo:SectionAkuo,method:SectionMethod};

export default function EnergyConceptsExplainer() {
  const [activeSection, setActiveSection] = useState("intro");
  const contentRef = useRef(null);
  const SectionComponent = SECTION_MAP[activeSection];
  const activeIdx = SECTIONS.findIndex(s=>s.id===activeSection);

  useEffect(()=>{contentRef.current?.scrollTo({top:0,behavior:"smooth"});},[activeSection]);

  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",fontFamily:"'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif",background:C.bg,color:C.text}}>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:"+C.border+";border-radius:3px}::-webkit-scrollbar-track{background:transparent}"}</style>

      <div style={{background:"linear-gradient(135deg,"+C.navy+" 0%,"+C.navyLight+" 50%,"+C.teal+" 100%)",color:"#fff",padding:"24px 32px 20px",flexShrink:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:2,opacity:0.6,fontFamily:"monospace",marginBottom:8}}>CVA × Akuo · Onboarding consultant</div>
            <h1 style={{fontSize:22,fontWeight:800,letterSpacing:-0.5,margin:0,lineHeight:1.25}}>Fondamentaux du marché de l'énergie renouvelable</h1>
            <p style={{fontSize:12.5,opacity:0.75,marginTop:6,maxWidth:520,lineHeight:1.55}}>Guide interactif — de la formation des prix de l'électricité à la structuration d'un portefeuille d'IPP. Conçu pour la mission Akuo 2030 Strategic Plan.</p>
          </div>
          <div style={{textAlign:"right",opacity:0.5,fontSize:10,fontFamily:"monospace",lineHeight:1.8}}>Confidentiel<br/>Mars 2026<br/>v2.0</div>
        </div>
        <div style={{marginTop:16,display:"flex",gap:3}}>
          {SECTIONS.map((s,i)=><div key={s.id} onClick={()=>setActiveSection(s.id)} style={{flex:1,height:3,borderRadius:2,cursor:"pointer",background:i<=activeIdx?"rgba(255,255,255,0.8)":"rgba(255,255,255,0.15)",transition:"background 0.2s"}}/>)}
        </div>
      </div>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        <div style={{width:220,background:"#fff",borderRight:"1px solid "+C.border,overflow:"auto",flexShrink:0}}>
          <div style={{padding:"12px 0"}}>
            {SECTIONS.map((s)=>(
              <button key={s.id} onClick={()=>setActiveSection(s.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",border:"none",background:activeSection===s.id?C.teal+"0D":"transparent",padding:"9px 20px",cursor:"pointer",textAlign:"left",borderLeft:activeSection===s.id?"3px solid "+C.teal:"3px solid transparent",transition:"all 0.15s"}}>
                <span style={{fontFamily:"monospace",fontSize:10,color:activeSection===s.id?C.teal:C.textLight,fontWeight:500,width:20}}>{s.num}</span>
                <span style={{fontSize:12.5,fontWeight:activeSection===s.id?700:500,color:activeSection===s.id?C.navy:C.textMid}}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div ref={contentRef} style={{flex:1,overflow:"auto",padding:"28px 36px 80px"}}>
          <div style={{maxWidth:740,margin:"0 auto"}}>
            <SectionComponent/>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:32,paddingTop:20,borderTop:"1px solid "+C.border}}>
              {activeIdx>0?<button onClick={()=>setActiveSection(SECTIONS[activeIdx-1].id)} style={{border:"1px solid "+C.border,background:"#fff",padding:"8px 16px",borderRadius:6,cursor:"pointer",fontSize:12,color:C.textMid,fontWeight:500}}>← {SECTIONS[activeIdx-1].label}</button>:<div/>}
              {activeIdx<SECTIONS.length-1?<button onClick={()=>setActiveSection(SECTIONS[activeIdx+1].id)} style={{border:"none",background:C.navy,color:"#fff",padding:"8px 16px",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:600}}>{SECTIONS[activeIdx+1].label} →</button>:<div/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
