# OpenAI API + Docker Integration

Small Node.js portfolio project that calls the OpenAI Chat Completions API. It has three entrypoints that share one API key and otherwise run separately:

- `server.js` is an Express app. It serves the browser chat in `public/` and forwards prompts from `POST /api/openai` to `gpt-3.5-turbo`.
- `app.js` is what Docker and `npm start` run. It sends one fixed prompt to `gpt-4`, prints the reply, and exits.
- `openai.js` is a standalone script that asks `gpt-4o-mini` one fixed question and prints the reply.

Vercel is configured to run `server.js`. The published Docker image name in GitHub Actions is `celsosjunior/openai`.

## Demo

Public URL: https://celsogpt.vercel.app

That link does not serve the app. On 4 November 2026, `GET /` and `POST /api/openai` both returned **HTTP 404** from Vercel with `x-vercel-error: DEPLOYMENT_NOT_FOUND` and the body `The deployment could not be found on Vercel.` The hostname still resolves to Vercel; there is no deployment attached to it.

## Stack

- **Runtime:** Node.js 18 in the Docker image (`node:18`). `package.json` allows Node `>=14`. CI installs Node 18, 20, and 22.
- **HTTP API:** Express 4 (`server.js`), static files from `public/`.
- **OpenAI:** `openai` npm package 4.x in `app.js`; `axios` calls to `https://api.openai.com/v1/chat/completions` in `server.js` and `openai.js`.
- **Config:** `dotenv` loads a local `.env` for the Node scripts.
- **UI:** HTML, CSS, and browser JavaScript (`public/index.html`, `public/style.css`, `public/script.js`).
- **Containers:** `Dockerfile` (port 3000 declared; the start command does not listen). Release workflow pushes `celsosjunior/openai` to Docker Hub.
- **Hosting config:** `vercel.json` builds `server.js` with `@vercel/node` and routes every path to it.

```
.
├── app.js            # npm start / Docker: one gpt-4 completion, then exit
├── openai.js         # one gpt-4o-mini completion, then exit
├── server.js         # Express chat UI and POST /api/openai
├── public/           # index.html, style.css, script.js
├── Dockerfile
├── vercel.json
├── package.json
└── .env.example      # variable names only
```

`structure.jpeg` is an early sketch of this layout. The tree above matches the repository.

## Environment variables

Names only. Copy `.env.example` to `.env` and set values on your machine. `.env` is listed in `.gitignore`. Do not commit it.

| Name | Role |
| --- | --- |
| `OPENAI_API_KEY` | Required by `app.js`, `openai.js`, and `server.js`. |
| `PORT` | Optional. `server.js` listens on this port, or on `3000` when it is unset. |

GitHub Actions references these secret names (values stay in repository secrets):

- `OPENAI_API_KEY` (Node.js CI)
- `NPM_TOKEN` (Node.js CI, passed through as `NODE_AUTH_TOKEN`)
- `DOCKERHUB_USERNAME` (Docker Hub release)
- `DOCKER_PASSWORD` (Docker Hub release)

The image build copies the whole context (`COPY . .`). A filled `.env` sitting in this directory is copied into the image. Keep the key out of the build context and pass `OPENAI_API_KEY` when you start the container.

## Run locally with Docker

Install Docker and export `OPENAI_API_KEY` in your shell (or put it in a `.env` file that you do not copy into the build context).

```bash
docker build -t openai-chat .
docker run --rm -e OPENAI_API_KEY openai-chat
```

`-e OPENAI_API_KEY` forwards the variable already set in the shell. To read a file instead:

```bash
docker run --rm --env-file .env openai-chat
```

The container runs `npm start`, which is `node app.js`. Expect one `gpt-4` reply on stdout (a joke about artificial intelligence), then the process exits. Nothing is served on port 3000.

### Browser UI on the host

This is the process Vercel is configured to run. It is separate from the Docker command above.

```bash
export OPENAI_API_KEY
node server.js
```

Open http://localhost:3000, enter a prompt, and submit. The page posts to `/api/openai`, and the server calls `gpt-3.5-turbo`. Set `PORT` if you want a port other than 3000. `npm run dev` runs the same file under nodemon.

`node openai.js` runs the other one-shot example (`gpt-4o-mini`, capital of France).

## License

MIT. Copyright (c) 2024 Celso da Silva Junior. See [LICENSE](LICENSE).
