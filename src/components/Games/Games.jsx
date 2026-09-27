import { useState } from "react";
import { profile } from "../../data/profileData.js";
import { getVisitorName } from "../../utils/visitor.js";
import { openGmailCompose } from "../../utils/email.js";
import { useInView } from "../../hooks/useInView.js";
import "./Games.css";

// Small inline icons for each game — no icon-library dependency needed.
function ChessIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21h6M10 21v-3.5c0-.9-.3-1.4-1-2.1-1-1-1.3-1.9-.8-3.1.5-1.2 1.8-2 1.8-3.3 0-1-.6-1.7-1.4-2.2M14 21v-3.5c0-.9.3-1.4 1-2.1 1-1 1.3-1.9.8-3.1-.5-1.2-1.8-2-1.8-3.3 0-1 .6-1.7 1.4-2.2M12 3v3" />
    </svg>
  );
}
function PubgIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  );
}
function LudoIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="9" cy="9" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="15" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function CardsIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="6" width="12" height="15" rx="2" transform="rotate(-8 9 13.5)" />
      <rect x="8" y="4" width="12" height="15" rx="2" />
    </svg>
  );
}

const GAME_LIST = [
  { name: "Chess", blurb: "A calm, classic match.", Icon: ChessIcon },
  { name: "PUBG", blurb: "Squad up for a few rounds.", Icon: PubgIcon },
  { name: "Ludo", blurb: "Old-school and chaotic.", Icon: LudoIcon },
  { name: "Cards", blurb: "Whatever deck game you like.", Icon: CardsIcon },
];

export default function Games() {
  const [game, setGame] = useState(GAME_LIST[0].name);
  const [date, setDate] = useState("");
  const [ref, isVisible] = useInView();
  const today = new Date().toISOString().split("T")[0];

  const sendInvite = () => {
    if (!date) return;

    const dateLabel = new Date(date + "T00:00:00").toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const visitorName = getVisitorName().trim() || "A visitor";
    const subject = `${game} — let's play on ${dateLabel}`;
    const body =
      `Hi ${profile.name},\n\n` +
      `I'd like to play a round of ${game} with you.\n\n` +
      `Proposed date: ${dateLabel}\n` +
      `From: ${visitorName}\n\n` +
      `Let me know if that works!\n\n` +
      `— ${visitorName}`;

    openGmailCompose({ to: profile.email, subject, body });
  };

  return (
    <section id="games" className="section" ref={ref}>
      <div className="container">
        <div className="section-head">
          <h2>Play with Inam</h2>
          <p>Games I'm an expert in — pick one below.</p>
        </div>

        <div className={`game-list ${isVisible ? "in-view" : ""}`}>
          {GAME_LIST.map((g, i) => (
            <button
              key={g.name}
              type="button"
              className={`game-chip ${game === g.name ? "is-selected" : ""}`}
              onClick={() => setGame(g.name)}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="game-chip-icon"><g.Icon /></span>
              <span className="game-chip-name">{g.name}</span>
              <span className="game-chip-blurb">{g.blurb}</span>
            </button>
          ))}
        </div>

        <div className="play-invite card">
          <div>
            <p className="play-invite-label">Want to fix a match of {game} with Inam?</p>
            <p className="play-invite-hint">Select the date — this opens Gmail with the invite already written.</p>
          </div>
          <div className="play-invite-actions">
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              aria-label="Select a date to play"
            />
            <button className="btn btn-primary" onClick={sendInvite} disabled={!date}>
              Fix the match
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
