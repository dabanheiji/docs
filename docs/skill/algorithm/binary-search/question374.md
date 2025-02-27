---
title: 猜数字大小
---

# 猜数字大小

题目链接：[猜数字大小](https://leetcode-cn.com/problems/guess-number-higher-or-lower/)

这一道题目，一样使用非常常规的二分查找就可以得到结果。

```js
/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  let left = 1;
  let right = n;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    switch (guess(mid)) {
      case 1:
        left = mid + 1;
        break;
      case -1:
        right = mid - 1;
        break;
      case 0:
        return mid;
      default:
        break;
    }
  }

  return -1;
};
```