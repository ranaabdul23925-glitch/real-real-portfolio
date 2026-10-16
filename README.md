# Abdullah Rana Portfolio
Static site: `index.html`, `style.css`, `script.js`, `assets/profile.jpg`. No build step or dependencies (Google Fonts only).

**Run locally:** open `index.html`, or run `python3 -m http.server 8000` and visit http://localhost:8000.

**Deploy:** drag the folder onto Netlify Drop, or push to GitHub and import into Vercel (framework: Other, no build command).

**Contact form:** no backend is connected, so it opens the visitor's email app (mailto) with the message prefilled. For real delivery, point the form at Formspree, Web3Forms, or a Supabase function.

**Projects:** descriptions are intentionally general. Add real screenshots and verified feature lists in `index.html` once confirmed.

**Chatbot (Abdullah AI):** the floating assistant is built from two extra files:

- `chatbot.css` — the black-and-gold glass theme of the chat widget (self-contained, loaded after `style.css`).
- `chatbot.js` — injects the floating button and panel, and talks to the n8n workflow.

The script posts to the n8n **Chat Trigger** webhook configured in `CONFIG.webhookUrl` (see the `CONFIG` object at the top of the file). The request body is `{ action: 'sendMessage', sessionId, chatInput }` and the reply is read from the response field `output`. The `sessionId` is generated once per browser tab and stored in `sessionStorage`, so a visitor keeps the same conversation across page reloads. Never put API keys in this file — the frontend only talks to the public webhook URL.

**Testing the chatbot locally:** open `index.html` (or serve the folder), click the gold AI button in the bottom-right corner, and send a message. Suggested questions appear as quick-action buttons; each sends a real message to the n8n workflow. If the n8n workflow is not reachable, a friendly message is shown in the chat instead of a broken response.

**Note:** live AI responses require a running n8n workflow with a reachable webhook. Without it, the widget still works, but answers are unavailable.
