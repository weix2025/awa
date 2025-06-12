// 文件路径: src/components/ui/Button.tsx
// 描述: 一个可复用的、支持多种变体和尺寸的按钮组件。
// 依赖: react, class-variance-authority, and our utils.js file.
// 您可能需要安装: npm install class-variance-authority

import * as React from "react";
import { Slot } from "@radix-ui/react-slot"; // Radix Slot 允许组件将属性传递给子组件
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils"; // 从我们第三步创建的工具文件中导入

// 使用 CVA 定义按钮的所有样式变体
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// 定义按钮组件的 Props 类型
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // Radix Slot 的 prop
}

// 创建 Button 组件
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // 如果 asChild 为 true，渲染 Slot，否则渲染 button
    // Slot 会将所有 props 和 className 传递给它的直接子元素
    const Comp = asChild ? Slot : "button"; 
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button"; // 方便在 React DevTools 中调试

export { Button, buttonVariants };