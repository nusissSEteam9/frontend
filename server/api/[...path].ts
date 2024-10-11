// server/api/[...path].ts
import { joinURL } from 'ufo';
export default defineEventHandler(async (event) => {
  const proxyUrl = useRuntimeConfig().public.backendProxyUrl; // fetch /api/recipe -> http://localhost:8090/api/recipe
  // check if path has prefix /api
  console.log('event.path', event.path);

  if (event.path.startsWith('/api')) {
    const cookies = parseCookies(event);
    const token = cookies?.token;
    if (!token) {
      event.node.res.statusCode = 401;
      return { message: 'Unauthorized' };
    }
    const path = event.path.replace(/^\/api/, '');
    const target = joinURL(proxyUrl, path);
    console.log('target', target);
    event.node.req.headers['Authorization'] = `Bearer ${token}`;
    return proxyRequest(event, target);
  }
  console.log('event', event);
  return event;
});
