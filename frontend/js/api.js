const API_URL = "http://localhost:5000/api";

async function apiRequest(endpoint, method = "GET", data) {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
