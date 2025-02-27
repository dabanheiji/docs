---
title: 移动零
---

# 移动零

题目链接：[移动零](https://leetcode-cn.com/problems/move-zeroes/)

这道题目非常简单，使用双指针可以非常容易解决，这道题目使用快慢指针，其中快指针每次循环都会加一，而慢指针只有快指针对应的数字不为0时加一，并且慢指针在加一之前将慢指针所在的位置设置为快指针对应的值，这样子非零数的顺序不会被打乱，然后将剩余元素都填充为0即可。

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
	let slow = 0;
	let fast = 0;

	while (fast < nums.length) {
		if (nums[fast] !== 0) {
			nums[slow] = nums[fast];
			slow++;
		}
		fast++;
	}
	while (slow < nums.length) {
		nums[slow] = 0;
		slow++;
	}
}
```