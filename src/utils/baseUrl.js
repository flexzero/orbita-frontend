export default function baseUrl(endpoint, secure = false) {
  const local = "http://localhost:1337/api/";

  if (secure) return `${local}secure/${endpoint}`;
  return `${local}${endpoint}`;
}
