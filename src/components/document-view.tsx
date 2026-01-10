"use client";

import { useEffect } from "react";
import type { Document } from "@prisma/client";
import { useState } from "react";
import {
  Book,
  FileText,
  Lightbulb,
  Search,
  Sparkles,
  ThumbsDown,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getSummaries } from "@/app/actions/documents";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { summarizeDocument } from "@/ai/flows/document-summarization";
import { semanticQuestionAnswering } from "@/ai/flows/semantic-question-answering";
import { reportAiError } from "@/ai/flows/ai-error-reporting";
import { Separator } from "./ui/separator";

type QnaResult = {
  answer: string;
  sourceDocuments: string[];
  question: string;
  isHardcoded?: boolean;
};

type Summary = {
  id: string;
  type: "SHORT" | "LONG";
  content: string;
  createdAt: string;
};

export default function DocumentView({ document }: { document: Document }) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [question, setQuestion] = useState("");
  const [qnaLoading, setQnaLoading] = useState(false);
  const [qnaResult, setQnaResult] = useState<QnaResult | null>(null);

  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryResult, setSummaryResult] = useState("");
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);

  const [saved, setSaved] = useState(false);
  const [summaries, setSummaries] = useState<any[]>([]);

  const [errorReportDialogOpen, setErrorReportDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState(""); 

  useEffect(() => {
      getSummaries(document.id).then(setSummaries);
    }, [document.id]);

  const handleKeywordSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-accent/50">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setQnaLoading(true);
    setQnaResult(null);

    // Hardcoded scenario for AI error reporting
    if (
      document.title.includes("Yapay Zeka Etiği") && // A more robust check
      question.toLowerCase().includes("yazarı kimdir")
    ) {
      setTimeout(() => {
        setQnaResult({
          question: question,
          answer:
            "Bu dokümanın yazarı kesin olarak Albert Einstein'dır. Kendisi, görelilik teorisiyle tanınan ünlü bir fizikçidir.",
          sourceDocuments: [document.title],
          isHardcoded: true,
        });
        setQnaLoading(false);
      }, 1500);
      return;
    }

    try {
      const result = await semanticQuestionAnswering({
        documentText: document.content,
        question: question,
      });
      setQnaResult({ ...result, question: question });
    } catch (error) {
      console.error(error);
      toast({
        title: "Hata",
        description: "Soru cevaplanırken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setQnaLoading(false);
    }
  };

  const handleSummarize = async (detailed: boolean) => {
    setSummaryLoading(true);
    setSummaryResult("");
    setSummaryDialogOpen(true);
    try {
      const result = await summarizeDocument({
        documentId: document.id,
        documentText: document.content,
        detail: detailed,
      });
      setSaved(true);
      setSummaryResult(result.summary);
    } catch (error) {
      console.error(error);
      setSummaryResult("Özet oluşturulurken bir hata oluştu.");
    } finally {
      setSummaryLoading(false);
    }
    const data = await getSummaries(document.id);
    setSummaries(data);
  };

  const handleReportError = async () => {
    if (!feedback.trim() || !qnaResult) return;

    try {
      await reportAiError({
        query: qnaResult.question,
        incorrectResponse: qnaResult.answer,
        documentId: document.id,
        feedback: feedback,
      });
      toast({
        title: "Geri Bildirim Gönderildi",
        description: "Hatalı yanıtı bildirdiğiniz için teşekkür ederiz.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Geri bildirim gönderilirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setErrorReportDialogOpen(false);
      setFeedback("");
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-60px)] flex-1 flex-col gap-4 bg-background p-4 md:gap-8 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Content */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="text-primary" />
                  {document.title}
                </CardTitle>
                <CardDescription>
                  Doküman içeriği ve anahtar kelime arama
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSummarize(false)}
                >
                  <Book className="mr-2 h-4 w-4" /> Kısa Özet
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSummarize(true)}
                >
                  <Book className="mr-2 h-4 w-4" /> Detaylı Özet
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Doküman içinde anahtar kelime ara..."
                className="pl-8"
                value={searchTerm}
                onChange={handleKeywordSearch}
              />
            </div>
            <ScrollArea className="h-[55vh] rounded-md border p-4">
              <pre className="whitespace-pre-wrap text-sm font-sans">
                {getHighlightedText(document.content, searchTerm)}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* AI Interaction Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="text-primary" />
              Akıllı Asistan
            </CardTitle>
            <CardDescription>
              Doküman hakkında anlamsal arama yapın
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-[calc(100%-88px)]">
            <div className="space-y-2">
              <Input
                placeholder="Dokümana bir soru sor..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
              />
              <Button
                onClick={handleAskQuestion}
                disabled={qnaLoading}
                className="w-full"
              >
                {qnaLoading ? "Soruluyor..." : "Sor"}
              </Button>
            </div>

            <Separator className="my-4" />

            <ScrollArea className="flex-1">
              <div className="space-y-4 pr-2">
                {qnaLoading && (
                  <div className="flex items-center justify-center p-8">
                    <svg
                      className="animate-spin h-8 w-8 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                )}
                {qnaResult ? (
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-muted-foreground">
                      {qnaResult.question}
                    </p>
                    <div className="p-4 bg-muted/50 rounded-lg text-sm">
                      {qnaResult.answer}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Badge variant="secondary">
                          Kaynak: {qnaResult.sourceDocuments.join(", ")}
                        </Badge>
                        {qnaResult.isHardcoded && (
                          <Badge variant="destructive">Hatalı Cevap</Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setErrorReportDialogOpen(true)}
                      >
                        <ThumbsDown className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  !qnaLoading && (
                    <div className="text-center text-muted-foreground p-8 flex flex-col items-center justify-center gap-2">
                      <Lightbulb className="h-8 w-8" />
                      <p className="text-sm">
                        "Projenin bütçesi ne kadar?" gibi sorular
                        sorabilirsiniz.
                      </p>
                      {document.title.includes("Yapay Zeka Etiği") && (
                        <p className="text-sm font-semibold">
                          "Bu dokümanın yazarı kimdir?" diye sormayı deneyin.
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Summary Dialog */}
      <Dialog open={summaryDialogOpen} onOpenChange={setSummaryDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Doküman Özeti</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] p-1">
            <div className="p-4 bg-muted/50 rounded-lg">
              {summaryLoading ? (
                <div className="flex items-center justify-center p-8">
                  <svg
                    className="animate-spin h-6 w-6 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="ml-2">Özet oluşturuluyor...</span>
                </div>
              ) : (
                <p className="text-sm">{summaryResult}</p>
              )}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setSummaryDialogOpen(false)}
            >
              Kapat
            </Button>
            <Button
              onClick={() => setSaved(true)}
              variant="default"
            >
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Error Report Dialog */}
      <Dialog
        open={errorReportDialogOpen}
        onOpenChange={setErrorReportDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hatalı Cevabı Bildir</DialogTitle>
            <DialogDescription>
              Yapay zekanın yanıtını geliştirmemize yardımcı olduğunuz için
              teşekkür ederiz. Lütfen hatanın ne olduğunu kısaca açıklayın.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm font-medium text-foreground/80">
                Hatalı Yanıt:
              </p>
              <p className="text-sm text-foreground/90 italic">
                "{qnaResult?.answer}"
              </p>
            </div>
            <Textarea
              placeholder="Geri bildiriminiz..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setErrorReportDialogOpen(false)}
            >
              İptal
            </Button>
            <Button onClick={handleReportError} disabled={!feedback.trim()}>
              Gönder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* SAVED SUMMARIES */}
      <Card>
        <CardHeader>
          <CardTitle>Kayıtlı Özetler</CardTitle>
          <CardDescription>
            Bu doküman için kaydedilmiş kısa ve detaylı özetler
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {summaries.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Henüz kaydedilmiş bir özet yok.
            </p>
          ) : (
            summaries.map((s) => (
              <div
                key={s.id}
                className="p-4 border rounded-lg bg-muted/30 space-y-2"
              >
                <Badge
                  variant={s.type === "SHORT" ? "secondary" : "default"}
                >
                  {s.type === "SHORT" ? "Kısa Özet" : "Detaylı Özet"}
                </Badge>

                <p className="text-sm whitespace-pre-wrap">
                  {s.content}
                </p>

                <p className="text-xs text-muted-foreground">
                  {new Date(s.createdAt).toLocaleString("tr-TR")}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </main>
  );
}
