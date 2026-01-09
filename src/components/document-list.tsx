'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { File, FileText } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { documents } from '@/lib/data';

export default function DocumentList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeDocumentId = searchParams.get('doc');

  const handleSelectDocument = (docId: string) => {
    router.push(`/dashboard?doc=${docId}`);
  };

  return (
    <div className="flex flex-col gap-2 px-2 py-2">
      <p className="px-2 text-xs font-semibold text-muted-foreground">
        YÜKLENEN DOKÜMANLAR
      </p>
      <SidebarMenu>
        {documents.map((doc) => (
          <SidebarMenuItem key={doc.id}>
            <SidebarMenuButton
              onClick={() => handleSelectDocument(doc.id)}
              isActive={activeDocumentId === doc.id}
            >
              {doc.type === 'pdf' ? <File /> : <FileText />}
              <span>{doc.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}
