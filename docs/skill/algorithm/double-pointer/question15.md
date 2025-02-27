---
title: 三数之和
---

# 三数之和

题目链接： [三数之和](https://leetcode-cn.com/problems/3sum/)

这道题目可以使用双指针来解决，三数之和需要等于0，所以我们可以先将数组排序，排序之后对数组遍历，前指针默认指向当前遍历位的下一位，后指针默认指向数组最后一位，然后可以根据三数之和大于0还是小于0来适当调整左右指针最后将结果全部放入一个数组中去，遍历结束后即得到全部结果。

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
	let result = [];
	nums.sort((a, b) => a - b);

	for (let i = 0; i < nums.length - 2; i++) {
		let left = i + 1;
		let right = nums.length - 1;

		if (i === 0 || nums[i] !== nums[i - 1]) { // 忽略重复元素
			while (left < right) {
				const sum = nums[i] + nums[left] + nums[right];
				if (sum === 0) {
					result.push([nums[i], nums[left], nums[right]]);
					while (left < right && nums[left] === nums[left + 1]) { // 忽略重复元素
						left++;
					}
					while (left < right && nums[right] === nums[right - 1]) { // 忽略重复元素
						right--;
					}
					left++;
					right--;
				} else if (sum > 0) {
					right--;
				} else {
					left++;
				}
			}
		}
	}

	return result;
}
```