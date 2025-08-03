import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { FetchHttpResponse, fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

async function App() {
  const queryClient = new QueryClient();
    const searchQuery = "";
  const currentPage = 1;

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
  });

  const initData = queryClient.getQueryData<FetchHttpResponse>(["notes", searchQuery, currentPage]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initData={ initData} initialSearch={searchQuery} initialPage={currentPage}/>
    </HydrationBoundary>
  );
}

export default App
