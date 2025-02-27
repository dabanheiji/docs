---
title: 打家劫舍
---

# 打家劫舍

这道题目中我们不能偷相邻的两个房间，所以我们如果到一个房间之后所能偷到最多的金额就是当前房间上上一个房间所偷到的最大金额加上当前房间的金额与上一个房间所偷到金额的最大值，即f(n) = max(f(n - 2) + nums[n], f(n - 1))，推导出状态转移方程之后这道题目就很简单了。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length <= 2) return Math.max(...nums);
  const dp = [nums[0], Math.max(nums[0], nums[1])];

  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }

  return dp.pop();
};
```