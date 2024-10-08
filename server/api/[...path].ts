import { joinURL } from 'ufo';
export default defineEventHandler(async (event) => {
  const proxyUrl = useRuntimeConfig().backendProxyUrl; // fetch /api/recipe -> http://localhost:8090/api/recipe
  // check if path has prefix /api
  console.log('event.path', event.path);
  if (event.path.startsWith('/api')) {
    const path = event.path.replace(/^\/api/, '');
    const target = joinURL(proxyUrl, path);
    console.log('target', target);
    event.node.req.headers['Authorization'] =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZW1iZXIxVXNlcm5hbWUiLCJyb2xlIjoibWVtYmVyIiwiaWF0IjoxNzI4MzY5NTE0LCJleHAiOjE3Mjg0MDU1MTR9.bptpbK0TDhnyUPf5qoS088Y78yE6IhFjYC4YrCCLIcM';
    return proxyRequest(event, target);
  }
  console.log('event', event);
  return event;
});
