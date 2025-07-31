import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

async function App() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["request", "", 1],
    queryFn: () => fetchNotes("", 1),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

export default App
