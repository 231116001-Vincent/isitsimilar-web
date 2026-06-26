import FilePicker from "@/components/file_picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function HomePage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [doc1, setDoc1] = useState<File>();
  const [doc2, setDoc2] = useState<File>();

  const handleSubmit = async () => {
    if (!doc1 || !doc2) {
      console.log("Test");
      toast.error("Upload dokumen yang akan digunakan.");
      return;
    }

    setLoading(true);
    let result;

    try {
      const formData = new FormData();
      formData.append("doc1", doc1);
      formData.append("doc2", doc2);

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/compare`,
        {
          method: "POST",
          body: formData,
        }
      );
      result = await response.json();
      console.log(response);
      console.log(result);

      if (!response.ok) {
        toast.error("Server returns an error");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("result", JSON.stringify(result));
      navigate("/result", { state: { result } });
      console.log("navigate called, current location:", window.location.href);
    } catch (error) {
      toast.error("An unkown error occured");
      setLoading(false);
      return;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4 bg-background border rounded-xl p-4">
        <div className="flex flex-col gap-1">
          <FilePicker selectedFile={(file) => setDoc1(file)} />
          <span className="font-medium">Dokumen A</span>
        </div>
        <div className="flex flex-col gap-1">
          <FilePicker selectedFile={(file) => setDoc2(file)} />
          <span className="font-medium">Dokumen B</span>
        </div>

        <Button
          disabled={loading || !(doc1 && doc2)}
          onClick={handleSubmit}
          className={`col-span-2`}
        >
          {loading && <Spinner />}
          Bandingkan
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-lg">FAQ</h2>
        <div className="px-4 py-2 border rounded-xl">
          <Accordion>
            <AccordionItem>
              <AccordionTrigger>
                Apakah aplikasi ini menggantikan penilaian guru?
              </AccordionTrigger>
              <AccordionContent>
                Tidak. Aplikasi ini dirancang sebagai alat bantu, bukan
                pengganti. Keputusan akhir tetap sepenuhnya berada di tangan
                pendidik.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>
                Format file apa saja yang didukung?
              </AccordionTrigger>
              <AccordionContent>
                Saat ini aplikasi hanya mendukung file berformat .docx dan .pdf
              </AccordionContent>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>
                Apakah dokumen yang diunggah disimpan di server?
              </AccordionTrigger>
              <AccordionContent>
                Tidak. Dokumen hanya diproses sementara untuk keperluan analisis
                dan langsung dihapus setelahnya
              </AccordionContent>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>
                Apakah ada batasan ukuran file?
              </AccordionTrigger>
              <AccordionContent>
                Untuk performa terbaik disarankan mengunggah dokumen dengan
                ukuran di bawah 10MB per file.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
