leetCode链接：https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
 
#### 示例 1：

输入：head = [1,3,2]

输出：[2,3,1]

### 题解

```js
// 执行用时：100 ms, 在所有 JavaScript 提交中击败了44.30%的用户
// 内存消耗：39.8 MB, 在所有 JavaScript 提交中击败了37.18%的用户
var reversePrint = function(head) {
    let node = head
    let arr = []
    while (node) {
        arr.unshift(node.val)
        node = node.next
    }
    return arr
};
```

思路：我们只需要把链表中的`val`拿出后，将当前的节点更换为下一个节点就行了