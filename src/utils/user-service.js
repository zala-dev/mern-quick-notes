import * as usersAPI from "./users-api";

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  localStorage.setItem("token", token);
  return getUser();
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem("token", token);
  return getUser();
}

export function getToken() {
  // getItem will return null if the key does not exists
  const token = localStorage.getItem("token");
  if (!token) return null;
  const payload = JSON.parse(window.atob(token.split(".")[1]));
  // A JWT's exp is expressed in seconds, not miliseconds
  if (payload.exp * 1000 < Date.now()) {
    // Token has expired
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(window.atob(token.split(".")[1])).user : null;
}

export function logout() {
  localStorage.removeItem("token");
}
