## DeFi Road Map

We are building an innovative DeFi platform similar to [Yam on RealT](https://staging-yam.realtoken.network), aiming to make decentralized finance accessible and efficient.
Our project is in advanced stages, with initial smart contracts and an frontend UI already implemented.
The role will focus on finalizing and enhancing our platform’s user interface, integrating wallet functionality, and developing a marketplace for token transactions.

## Environment

If you meet any error while running the project, check the options bellow. And if you are using Windows, it is recommended to run the project using powershell or cmd.

Node verion: v18 or later

OS: Mac, Linux, Windows(An unexpected issue may arise)

## Run the application

Install dependencies and start the existing backend and React frontend together:

```sh
npm install
npm start
```

The React development server is available at `http://localhost:3000`. The Express backend (including the Notes API) listens on `http://localhost:5025` by default. Set `PORT` to change the backend port. During development, requests to `/notes` on port `3000` are proxied to the backend.

## Notes API

The Notes API stores notes in memory, so data resets whenever the backend restarts.

| Method | Path | Description | Success status |
| --- | --- | --- | --- |
| `POST` | `/notes` | Create a note | `201 Created` |
| `GET` | `/notes` | List all notes | `200 OK` |
| `GET` | `/notes/:id` | Get a note by id | `200 OK` |
| `PUT` | `/notes/:id` | Update a note | `200 OK` |
| `DELETE` | `/notes/:id` | Delete a note | `204 No Content` |

Each note has an integer `id`, `title`, `content`, and server-generated ISO string fields `createdAt` and `updatedAt`. Request bodies accept `title` and `content`; client-supplied ids and timestamps are ignored. Errors are JSON objects with an `error` message.

Example:

```sh
curl -i -X POST http://localhost:5025/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"First","content":"Hello"}'
curl -i http://localhost:5025/notes
```

Run the Notes API tests with `npm test` (or `npm run test:api`). The existing frontend test command is available as `npm run test:client`. With the backend running, execute `bash demo.sh` to run a Notes API walkthrough.

Import [`Quillbox Notes API.postman_collection.json`](./Quillbox%20Notes%20API.postman_collection.json) into Postman to run the example requests against `http://localhost:3000`.
