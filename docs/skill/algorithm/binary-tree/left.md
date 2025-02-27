---
title: 二叉树前序遍历
---

二叉树的前序遍历就是按照：根 → 左 → 右 的顺序去对二叉树进行遍历

```js
var preorderTraversal = function(root) {
	let curr = root;
	const result = [];
	const stack = [];

	while (curr !== null || stack.length) {
		while (curr !== null) {
			result.push(curr.val);
			stack.push(curr);
			curr = curr.left;
		}

		const prev = stack.pop();
		curr = prev.right;
	}

	return result;
}
```