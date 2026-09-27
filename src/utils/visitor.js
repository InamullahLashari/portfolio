// Small helper around sessionStorage so any component can read the name
// the visitor entered on the welcome gate, without passing it down through
// props everywhere. Nothing else about the visitor is ever stored.

const KEY = "inam_portfolio_visitor_name";

export function getVisitorName() {
  try {
    return sessionStorage.getItem(KEY) || "";
  } catch {
    return "";
  }
}

export function setVisitorName(name) {
  try {
    sessionStorage.setItem(KEY, name);
  } catch {
    /* ignore storage errors (e.g. private browsing) */
  }
}
