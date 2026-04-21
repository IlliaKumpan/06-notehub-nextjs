'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { fetchNotes } from '@/lib/api';
import { NoteList } from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { Modal } from '@/components/Modal/Modal';
import { NoteForm } from '@/components/NoteForm/NoteForm';

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


  const { data, isError } = useQuery({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes({ search: debouncedSearch, page, perPage }),
    placeholderData: keepPreviousData, 
  });

  const handleSearchChange = (value: string): void => {
    setSearch(value);
  };

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  const toggleModal = (): void => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <main>
      <h1>My Notes</h1>
      
      <button type="button" onClick={toggleModal}>
        Add New Note
      </button>

      <SearchBox value={search} onChange={handleSearchChange} />

      {isError ? (
        <p>Error loading notes.</p>
      ) : (
        <NoteList notes={data?.notes || []} />
      )}

      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <NoteForm onCancel={toggleModal} />
        </Modal>
      )}
    </main>
  );
}