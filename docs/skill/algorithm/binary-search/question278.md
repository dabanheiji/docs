---
title: 第一个错误的版本
---

# 第一个错误的版本

题目链接：[第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version/)

这一道题目思路比较简单，其实就是查找1～n中的某个数字，我们首先需要思考一下这个数字需要符合的条件，首先这个数字的版本肯定是错的，其次这个数字前面的一个版本肯定是对的，如果第一个版本就错误，那么不存在前面一个版本，则可以直接返回，搞清楚这一点就可以很快的使用二分查找找到这个数字。

```js
/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let left = 1;
    let right = n;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (isBadVersion(mid)) {
        if (mid === 1) return 1;
        if (isBadVersion(mid - 1)) {
          right = mid - 1;
        } else {
          return mid;
        }
      } else {
        left = mid + 1;
      }
    }

    return -1;
  };
};
```