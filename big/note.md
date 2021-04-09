性能优化：
    1、只请求当前需要的资源
        异步加载、懒加载、polyfill https://polyfill.io/v3/url-builfer
    2、缩减资源体积
        webpack
        gzip
        图片格式的优化 webp
        尽量控制cookie的大小
    3、时序优化
        promise.all
        ssr 
        prefetch preload prerender
        <link rel="preload" ad="image" href="...">

    4、合理的运用缓存
        cdn   cdn预热 cdn刷新

如果一段js时间非常长，怎么去分析？
 装饰器

阿里云的oss支持通过链接后面拼接参数来做图片的格式转换， 尝试写一下， 把任意的图片格式转换为webp。 需要注意什么？
    边界：浏览器的适配

如果你的页面上有巨量的图片需要展示，除了懒加载的方式，有没有什么其他方式限制一下同时加载的图片数量