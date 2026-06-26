import { formatFileSize } from "@/lib/utils";
import { LucideFile } from "lucide-react";

export default function CardDocument({
  filename,
  size,
}: {
  filename: String;
  size: number;
}) {
  const lastDot = filename.lastIndexOf(".");

  return (
    <div className="flex gap-2 p-2 items-center border rounded-xl">
      <LucideFile strokeWidth={1.8} size={16} className="m-2" />

      <div className="flex flex-col">
        <span className="text-base font-medium">
          {filename.slice(0, lastDot)}
        </span>
        <span className="text-xs text-muted-foreground">
          {formatFileSize(size)} - {filename.slice(lastDot + 1).toUpperCase()}
        </span>
      </div>
    </div>
  );
}
