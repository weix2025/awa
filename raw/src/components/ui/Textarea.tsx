// 文件路径: src/components/ui/Textarea.tsx
// 描述: 一个标准化的、用于多行文本输入的文本区域组件。

import * as React from "react";
import { cn } from "@/lib/utils"; // 从我们的核心工具文件导入

// 定义 Textarea 组件的 Props 类型
// 它继承了所有标准 <textarea> 元素的 HTML 属性
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea"; // 方便在 React DevTools 中调试

export { Textarea };