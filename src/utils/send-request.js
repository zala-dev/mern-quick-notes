// utils/send-request.js
export default async function sendRequest(url, method = "GET", payload = null) {
  const options = { method };

  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }

  const res = await fetch(url, options);

  if (res.ok) return res.json();

  const errorData = await res.json(); // Get detailed error info
  throw new Error(
    `HTTP error! Status: ${res.status}, Message: ${
      errorData.message || "Unknown error"
    }`
  );
}
