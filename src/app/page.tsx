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
            src/app 目录和基础文件已创建。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            现在，您可以开始编辑 src/app/page.tsx 文件来重建您的主页了。
          </p>
          <p className="mb-6">
            下面这个按钮就是一个直接从 src/components/ui/Button.tsx 中引用的示例：
          </p>
          <Button size="lg" onClick={() => alert('按钮可以工作！')}>
            点我测试
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
