---
title: 反转字符串
---

# 反转字符串

题目链接 [反转字符串](https://leetcode-cn.com/problems/reverse-string/) 

这道题目其实就是反转数组，使用双指针分别从前后开始遍历可以非常快速的解决这个问题。

```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // 交换 left 和 right 的值
    [s[left], s[right]] = [s[right], s[left]];

    left++;
    right--;
  }
};
```