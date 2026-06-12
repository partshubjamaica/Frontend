export const authStateKey = "konnected-authenticated";
export const authEmailKey = "konnected-auth-email";

const fallbackAdminEmails = ["admin@konnected.com"];

export function getAdminEmails() {
  const configured = process.env.NEXT_PUBLIC_ADMIN_EMAILS;
  return (configured ? configured.split(",") : fallbackAdminEmails)
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isDemoAuthenticated() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(authStateKey) === "true";
}

export function getDemoUserEmail() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(authEmailKey) ?? "";
}

export function isDemoAdmin() {
  const email = getDemoUserEmail().trim().toLowerCase();
  return isDemoAuthenticated() && getAdminEmails().includes(email);
}

export function setDemoAuthenticated(value: boolean, email?: string) {
  if (typeof window === "undefined") return;

  if (value) {
    window.localStorage.setItem(authStateKey, "true");
    if (email) {
      window.localStorage.setItem(authEmailKey, email.trim().toLowerCase());
    }
  } else {
    window.localStorage.removeItem(authStateKey);
    window.localStorage.removeItem(authEmailKey);
  }

  window.dispatchEvent(new Event("konnected-auth-change"));
}
