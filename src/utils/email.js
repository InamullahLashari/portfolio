// Opens Gmail's web compose window with the recipient, subject and body
// already filled in — this is what lands the visitor straight on their
// own Gmail with the message pasted in, rather than whatever desktop mail
// app a plain mailto: link would trigger.
export function openGmailCompose({ to, subject, body }) {
  const url =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encodeURIComponent(to)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
