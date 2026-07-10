import { memo, useCallback, useEffect, useId } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const pieces = [
  [76, 52, 30, 230, 13, "piece-glass"],
  [112, 264, 220, 34, 14, "piece-white"],
  [132, 92, 92, 18, 999, "piece-cyan"],
  [122, 154, 88, 24, 999, "piece-muted"],
  [140, 216, 118, 20, 999, "piece-violet"],
  [390, 262, 284, 33, 14, "piece-white"],
  [514, 56, 76, 216, 18, "piece-glass"],
  [430, 168, 202, 24, 999, "piece-muted"],
  [458, 102, 128, 18, 999, "piece-cyan"],
  [482, 224, 120, 21, 999, "piece-green"],
  [686, 54, 30, 230, 13, "piece-white"],
  [724, 264, 210, 34, 14, "piece-glass"],
  [742, 96, 96, 18, 999, "piece-violet"],
  [746, 188, 124, 22, 999, "piece-muted"],
  [908, 74, 210, 26, 999, "piece-cyan"],
  [898, 264, 232, 28, 999, "piece-white"],
  [896, 112, 30, 154, 14, "piece-glass"],
  [1110, 112, 30, 154, 14, "piece-glass"],
  [952, 184, 150, 24, 999, "piece-muted"],
  [984, 136, 76, 76, 999, "piece-hole"],
  [76, 318, 274, 12, 999, "piece-line"],
  [382, 318, 312, 13, 999, "piece-line"],
  [710, 318, 246, 12, 999, "piece-line"],
  [924, 318, 216, 12, 999, "piece-line"],
  [148, 32, 88, 12, 999, "piece-line"],
  [412, 34, 216, 12, 999, "piece-line"],
  [746, 34, 96, 12, 999, "piece-line"],
  [944, 34, 166, 12, 999, "piece-line"]
];

const floatingPieces = [
  ["float-a", 8, 22],
  ["float-b", 90, 24],
  ["float-c", 17, 78],
  ["float-d", 78, 74],
  ["float-e", 51, 10]
];

export default memo(function LaloInteractiveLogo() {
  const clipId = `laloClip${useId().replaceAll(":", "")}`;
  const rawX = useMotionValue(640);
  const rawY = useMotionValue(210);
  const rawRadius = useMotionValue(0);
  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);

  const smoothX = useSpring(rawX, { stiffness: 210, damping: 30, mass: 0.32 });
  const smoothY = useSpring(rawY, { stiffness: 210, damping: 30, mass: 0.32 });
  const smoothRadius = useSpring(rawRadius, { stiffness: 170, damping: 27, mass: 0.3 });
  const tiltX = useSpring(rawTiltX, { stiffness: 90, damping: 24, mass: 0.45 });
  const tiltY = useSpring(rawTiltY, { stiffness: 90, damping: 24, mass: 0.45 });

  const maskX = useTransform(smoothX, (value) => `${value}px`);
  const maskY = useTransform(smoothY, (value) => `${value}px`);
  const maskRadius = useTransform(smoothRadius, (value) => `${value}px`);

  useEffect(() => {
    const mobile = window.matchMedia("(hover: none)");
    if (!mobile.matches) return undefined;

    rawRadius.set(180);
    const loop = window.setInterval(() => {
      rawX.set(420 + Math.random() * 440);
      rawY.set(140 + Math.random() * 130);
      rawRadius.set(150 + Math.random() * 70);
    }, 2100);

    return () => window.clearInterval(loop);
  }, [rawRadius, rawX, rawY]);

  const handlePointerMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    rawX.set(x);
    rawY.set(y);
    rawRadius.set(Math.min(Math.max(rect.width * 0.17, 150), 260));
    rawTiltX.set((y / rect.height - 0.5) * -4);
    rawTiltY.set((x / rect.width - 0.5) * 5);
  }, [rawX, rawY, rawRadius, rawTiltX, rawTiltY]);

  const handlePointerLeave = useCallback(() => {
    rawRadius.set(0);
    rawTiltX.set(0);
    rawTiltY.set(0);
  }, [rawRadius, rawTiltX, rawTiltY]);

  return (
    <motion.div
      className="lalo-logo-wrap"
      initial={{ opacity: 0, y: 34, scale: 0.97, filter: "blur(18px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      aria-label="LALO"
    >
      {floatingPieces.map(([className, left, top], index) => (
        <motion.span
          className={`lalo-float ${className}`}
          style={{ left: `${left}%`, top: `${top}%` }}
          animate={{ y: [0, index % 2 ? 12 : -10, 0], rotate: [0, index % 2 ? -7 : 7, 0] }}
          transition={{ duration: 5 + index * 0.45, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
          key={className}
        />
      ))}

      <motion.div
        className="lalo-logo-stage"
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          "--mouse-x": maskX,
          "--mouse-y": maskY,
          "--reveal-size": maskRadius
        }}
        animate={{ scale: [1, 1.006, 1] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="lalo-shadow lalo-shadow-back" aria-hidden="true">
          LALO
        </span>
        <span className="lalo-shadow lalo-shadow-top" aria-hidden="true">
          LALO
        </span>
        <span className="lalo-clean">LALO</span>

        <div className="lalo-object-layer" aria-hidden="true">
          <svg className="lalo-object-svg" viewBox="0 0 1200 380" role="presentation">
            <defs>
              <clipPath id={clipId}>
                <text
                  x="600"
                  y="300"
                  textAnchor="middle"
                  fontFamily="Inter, Arial, sans-serif"
                  fontSize="328"
                  fontWeight="950"
                  letterSpacing="-29"
                >
                  LALO
                </text>
              </clipPath>
              <linearGradient id="laloPieceGradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
                <stop offset="42%" stopColor="#b6f4ff" stopOpacity="0.86" />
                <stop offset="74%" stopColor="#8f7aff" stopOpacity="0.68" />
                <stop offset="100%" stopColor="#d7ff5f" stopOpacity="0.56" />
              </linearGradient>
              <filter id="laloGlow" x="-18%" y="-30%" width="136%" height="160%">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 0 0 0.54 0 0 0 0 0.84 0 0 0 0 1 0 0 0 0.36 0"
                  result="glow"
                />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g clipPath={`url(#${clipId})`} filter="url(#laloGlow)">
              <rect x="0" y="0" width="1200" height="380" fill="rgba(255,255,255,0.055)" />
              {pieces.map(([x, y, width, height, radius, className], index) => (
                <motion.rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  rx={radius}
                  className={className}
                  animate={{
                    x: [x, x + (index % 2 ? -9 : 9), x],
                    opacity: className === "piece-hole" ? [0.9, 0.8, 0.9] : [0.74, 1, 0.78]
                  }}
                  transition={{ duration: 3.3 + index * 0.06, repeat: Infinity, ease: "easeInOut" }}
                  key={`${className}-${x}-${y}`}
                />
              ))}

              <motion.circle
                cx="1002"
                cy="184"
                r="84"
                className="piece-ring"
                animate={{ r: [78, 90, 78], opacity: [0.42, 0.76, 0.42] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx="532"
                cy="158"
                r="46"
                className="piece-orbit"
                animate={{ cx: [522, 540, 522], cy: [152, 170, 152], opacity: [0.42, 0.78, 0.42] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx="154"
                cy="228"
                r="18"
                className="piece-dot"
                animate={{ r: [12, 22, 12], opacity: [0.42, 0.9, 0.42] }}
                transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx="766"
                cy="136"
                r="15"
                className="piece-dot piece-dot-violet"
                animate={{ r: [10, 19, 10], opacity: [0.38, 0.82, 0.38] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path
                className="piece-shard"
                d="M286 292 L346 62 L390 306 Z"
                animate={{ opacity: [0.24, 0.56, 0.24], x: [0, 8, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path
                className="piece-shard piece-shard-soft"
                d="M614 300 L656 80 L696 306 Z"
                animate={{ opacity: [0.2, 0.5, 0.2], x: [0, -7, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path
                className="piece-curve"
                d="M68 282 C246 242, 386 314, 584 264 S936 234, 1132 278"
                animate={{ pathLength: [0.35, 1, 0.55], opacity: [0.2, 0.78, 0.26] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path
                className="piece-curve piece-curve-soft"
                d="M118 94 C286 132, 410 66, 576 100 S878 136, 1108 82"
                animate={{ pathLength: [0.2, 0.9, 0.28], opacity: [0.18, 0.52, 0.18] }}
                transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </g>
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
});
