---
title: 下一个更大元素I
---

# 下一个更大元素I

题目链接：[题目地址](https://leetcode.cn/problems/next-greater-element-i/description/)

这道题目可以就可以使用单调栈的思想去解，首先我们知道单调栈可以找到数组中下一个更大或更小元素，但是这道题目中需要找当前数组nums1中每一位元素在另一个数组nums2中对应的下一个更大元素，但是有一点nums1是nums2的子集，那么我们的解题思路就是可以先找出nums2中每个元素后面的一个更大元素，并将其关系放入一个map中映射起来，然后通过映射关系找到nums1中每个元素对应的更大元素即可。

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  let ans = new Array(nums1.length).fill(-1);
  let stack = [];
  const map = new Map();
	
	// 使用单调栈查找nums2中每个元素的下一个更大元素，并储存
  for (let i = 0; i < nums2.length; i++) {
    while (stack.length > 0 && nums2[stack[stack.length - 1]] < nums2[i]) {
      map.set(nums2[stack.pop()], nums2[i]);
    }
    stack.push(i);
  }
	
	// 通过储存的映射关系，找到每个元素在nums2中对应的下一个更大元素
  for (let i = 0; i < nums1.length; i++) {
    if (map.has(nums1[i])) {
      ans[i] = map.get(nums1[i]);
    }
  }

  return ans;
};
```