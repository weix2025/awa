// 文件路径: src/lib/clsx.js
// 描述: 一个高效的工具函数，用于有条件地将多个类名字符串合并成一个。

/**
 * 有条件地合并多个类名。
 * - 字符串和数字参数会被直接添加。
 * - 数组参数会被递归处理。
 * - 对象参数会根据其 value 的真假来决定是否添加其 key 作为类名。
 *
 * @param {...(string|number|Array|Object)} args - 一个或多个类名参数
 * @returns {string} - 合并后的单个类名字符串。
 *
 * @example
 * clsx('foo', true && 'bar', { baz: false, bat: true });
 * // => 'foo bar bat'
 */
export function clsx(...args) {
    let classString = "";
  
    for (const arg of args) {
      if (!arg) continue;
  
      if (typeof arg === 'string' || typeof arg === 'number') {
        classString += (classString ? " " : "") + arg;
      } else if (Array.isArray(arg)) {
        const nestedClass = clsx(...arg);
        if (nestedClass) {
          classString += (classString ? " " : "") + nestedClass;
        }
      } else if (typeof arg === 'object') {
        for (const key in arg) {
          if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
            classString += (classString ? " " : "") + key;
          }
        }
      }
    }
  
    return classString;
  }