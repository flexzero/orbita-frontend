export default function baseUrl(endpoint, secure = false) {
  const remote = "http://52.74.250.49:1337/api/"

  if (secure) return `${remote}secure/${endpoint}`;
  return `${remote}${endpoint}`;
}
