---
title: 找到字符串中所有字母异位词
---

# 找到字符串中所有字母异位词

题目链接：[找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)

这道题目也是一个滑动窗口相关的题目，题目中的窗口长度固定是p的长度，我们判断每个窗口的字符串是否是目标字符串的异位词的方式就是比较两个字符串中每个字母出现的次数是否相同，所以我们需要两个map对象，一个记录目标字符串中每个字符出现的次数，另一个记录当前窗口每个字符出现的次数，我们只用比较一下窗口对应的map中与目标map中相等的字符数是否等于目标map的size就能得到是否是异位词。

```js
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
	const result = [];
	const targetMap = new Map();
	const windowMap = new Map();

    // 记录一下p中每个字符出现的次数
	for (let char of p) {
		targetMap.set(char, (targetMap.get(char) || 0) + 1);
	}

	let left = 0;
	let right = 0;
	let matchCount = 0;

	while (right < s.length) {
        // 记录窗口中每个字符出现的次数
		windowMap.set(s[right], (windowMap.get(s[right]) || 0) + 1);

        // 如果窗口中某个字符的次数大于等于目标字符串中该字符的次数，则说明该字符已经匹配了
		if (targetMap.has(s[right]) && windowMap.get(s[right]) === targetMap.get(s[right])) {
			matchCount++;
		}

		if (right - left + 1 === p.length) {
            // 如果窗口的长度等于目标字符串的长度，则匹配成功，将起始位置加入结果数组中
			if (matchCount === targetMap.size) {
				result.push(left);
			}

            // 将窗口的起始位置对应的字符次数减1，并判断是否大于等于目标字符串中对应字符的次数，如果大于等于，则说明该字符已经匹配了，matchCount减1
			windowMap.set(s[left], (windowMap.get(s[left]) || 0) - 1);

			if (targetMap.has(s[left]) && windowMap.get(s[left]) === targetMap.get(s[left]) - 1) {
				matchCount--;
			}

			left++;
		}

		right++;
	}

	return result;
}
```