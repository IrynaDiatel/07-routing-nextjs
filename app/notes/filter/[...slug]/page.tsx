import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Notes from "@/app/notes/Notes.client";
import type { NoteTag } from "@/types/note";

interface FilterPageProps {
  params: Promise<{ tag: string[] }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { tag } = await params;
  const selectedTag = tag[0] === "all" ? "" : (tag[0] as NoteTag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", selectedTag, 1],
    queryFn: () => fetchNotes({ page: 1, search: "", tag: selectedTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={selectedTag} />
    </HydrationBoundary>
  );
}
