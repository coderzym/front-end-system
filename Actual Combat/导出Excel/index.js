// 首先创建一个容器
let workbook = XLSX.utils.book_new()

// 拿到页面中的DOM数据
let table = document.getElementById("user_info")

// 将数据转换成sheet
let worksheet = XLSX.utils.table_to_sheet(table)

// 将sheet放到容器里
XLSX.utils.book_append_sheet(workbook, worksheet)

// 添加按钮的点击事件，点击后下载
let btn = document.getElementsByTagName("button")[0]

btn.addEventListener('click', function () {
    XLSX.writeFile(workbook, '宝宝.xlsx')
})