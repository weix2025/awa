// 文件路径: src/lib/cva.js
// 建议：这个文件可以作为您项目中的一个核心工具函数。
// 您可能需要安装 `clsx` 和 `tailwind-merge` 这两个库:
// npm install clsx tailwind-merge

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 一个统一的类名(className)合并工具函数。
 * 它会先用 clsx 合并所有类名，然后用 twMerge 解决 Tailwind CSS 的类名冲突。
 * @param {...any} inputs - 任何数量的类名字符串、对象或数组。
 * @returns {string} - 合并和优化后的类名字符串。
 */
const cn = (...inputs) => twMerge(clsx(inputs));

/**
 * CVA (Class Variance Authority) - “打扫干净”并重构后的版本
 * 创建一个函数，该函数可以根据传入的属性（props）动态生成组件的CSS类名。
 *
 * @param {string} base - 基础CSS类名，所有变体都会应用。
 * @param {object} config - 变体配置对象。
 * @param {object} config.variants - 定义组件的不同变体及其对应的CSS类。
 * @param {object} [config.defaultVariants] - 组件的默认变体。
 * @param {object[]} [config.compoundVariants] - 定义多个变体组合时的特殊CSS类。
 * @returns {function(props): string} - 返回一个接收 props 并返回最终类名字符串的函数。
 */
export const cva = (base, config) => {
  return (props) => {
    const { variants, defaultVariants, compoundVariants } = config ?? {};

    if (!variants) {
      return cn(base, props?.class, props?.className);
    }

    // 1. 合并默认变体和用户传入的 props
    const mergedProps = { ...defaultVariants, ...props };

    // 2. 获取基础变体对应的类名
    const variantClasses = Object.keys(variants).map((variantName) => {
      const propValue = mergedProps[variantName];
      if (propValue === null || propValue === undefined) {
        return null;
      }
      const keyForValue = String(propValue); // 支持布尔值变体
      return variants[variantName][keyForValue];
    });

    // 3. 获取复合变体对应的类名
    const compoundVariantClasses = compoundVariants?.reduce((classes, compound) => {
      const { class: cvClass, className: cvClassName, ...conditions } = compound;
      const isMatch = Object.entries(conditions).every(([key, value]) => {
        const propValue = mergedProps[key];
        return Array.isArray(value) ? value.includes(propValue) : propValue === value;
      });

      if (isMatch) {
        classes.push(cvClass, cvClassName);
      }
      return classes;
    }, []) ?? [];

    // 4. 将所有类名（基础、变体、复合、用户自定义）合并并返回
    return cn(
      base,
      variantClasses,
      compoundVariantClasses,
      props?.class,
      props?.className
    );
  };
};