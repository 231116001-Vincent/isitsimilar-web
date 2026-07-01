import { formatFileSize } from "@/lib/utils";
import { LucideCloudUpload, LucideFile } from "lucide-react";
import { useRef, useState, type DragEvent } from "react";

export default function FilePicker({
  selectedFile,
}: {
  selectedFile: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [document, setDocument] = useState<File>();

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();

    if (!e.dataTransfer) return;

    const file = [...e.dataTransfer.items]
      .map((item) => item.getAsFile())
      .filter((file) => file)[0];

    if (!file) return;

    setDocument(file);
    selectedFile(file);
  };

  const onClick = () => {
    const input = inputRef.current;
    if (!input) return;

    input.click();
    input.addEventListener("change", () => {
      if (!input.files) return;

      const file = input.files[0];
      setDocument(file);
      selectedFile(file);
    });
  };

  return (
    <label
      onClick={onClick}
      onDrop={handleDrop}
      onDrag={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
      className="aspect-2/1 border-2 border-dashed rounded-xl flex justify-center items-center"
    >
      {document ? (
        <div className="flex flex-col items-center text-foreground">
          <LucideFile size={18} className="mb-2" />
          <span className="text-base font-medium">{document.name}</span>
          <span className="text-muted-foreground">
            {formatFileSize(document.size)}
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center font-medium text-muted-foreground">
          <LucideCloudUpload />
          Upload Dokumen
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".docx,.pdf"
        name="document1"
        id="document1"
        className="hidden"
      />
    </label>
  );
}
