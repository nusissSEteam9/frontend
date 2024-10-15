// server/api/[...path].ts
import { joinURL } from 'ufo';
export default defineEventHandler(async (event) => {
  const proxyUrl = useRuntimeConfig().public.backendProxyUrl; // fetch /api/recipe -> http://localhost:8090/api/recipe
  // check if path has prefix /api
  console.log('event.path', event.path);

  const cookies = parseCookies(event);
  const token = cookies?.token;

  if (event.path.startsWith('/api')) {
    // if there is a token, add it to the Authorization header
    // if token is blank but api path can bypass gateway, backend will not require a token so blank token is fine
    const path = event.path.replace(/^\/api/, '');
    const target = joinURL(proxyUrl, path);
    console.log('target', target);
    event.node.req.headers['Authorization'] = `Bearer ${token}`;
    return proxyRequest(event, target);
  }
  console.log('event', event);
  return event;
});
