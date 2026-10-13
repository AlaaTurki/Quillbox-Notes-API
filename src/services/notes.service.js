const notes = new Map();
let nextId = 1;

function list() {
  return Array.from(notes.values(), (note) => ({ ...note }));
}

function get(id) {
  const note = notes.get(id);
  return note ? { ...note } : null;
}

function create({ title, content }) {
  const now = new Date().toISOString();
  const note = {
    id: nextId++,
    title,
    content,
    createdAt: now,
    updatedAt: now
  };

  notes.set(note.id, note);
  return { ...note };
}

function update(id, { title, content }) {
  const note = notes.get(id);
  if (!note) {
    return null;
  }

  const now = Date.now();
  const previousUpdatedAt = Date.parse(note.updatedAt);
  const updatedAt = new Date(Math.max(now, previousUpdatedAt + 1)).toISOString();
  const updatedNote = { ...note, title, content, updatedAt };
  notes.set(id, updatedNote);
  return { ...updatedNote };
}

function remove(id) {
  return notes.delete(id);
}

module.exports = { list, get, create, update, remove };
