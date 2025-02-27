---
title: 接雨水
---

# 接雨水

题目链接：[接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)

这一道题目我们依旧可以使用单调栈的思路去解决，我们在遍历的过程中需要思考一下，什么情况下可以接到雨水，很简单，就是某个区间的最左侧和最右侧都高于中间值的时候，而我们能接到雨水的多少取决于两侧较低的一侧，我们依旧使用本题的默认案例看一下解题思路。

数组：`[0,1,0,2,1,0,1,3,2,1,2,1]`

我们的思路为，先将每个元素的下标依次入栈，在入栈之前先判断一下栈中最后一位的值是不是小于等于当前元素，如果小于等于的话，代表当前元素比栈底元素高，此时可能会形成一个凹槽，如果栈中倒数第二个元素也比栈底元素大的话，那么就可以形成凹槽，可以接雨水，否则表示只有右侧有凸起，左侧没有墙壁无法形成凹槽，最终将形成的凹槽面积加起来，就可得出一共能接多少雨水。

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
	let stack = [];
	let ans = 0;

	for (let i = 0; i < height.length; i++) {
		while (stack.length > 0 && height[stack[stack.length - 1]] <= height[i]) {
			const top = stack.pop();
			if (stack.length === 0) {
				break;
			}
			const left = stack[stack.length - 1];
			const right = i;
			const h = Math.min(height[left], height[right]) - height[top];
			ans += h * (right - left - 1);
		}
		stack.push(i);
	}

	return ans;
}
```