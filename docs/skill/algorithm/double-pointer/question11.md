---
title: 盛最多水的容器
---

# 盛最多水的容器

题目链接: [盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)

这道题目可以使用前后双指针去解决，每个容器装的水取决于较低的一侧，所以我们应当保持较高的一侧不动，始终让较低的一侧去往较高的一侧靠近，并始终去比较最多容器，最后返回。

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
	let left = 0;
	let right = height.length - 1;
	let maxv = 0;

	while (left < right) {
		maxv = Math.max(Math.min(height[left], height[right]) * (right - left), maxv);

        // 移动较低一侧的指针
		if (height[left] < height[right]) {
			left++;
		} else {
			right--;
		}
	}

	return maxv;
}
```