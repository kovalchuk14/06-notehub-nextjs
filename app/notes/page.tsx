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

  const initialData = await queryClient.fetchQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={initialData} initialSearch={searchQuery} initialPage={currentPage}/>
    </HydrationBoundary>
  );
}

export default App
