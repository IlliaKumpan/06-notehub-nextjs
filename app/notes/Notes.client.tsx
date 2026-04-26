'use client';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { fetchNotes } from '@/lib/api';
import { NoteList } from '@/components/NoteList/NoteList';

const SearchBox = dynamic(() => import('@/components/SearchBox/SearchBox'), { ssr: false });
const Pagination = dynamic(() => import('@/components/Pagination/Pagination'), { ssr: false });
const Modal = dynamic(() => import('@/components/Modal/Modal').then(mod => mod.Modal), {
  ssr: false,
});
const NoteForm = dynamic(() => import('@/components/NoteForm/NoteForm').then(mod => mod.NoteForm), {
  ssr: false,
});

export default function NotesClient() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const perPage = 10;


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);


  const { data, isLoading } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch }),
    placeholderData: keepPreviousData, 
  });

  // Обробники подій
  const handleSearchChange = (value: string) => setSearch(value);
  const handlePageChange = (newPage: number) => setPage(newPage);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  if (isLoading && !data) return <p>Loading notes...</p>;

  return (
    <section>
      <SearchBox value={search} onChange={handleSearchChange} />
      
      <button type="button" onClick={toggleModal}>
        Add New Note
      </button>

      {data && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <Pagination 
          currentPage={page} 
          totalPages={data.totalPages} 
          onPageChange={handlePageChange} 
        />
      )}

      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <NoteForm onClose={toggleModal} />
        </Modal>
      )}
    </section>
  );
}