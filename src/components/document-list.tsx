"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { getDocuments } from "@/app/actions/documents";
import { Skeleton } from "./ui/skeleton";

type Document = {
  id: string;
  title: string;
};

export default function DocumentList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeDocumentId = searchParams.get("doc");

  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const docs = await getDocuments();
        setDocuments(docs);
      } catch (error) {
        console.error("Failed to fetch documents", error);
        // Optionally, show a toast message here
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [searchParams]); // Refresh when new doc is uploaded and route changes

  const handleSelectDocument = (docId: string) => {
    router.push(`/dashboard?doc=${docId}`);
  };

  return (
    <div className="flex flex-col gap-2 px-2 py-2">
      <p className="px-2 text-xs font-semibold text-muted-foreground">
        YÜKLENEN DOKÜMANLAR
      </p>
      <SidebarMenu>
        {loading ? (
          <>
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </>
        ) : documents.length > 0 ? (
          documents.map((doc) => (
            <SidebarMenuItem key={doc.id}>
              <SidebarMenuButton
                onClick={() => handleSelectDocument(doc.id)}
                isActive={activeDocumentId === doc.id}
              >
                <FileText />
                <span>{doc.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        ) : (
          <p className="px-2 text-sm text-muted-foreground">Hiç doküman yok.</p>
        )}
      </SidebarMenu>
    </div>
  );
}
