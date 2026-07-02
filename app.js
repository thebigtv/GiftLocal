// app.js — shared helpers used by index.html and child.html

async function apiGet(action, params = {}) {
  const url = new URL(API_URL);
  url.searchParams.set('action', action);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const res = await fetch(url.toString());
  const data = await res.json();
  return data;
}

async function apiPost(action, body = {}) {
  const url = new URL(API_URL);
  url.searchParams.set('action', action);

  // Sent as text/plain so the browser treats this as a "simple request"
  // and skips a CORS preflight, which Apps Script doesn't handle.
  const res = await fetch(url.toString(), {
    method: 'POST',
    body: JSON.stringify(body)
  });
  const data = await res.json();
  return data;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

// The string-loop SVG used on every tag card
function tagStringSvg() {
  return `
    <svg class="tag__string" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M6 40 C6 16, 16 6, 40 6" fill="none" stroke="#1F3A2E" stroke-width="3"/>
      <circle cx="6" cy="40" r="5" fill="#1F3A2E" stroke="#FBF7EE" stroke-width="2"/>
    </svg>`;
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
