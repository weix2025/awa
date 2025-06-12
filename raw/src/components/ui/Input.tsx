// 文件路径: src/components/ui/Input.tsx
// 描述: 一个标准化的、样式统一的输入框组件。

import * as React from "react";
import { cn } from "@/lib/utils"; // 从我们的核心工具文件导入

// 定义 Input 组件的 Props 类型
// 它继承了所有标准 <input> 元素的 HTML 属性，提供了完整的类型支持
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        // 使用 cn 工具函数智能合并基础样式和自定义样式
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref} // 将 ref 传递给原生的 input 元素
        {...props}
      />
    );
  }
);
Input.displayName = "Input"; // 方便在 React DevTools 中调试

export { Input };