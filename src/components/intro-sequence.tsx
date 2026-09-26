mport { useEffect, useState } from "react";

const HOLD_DURATION = 2600; // tam görünür kalma süresi (ms)
const INTRO_KEY = "nil-intro-seen";

export function IntroSequence() {
  const [phase, setPhase] = useState<"hidden" | "hold" | "exiting">("hidden");

  useEffect(() => {
    if (sessionStorage.getItem(INTRO_KEY)) return; // daha önce görüldüyse hiç gösterme
    setPhase("hold");
    const timer = window.setTimeout(() => setPhase("exiting"), HOLD_DURATION);
    return () => window.clearTimeout(timer);
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`intro-screen ${phase === "exiting" ? "intro-screen--exiting" : ""}`}
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.animationName === "intro-fade-out") {
          sessionStorage.setItem(INTRO_KEY, "1");
          setPhase("hidden");
        }
      }}
    >
      <div className="intro-marble" />
      <div className="intro-brand">
        <p className="intro-title">Nil Mobilya</p>
        <p className="intro-tagline">
          <span>modern</span><i>·</i><span>rahat</span><i>·</i><span>kişisel</span>
        </p>
      </div>
    </div>
  );
}
