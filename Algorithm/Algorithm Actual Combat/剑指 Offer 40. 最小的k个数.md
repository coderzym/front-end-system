leetCode链接：https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/submissions/

输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。

#### 示例 1：

输入：arr = [3,2,1], k = 2

输出：[1,2] 或者 [2,1]

#### 示例 2：

输入：arr = [0,1,2,1], k = 1

输出：[0]

```js
// 执行用时：124 ms, 在所有 JavaScript 提交中击败了73.78%的用户
// 内存消耗：42.3 MB, 在所有 JavaScript 提交中击败了39.65%的用户
var getLeastNumbers = function(arr, k) {
    arr.sort((a, b) => {
        return a - b
    })
    arr.length = k
    return arr
};
```

思路：这种提醒就没必要开辟新的内存空间了