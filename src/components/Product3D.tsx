/* Pure HTML/CSS 3D product models (no WebGL, no images).
   Each model is built from real 3D cylinders: N rotated faces + top/bottom discs,
   with baked lighting so it reads as a solid object from any angle. */
import type { CSSProperties } from "react";

type CylProps = { r: number; h: number; y: number; color: string; n?: number; glass?: boolean; round?: "top" | "bottom"; label?: React.ReactNode };

function shade(a: number) {
  // light from the front-left: 0 = full light, ~0.55 = darkest
  const l = Math.max(0, Math.cos(((a + 35) * Math.PI) / 180));
  return 0.34 - l * 0.34;
}

function Cyl({ r, h, y, color, n = 28, glass = false, round }: CylProps) {
  const w = 2 * r * Math.tan(Math.PI / n) + 1.6;
  const faces = Array.from({ length: n }, (_, i) => {
    const a = (i * 360) / n;
    const st: CSSProperties = {
      width: w, height: h, left: -w / 2, top: -h / 2, background: color,
      transform: `translateY(${y}px) rotateY(${a}deg) translateZ(${r}px)`,
      boxShadow: `inset 0 0 0 999px rgba(0,0,0,${shade(a) * (glass ? 0.35 : 1)})`,
      backfaceVisibility: glass ? "visible" : "hidden",
      borderRadius: round === "top" ? `${r}px ${r}px 0 0 / ${r * 0.9}px ${r * 0.9}px 0 0` : round === "bottom" ? `0 0 ${r}px ${r}px / 0 0 ${r * 0.6}px ${r * 0.6}px` : undefined,
    };
    return <i key={i} className="absolute block" style={st} />;
  });
  const disc = (dy: number, dark: number): CSSProperties => ({
    width: r * 2, height: r * 2, left: -r, top: -r, borderRadius: "50%", background: color,
    boxShadow: `inset 0 0 0 999px rgba(0,0,0,${dark})`, transform: `translateY(${dy}px) rotateX(90deg)`,
  });
  return (
    <>
      {faces}
      {round !== "top" && <i className="absolute block" style={disc(y - h / 2, 0.02)} />}
      {round !== "bottom" && <i className="absolute block" style={disc(y + h / 2, 0.4)} />}
    </>
  );
}

/* Flat label wrapped on the front of a cylinder */
function Label({ r, y, h, bg, children }: { r: number; y: number; h: number; bg: string; children: React.ReactNode }) {
  const w = r * 1.45;
  return (
    <div className="absolute grid content-center justify-items-center gap-[2px] overflow-hidden px-1 text-center leading-[1.05]"
      style={{ width: w, height: h, left: -w / 2, top: -h / 2, background: bg, transform: `translateY(${y}px) translateZ(${r + 0.8}px)`, backfaceVisibility: "hidden" }}>
      {children}
    </div>
  );
}

/* Crimped end of a squeeze tube */
function Crimp({ r, y, color }: { r: number; y: number; color: string }) {
  const w = r * 2.15;
  return (
    <>
      <i className="absolute block" style={{ width: w, height: 12, left: -w / 2, top: -6, background: color, transform: `translateY(${y}px)`, boxShadow: "inset 0 -3px 0 rgba(0,0,0,.08)" }} />
      <i className="absolute block" style={{ width: w, height: 12, left: -w / 2, top: -6, background: color, transform: `translateY(${y}px) rotateY(180deg)`, boxShadow: "inset 0 0 0 999px rgba(0,0,0,.25)" }} />
    </>
  );
}

const T = ({ c, s = 7, w = 700, ls = 0, children }: { c: string; s?: number; w?: number; ls?: number; children: React.ReactNode }) => (
  <span style={{ color: c, fontSize: s, fontWeight: w, letterSpacing: ls }} className="block font-head">{children}</span>
);

export type ModelKind = "anua-heartleaf-foam" | "skinever-cleanser" | "cosrx-low-ph-gel" | "cosrx-snail-96" | "anua-niacinamide-txa" | "boj-glow-serum" | "boj-relief-sun" | "aestura-atobarrier-365";

export function Product3D({ slug }: { slug: string }) {
  let parts: React.ReactNode;
  switch (slug as ModelKind) {
    case "anua-heartleaf-foam":
      parts = (<>
        <Crimp r={34} y={-96} color="#f4f2ee" />
        <Cyl r={34} h={170} y={-8} color="#f7f6f2" />
        <Cyl r={30} h={24} y={89} color="#35503f" />
        <Label r={34} y={-30} h={78} bg="transparent"><T c="#2f3a33" s={9} w={500}>anua</T><T c="#35503f" s={5.5} w={800}>HEARTLEAF /</T><T c="#35503f" s={5.5} w={800}>QUERCETINOL /</T><T c="#555" s={5}>PORE DEEP CLEANSING FOAM</T></Label>
      </>); break;
    case "skinever-cleanser":
      parts = (<>
        <Crimp r={31} y={-86} color="#f6f4ef" />
        <Cyl r={31} h={150} y={-6} color="#f3f1ea" />
        <Cyl r={27} h={22} y={80} color="#f7f7f5" />
        <Label r={31} y={-24} h={70} bg="transparent"><T c="#3c3a35" s={7} w={600} ls={0.6}>SKINEVER</T><T c="#3c3a35" s={5.5}>FACIAL CLEANSER</T><T c="#8aa67a" s={9}>❦</T></Label>
      </>); break;
    case "cosrx-low-ph-gel":
      parts = (<>
        <Crimp r={33} y={-92} color="#fbfbfb" />
        <Cyl r={33} h={162} y={-8} color="#fbfbfb" />
        <Cyl r={29} h={22} y={84} color="#f2f2f2" />
        <Label r={33} y={-50} h={16} bg="transparent"><T c="#222" s={8} w={800} ls={0.6}>COSRX</T></Label>
        <Label r={33} y={2} h={48} bg="linear-gradient(90deg,#5bc0cf 0 28%,#f8e45c 28%)"><T c="#2b2b2b" s={5.5} w={700}>Low pH Good</T><T c="#2b2b2b" s={5.5} w={700}>Morning Gel</T><T c="#2b2b2b" s={5.5} w={700}>Cleanser</T></Label>
      </>); break;
    case "boj-relief-sun":
      parts = (<>
        <Crimp r={28} y={-76} color="#f8f6f0" />
        <Cyl r={28} h={138} y={-6} color="#f8f6f0" />
        <Cyl r={22} h={22} y={74} color="#f8f6f0" />
        <Label r={28} y={-16} h={66} bg="transparent"><T c="#555" s={4.5}>Beauty of Joseon</T><T c="#222" s={6} w={700}>Relief Sun</T><T c="#777" s={4.5}>Rice + Probiotics</T><T c="#b23a2e" s={10} w={800}>조선</T></Label>
      </>); break;
    case "aestura-atobarrier-365":
      parts = (<>
        <Crimp r={30} y={-80} color="#fbfbff" />
        <Cyl r={30} h={100} y={-24} color="#fbfbff" />
        <Cyl r={30} h={44} y={48} color="#3d63c6" />
        <Cyl r={26} h={22} y={81} color="#3459bd" />
        <Label r={30} y={-36} h={56} bg="transparent"><T c="#3d63c6" s={6.5} w={600} ls={1}>AESTURA</T><T c="#3d63c6" s={5.5}>Atobarrier 365</T><T c="#3d63c6" s={5.5}>Cream</T></Label>
      </>); break;
    case "cosrx-snail-96":
      parts = (<>
        <Cyl r={8} h={22} y={-104} color="#1a1a1a" />
        <i className="absolute block" style={{ width: 30, height: 9, left: -4, top: -4.5, background: "#111", transform: "translateY(-115px)", borderRadius: 3 }} />
        <Cyl r={16} h={22} y={-84} color="#141414" />
        <Cyl r={30} h={140} y={-3} color="rgba(232,238,240,.55)" glass />
        <Cyl r={27} h={120} y={8} color="rgba(255,255,255,.18)" glass n={14} />
        <Label r={30} y={-8} h={62} bg="linear-gradient(90deg,#1e1e1e 0 26%,#efe6cf 26%)"><T c="#333" s={5} w={700}>ADVANCED</T><T c="#333" s={6.5} w={800}>SNAIL 96</T><T c="#333" s={5} w={700}>MUCIN POWER</T><T c="#333" s={5} w={700}>ESSENCE</T></Label>
      </>); break;
    case "anua-niacinamide-txa":
      parts = (<>
        <Cyl r={11} h={30} y={-92} color="#f5f5f5" round="top" />
        <Cyl r={17} h={26} y={-66} color="#f2f2f2" />
        <Cyl r={30} h={92} y={-5} color="rgba(255,226,214,.55)" glass />
        <Cyl r={27} h={70} y={8} color="rgba(255,200,180,.35)" glass n={14} />
        <Label r={30} y={-2} h={60} bg="#fbf9f7"><T c="#333" s={7} w={500}>anua</T><T c="#333" s={5.5} w={800}>10% NIACINAMIDE</T><T c="#333" s={5.5} w={800}>+ 4% TXA</T><T c="#777" s={4.5}>DARK SPOT SERUM</T></Label>
      </>); break;
    case "boj-glow-serum":
      parts = (<>
        <Cyl r={11} h={30} y={-92} color="#fafafa" round="top" />
        <Cyl r={17} h={26} y={-66} color="#d9b77a" />
        <Cyl r={30} h={92} y={-5} color="rgba(214,150,50,.6)" glass />
        <Cyl r={27} h={74} y={8} color="rgba(196,128,30,.45)" glass n={14} />
        <Label r={30} y={-2} h={58} bg="#fbf8f2"><T c="#666" s={4.5}>Beauty of Joseon</T><T c="#b23a2e" s={10} w={800}>광채</T><T c="#333" s={5} w={700}>GLOW SERUM</T><T c="#777" s={4.5}>Propolis + Niacinamide</T></Label>
      </>); break;
    default:
      parts = <Cyl r={30} h={150} y={0} color="#eee" />;
  }
  return (
    <div className="relative h-0 w-0 [transform-style:preserve-3d]" aria-hidden="true">
      {parts}
      {/* contact shadow */}
      <i className="absolute block rounded-full bg-black/45 blur-md" style={{ width: 90, height: 90, left: -45, top: -45, transform: "translateY(102px) rotateX(90deg)" }} />
    </div>
  );
}
