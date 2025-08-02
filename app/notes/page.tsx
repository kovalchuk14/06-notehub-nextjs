import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

async function App({ searchParams }: { searchParams?: { q?: string; page?: string } }) {
  const queryClient = new QueryClient();
    const searchQuery = searchParams?.q ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialSearch={searchQuery} initialPage={currentPage}/>
    </HydrationBoundary>
  );
}

export default App
