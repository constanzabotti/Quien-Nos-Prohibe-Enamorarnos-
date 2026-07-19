import nodemailer from "nodemailer";

const GMAIL_USER         = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const NOTIFY_EMAIL       = process.env.NOTIFY_EMAIL ?? "constanzabotti@gmail.com";

function createTransport() {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });
}

const MOOD_LABELS: Record<string, string> = {
  amor:       "💛 Amor",
  duelo:      "🖤 Duelo",
  esperanza:  "🌿 Esperanza",
  rabia:      "🔥 Rabia",
  nostalgia:  "🌙 Nostalgia",
};

export async function notifyNewLetter(opts: {
  content: string;
  mood: string;
  createdAt: Date;
}): Promise<void> {
  const transport = createTransport();
  if (!transport) return; // credentials not configured — skip silently

  const moodLabel  = MOOD_LABELS[opts.mood] ?? opts.mood;
  const firstWords = opts.content.trim().split(/\s+/).slice(0, 5).join(" ");
  const fecha      = opts.createdAt.toLocaleString("es-AR", {
    timeZone:    "America/Argentina/Buenos_Aires",
    dateStyle:   "full",
    timeStyle:   "short",
  });

  await transport.sendMail({
    from:    `"¿Quién nos prohíbe enamorarnos?" <${GMAIL_USER}>`,
    to:      NOTIFY_EMAIL,
    subject: `📩 NUEVA CARTA RECIBIDA: ${firstWords}…`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1A1B;background:#F5F5DC;padding:32px;border:2px solid #1A1A1B;">
        <h2 style="font-style:italic;margin-top:0;color:#800020;">
          Nueva carta no enviada
        </h2>
        <p style="font-size:13px;text-transform:uppercase;letter-spacing:0.2em;color:#555;margin-bottom:4px;">
          Sentimiento
        </p>
        <p style="font-size:18px;font-weight:bold;margin-top:0;">${moodLabel}</p>

        <p style="font-size:13px;text-transform:uppercase;letter-spacing:0.2em;color:#555;margin-bottom:4px;">
          Mensaje
        </p>
        <blockquote style="font-size:20px;font-style:italic;border-left:4px solid #800020;margin:0 0 24px;padding:12px 16px;background:#fff;">
          "${opts.content}"
        </blockquote>

        <p style="font-size:13px;text-transform:uppercase;letter-spacing:0.2em;color:#555;margin-bottom:4px;">
          Fecha y hora (Argentina)
        </p>
        <p style="margin-top:0;">${fecha}</p>

        <hr style="border:none;border-top:1px solid #ccc;margin:24px 0;" />
        <p style="font-size:11px;color:#888;font-style:italic;">
          ¿Quién nos prohíbe enamorarnos? — Constanza Botti
        </p>
      </div>
    `,
  });
}

export async function notifyNewSubscriber(opts: {
  email: string;
  name?: string | null;
  createdAt?: Date;
}): Promise<void> {
  const transport = createTransport();
  if (!transport) return;

  const fecha = (opts.createdAt ?? new Date()).toLocaleString("es-AR", {
    timeZone:  "America/Argentina/Buenos_Aires",
    dateStyle: "full",
    timeStyle: "short",
  });

  await transport.sendMail({
    from:    `"¿Quién nos prohíbe enamorarnos?" <${GMAIL_USER}>`,
    to:      NOTIFY_EMAIL,
    subject: `✦ NUEVA RESERVA: ${opts.email}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1A1B;background:#F5F5DC;padding:32px;border:2px solid #1A1A1B;">
        <h2 style="font-style:italic;margin-top:0;color:#800020;">
          Nueva persona reservó el libro
        </h2>

        <p style="font-size:13px;text-transform:uppercase;letter-spacing:0.2em;color:#555;margin-bottom:4px;">
          Email
        </p>
        <p style="font-size:18px;font-weight:bold;margin-top:0;">
          <a href="mailto:${opts.email}" style="color:#800020;">${opts.email}</a>
        </p>

        ${opts.name ? `
        <p style="font-size:13px;text-transform:uppercase;letter-spacing:0.2em;color:#555;margin-bottom:4px;">
          Nombre
        </p>
        <p style="font-size:16px;margin-top:0;">${opts.name}</p>
        ` : ""}

        <p style="font-size:13px;text-transform:uppercase;letter-spacing:0.2em;color:#555;margin-bottom:4px;">
          Fecha y hora (Argentina)
        </p>
        <p style="margin-top:0;">${fecha}</p>

        <hr style="border:none;border-top:1px solid #ccc;margin:24px 0;" />
        <p style="font-size:11px;color:#888;font-style:italic;">
          ¿Quién nos prohíbe enamorarnos? — Constanza Botti
        </p>
      </div>
    `,
  });
}

