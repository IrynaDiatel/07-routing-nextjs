import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";
import ModalWrapper from "./ModalWrapper";

interface InterceptedNotePageProps {
  params: Promise<{ id: string }>;
}

export default async function InterceptedNotePage({
  params,
}: InterceptedNotePageProps) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <ModalWrapper>
      <NotePreview note={note} />
    </ModalWrapper>
  );
}
