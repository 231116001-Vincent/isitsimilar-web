import CardDocument from "@/components/card_document";
import SentenceCard from "@/components/card_sentence";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { APIResult } from "@/lib/types";
import { similarityColor } from "@/lib/utils";
import { useState } from "react";
import { Navigate, useLocation } from "react-router";
import { toast } from "sonner";

export default function ResultPage() {
  const { state } = useLocation();
  const result =
    state?.result ?? JSON.parse(sessionStorage.getItem("result") ?? "null");
  const formattedResult = APIResult.safeParse(result);

  if (!result || !formattedResult.success) {
    toast.error("Invalid data received.");
    return <Navigate to="/" />;
  }

  const [openHighlight, setOpenHighlight] = useState(false);
  const [openSimilar, setOpenSimilar] = useState(false);

  const { overallScore } = formattedResult.data;

  const color = similarityColor(overallScore);

  return (
    <div className="flex flex-col gap-8">
      <div
        style={{
          color,
          backgroundColor: `color-mix(in oklab, ${color} 10%, transparent)`,
        }}
        className="w-fit aspect-square p-8 gap-1 flex flex-col justify-center items-center self-center rounded-full bg-orange-400/10"
      >
        <span className="font-medium text-base">Plagiarisme</span>
        <span className="text-4xl font-semibold">{overallScore}%</span>
      </div>

      <div className="w-full flex gap-4">
        <div className="grow flex flex-col gap-1">
          <h2>Dokumen A</h2>
          <CardDocument
            filename={formattedResult.data.doc1Filename}
            size={formattedResult.data.doc1Size}
          />
        </div>
        <div className="grow flex flex-col gap-1">
          <h2>Dokumen B</h2>
          <CardDocument
            filename={formattedResult.data.doc2Filename}
            size={formattedResult.data.doc2Size}
          />
        </div>
      </div>

      {formattedResult.data.highlights.length > 0 && (
        <Collapsible onOpenChange={(open) => setOpenHighlight(open)}>
          <div className="flex flex-col gap-4">
            <h2>Highlight</h2>

            <SentenceCard
              sentence1={formattedResult.data.highlights[0].doc1Sentence}
              sentence2={formattedResult.data.highlights[0].doc2Sentence}
              similarity={formattedResult.data.highlights[0].similarity}
            />

            <CollapsibleContent className="flex flex-col gap-4">
              {formattedResult.data.highlights.map(
                (val, idx) =>
                  idx != 0 && (
                    <SentenceCard
                      sentence1={val.doc1Sentence}
                      sentence2={val.doc2Sentence}
                      similarity={val.similarity}
                    />
                  )
              )}
            </CollapsibleContent>

            <CollapsibleTrigger
              render={
                <Button variant="outline">
                  {!openHighlight ? "Lihat Semua" : "Sembunyikan"}
                </Button>
              }
            />
          </div>
        </Collapsible>
      )}

      <div className="flex flex-col gap-4">
        <h2>Kalimat Serupa</h2>

        {formattedResult.data.sideBySide.length > 0 ? (
          <Collapsible onOpenChange={(open) => setOpenSimilar(open)}>
            {formattedResult.data.sideBySide.map(
              (val, idx) =>
                idx <= 2 && (
                  <SentenceCard
                    sentence1={val.doc1Sentence}
                    sentence2={val.doc2Sentence}
                    similarity={val.similarity}
                  />
                )
            )}

            <CollapsibleContent className="flex flex-col gap-4">
              {formattedResult.data.sideBySide.map(
                (val, idx) =>
                  idx > 2 && (
                    <SentenceCard
                      sentence1={val.doc1Sentence}
                      sentence2={val.doc2Sentence}
                      similarity={val.similarity}
                    />
                  )
              )}
            </CollapsibleContent>

            <CollapsibleTrigger
              render={
                <Button variant="outline">
                  {!openSimilar ? "Lihat Semua" : "Sembunyikan"}
                </Button>
              }
            />
          </Collapsible>
        ) : (
          <div className="h-32 flex justify-center items-center">
            <p className="text-muted-foreground">
              Dokumen tidak memiliki kalimat yang mirip.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
