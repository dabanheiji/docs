---
title: 打家劫舍2
---

# 打家劫舍2

这道题目是在打家劫舍的题目上做了限制，就是房子上围绕成一个环的，这就代表着我们不能同时偷第一个房间和最后一个房间，即然我们不能同时偷第一个房间和最后一个房间，那么我们可以将这个问题转换为两个子问题：

1. 我们偷第一个房间，不偷最后一个房间。
2. 我们偷最后一个房间，不偷第一个房间。

这样我们会发现，基于上面的两个问题，每个问题就都和打家劫舍的题目一样了，所以我们解决这两个子问题，然后返回两个问题结果中的较大值即可。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length <= 3) return Math.max(...nums);

  const firstDp = [],
    lastDp = [];

  for (let i = 0; i < nums.length - 1; i++) {
    if (i === 0) {
      firstDp[i] = nums[i];
    } else if (i === 1) {
      firstDp[i] = Math.max(nums[0], nums[i]);
    } else {
      firstDp[i] = Math.max(firstDp[i - 2] + nums[i], firstDp[i - 1]);
    }
  }

  for (let i = 1; i < nums.length; i++) {
    if (i === 1) {
      lastDp[i] = nums[i];
    } else if (i === 2) {
      lastDp[i] = Math.max(nums[1], nums[i]);
    } else {
      lastDp[i] = Math.max(lastDp[i - 2] + nums[i], lastDp[i - 1]);
    }
  }

  return Math.max(firstDp.pop(), lastDp.pop());
};
```