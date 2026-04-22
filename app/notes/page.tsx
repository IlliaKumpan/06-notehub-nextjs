import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import dynamic from 'next/dynamic';

const NotesClient = dynamic(() => import('./Notes.client'));

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes({ page: 1, perPage: 10 }), 
  });

  return (
    <main> 
      <header>
        <h1 className="visually-hidden">Notes Hub</h1>
      </header>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    </main>
  );
}