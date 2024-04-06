export const mobileUAPatterns = [
  /Android/i,
  /webOS/i,
  /iPhone/i,
  /iPad/i,
  /iPod/i,
  /BlackBerry/i,
  /Windows Phone/i,
];

// Normally detecting a user agent like this is not a good idea, but can be treated as a
// simple performance optimization
export const isUserAgentLikelyMobile = (userAgent?: string | null) => {
  return mobileUAPatterns.some((toMatchItem) => {
    return userAgent ? userAgent.match(toMatchItem) : false;
  });
};
