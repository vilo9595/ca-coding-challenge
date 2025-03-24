import { NextResponse } from "next/server";

//localhost:3000/
export async function GET() {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Notification Service</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #045462;
        }
        .container {
          text-align: center;
        }
        .text-block {
          margin: 10px 0;
          font-size: 1rem;
          color: #fff;
        }
        .link {
          margin-top: 20px;
          font-size: 1.2rem;
          color: #f8ec17;
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="text-block">Welcome to the Notification Service!</div>
         <div class="text-block">This service allows you to send Warning notifications to a Discord server.</div>
        <div class="text-block">Use curl or any other method to send a POST request to the API endpoint:</div>
        <div class="text-block"><code>http://localhost:3000/api/notifications</code></div>
        <div class="text-block">Example request:</div>
        <div class="text-block">curl.exe -X POST "http://localhost:3000/api/notifications" -H "Content-Type: application/json" --data-binary "@notification.txt"</div>
        <div class="text-block">An example for the notification payload is defined in the notification.txt file in the root of the Project</div>
        <div class="text-block">Valid types are "Warning" and "Info"</div>
        <div class="text-block">Click the link below to join the Discord server:</div>
        <a class="link" href="https://discord.gg/wqq9fjVGpd" target="_blank">Join Discord Server</a>
      </div>
    </body>
    </html>
  `;

  return new Response(htmlContent, {
    headers: { "Content-Type": "text/html" },
  });
}
