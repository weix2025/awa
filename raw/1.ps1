# PowerShell 脚本：为 Next.js 项目重建源代码结构 (已修正)
# 运行此脚本前，请确保您位于项目 `raw` 目录下。

# --- 脚本配置 ---
$appDir = "src\app"
$layoutFile = "$appDir\layout.tsx"
$pageFile = "$appDir\page.tsx" # <--- 已修正此处的变量名
$cssFile = "$appDir\globals.css"

# --- 基础模板代码 ---

# layout.tsx 的模板代码
$layoutContent = @"
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
"@

# page.tsx 的模板代码
$pageContent = @"
// 这是一个如何从您现有的组件库导入并使用组件的示例
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

// 这是您的主页组件
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">项目重建成功！</CardTitle>
          <CardDescription className="text-lg text-gray-600 pt-2">
            `src/app` 目录和基础文件已创建。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            现在，您可以开始编辑 `src/app/page.tsx` 文件来重建您的主页了。
          </p>
          <p className="mb-6">
            下面这个按钮就是一个直接从 `src/components/ui/Button.tsx` 中引用的示例：
          </p>
          <Button size="lg" onClick={() => alert('按钮可以工作！')}>
            点我测试
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
"@

# globals.css 的模板代码
$cssContent = @"
@tailwind base;
@tailwind components;
@tailwind utilities;
"@


# --- 开始执行重建 ---

Write-Host "开始执行项目源代码目录重建..." -ForegroundColor Cyan

# 1. 创建 src/app 目录
if (-not (Test-Path -Path $appDir)) {
    New-Item -Path $appDir -ItemType Directory | Out-Null
    Write-Host "[成功] 已创建目录: $appDir" -ForegroundColor Green
} else {
    Write-Host "[跳过] 目录已存在: $appDir" -ForegroundColor Yellow
}

# 2. 创建并写入 globals.css
if (-not (Test-Path -Path $cssFile)) {
    Set-Content -Path $cssFile -Value $cssContent -Encoding UTF8
    Write-Host "[成功] 已创建并写入文件: $cssFile" -ForegroundColor Green
} else {
    Write-Host "[跳过] 文件已存在: $cssFile" -ForegroundColor Yellow
}

# 3. 创建并写入 layout.tsx
if (-not (Test-Path -Path $layoutFile)) {
    Set-Content -Path $layoutFile -Value $layoutContent -Encoding UTF8
    Write-Host "[成功] 已创建并写入文件: $layoutFile" -ForegroundColor Green
} else {
    Write-Host "[跳过] 文件已存在: $layoutFile" -ForegroundColor Yellow
}

# 4. 创建并写入 page.tsx
if (-not (Test-Path -Path $pageFile)) {
    Set-Content -Path $pageFile -Value $pageContent -Encoding UTF8
    Write-Host "[成功] 已创建并写入文件: $pageFile" -ForegroundColor Green
} else {
    Write-Host "[跳过] 文件已存在: $pageFile" -ForegroundColor Yellow
}

Write-Host "----------------------------------------"
Write-Host "重建脚本执行完毕！" -ForegroundColor Cyan
Write-Host "您现在可以运行 'bun run dev' 来启动项目了。" -ForegroundColor White