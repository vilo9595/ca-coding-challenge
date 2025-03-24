# Notification Service

Welcome to the **Notification Service**! This service allows you to send notifications to a Discord server.

- Send **Warning** notifications to a Discord server.
- To adapt for another messenger Service simply change the webhook in the environment variables to your own webhook. 
- Use `curl` or any other HTTP client to send POST requests to the API endpoint.

---

## API Endpoint
To send a notification, make a POST request to the following endpoint:
```
http://localhost:3000/api/notifications
```

---

## Example Request using `curl`:

```bash
curl.exe -X POST "http://localhost:3000/api/notifications" \
-H "Content-Type: application/json" \
--data-binary "@notification.txt"
```

### Example Payload (inside `notification.txt` File)
```json
    "type": "Warning",
    "name": "Test Message",
    "description": "This message will be forwarded"
```

- **Valid Types**: `Warning`, `Info`
- Ensure the payload is in JSON format.

---

## Join the Discord Server
Click the link below to join the Discord server:

[Join Discord Server](https://discord.gg/wqq9fjVGpd)

---

## Additional Information
- An example payload is defined in the `notification.txt` file located in the root of the project.
- This service is designed to handle notifications and forward them to a Discord server if the type is `Warning`.

---

## How to Run
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Visit the landing page at `http://localhost:3000/` for more details.