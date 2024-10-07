import { joinURL } from 'ufo';
export default defineEventHandler(async (event) => {
  const proxyUrl = useRuntimeConfig().backendProxyUrl; // fetch /api/recipe -> http://localhost:8090/api/recipe
  const path = event.path.replace(/^\/api\//, '');
  const target = joinURL(proxyUrl, path);
  return proxyRequest(event, target);
});
