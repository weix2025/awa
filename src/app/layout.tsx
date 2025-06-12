import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

// 设定网站的元数据，例如标题和描述
export const metadata: Metadata = {
  title: "恢复的项目 (Restored Project)",
  description: "正在从备份重建的项目",
};

// 这是网站的根布局，所有页面都会应用这个布局
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        {/* 子页面内容将在这里渲染 */}
        {children}
      </body>
    </html>
  );
}
