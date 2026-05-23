import React, { useState, useMemo, useCallback } from "react";
import { makeDecisions, CHOICE_NOTE, CRITERIA_RATIONALE, INTRO_PARAGRAPH } from "./data.js";

const sumRaw = (criteria) => Object.values(criteria).reduce((a, b) => a + (Number(b) || 0), 0);

function normalized(criteria) {
  const total = sumRaw(criteria);
  const out = {};
  Object.entries(criteria).forEach(([k, v]) => {
    out[k] = total === 0 ? 0 : (Number(v) / total) * 100;
  });
  return out;
}

function weightedScore(alt, criteria) {
  const total = sumRaw(criteria);
  if (total === 0) return 0;
  let acc = 0;
  for (const [c, w] of Object.entries(criteria)) {
    acc += (Number(alt.scores[c]) || 0) * (Number(w) || 0);
  }
  return acc / total;
}

export default function App() {
  const [decisions, setDecisions] = useState(makeDecisions);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const [editNames, setEditNames] = useState(false);
  const [showRationale, setShowRationale] = useState(false);

  const updateWeight = useCallback((di, crit, val) => {
    setDecisions((p) => {
      const n = structuredClone(p);
      n[di].criteria[crit] = Math.max(0, Number(val));
      return n;
    });
  }, []);

  const updateScore = useCallback((di, ai, crit, val) => {
    setDecisions((p) => {
      const n = structuredClone(p);
      n[di].alternatives[ai].scores[crit] = Math.min(5, Math.max(1, Number(val)));
      return n;
    });
  }, []);

  const renameCriterion = useCallback((di, oldName, newName) => {
    const clean = (newName || "").trim();
    setDecisions((p) => {
      const n = structuredClone(p);
      if (!clean || clean === oldName) return n;
      if (n[di].criteria[clean] !== undefined) return n;
      const nc = {};
      Object.entries(n[di].criteria).forEach(([k, v]) => { nc[k === oldName ? clean : k] = v; });
      n[di].criteria = nc;
      n[di].alternatives.forEach((a) => {
        if (a.scores[oldName] !== undefined) { a.scores[clean] = a.scores[oldName]; delete a.scores[oldName]; }
      });
      return n;
    });
  }, []);

  const resetAll = useCallback(() => setDecisions(makeDecisions()), []);

  const results = useMemo(() => decisions.map((d) => {
    const ranked = d.alternatives
      .map((a) => ({ name: a.name, value: weightedScore(a, d.criteria) }))
      .sort((x, y) => y.value - x.value);
    const winner = ranked[0];
    return { id: d.id, title: d.title, ranked, winner, baseChoice: d.baseChoice, baseMatches: winner && winner.name === d.baseChoice };
  }), [decisions]);

  const exportText = useMemo(() => {
    const L = [INTRO_PARAGRAPH, "", "RESUMEN DE DECISIONES SELECCIONADAS (escenario actual):"];
    decisions.forEach((d) => {
      const ranked = d.alternatives.map((a) => ({ name: a.name, value: weightedScore(a, d.criteria) })).sort((x, y) => y.value - x.value);
      const w = ranked[0];
      const flag = w && w.name === d.baseChoice ? "" : "  [≠ decision base]";
      L.push(`  - ${d.title}: ${w?.name ?? "—"} (${w?.value.toFixed(2)}/5)${flag}`);
      if (CHOICE_NOTE[d.id]) L.push(`      Nota: ${CHOICE_NOTE[d.id]}`);
    });
    return L.join("\n");
  }, [decisions]);

  const copyResults = async () => {
    try { await navigator.clipboard.writeText(exportText); setCopied(true); setTimeout(() => setCopied(false), 2200); }
    catch { setCopied(false); }
  };

  const d = decisions[active];
  const res = results[active];
  const norm = normalized(d.criteria);
  const crits = Object.keys(d.criteria);
  const maxScore = Math.max(...res.ranked.map((r) => r.value), 5);

  const card = { background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, padding: 22, boxShadow: "0 1px 3px rgba(29,43,38,0.05)" };

  return (
    <div style={{ minHeight: "100vh", padding: "0 0 70px" }}>
      {/* HERO */}
      <header className="rise" style={{ background: "linear-gradient(135deg, var(--leaf-deep), var(--leaf))", color: "#fff", padding: "44px 20px 38px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -40, top: -40, width: 220, height: 220, borderRadius: "50%", background: "var(--sun)", opacity: 0.22, filter: "blur(8px)" }} />
        <div style={{ position: "absolute", right: 60, bottom: -70, width: 150, height: 150, borderRadius: "50%", background: "#fff", opacity: 0.08 }} />
        <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative" }}>
          <div style={{ fontFamily: "var(--sans)", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.85, marginBottom: 10 }}>
            Formulación de proyectos · Marco Lógico
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: "clamp(26px, 4.4vw, 42px)", lineHeight: 1.08, margin: "0 0 12px", letterSpacing: "-0.015em" }}>
            Matriz de decisión ponderada
          </h1>
          <p style={{ fontFamily: "var(--sans)", fontSize: "clamp(14px, 1.8vw, 17px)", maxWidth: 680, lineHeight: 1.5, margin: 0, opacity: 0.95 }}>
            Mini granja solar para el suministro eléctrico en colegios públicos rurales de <strong>Calamar, Guaviare</strong>.
            Herramienta interactiva para validar y justificar las decisiones preliminares del proyecto.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 20px" }}>
        {/* aviso preliminar */}
        <div className="rise" style={{ marginTop: -18, background: "var(--card)", border: "1px solid var(--line)", borderLeft: "4px solid var(--sun)", borderRadius: 12, padding: "13px 18px", fontSize: 13, lineHeight: 1.5, boxShadow: "0 4px 14px rgba(29,43,38,0.08)" }}>
          <strong>Escenario base preliminar.</strong> Mueva los sliders de importancia y vea cómo cambia el ranking en tiempo real.
          Los pesos se normalizan automáticamente a 100%. Los valores son de trabajo y modificables; se sustentarán con fuentes técnicas.
        </div>

        {/* toggle: matriz / cómo elegimos */}
        <div style={{ display: "flex", gap: 8, margin: "24px 0 16px" }}>
          <button onClick={() => setShowRationale(false)} style={segBtn(!showRationale)}>Matriz interactiva</button>
          <button onClick={() => setShowRationale(true)} style={segBtn(showRationale)}>Cómo elegimos los criterios</button>
        </div>

        {showRationale ? (
          <section className="rise" style={{ ...card }}>
            <h2 style={h2()}>Cómo elegimos los criterios</h2>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-soft)", marginTop: 0 }}>{INTRO_PARAGRAPH}</p>
            <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
              {CRITERIA_RATIONALE.map((r, i) => (
                <div key={i} style={{ borderLeft: "3px solid var(--leaf)", paddingLeft: 14 }}>
                  <div style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 16, color: "var(--leaf-deep)", marginBottom: 4 }}>{r.title}</div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>{r.body}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <>
            {/* Pestañas */}
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
              {decisions.map((dd, i) => {
                const ok = results[i].baseMatches;
                return (
                  <button key={dd.id} onClick={() => setActive(i)} style={tabBtn(i === active, ok)}>
                    {dd.tab}
                    <span style={{ fontSize: 9, color: i === active ? "#fff" : (ok ? "var(--leaf)" : "var(--warn)") }}>{ok ? "●" : "▲"}</span>
                  </button>
                );
              })}
            </div>

            <section className="rise" key={active} style={{ ...card }}>
              <h2 style={h2()}>{d.title}</h2>

              <div style={{ display: "grid", gridTemplateColumns: "minmax(270px, 1fr) minmax(290px, 1.15fr)", gap: 26 }}>
                {/* IZQUIERDA */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={eyebrow()}>Importancia de los criterios</span>
                    <button onClick={() => setEditNames((v) => !v)} style={miniBtn(editNames)}>
                      {editNames ? "✓ Listo" : "✎ Editar nombres"}
                    </button>
                  </div>
                  {crits.map((c) => (
                    <div key={c} style={{ marginBottom: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4, gap: 8 }}>
                        {editNames ? (
                          <input defaultValue={c} onBlur={(e) => renameCriterion(active, c, e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") e.target.blur(); }}
                            style={{ flex: 1, fontFamily: "var(--sans)", fontSize: 12.5, border: "1px solid var(--sun)", borderRadius: 6, padding: "3px 7px", background: "#fffdf8" }} />
                        ) : (<span style={{ color: "var(--ink-soft)" }}>{c}</span>)}
                        <strong style={{ color: "var(--sun-deep)", whiteSpace: "nowrap" }}>{norm[c].toFixed(1)}%</strong>
                      </div>
                      <input type="range" min={0} max={100} value={d.criteria[c]} style={{ width: "100%" }} onChange={(e) => updateWeight(active, c, e.target.value)} />
                    </div>
                  ))}
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>
                    {editNames ? "Escriba el nuevo nombre y presione Enter para confirmar." : "Los valores se reescalan a 100% automáticamente."}
                  </div>
                </div>

                {/* DERECHA */}
                <div>
                  <span style={eyebrow()}>Ranking de alternativas</span>
                  <div style={{ marginTop: 12 }}>
                    {res.ranked.map((r, i) => {
                      const isWin = i === 0;
                      const pct = (r.value / maxScore) * 100;
                      return (
                        <div key={r.name} style={{ marginBottom: 13 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                            <span style={{ fontSize: 12.5, fontWeight: isWin ? 700 : 500, color: isWin ? "var(--leaf-deep)" : "var(--ink)", lineHeight: 1.25 }}>
                              {isWin ? "★ " : `${i + 1}. `}{r.name}
                            </span>
                            <strong style={{ fontSize: 13.5, color: isWin ? "var(--leaf)" : "var(--muted)" }}>{r.value.toFixed(2)}</strong>
                          </div>
                          <div style={{ background: "var(--track)", borderRadius: 7, height: 10, overflow: "hidden" }}>
                            <div className="bar-fill" style={{ width: `${pct}%`, height: "100%", borderRadius: 7, background: isWin ? "linear-gradient(90deg, var(--leaf), var(--leaf-deep))" : "#c9d6cd" }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {!res.baseMatches && (
                <div style={{ marginTop: 18, background: "var(--warn-bg)", border: "1px solid #eccab0", borderLeft: "4px solid var(--warn)", borderRadius: 10, padding: "11px 15px", fontSize: 12.5, lineHeight: 1.5 }}>
                  <strong style={{ color: "var(--warn)" }}>⚠ Cambio respecto a la decisión base.</strong> Con estos pesos, la alternativa ganadora
                  («{res.winner?.name}») cambia respecto a la decisión base del proyecto («{res.baseChoice}»). Revise si desea modificar la decisión o ajustar los criterios.
                </div>
              )}

              <div style={{ marginTop: 16, background: "var(--leaf-soft)", borderRadius: 10, padding: "12px 16px", fontSize: 12.5, lineHeight: 1.55 }}>
                <strong>Lectura del resultado.</strong> «{res.winner?.name}» encabeza con {res.winner?.value.toFixed(2)}/5
                {res.ranked[1] ? <> frente a {res.ranked[1].value.toFixed(2)} de la segunda (diferencia de {(res.winner.value - res.ranked[1].value).toFixed(2)})</> : null}.
                {" "}La ventaja se concentra en los criterios con mayor peso.
                {CHOICE_NOTE[d.id] && <><br /><em style={{ color: "var(--muted)" }}>{CHOICE_NOTE[d.id]}</em></>}
              </div>

              <details style={{ marginTop: 16 }}>
                <summary style={{ cursor: "pointer", fontSize: 12.5, color: "var(--sun-deep)", fontWeight: 600 }}>Ajustar calificaciones de las alternativas (1–5)</summary>
                <div style={{ marginTop: 12 }}>
                  {d.alternatives.map((a, ai) => (
                    <div key={ai} style={{ borderTop: "1px solid #f0ece2", padding: "11px 0" }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 8 }}>{a.name}</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "9px 18px" }}>
                        {crits.map((c) => (
                          <div key={c}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--muted)", marginBottom: 3 }}>
                              <span>{c}</span><strong style={{ color: "var(--leaf)" }}>{a.scores[c]}</strong>
                            </div>
                            <input className="score" type="range" min={1} max={5} step={1} value={a.scores[c]} style={{ width: "100%" }} onChange={(e) => updateScore(active, ai, c, e.target.value)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </section>
          </>
        )}

        {/* Resumen */}
        <section style={{ ...card, border: "2px solid var(--leaf)", marginTop: 18 }}>
          <h2 style={h2()}>Resumen de decisiones seleccionadas</h2>
          <ul style={{ fontSize: 13, lineHeight: 1.75, margin: 0, paddingLeft: 18 }}>
            {results.map((r) => (
              <li key={r.id}>
                <span style={{ color: "var(--muted)" }}>{r.title}:</span> <strong>{r.winner?.name}</strong>{" "}
                <span style={{ color: "var(--sun-deep)" }}>({r.winner?.value.toFixed(2)}/5)</span>
                {!r.baseMatches && <span style={{ color: "var(--warn)", fontSize: 11, fontWeight: 600 }}> ▲ difiere de la base</span>}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
            <button onClick={copyResults} style={primaryBtn()}>{copied ? "✓ Copiado al portapapeles" : "Copiar resumen para Google Docs"}</button>
            <button onClick={resetAll} style={ghostBtn()}>Restablecer escenario base</button>
          </div>
        </section>

        <footer style={{ textAlign: "center", marginTop: 30, fontSize: 11.5, color: "var(--muted)", lineHeight: 1.6 }}>
          Valores preliminares de trabajo, sujetos a validación con fuentes técnicas (IDEAM, UPME, IPSE, DANE) y al dimensionamiento del proyecto.<br />
          Herramienta de apoyo metodológico · Marco Lógico.
        </footer>
      </div>
    </div>
  );
}

// ---- helpers de estilo ----
const h2 = () => ({ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 20, margin: "0 0 16px", color: "var(--ink)", letterSpacing: "-0.01em" });
const eyebrow = () => ({ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)", fontWeight: 700 });
const segBtn = (on) => ({ fontSize: 13, fontWeight: 600, padding: "9px 16px", borderRadius: 10, cursor: "pointer", border: `1px solid ${on ? "var(--leaf)" : "var(--line)"}`, background: on ? "var(--leaf)" : "#fff", color: on ? "#fff" : "var(--ink-soft)" });
const tabBtn = (on, ok) => ({ fontSize: 12.5, fontWeight: on ? 700 : 500, padding: "8px 14px", borderRadius: 22, cursor: "pointer", border: `1px solid ${on ? "var(--leaf)" : "var(--line)"}`, background: on ? "var(--leaf)" : "#fff", color: on ? "#fff" : "var(--ink)", display: "flex", alignItems: "center", gap: 6 });
const miniBtn = (on) => ({ fontSize: 11, fontWeight: 600, border: "1px solid var(--line)", background: on ? "var(--leaf-soft)" : "#fff", color: on ? "var(--leaf)" : "var(--muted)", borderRadius: 7, padding: "4px 10px", cursor: "pointer" });
const primaryBtn = () => ({ fontSize: 12.5, fontWeight: 700, border: "none", background: "var(--sun)", color: "#1d2b26", borderRadius: 9, padding: "10px 16px", cursor: "pointer" });
const ghostBtn = () => ({ fontSize: 12.5, fontWeight: 500, border: "1px solid var(--line)", background: "#fff", color: "var(--ink)", borderRadius: 9, padding: "10px 16px", cursor: "pointer" });
