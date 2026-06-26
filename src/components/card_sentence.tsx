import { similarityColor } from "@/lib/utils";

export default function SentenceCard({
  sentence1,
  sentence2,
  similarity,
}: {
  sentence1: String;
  sentence2: String;
  similarity: number;
}) {
  const color = similarityColor(similarity);

  return (
    <div className="min-w-3xl p-4 flex gap-2 border rounded-xl">
      <span
        className={`w-fit h-fit aspect-square rounded-full p-5 flex items-center text-base font-semibold`}
        style={{
          color: color,
          backgroundColor: `color-mix(in oklab, ${color} 10%, transparent)`,
        }}
      >
        {similarity.toFixed(1)}%
      </span>

      <div className="grow flex flex-col gap-2">
        <div className="grow flex flex-col gap-1">
          <span>Dokumen A</span>
          <p className="p-2 rounded-lg bg-muted overflow-hidden">
            <span className="line-clamp-3">{sentence1}</span>
          </p>
        </div>

        <div className="grow flex flex-col gap-1">
          <span>Dokumen B</span>
          <p className="p-2 rounded-lg bg-muted overflow-hidden">
            <span className="line-clamp-3">{sentence2}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
