---
title: 验证回文字符串
---

# 验证回文字符串

题目链接：[验证回文字符串](https://leetcode-cn.com/problems/valid-palindrome/)

这道题目使用双指针从前后遍历就可以了，每次让前指针后移一位，让后指针前移一位，需要注意需要跳过非数字字母的字符，可以使用正则去进行一个判断。

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
	const str = s.toLocaleLowerCase();
	const reg = /^[a-z|0-9]$/;
	let left = 0;
	let right = str.length - 1;

	while (left < right) {
		if (!reg.test(str[left])) {
			left++;
			continue;
		}
		if (!reg.test(str[right])) {
			right--;
			continue;
		}
		if (str[left] !== str[right]) {
			return false;
		}
		left++;
		right--;
	}

	return true;
}
```