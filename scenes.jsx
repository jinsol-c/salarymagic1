// Splash screen scenes for 월급술사
// Timeline (total 6s, no loop):
//   0.0 – 1.0  Stage 1: background only
//   1.0 – 2.2  Stage 2: magic circle draws in (radial reveal + rotation)
//   2.2 – 3.7  Stage 3: light pillar surges, wizard hat rises from circle
//   3.7 – 6.0  Stage 4: hat & title bob in place

const CANVAS_W = 402;
const CANVAS_H = 847;

// circle center in the image (matches bg_circle artwork)
const CIRCLE_CX = CANVAS_W / 2;
const CIRCLE_CY = 595;

// ── Stage 1: base background (always visible) ─────────────────────────────
function BackgroundLayer() {
  return (
    <img
      src="assets/bg.png"
      alt=""
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%', height: '100%',
        objectFit: 'cover',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    />
  );
}

// ── Stage 2: magic circle reveal ──────────────────────────────────────────
// bg_circle.png is the SAME gradient with the circle + particles painted in.
// We crossfade it on top of bg.png and reveal it with an expanding radial
// clip centered on the magic circle, plus a subtle rotation for "casting".
function MagicCircleLayer({ start = 1.0, drawDur = 1.2 }) {
  const time = useTime();
  const t = clamp((time - start) / drawDur, 0, 1);
  if (t <= 0) return null;

  // Expanding circular reveal — easeOutCubic feels like a magical bloom
  const eased = Easing.easeOutCubic(t);
  const radius = eased * 110; // % of canvas
  const opacity = Easing.easeOutQuad(clamp(t * 1.4, 0, 1));
  const rot = (1 - eased) * -45; // ends at 0

  // Circle clip is relative to canvas size — use percent at the circle pos
  const cxPct = (CIRCLE_CX / CANVAS_W) * 100;
  const cyPct = (CIRCLE_CY / CANVAS_H) * 100;

  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        clipPath: `circle(${radius}% at ${cxPct}% ${cyPct}%)`,
        WebkitClipPath: `circle(${radius}% at ${cxPct}% ${cyPct}%)`,
        opacity,
        pointerEvents: 'none',
      }}
    >
      <img
        src="assets/bg_circle.png"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          userSelect: 'none',
          transform: `rotate(${rot}deg)`,
          transformOrigin: `${cxPct}% ${cyPct}%`,
          willChange: 'transform',
        }}
      />
      {/* Extra spinning highlight ring during the draw */}
      <SpinRing start={start} drawDur={drawDur} />
    </div>
  );
}

// A bright arc that sweeps around while the circle materializes,
// like a wand tracing the runic ring.
function SpinRing({ start, drawDur }) {
  const time = useTime();
  const t = clamp((time - start) / drawDur, 0, 1);
  if (t <= 0 || t >= 1) return null;

  const angle = t * 540; // 1.5 turns
  const size = 230;
  const opacity = Math.sin(t * Math.PI); // peak mid-draw

  return (
    <div
      style={{
        position: 'absolute',
        left: CIRCLE_CX - size / 2,
        top: CIRCLE_CY - size / 2 - 4,
        width: size,
        height: size * 0.34, // ellipse to match the platter perspective
        transform: `rotate(${angle}deg)`,
        opacity: opacity * 0.85,
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: '50%',
        background: `conic-gradient(from 0deg,
          rgba(255,255,255,0) 0deg,
          rgba(255,255,255,0) 300deg,
          rgba(180,210,255,0.6) 340deg,
          rgba(255,255,255,1) 358deg,
          rgba(255,255,255,0) 360deg)`,
        filter: 'blur(2px)',
      }}/>
    </div>
  );
}

// ── Stage 3 + 4: light pillar (sustained) ─────────────────────────────────
// Surges up quickly at the start of stage 3, then settles to a gentle pulse.
function LightPillar({ start = 2.2 }) {
  const time = useTime();
  const t = time - start;
  if (t <= 0) return null;

  // surge: 0 → 1 over 0.7s with easeOutExpo
  const surge = Easing.easeOutExpo(clamp(t / 0.7, 0, 1));
  // gentle breathing after the surge
  const breath = 1 + Math.sin((t - 0.7) * 1.6) * 0.06;
  const settled = clamp((t - 0.7) / 0.4, 0, 1);
  const scaleY = (surge * (1 - settled) * 1.05) + (settled * breath);

  // intensity is high during surge, then steady
  const intensity = surge * (1 - settled * 0.35);

  const pillarW = 140;
  const pillarH = 540;

  return (
    <>
      {/* core column */}
      <div style={{
        position: 'absolute',
        left: CIRCLE_CX - pillarW / 2,
        top: CIRCLE_CY - pillarH + 12,
        width: pillarW,
        height: pillarH,
        transform: `scaleY(${scaleY})`,
        transformOrigin: 'bottom center',
        opacity: 0.55 + intensity * 0.45,
        background: `linear-gradient(to top,
          rgba(255,255,255,0.95) 0%,
          rgba(200,220,255,0.65) 25%,
          rgba(180,210,255,0.35) 55%,
          rgba(180,210,255,0.08) 85%,
          rgba(180,210,255,0) 100%)`,
        filter: 'blur(14px)',
        mixBlendMode: 'screen',
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }}/>
      {/* tight inner highlight */}
      <div style={{
        position: 'absolute',
        left: CIRCLE_CX - 28,
        top: CIRCLE_CY - pillarH + 30,
        width: 56,
        height: pillarH - 30,
        transform: `scaleY(${scaleY})`,
        transformOrigin: 'bottom center',
        opacity: 0.45 + intensity * 0.55,
        background: `linear-gradient(to top,
          rgba(255,255,255,1) 0%,
          rgba(240,245,255,0.7) 35%,
          rgba(220,232,255,0.2) 75%,
          rgba(220,232,255,0) 100%)`,
        filter: 'blur(8px)',
        mixBlendMode: 'screen',
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }}/>
      {/* burst at base on surge */}
      <div style={{
        position: 'absolute',
        left: CIRCLE_CX - 140,
        top: CIRCLE_CY - 80,
        width: 280, height: 160,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9), rgba(255,255,255,0) 65%)',
        opacity: intensity * 0.85,
        filter: 'blur(10px)',
        mixBlendMode: 'screen',
        pointerEvents: 'none',
      }}/>
      {/* ascending sparks */}
      <Sparks start={start} />
    </>
  );
}

// Small rising particles inside the pillar
function Sparks({ start }) {
  const time = useTime();
  const t = time - start;
  if (t <= 0) return null;

  // pre-baked spark positions
  const sparks = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 14; i++) {
      arr.push({
        offsetX: (Math.random() - 0.5) * 90,
        delay: Math.random() * 2.2,
        dur: 1.8 + Math.random() * 1.4,
        size: 2 + Math.random() * 3,
        rise: 280 + Math.random() * 180,
      });
    }
    return arr;
  }, []);

  return (
    <>
      {sparks.map((s, i) => {
        const localT = ((t - s.delay) % s.dur) / s.dur;
        if (t < s.delay || localT < 0 || localT > 1) return null;
        const y = -Easing.easeOutQuad(localT) * s.rise;
        const fade = Math.sin(localT * Math.PI);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: CIRCLE_CX + s.offsetX - s.size / 2,
              top: CIRCLE_CY - 30,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)',
              boxShadow: '0 0 8px rgba(200,220,255,0.9)',
              transform: `translateY(${y}px)`,
              opacity: fade * 0.9,
              pointerEvents: 'none',
              willChange: 'transform, opacity',
            }}
          />
        );
      })}
    </>
  );
}

// ── Wizard hat ────────────────────────────────────────────────────────────
// Enters at stage 3 from the magic circle, rises while scaling up, then
// settles into a gentle floating bob for stage 4.
function WizardHat({ enterStart = 2.4 }) {
  const time = useTime();
  const t = time - enterStart;
  if (t <= 0) return null;

  // Rise + grow over 1.0s
  const riseDur = 1.0;
  const rise = clamp(t / riseDur, 0, 1);
  const riseEased = Easing.easeOutCubic(rise);

  // Position: starts at circle center, ends ~190px above
  const startY = CIRCLE_CY - 30;
  const endY = CIRCLE_CY - 180;
  const y = startY + (endY - startY) * riseEased;

  // Scale: from 0.2 → 1.0 with a bit of overshoot
  const scaleEnter = Easing.easeOutBack(rise);
  const scale = 0.2 + 0.8 * scaleEnter;

  // After settling, gentle bob
  const settle = clamp((t - riseDur) / 0.4, 0, 1);
  const bob = Math.sin((t - riseDur) * 1.8) * 8 * settle;
  const tilt = Math.sin((t - riseDur) * 1.4) * 2.5 * settle;

  // Final on-screen size of the hat
  const hatW = 150;
  const hatH = hatW * (110 / 141);

  return (
    <div
      style={{
        position: 'absolute',
        left: CIRCLE_CX - hatW / 2,
        top: y - hatH / 2 + bob,
        width: hatW,
        height: hatH,
        transform: `scale(${scale}) rotate(${tilt}deg)`,
        transformOrigin: 'center 75%',
        filter: `drop-shadow(0 ${6 + settle * 6}px ${10 + settle * 10}px rgba(80,100,200,${0.25 + settle * 0.15}))`,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      {/* soft glow behind hat */}
      <div style={{
        position: 'absolute',
        inset: '-30% -25%',
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.6), rgba(200,220,255,0) 60%)',
        opacity: 0.7 * Easing.easeOutQuad(rise),
        filter: 'blur(6px)',
        mixBlendMode: 'screen',
      }}/>
      <img
        src="assets/hat.png"
        alt="wizard hat"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          userSelect: 'none',
        }}
      />
    </div>
  );
}

// ── Title ─────────────────────────────────────────────────────────────────
function AppTitle({ start = 3.9 }) {
  const time = useTime();
  const t = time - start;
  if (t <= 0) return null;

  const fadeDur = 0.6;
  const fade = Easing.easeOutCubic(clamp(t / fadeDur, 0, 1));

  // gentle bob (offset phase from hat)
  const settle = clamp((t - 0.4) / 0.4, 0, 1);
  const bob = Math.sin((t + 0.6) * 1.8) * 5 * settle;

  const titleW = 150;
  const titleH = titleW * (30 / 126);

  return (
    <div
      style={{
        position: 'absolute',
        left: CANVAS_W / 2 - titleW / 2,
        top: 758 - titleH / 2 + bob - (1 - fade) * 12,
        width: titleW,
        height: titleH,
        opacity: fade,
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }}
    >
      <img
        src="assets/title.png"
        alt="월급술사"
        style={{
          width: '100%', height: '100%',
          objectFit: 'contain',
          userSelect: 'none',
        }}
      />
    </div>
  );
}

// ── Scene composition ─────────────────────────────────────────────────────
function SplashScene() {
  return (
    <>
      <BackgroundLayer />
      <MagicCircleLayer start={1.0} drawDur={1.2} />
      <LightPillar start={2.2} />
      <WizardHat enterStart={2.4} />
      <AppTitle start={3.9} />
    </>
  );
}

Object.assign(window, { SplashScene, CANVAS_W, CANVAS_H });
