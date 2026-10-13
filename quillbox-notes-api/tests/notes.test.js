const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');
const app = require('../src/notesApp');

let server;
let baseUrl;
let firstNote;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });
  baseUrl = `http://localhost:${server.address().port}`;
});

after(async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

test('creates a note with a Location header and server-generated fields', async () => {
  const response = await fetch(`${baseUrl}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: ' First ',
      content: 'Hello',
      id: 900,
      createdAt: 'client value',
      updatedAt: 'client value'
    })
  });

  assert.equal(response.status, 201);
  firstNote = await response.json();
  assert.equal(response.headers.get('location'), `/notes/${firstNote.id}`);
  assert.equal(firstNote.id, 1);
  assert.equal(firstNote.title, 'First');
  assert.equal(firstNote.content, 'Hello');
  assert.notEqual(firstNote.createdAt, 'client value');
  assert.equal(firstNote.updatedAt, firstNote.createdAt);
});

test('lists notes', async () => {
  const response = await fetch(`${baseUrl}/notes`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), [firstNote]);
});

test('gets a note by id', async () => {
  const response = await fetch(`${baseUrl}/notes/${firstNote.id}`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), firstNote);
});

test('returns 404 for an unknown note id', async () => {
  const response = await fetch(`${baseUrl}/notes/999`);

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: 'Note not found' });
});

test('returns 400 for an invalid note id', async () => {
  const response = await fetch(`${baseUrl}/notes/abc`);

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: 'Invalid note id' });
});

test('updates a note without changing createdAt', async () => {
  const response = await fetch(`${baseUrl}/notes/${firstNote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'First edited', content: 'Updated' })
  });

  assert.equal(response.status, 200);
  const updatedNote = await response.json();
  assert.equal(updatedNote.title, 'First edited');
  assert.equal(updatedNote.content, 'Updated');
  assert.equal(updatedNote.createdAt, firstNote.createdAt);
  assert.notEqual(updatedNote.updatedAt, firstNote.updatedAt);
  firstNote = updatedNote;
});

test('deletes a note and then returns 404', async () => {
  const deleted = await fetch(`${baseUrl}/notes/${firstNote.id}`, { method: 'DELETE' });
  assert.equal(deleted.status, 204);
  assert.equal(await deleted.text(), '');

  const missing = await fetch(`${baseUrl}/notes/${firstNote.id}`);
  assert.equal(missing.status, 404);
  assert.deepEqual(await missing.json(), { error: 'Note not found' });
});

test('rejects an invalid POST body', async () => {
  const response = await fetch(`${baseUrl}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: 'Title must be a non-empty string' });
});
