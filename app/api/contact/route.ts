import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "node:fs";
import path from "node:path";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const recipient =
      process.env.CONTACT_EMAIL || "shawnrimai04@gmail.com";

    // Escape HTML to prevent user input from breaking the email layout
    const escapeHtml = (value: string) => {
      return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    // --------------------------------------------------
    // ICON
    // --------------------------------------------------

    const iconPath = path.join(
      process.cwd(),
      "public",
      "favicon.png"
    );

    const hasIcon = fs.existsSync(iconPath);

    // --------------------------------------------------
    // EMAIL HTML
    // --------------------------------------------------

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>${safeSubject}</title>
        </head>

        <body
          style="
            margin: 0;
            padding: 32px 16px;
            background-color: #040810;
            font-family:
              -apple-system,
              BlinkMacSystemFont,
              'Segoe UI',
              Roboto,
              Helvetica,
              Arial,
              sans-serif;
            color: #f3f4f6;
          "
        >

          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="
              max-width: 580px;
              background-color: #090d16;
              border: 1px solid rgba(255, 255, 255, 0.12);
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            "
          >

            <!-- HEADER -->

            <tr>
              <td
                style="
                  padding: 32px 32px 20px 32px;
                  border-bottom:
                    1px solid rgba(255, 255, 255, 0.08);
                  background:
                    linear-gradient(
                      180deg,
                      rgba(36, 159, 243, 0.08) 0%,
                      rgba(9, 13, 22, 0) 100%
                    );
                "
              >

                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                >

                  <tr>

                    <!-- BRAND -->

                    <td
                      style="
                        vertical-align: middle;
                      "
                    >

                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                      >

                        <tr>

                          <!-- ICON -->

                          ${
                            hasIcon
                              ? `
                              <td
                                style="
                                  vertical-align: middle;
                                  padding-right: 12px;
                                "
                              >

                                <img
                                  src="cid:portfolio-logo"
                                  alt="Shawn Logo"
                                  width="36"
                                  height="36"
                                  style="
                                    display: block;
                                    width: 36px;
                                    height: 36px;
                                    border-radius: 8px;
                                    object-fit: cover;
                                    border:
                                      1px solid
                                      rgba(255, 255, 255, 0.1);
                                  "
                                />

                              </td>
                              `
                              : `
                              <td
                                style="
                                  vertical-align: middle;
                                  padding-right: 12px;
                                "
                              >

                                <div
                                  style="
                                    width: 36px;
                                    height: 36px;
                                    border-radius: 8px;
                                    background-color: #249ff3;
                                    color: #ffffff;
                                    font-weight: 800;
                                    font-size: 16px;
                                    line-height: 36px;
                                    text-align: center;
                                  "
                                >
                                  S
                                </div>

                              </td>
                              `
                          }

                          <!-- BRAND NAME -->

                          <td
                            style="
                              vertical-align: middle;
                            "
                          >

                            <span
                              style="
                                font-size: 18px;
                                font-weight: 700;
                                color: #ffffff;
                                letter-spacing: -0.02em;
                              "
                            >
                              Shawn<span style="color: #249ff3;">
                                .
                              </span>
                            </span>

                            <div
                              style="
                                font-size: 11px;
                                color: #249ff3;
                                font-weight: 600;
                                text-transform: uppercase;
                                letter-spacing: 0.05em;
                                margin-top: 2px;
                              "
                            >
                              New Inquiry
                            </div>

                          </td>

                        </tr>

                      </table>

                    </td>

                    <!-- FORM BADGE -->

                    <td
                      align="right"
                      style="
                        vertical-align: middle;
                      "
                    >

                      <span
                        style="
                          display: inline-block;
                          padding: 4px 10px;
                          font-size: 11px;
                          font-weight: 600;
                          color: #34d399;
                          background:
                            rgba(16, 185, 129, 0.1);
                          border:
                            1px solid
                            rgba(16, 185, 129, 0.25);
                          border-radius: 9999px;
                        "
                      >
                        Portfolio Form
                      </span>

                    </td>

                  </tr>

                </table>

              </td>
            </tr>


            <!-- CONTACT DETAILS -->

            <tr>

              <td
                style="
                  padding: 24px 32px;
                "
              >

                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="
                    background-color:
                      rgba(255, 255, 255, 0.03);
                    border:
                      1px solid
                      rgba(255, 255, 255, 0.06);
                    border-radius: 12px;
                    margin-bottom: 24px;
                  "
                >

                  <!-- NAME -->

                  <tr>

                    <td
                      style="
                        padding: 14px 18px;
                        border-bottom:
                          1px solid
                          rgba(255, 255, 255, 0.06);
                      "
                    >

                      <div
                        style="
                          font-size: 11px;
                          font-weight: 600;
                          text-transform: uppercase;
                          color: #9ca3af;
                          letter-spacing: 0.05em;
                        "
                      >
                        Sender Name
                      </div>

                      <div
                        style="
                          font-size: 14px;
                          font-weight: 600;
                          color: #ffffff;
                          margin-top: 3px;
                        "
                      >
                        ${safeName}
                      </div>

                    </td>

                  </tr>


                  <!-- EMAIL -->

                  <tr>

                    <td
                      style="
                        padding: 14px 18px;
                        border-bottom:
                          1px solid
                          rgba(255, 255, 255, 0.06);
                      "
                    >

                      <div
                        style="
                          font-size: 11px;
                          font-weight: 600;
                          text-transform: uppercase;
                          color: #9ca3af;
                          letter-spacing: 0.05em;
                        "
                      >
                        Email Address
                      </div>

                      <div
                        style="
                          font-size: 14px;
                          font-weight: 600;
                          margin-top: 3px;
                        "
                      >

                        <a
                          href="mailto:${safeEmail}"
                          style="
                            color: #249ff3;
                            text-decoration: none;
                          "
                        >
                          ${safeEmail}
                        </a>

                      </div>

                    </td>

                  </tr>


                  <!-- SUBJECT -->

                  <tr>

                    <td
                      style="
                        padding: 14px 18px;
                      "
                    >

                      <div
                        style="
                          font-size: 11px;
                          font-weight: 600;
                          text-transform: uppercase;
                          color: #9ca3af;
                          letter-spacing: 0.05em;
                        "
                      >
                        Subject
                      </div>

                      <div
                        style="
                          font-size: 14px;
                          font-weight: 600;
                          color: #ffffff;
                          margin-top: 3px;
                        "
                      >
                        ${safeSubject}
                      </div>

                    </td>

                  </tr>

                </table>


                <!-- MESSAGE -->

                <div
                  style="
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    color: #9ca3af;
                    letter-spacing: 0.05em;
                    margin-bottom: 8px;
                  "
                >
                  Message Content
                </div>


                <div
                  style="
                    background-color:
                      rgba(255, 255, 255, 0.02);
                    border:
                      1px solid
                      rgba(255, 255, 255, 0.06);
                    border-radius: 12px;
                    padding: 18px;
                    font-size: 14px;
                    line-height: 1.6;
                    color: #d1d5db;
                    white-space: pre-wrap;
                  "
                >
                  ${safeMessage}
                </div>


                <!-- REPLY BUTTON -->

                <div
                  style="
                    margin-top: 28px;
                    text-align: center;
                  "
                >

                  <a
                    href="mailto:${encodeURIComponent(
                      email
                    )}?subject=${encodeURIComponent(
                      `Re: ${subject}`
                    )}"
                    style="
                      display: inline-block;
                      background-color: #249ff3;
                      color: #ffffff;
                      font-size: 13px;
                      font-weight: 600;
                      text-decoration: none;
                      padding: 12px 24px;
                      border-radius: 12px;
                      box-shadow:
                        0 4px 14px
                        rgba(36, 159, 243, 0.3);
                    "
                  >
                    Reply to ${safeName}
                  </a>

                </div>

              </td>

            </tr>


            <!-- FOOTER -->

            <tr>

              <td
                style="
                  padding: 18px 32px 28px 32px;
                  border-top:
                    1px solid
                    rgba(255, 255, 255, 0.06);
                  text-align: center;
                  font-size: 12px;
                  color: #6b7280;
                "
              >
                Sent from your portfolio contact form
              </td>

            </tr>

          </table>

        </body>

      </html>
    `;

    // --------------------------------------------------
    // SEND EMAIL
    // --------------------------------------------------

    const { data, error } = await resend.emails.send({
      from: "Portfolio Website <onboarding@resend.dev>",

      to: [recipient],

      replyTo: email,

      subject: `${subject} - from ${name}`,

      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,

      html: emailHtml,

      // Attach the image as an inline CID image
      attachments: hasIcon
        ? [
            {
              filename: "favicon.png",

              content: fs.readFileSync(iconPath),

              contentType: "image/png",

              contentId: "portfolio-logo",
            },
          ]
        : [],
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Contact form error:", err);

    return NextResponse.json(
      {
        error: "Failed to process request.",
      },
      {
        status: 500,
      }
    );
  }
}