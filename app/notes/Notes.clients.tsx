'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { useState } from 'react';
import { NoteList } from '@/components/NoteList/NoteList'; 

export default function NotesClient() {
  const [search, setSearch] = useState('');

  const { data, error } = useQuery({
    queryKey: ['notes', search],
    queryFn: () => fetchNotes({ search }),
  });

  return (
    <div>
      <h1>My Notes</h1>
      
      {error && <p>Error loading notes.</p>}
    </div>
  );
}