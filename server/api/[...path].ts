import { joinURL } from 'ufo';
export default defineEventHandler(async (event) => {
  const proxyUrl = useRuntimeConfig().backendProxyUrl; // fetch /api/recipe -> http://localhost:8090/api/recipe
  // check if path has prefix /api
  if (!event.path.startsWith('/api')) {
    // not proxying this request
    return event;
  }
  const target = joinURL(proxyUrl, path);
  return proxyRequest(event, target);
});
