// The portal is static files; this script only exists so other hostnames can
// lead to it. A request for one of them is redirected to the same path on the
// portal's own address (a 302, so a hostname can be repointed later); every
// other request is served from the static files, with the headers in _headers.
const CANONICAL = 'https://portal.theschool.fun';
const REDIRECT_HOSTS = new Set(['portal.theschool.nyc']);

export default {
  fetch(request, env) {
    const url = new URL(request.url);
    if (REDIRECT_HOSTS.has(url.hostname)) {
      return Response.redirect(`${CANONICAL}${url.pathname}${url.search}`, 302);
    }
    return env.ASSETS.fetch(request);
  },
};
