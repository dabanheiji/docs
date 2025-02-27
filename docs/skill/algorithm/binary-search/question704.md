---
title: 二分查找
---

# 二分查找

题目链接：[二分查找](https://leetcode-cn.com/problems/binary-search/)

这道题目使用常规的二分查找即可得到结果，代码如下：

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
};
```