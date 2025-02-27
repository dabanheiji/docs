---
title: 二叉树后序遍历
---

# 二叉树后序遍历

二叉树的后序遍历就是按照：左 → 右 → 根 的顺序去遍历二叉树

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
var postorderTraversal = function(root) {
  const stack = [];
	const result = [];

	if (root) stack.push(root);

	while (stack.length) {
		const curr = stack.pop();
		result.unshift(curr.val);
		if (curr.left) {
			stack.push(curr.left);
		}
		if (curr.right) {
			stack.push(curr.right);
		}
	}

	return result;
};
```