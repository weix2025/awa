// 文件路径: src/components/ui/Badge.tsx
// 描述: 用于显示状态、标签或关键字的徽标组件。

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils"; // 从我们的核心工具文件导入

// 1. 使用 CVA 定义徽标的所有样式变体
const badgeVariants = cva(
  // 基础样式
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// 2. 定义徽标组件的 Props 类型
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// 3. 创建徽标组件
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div 
      className={cn(badgeVariants({ variant, className }))} 
      {...props} 
    />
  );
}

export { Badge, badgeVariants };