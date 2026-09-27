import { useState } from "react";
import emailjs from "@emailjs/browser";
import { emailConfig } from "../../config/emailConfig.js";
import { setVisitorName } from "../../utils/visitor.js";
import "./VisitorGate.css";

// ---------------------------------------------------------------------------
// VisitorGate
// ---------------------------------------------------------------------------
// Shown once per browser session before the rest of the site is visible.
// It collects ONE piece of information — a name — and nothing else:
// no email, phone, location, or device data is ever asked for or stored.
//
// On submit it fires a best-effort EmailJS request that emails the name to
// the site owner. EmailJS runs entirely from the browser, so the visitor's
// own email account / Gmail app / phone permissions are never involved.
//
// The gate never blocks entry to the site: even if the email send fails
// (offline visitor, EmailJS not configured yet, etc.) the visitor still
// gets in — we only log the failure to the console for debugging.
// ---------------------------------------------------------------------------

// Small inline icons so we don't need an icon-library dependency —
// keeps the project light and easy to `npm install && npm run deploy`.
function ArrowIcon() {
  return (
    <svg
      className="btn-icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="btn-icon btn-spinner"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="42"
        strokeDashoffset="14"
        opacity="0.9"
      />
    </svg>
  );
}

export default function VisitorGate({ onContinue }) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setSubmitting(true);
    // Persist locally right away so a slow/failed email never delays entry.
    setVisitorName(trimmed);

    try {
      // Only attempt the send once emailConfig.js has been filled in —
      // otherwise this silently no-ops instead of throwing on every visit.
      if (!emailConfig.serviceId.startsWith("YOUR_")) {
        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          { visitor_name: trimmed }, // the ONLY data point sent
          { publicKey: emailConfig.publicKey }
        );
      }
    } catch (err) {
      // Never block the visitor from entering the site over a failed
      // notification email — this is a nice-to-have, not a gate.
      console.error("Visitor notification email failed:", err);
    } finally {
      setSubmitting(false);
      onContinue(trimmed);
    }
  };

  return (
    <div className="visitor-gate">
      {/* Purely decorative animated gradient glow — no content, aria-hidden */}
      <div className="visitor-gate-glow" aria-hidden="true">
        <span className="glow-orb glow-orb-a" />
        <span className="glow-orb glow-orb-b" />
        <span className="glow-orb glow-orb-c" />
      </div>

      <form className="visitor-gate-card" onSubmit={handleSubmit}>
        <p className="visitor-gate-eyebrow">Welcome</p>
        <h1>What&apos;s your name?</h1>
        <p className="visitor-gate-sub">Just so I know who&apos;s stopping by.</p>

        <input
          type="text"
          autoFocus
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          autoComplete="off"
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!name.trim() || submitting}
        >
          <span>{submitting ? "One moment" : "Continue"}</span>
          {submitting ? <SpinnerIcon /> : <ArrowIcon />}
        </button>

        <p className="visitor-gate-privacy">
          Just your name — nothing else is collected.
        </p>
      </form>
    </div>
  );
}
