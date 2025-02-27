---
title: 二叉树的中序遍历
---

# 二叉树的中序遍历

二叉树的中序遍历就是按照，左 → 根 → 右 的顺序去遍历二叉树

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
	let curr = root;
	const stack = [];
	const result = [];

	while (curr !== null || stack.length) {
		while (curr !== null) {
			stack.push(curr);
			curr = curr.left;
		}

		const prev = stack.pop();
		result.push(prev.val);
		curr = prev.right;
	}

	return result;
};
```