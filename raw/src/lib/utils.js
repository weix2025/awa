// 文件路径: src/lib/utils.js
// 描述: 项目的核心工具函数集合。

import { clsx } from "./clsx"; // 从我们第二步清理好的文件中导入
import { twMerge } from "tailwind-merge"; // 从刚安装的官方库中导入
import { cva } from "./cva"; // 从我们第一步清理好的文件中导入

/**
 * 智能合并CSS类名。
 * 1. 使用 `clsx` 将所有参数转换成一个类名字符串。
 * 2. 使用 `twMerge` 解决 Tailwind CSS 类名之间的冲突。
 *
 * 这是在现代 React + Tailwind CSS 项目中推荐的最佳实践。
 * @param {...any} inputs - 类名参数
 * @returns {string} - 最终的、无冲突的类名字符串。
 */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// 将核心工具函数一同导出，方便在其他地方统一导入
export { cva, cn };