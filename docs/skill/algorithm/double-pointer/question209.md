---
title: 长度最小的子数组
---

# 长度最小的子数组

题目链接：[长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)

这一道题目是一道滑动窗口类型的题目，我们需要计算符合条件的子数组的最小长度，我们可以使用双指针去解决这道题目，主要思路为：

1. 设置一个left指针代表子数组的左侧边界，right指针代表子数组的右侧边界。
2. 然后保持left指针不变，将right指针加一（需考虑边界情况），直到子数组中的和加起来大于目标值为止，记录此时子数组的长度。
3. 将left指针加1，然后重复2，最后比较记录较小的长度，待数组遍历完一轮后，此时记录的最小长度就是结果。

```js
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let right = 0;
  let minLen = 0;
  let sum = nums[0];

  for (let left = 0; left < nums.length; left++) {
    if (left > 0) {
      sum -= nums[left - 1];
    }

    while (right < nums.length && sum < target) {
      right++;
      sum += nums[right];
    }

    if (sum >= target) {
      if (minLen === 0) {
        minLen = right - left + 1;
      } else {
        minLen = Math.min(minLen, right - left + 1);
      }
    }
  }

  return minLen;
};
```