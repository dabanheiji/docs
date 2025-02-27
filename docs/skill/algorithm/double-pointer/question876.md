---
title: 链表的中间节点
---

# 链表的中间节点

题目链接：[链表的中间节点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

这道题目需要我们知道链表这个数据结构，链表由于没有下标，只有指针，所以我们可以使用快慢双指针去查询中间节点，当快指针遍历完之后慢指针值走一半，但是链表的长度不确定，故而需要判断一下长度分别为单双数的场景。

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
	let fast = head;
	let slow = head;

	while (fast && fast.next) {
		fast = fast.next.next;
		slow = slow.next;
	}

	if (fast && fast.next) {
		return slow.next;
	}

	return slow;
}
```