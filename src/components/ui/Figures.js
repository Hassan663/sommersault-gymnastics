import React from 'react';

/**
 * Hand-drawn-feel line-art gymnast figures, used in place of emoji.
 * Every figure inherits `currentColor`, so callers control the colour with a
 * text-* class. Stroke width scales with the viewBox, so they stay legible
 * from 40px chips up to full-height hero art.
 */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

/** Handstand — straight vertical line, legs split. */
export const Handstand = ({ className = '', strokeWidth = 5 }) => (
  <svg viewBox="0 0 160 220" className={className} strokeWidth={strokeWidth} {...base}>
    <circle cx="80" cy="176" r="13" />
    <path d="M80 163 C80 130, 80 100, 80 72" />
    <path d="M80 72 C68 46, 52 26, 34 12" />
    <path d="M80 72 C96 48, 116 30, 138 20" />
    <path d="M78 166 C62 178, 46 188, 30 194" />
    <path d="M82 166 C98 178, 114 188, 130 194" />
  </svg>
);

/** Arabesque — supporting leg down, back leg lifted, arms sweeping. */
export const Arabesque = ({ className = '', strokeWidth = 5 }) => (
  <svg viewBox="0 0 200 240" className={className} strokeWidth={strokeWidth} {...base}>
    <circle cx="126" cy="42" r="13" />
    <path d="M120 55 C104 76, 92 100, 86 124" />
    <path d="M118 70 C136 52, 154 34, 166 14" />
    <path d="M114 74 C92 70, 70 60, 52 44" />
    <path d="M86 124 C82 160, 78 194, 74 222" />
    <path d="M74 222 C68 230, 60 234, 50 236" />
    <path d="M86 124 C116 132, 146 126, 170 106" />
    <path d="M170 106 C180 100, 186 92, 190 84" />
  </svg>
);

/** Bridge — hands and feet planted, torso arched high off the floor. */
export const Backbend = ({ className = '', strokeWidth = 5 }) => (
  <svg viewBox="0 0 240 170" className={className} strokeWidth={strokeWidth} {...base}>
    {/* floor */}
    <path d="M18 150 L222 150" strokeOpacity="0.35" />
    {/* arched torso from hands (left) to hips (right) */}
    <path d="M46 148 C58 74, 132 46, 190 84" />
    {/* upper arm from hands up to shoulders */}
    <path d="M46 148 C44 122, 50 100, 62 84" />
    {/* head hanging back below the shoulders */}
    <circle cx="52" cy="96" r="12" />
    {/* thigh and shin down to planted feet */}
    <path d="M190 84 C206 100, 210 124, 202 148" />
    <path d="M202 148 C210 150, 216 150, 222 150" />
  </svg>
);

/** Split leap — airborne, front leg up, back leg trailing, well off the floor. */
export const Leap = ({ className = '', strokeWidth = 5 }) => (
  <svg viewBox="0 0 250 190" className={className} strokeWidth={strokeWidth} {...base}>
    {/* floor, far below the figure to sell the height */}
    <path d="M14 178 L236 178" strokeOpacity="0.35" />
    <circle cx="132" cy="34" r="12" />
    <path d="M130 46 C126 64, 122 80, 120 96" />
    {/* arms: one up, one sweeping back */}
    <path d="M128 58 C150 46, 168 30, 178 12" />
    <path d="M124 60 C102 58, 82 50, 66 36" />
    {/* front leg driving forward and up */}
    <path d="M120 96 C152 92, 184 100, 210 118" />
    <path d="M210 118 C218 122, 224 128, 228 134" />
    {/* back leg extended behind and down */}
    <path d="M120 96 C94 108, 68 124, 48 144" />
    <path d="M48 144 C40 150, 34 156, 30 162" />
  </svg>
);

/** Floor split — torso upright, both legs flat along the floor. */
export const Split = ({ className = '', strokeWidth = 5 }) => (
  <svg viewBox="0 0 260 170" className={className} strokeWidth={strokeWidth} {...base}>
    {/* floor line the legs rest on */}
    <path d="M14 140 L246 140" strokeOpacity="0.35" />
    <circle cx="130" cy="36" r="12" />
    <path d="M130 48 C130 72, 130 96, 130 120" />
    {/* arms out to the sides */}
    <path d="M130 66 C152 62, 174 52, 192 38" />
    <path d="M130 66 C108 62, 86 52, 68 38" />
    {/* legs flat left and right along the floor */}
    <path d="M130 122 C102 132, 68 138, 34 140" />
    <path d="M130 122 C158 132, 192 138, 226 140" />
    {/* pointed feet */}
    <path d="M34 140 C28 136, 24 132, 22 128" />
    <path d="M226 140 C232 136, 236 132, 238 128" />
  </svg>
);

/** Balance on the beam — one leg up, arms wide. */
export const BeamPose = ({ className = '', strokeWidth = 5 }) => (
  <svg viewBox="0 0 200 230" className={className} strokeWidth={strokeWidth} {...base}>
    <circle cx="100" cy="34" r="13" />
    <path d="M100 47 C100 74, 100 98, 100 120" />
    <path d="M100 62 C122 52, 146 38, 164 20" />
    <path d="M100 62 C78 52, 54 38, 36 20" />
    <path d="M100 120 C98 152, 96 182, 94 206" />
    <path d="M100 120 C126 134, 148 138, 168 132" />
    <path d="M20 206 L180 206" strokeDasharray="2 0" />
  </svg>
);

/** Two figures side by side — for group / team cards. */
export const Duo = ({ className = '', strokeWidth = 5 }) => (
  <svg viewBox="0 0 240 210" className={className} strokeWidth={strokeWidth} {...base}>
    <g>
      <circle cx="76" cy="36" r="12" />
      <path d="M76 48 C76 76, 76 100, 76 120" />
      <path d="M76 62 C60 54, 44 42, 32 26" />
      <path d="M76 62 C94 58, 110 50, 122 40" />
      <path d="M76 120 C70 148, 64 176, 60 198" />
      <path d="M76 120 C84 148, 92 176, 96 198" />
    </g>
    <g>
      <circle cx="158" cy="36" r="12" />
      <path d="M158 48 C158 76, 158 100, 158 120" />
      <path d="M158 62 C176 54, 194 42, 206 26" />
      <path d="M158 62 C142 58, 128 50, 118 40" />
      <path d="M158 120 C152 148, 146 176, 142 198" />
      <path d="M158 120 C166 148, 174 176, 178 198" />
    </g>
  </svg>
);

/** Coach spotting a young gymnast. */
export const Coaching = ({ className = '', strokeWidth = 5 }) => (
  <svg viewBox="0 0 240 220" className={className} strokeWidth={strokeWidth} {...base}>
    {/* coach */}
    <circle cx="58" cy="34" r="13" />
    <path d="M58 47 C58 78, 58 106, 58 128" />
    <path d="M58 64 C42 58, 28 46, 18 32" />
    <path d="M58 64 C88 66, 118 74, 140 90" />
    <path d="M58 128 C52 158, 46 186, 42 208" />
    <path d="M58 128 C68 158, 78 186, 84 208" />
    {/* young gymnast mid-handstand */}
    <circle cx="176" cy="164" r="11" />
    <path d="M176 153 C176 130, 176 112, 176 96" />
    <path d="M176 96 C166 78, 154 64, 140 54" />
    <path d="M176 96 C190 76, 206 62, 224 54" />
    <path d="M174 168 C162 180, 150 188, 138 192" />
    <path d="M178 168 C190 180, 202 188, 214 192" />
  </svg>
);

/** Trophy / medal ribbon for results and awards. */
export const Medal = ({ className = '', strokeWidth = 5 }) => (
  <svg viewBox="0 0 160 200" className={className} strokeWidth={strokeWidth} {...base}>
    <path d="M44 14 L72 92" />
    <path d="M116 14 L88 92" />
    <circle cx="80" cy="134" r="46" />
    <path d="M80 112 L86 126 L101 128 L90 138 L93 153 L80 146 L67 153 L70 138 L59 128 L74 126 Z" />
  </svg>
);

/** Rhythmic ribbon swirl — decorative. */
export const Ribbon = ({ className = '', strokeWidth = 5 }) => (
  <svg viewBox="0 0 220 200" className={className} strokeWidth={strokeWidth} {...base}>
    <circle cx="42" cy="52" r="12" />
    <path d="M42 64 C42 92, 42 118, 42 142" />
    <path d="M42 78 C30 90, 22 106, 20 124" />
    <path d="M42 78 C64 74, 84 62, 98 44" />
    <path d="M98 44 C130 30, 162 44, 176 74 C190 106, 172 140, 138 148 C112 154, 88 140, 84 118" />
    <path d="M42 142 C38 162, 34 180, 32 194" />
    <path d="M42 142 C52 162, 60 180, 66 194" />
  </svg>
);

/** Registry so data-driven lists can pick a figure by name. */
export const FIGURES = {
  handstand: Handstand,
  arabesque: Arabesque,
  backbend: Backbend,
  leap: Leap,
  split: Split,
  beam: BeamPose,
  duo: Duo,
  coaching: Coaching,
  medal: Medal,
  ribbon: Ribbon,
};

/** Render a figure by key, falling back to the handstand. */
export const Figure = ({ name, className = '', strokeWidth }) => {
  const Cmp = FIGURES[name] || Handstand;
  return <Cmp className={className} strokeWidth={strokeWidth} />;
};

export default Figure;
