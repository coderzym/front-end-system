`leetCode`链接：https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof

注意：本题与 206 题相同：https://leetcode-cn.com/problems/reverse-linked-list

定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

### 仙人指路

学习的时候发现还有3个小伙伴跟我一起在看这个视频：

https://www.bilibili.com/video/BV1Af4y1m7Ct?from=search&seid=6173455032303125999

#### 示例:

`输入: 1->2->3->4->5->NULL`

`输出: 5->4->3->2->1->NULL`

#### 限制：

`0 <= 节点个数 <= 5000`

### 题解

```js
// 执行用时：88 ms, 在所有 JavaScript 提交中击败了67.69%的用户
// 内存消耗：39.6 MB, 在所有 JavaScript 提交中击败了31.91%的用户
var reverseList = function(head) {
    let pre = null
    let curr = head
    let next = null
    while (curr) {
        next = curr.next
        curr.next = pre
        pre = curr
        curr = next
    }
    return pre
};
```

最开始写的时候自己也不懂，墨迹了很久，最后用纸和笔画了个草图，思路就清晰了起来，也可以试试ES6的`解构赋值`，

```js
// 讲道理，这个解法的执行用时和内存消耗要比第一种方法好，但在我的电脑上跑的好差~
var reverseList = function(head) {
    let pre = null
    let curr = head
    while (curr) {
        [curr.next, curr, pre] = [pre, curr.next, curr]
    }
    return pre
};
```

做链表的题目还是得画图啊！