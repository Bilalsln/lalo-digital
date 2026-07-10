import { memo } from "react";

export default memo(function AnimatedBackground() {
  return (
    <div className="bg-canvas" aria-hidden="true">
      <div className="bg-glow purple" />
      <div className="bg-glow cyan" />
      <div className="bg-glow green" />
      <div className="bg-glow blue" />
    </div>
  );
});
