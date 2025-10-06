const API_URL = "http://127.0.0.1:5000/api";

async function apiRequest(endpoint, method = "GET", body) {
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${API_URL}${endpoint}`, options);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}
