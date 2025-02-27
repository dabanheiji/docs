---
title: 寻找旋转排序数组中的最小值
---

# 寻找旋转排序数组中的最小值

题目链接：[寻找旋转排序数组中的最小值](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)

这一道题目，这个数组是排序之后进行旋转的，所以使用二分查找的时候取出中间数字的时候存在两种情况：

1. 最小值在前面
2. 最小值在后面

我们分别分析一下这两种情况，第一种情况，如果在最小值前面的话那么数组后半段无疑是单调递增的，此时我们计算范围内最右侧的数字一定是大于中间数字的；如果是第二种情况，最小值在右侧，那么此时我们计算范围内最右侧的数字一定小于中间数字，因为数组是排序的，到了最后一位后，下一位会在第一位，所以此时计算范围内的前半段一定比右侧值大，所以可以根据中间值与右侧值比较判断属于那种情况，此外题目中有说明数组中不存在重复元素，所以无需考虑有重复元素的情况。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
	let left = 0;
	let right = nums.length - 1;

	while (left < right) {
		const mid = left + Math.floor((right - left) / 2);
		if (nums[mid] > nums[right]) {
			left = mid + 1;
		} else {
			right = mid;
		}
	}
	
	return nums[left]
}
```