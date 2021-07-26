const https = require('https')

function getRequest() {
  const options = {
    hostname: 'nodejs.cn',
    port: 443,
    path: '/todos',
    method: 'GET'
  }
  
  const req = https.request(options, res => {
    console.log(`状态码: ${res.statusCode}`)
  
    res.on('data', d => {
      process.stdout.write(d)
    })
  })
  
  req.on('error', error => {
    console.error(error)
  })
  
  req.end()
}

function postRequest() {
  // PUT 和 DELETE 请求使用相同的 POST 请求格式，只需更改 options.method 的值即可。
  const data = JSON.stringify({
    todo: '做点事情'
  })

  const options = {
    hostname: 'nodejs.cn',
    port: 443,
    path: '/todos',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  const req = https.request(options, res => {
    console.log(`状态码: ${res.statusCode}`)

    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()
}
