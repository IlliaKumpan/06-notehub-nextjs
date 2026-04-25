'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { NoteList } from '@/components/NoteList/NoteList';

export default function NotesClient() {
  const { data } = useQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes({ page: 1, perPage: 10 }),
  });

  if (!data) return null;

  return <NoteList notes={data.notes} />;
}