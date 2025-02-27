---
title: 两数之和
---

# 两数之和

题目链接：[两数之和](https://leetcode-cn.com/problems/two-sum/)

两数之和这道题目是很多人梦开始的地方，这道题目一般的解法是使用一个`map`去储存每个元素和每个元素的互补数，如果遍历到了互补数就直接返回`map`中存的下标和当前下标，这个解法无疑是最简单的，但是这道题目还可以使用双指针来解答。

使用双指针的思路，首先要对数组进行排序，但是排序会打乱下标，这就需要我们在排序的时候记录一下每个元素的原始下标，然后分别重排序后的数组的前后开始遍历，如果和大于目标值那么就让右侧下标减少一位，如果和小于目标值那么就让左侧下标增加一位。

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
	const sortsNums = nums.map((num, index) => [num, index]).sort((a, b) => a[0] - b[0]);
	let left = 0;
	let right = sortsNums.length - 1;

	while (left < right) {
		const sum = sortsNums[left][0] + sortsNums[right][0];
		if (sum === target) {
			return [sortsNums[left][1], sortsNums[right][1]];
		} else if (sum < target) {
			left++;
		} else {
			right--;
		}
	}
	
	return []
}
```

这里使用双指针其实比使用map看起来还复杂一点，这里使用双指针只是为了拓展思路，并且更好的了解一下双指针的使用。
