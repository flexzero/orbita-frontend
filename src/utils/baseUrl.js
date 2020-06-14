export default function baseUrl(endpoint, secure = false) {
  const local = "http://localhost:1337/api/";
  const remote = "http://52.74.250.49:3003/api/"

  if (secure) return `${local}secure/${endpoint}`;
  return `${local}${endpoint}`;
}
