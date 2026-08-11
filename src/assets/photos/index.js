/**
 * Every photo the site uses, imported once.
 *
 * `cutouts` are transparent WebP athletes used only by the hero, where they
 * sit directly on the warm gradient with no frame.
 *
 * Source: the branded Sommersault photo set. Slide-style frames had their
 * baked-in caption bars cropped off during processing, so captions here come
 * from the components rather than the pixels.
 */

// ── Transparent cutouts (hero only) ─────────────────────────────────────────
import cutSplitLeap from './cut-split-leap.webp';
import cutLeap from './cut-leap.webp';
import cutBeamArabesque from './cut-beam-arabesque.webp';
import cutBeamHandstand from './cut-beam-handstand.webp';
import cutWalkover from './cut-walkover.webp';
import cutStandingArabesque from './cut-standing-arabesque.webp';
import cutArchLeap from './cut-arch-leap.webp';
import cutBeamWalk from './cut-beam-walk.webp';
import cutSmallLeap from './cut-small-leap.webp';
import cutRibbon from './cut-ribbon.webp';

// ── Facility & spaces ───────────────────────────────────────────────────────
import facilityLobby from './facility-lobby.jpg';
import facilityBars from './facility-bars.jpg';
import facilityBeam from './facility-beam.jpg';
import facilityViewing from './facility-viewing.jpg';
import facilityProshop from './facility-proshop.jpg';
import facilityVault from './facility-vault.jpg';
import facilityVaultWide from './facility-vault-wide.jpg';
import facilityPreschool from './facility-preschool.jpg';
import facilityFoampit from './facility-foampit.jpg';
import facilityConditioning from './facility-conditioning.jpg';
import facilityTinyTumblers from './facility-tinytumblers.jpg';
import facilityEventsRoom from './facility-events-room.jpg';

// ── Coaching & athletes ─────────────────────────────────────────────────────
import coachingSession from './coaching-session.jpg';
import coachingCircle from './coaching-circle.jpg';
import coachingStretch from './coaching-stretch.jpg';
import athleteBridge from './athlete-bridge.jpg';
import teamCoaches from './team-coaches.jpg';
import teamCoachesAlt from './team-coaches-alt.jpg';
import teamGymnasts from './team-gymnasts.jpg';
import teamGymnastsPosed from './team-gymnasts-posed.jpg';

// ── Coach portraits ─────────────────────────────────────────────────────────
import coach1 from './coach-1.jpg';
import coach2 from './coach-2.jpg';
import coach3 from './coach-3.jpg';
import coach4 from './coach-4.jpg';
import coach5 from './coach-5.jpg';
import coach6 from './coach-6.jpg';

export const cutouts = {
  splitLeap: cutSplitLeap,
  leap: cutLeap,
  beamArabesque: cutBeamArabesque,
  beamHandstand: cutBeamHandstand,
  walkover: cutWalkover,
  standingArabesque: cutStandingArabesque,
  // spares, available for the hero or future sections
  archLeap: cutArchLeap,
  beamWalk: cutBeamWalk,
  smallLeap: cutSmallLeap,
  ribbon: cutRibbon,
};

export const facility = {
  lobby: facilityLobby,
  bars: facilityBars,
  beam: facilityBeam,
  viewing: facilityViewing,
  proshop: facilityProshop,
  vault: facilityVault,
  vaultWide: facilityVaultWide,
  preschool: facilityPreschool,
  foampit: facilityFoampit,
  conditioning: facilityConditioning,
  tinyTumblers: facilityTinyTumblers,
  eventsRoom: facilityEventsRoom,
};

export const people = {
  coachingSession,
  coachingCircle,
  coachingStretch,
  athleteBridge,
  teamCoaches,
  teamCoachesAlt,
  teamGymnasts,
  teamGymnastsPosed,
};

export const coaches = [coach1, coach2, coach3, coach4, coach5, coach6];

const photos = { cutouts, facility, people, coaches };

export default photos;
