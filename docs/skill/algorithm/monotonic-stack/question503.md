---
title: 下一个更大元素II
---

# 下一个更大元素II

题目链接：[题目地址](https://leetcode.cn/problems/next-greater-element-ii/description/)

这道题目同样是计算数组中的下一个更大元素，但是这个数组是一个环形数组，特殊的地方在于可以循环的搜索下一个更大的数字，而不是查询到最后一位就结束，那么我们很容易可以想到我们可以先使用单调栈的方式计算出数组中每一位的下一个更大元素，然后第二次遍历去查找第一次没有找到结果的元素即可，两次遍历就可以查找到所有元素的对应元素，此时我们需要思考一下，那就是第一次遍历之后，我们的栈的长度应该是不为0的，此时我们的栈中存在的是还没有找到下一个最大元素的值的下标，也就是我们第二次遍历时要查找的这些元素，查找过程如下：

```js
/*
数组：[1,2,1]，栈：[]，结果：[-1, -1, -1]

第一次遍历
	i = 0，栈：[0]，结果：[-1, -1, -1]
	i = 1，栈：[1]，结果：[2, -1, -1]
	i = 2，栈：[1, 2]，结果：[2, -1, -1]

此时栈中还有[1, 2]，那么下标为1，2的这两个元素就是我们第一次遍历没有查找到对应更大元素的元素，也就是第二次遍历需要查找的元素

第二次遍历
	i = 0，栈：[1, 2]，结果：[2, -1, -1]
	i = 1，栈：[1]，结果：[2, -1, 2]
	i = 2，栈：[1]，结果：[2, -1, 2]

最终结果为[2, -1 ,2]
*/
```

有了大致思路就能去写代码了

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
  let ans = new Array(nums.length).fill(-1);
  let stack = [];

  for (let i = 0; i < nums.length; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      ans[stack.pop()] = nums[i];
    }
    stack.push(i);
  }

  for (let i = 0; i < nums.length; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      ans[stack.pop()] = nums[i];
    }
    if (stack.length === 0) {
      break;
    }
  }

  return ans;
};
```