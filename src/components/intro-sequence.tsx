import { useEffect, useState } from "react";

const INTRO_DURATION = 5600;

export function IntroSequence() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), INTRO_DURATION);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="intro-screen" aria-hidden="true">
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