// utils/send-request.js
export default async function sendRequest(url, method = "GET", payload = null) {
  const options = { method };

  // Add token to headers if available
  const token = localStorage.getItem("token");
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  if (payload) {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
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
