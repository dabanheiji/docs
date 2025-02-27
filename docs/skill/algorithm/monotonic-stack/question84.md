---
title: 柱状图中的最大矩形
---

# 柱状图中的最大矩形

题目链接：[柱状图中的最大矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram/description/)

这道题目有点复杂，不过依旧可以使用单调栈去解这道题，我们需要先思考一下如何去计算每个位置的元素所能形成的最大面积，比较容易想到的是我们可以以当前元素为中心向两边扩散，只要两边的元素比自己大那么就可以继续扩散，直到扩散到比自己小的元素这里，此时扩散的宽度就是宽，元素自己的值就是高，然后计算每个位置的最大面积，最后比较出最大的一个作为结果。这个思路我们就可以拆分成两个问题：

1. 第一个就是找到每个元素前面第一个比自己小的元素的下标
2. 第二个就是找到每个元素后面第一个比自己小的元素的下标

然后我们把这两个问题的结果分别存在两个数组中，然后就可以比较清楚的计算并比较得出结果。

```js
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  let left = new Array(heights.length).fill(-1);
  let right = new Array(heights.length).fill(heights.length);
  let stack = [];
  let maxArea = 0;
	
	// 寻找右侧第一个比自己小的元素下标，将下标放入right数组中
  for (let i = 0; i < heights.length; i++) {
    while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
      right[stack.pop()] = i;
    }
    stack.push(i);
  }
	
	// 重置栈
  stack.length = 0;
	
	// 寻找左侧第一个比自己小的元素下标，将下标放入left数组中
  for (let i = heights.length - 1; i >= 0; i--) {
    while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
      left[stack.pop()] = i;
    }
    stack.push(i);
  }
	
	// 最后计算每个位置所能形成的最大面积并比较
  for (let i = 0; i < heights.length; i++) {
    const width = right[i] - left[i] - 1;
    const height = heights[i];
    const area = width * height;
    maxArea = Math.max(maxArea, area);
  }

  return maxArea;
};
```