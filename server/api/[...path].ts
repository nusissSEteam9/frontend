import { joinURL } from 'ufo';
export default defineEventHandler(async (event) => {
  const proxyUrl = useRuntimeConfig().backendProxyUrl; // fetch /api/recipe -> http://localhost:8090/api/recipe
  // check if path has prefix /api
  console.log('event.path', event.path);
  if (event.path.startsWith('/api')) {
    const path = event.path.replace(/^\/api/, '');
    const target = joinURL(proxyUrl, path);
    console.log('target', target);
    return proxyRequest(event, target);
  }
  console.log('event', event);
  return event;
});
