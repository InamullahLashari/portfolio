// ---------------------------------------------------------------------------
// EDIT ME: EmailJS lets a static, backend-free site send an email from the
// browser — no visitor email account, Gmail app, or phone permissions
// required. This is what makes the "visitor name" notification possible
// without a server.
//
// Setup (free, ~5 minutes):
// 1. Create a free account at https://www.emailjs.com/
// 2. Add an Email Service and connect the inbox notifications should be
//    SENT FROM — lashariinam50@gmail.com. This becomes your SERVICE_ID.
// 3. Create an Email Template with:
//      - "To email"  set to your destination address, 21sw30@quest.edu.pk
//      - a body that uses the variable {{visitor_name}}, e.g.
//          Subject: New Website Visitor
//          Body:    Visitor name: {{visitor_name}}
//    This becomes your TEMPLATE_ID.
// 4. In Account > General, copy your Public Key. This becomes PUBLIC_KEY.
// 5. Paste all three values below.
//
// Until you fill these in, the name gate still works (visitors can still
// enter the site) — it just won't be able to email you a notification.
// ---------------------------------------------------------------------------

export const emailConfig = {
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
};
