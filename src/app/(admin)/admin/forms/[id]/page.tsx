import FormEditorShared from "@/components/admin/FormEditorShared";

export default function EditFormPage({ params }: { params: { id: string } }) {
  // params.id kommt direkt aus dem Ordnernamen [id]
  return <FormEditorShared initialId={params.id} />;
}