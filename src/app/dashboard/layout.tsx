"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uploadDocument } from "@/ai/flows/document-upload";

import DocumentList from "@/components/document-list";
import Logo from "@/components/logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // TODO: Show loading state

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;

        try {
          const result = await uploadDocument({
            fileName: file.name,
            fileContent: content,
          });

          toast({
            title: "Başarılı",
            description: `${result.fileName} başarıyla yüklendi.`,
          });
          // Refresh the page to show the new document in the list
          router.push(`/dashboard?doc=${result.documentId}`);
          router.refresh();
        } catch (error) {
          toast({
            title: "Hata",
            description: "Doküman veritabanına kaydedilirken bir hata oluştu.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    } catch (error) {
      console.error(error);
      toast({
        title: "Hata",
        description: "Dosya okunurken bir hata oluştu.",
        variant: "destructive",
      });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <div className="p-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={handleUploadClick}
            >
              <Upload className="size-4" />
              <span>Doküman Yükle</span>
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".txt,.pdf"
            />
          </div>
          <DocumentList />
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 p-2 h-auto"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://picsum.photos/seed/user/100/100"
                    data-ai-hint="person avatar"
                  />
                  <AvatarFallback>DK</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium">Demo Kullanıcı</p>
                  <p className="text-xs text-muted-foreground">
                    demo@akildoc.com
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2">
              <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ayarlar</DropdownMenuItem>
              <DropdownMenuItem>Destek</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">Çıkış Yap</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="w-full flex-1">
            {/* Can be used for a global search */}
          </div>
          <p className="text-sm text-muted-foreground font-medium"></p>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
