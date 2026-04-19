'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from '@/components/NoteDetails/NoteDetails.module.css';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, 
  });
    
  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p>Something went wrong. Note not found.</p>;
  }

  return (
    <main className={css.container}>
      <article className={css.item}>
        <header className={css.header}>
          <h2>{note.title}</h2>
        </header>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </article>
    </main>
  );
}