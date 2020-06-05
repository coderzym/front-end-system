## 描述一下浏览器缓存

这个部分有很多内容可以说：

##### 强缓存

不需要发送HTTP请求，只会构建请求行，根据HTTP协议的不同分为两种：

HTTP 1.0中的Expires，过期时间，潜在的问题是服务器时间和客户端时间不一致

HTTP 1.1中的Cache-Control，可以设置max-age来设置缓存生效时间，超过时间段就需要重新发起请求，关于Cache-Control还有很多属性：

- max-age：资源最大有效时间
- no-cache：不缓存，但实际上每次在请求静态资源的时候会向服务端发送一个过期认证请求，需要配合ETag或者last-modified
- no-store：始终都去服务端请求最新资源，优先级最高
- private/public：在请求资源的时候，可能会经过一些CND、Nginx中间代理服务器，如果设置了private，在max-age过期的情况下，即使中间服务器提示可以使用本地缓存资源，依然会向原服务器发送请求，而public相反

##### 协商缓存

需要请求头中添加tag，服务器根据tag来判断是否使用缓存，所以被称为协商缓存。tag分为两种Last-Modified和ETag

- Last-Modified

最后修改时间。在第一次请求完毕后，服务器给浏览器返回的响应头里会带有Last-Modified，浏览器在下一次请求的时候会携带If-Modified-Since，表示服务器资源最后修改时间，最后进行相应的操作。否则返回304，但只能以秒为单位，所以不够精准(不在意这几秒的差距也OK)

- ETag

ETag是给当前的文件资源添加唯一的文件标识，只要内容有改动就值就会变。服务器会将其加在响应头中，浏览器会在下次请求的时候将其作为If-None-Match字段的内容发送给服务器。服务器根据值做不同的操作

- 两者对比：

ETag优先级比Last-Modified高，因为它可以精确的判断是否需要更新。虽然性能不如Last-Modified

##### 缓存位置

强缓存和协商缓存的位置按优先级排列分别是：

- Service Worker

借鉴了Web Worker，让JS运行在主线程之外，脱离了浏览器窗体，所以也无法访问DOM，但可以帮助我们实现离线缓存、网络代理等功能

- Memory Cache

内存缓存。存取最快，但寿命很短

- Disk Cache

硬盘缓存。存取慢，寿命长，空间也大，如果缓存内容过大，那么就用这种方法，否则是内存缓存

- Push Cache

推送缓存。HTTP 2.0的内容，只存储在session中，当会话结束后就会被释放，而且在Chrome浏览器中只会保存5分钟

- Cookie策略机制

它是一个用于服务端和客户端之间的认证，当服务端返回了这个cookie，那么每次请求这个域名下资源的时候（即使是二级域名也会带），都会带上这个cookie，且如果不设置cookie的过期时间，只要关闭了浏览器，cookie就会失效，所以可以通过设置max-age

另外出于安全考量，我们需要给cookie设置一个httpOnly，设置secure cookie，只有在https服务下才会在application/cookie中写入cookie

##### 副作用

有的时候缓存反而碍事，因为浏览器会对html文件进行一个自动的缓存，所以我们最好在进行联调的时候设置一个：

```
<meta http-equiv='Cache-Control' content='no-cache' />
```

##### 总结

首先会通过Cache-Control判断可使用强缓存

如果不可以则使用协商缓存，服务器通过判断请求头中的If-Modified-Since和If-None-Match判断资源是否更新

- 更新：返回200以及最新内容

- 无更新：返回304以及使用缓存中的资源

#### 较为稳妥的实践

先说说强缓存和协商缓存的问题点：

- 强缓存：设置了cache-control字段，那么如果服务器的资源突然更新了，用户看到的内容就不是最新的了，当然你要是能接受那就OK

- 协商缓存：每次都会去询问一次服务器资源是否有更新，还是会造成一定的资源浪费，毕竟我们是追求极致的程序员

那么最好的方案是配合Webpack：

1. HTML文件：使用协商缓存
2. CSS、JS和图片：使用强缓存，并且给文件名都附带上Hash值

#### contentHash的讲究

当css文件hash改变的时候，js文件hash也会随之改变，所以我们可以在webpack打包的时候使用contentHash