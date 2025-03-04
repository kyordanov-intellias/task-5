import { db } from "../../db";
import { Context } from "koa";

interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
}

export const createNote = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  const { title, content } = ctx.request.body as {
    title: string;
    content: string;
  };

  const note: Note = {
    id: crypto.randomUUID(),
    userId,
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  await db.storage.add(note.id, note);
  ctx.body = { message: "Note created", note };
};

export const getNotes = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  const notes = (await db.storage.get()) as Note[];
  const userNotes = notes.filter((note) => note.userId === userId);

  ctx.body = { notes: userNotes };
};

export const getSingleNote = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  const noteId = ctx.params.id;

  const note = (await db.storage.get(noteId)) as Note;

  if (!note) {
    ctx.status = 404;
    ctx.body = { error: "Note not found" };
    return;
  }

  if (note.userId !== userId) {
    ctx.status = 403;
    ctx.body = { error: "Unauthorized: You can't access this note" };
    return;
  }

  ctx.body = { note };
};

export const updateNote = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  const noteId = ctx.params.id;

  const note = (await db.storage.get(noteId)) as Note;
  if (!note || note.userId !== userId) {
    ctx.status = 403;
    ctx.body = { error: "Unauthorized or note not found" };
    return;
  }

  const updateData = ctx.request.body as Partial<Note>;

  if (updateData.title !== undefined && updateData.title.trim() === "") {
    ctx.status = 400;
    ctx.body = { error: "Title cannot be empty" };
    return;
  }

  if (updateData.content !== undefined && updateData.content.trim() === "") {
    ctx.status = 400;
    ctx.body = { error: "Content cannot be empty" };
    return;
  }

  const updatedNote = { ...note, ...updateData };

  await db.storage.update(note.id, updatedNote);
  ctx.body = { message: "Note updated", note: updatedNote };
};

export const deleteNote = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  const noteId = ctx.params.id;

  const note = (await db.storage.get(noteId)) as Note;
  if (!note || note.userId !== userId) {
    ctx.status = 403;
    ctx.body = { error: "Unauthorized or note not found" };
    return;
  }

  await db.storage.delete(noteId);
  ctx.body = { message: "Note deleted" };
};
