A common challenge with combining `[chunkhash]` and Code Splitting is that the entry chunk includes the webpack runtime and with it the chunkhash mappings. This means it's always updated and the `[chunkhash]` is pretty useless, because this chunk won't be cached.

A very simple solution to this problem is to create another chunk which contains only the webpack runtime (including chunkhash map). This can be archieved by the CommonsChunkPlugin (or if the CommonsChunkPlugin is already used by passing multiple names to the CommonChunkPlugin). To avoid the additional request for another chunk, this pretty small chunk can be inlined into the HTML page.

The configuration required for this is:

* use `[chunkhash]` in `output.filename` (Note that this example doesn't do this because of the example generator infrastructure, but you should)
* use `[chunkhash]` in `output.chunkFilename`
* `CommonsChunkPlugin`

# example.js

``` javascript

```

# vendor.js

``` javascript

```

# webpack.config.js

``` javascript
var path = require("path");
var webpack = require("../../");
module.exports = {
  entry: {
    app: './index.js',
    page: './page',
    common: ['./common-dep1.js']
  },
  output: {
    path: path.join(__dirname, 'js'),
    filename: '[name].[chunkhash:6].js',
    chunkFilename: '[id].[name].[chunkhash:6].js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.[chunkhash:6].js',
      minChunks: 2
    })
  ]
};
```

# index.html

``` html
<html>
<head>
</head>
<body>


</body>
</html>
```

# js/common.[chunkhash].js

``` javascript

```

# js/main.[chunkhash].js

``` javascript

```

# Info

## Uncompressed

```
Hash: 989184c44bd9ebd4db9d
Version: webpack 2.0.2-beta
Time: 70ms
           Asset       Size  Chunks             Chunk Names
common.2a05d0.js    4.83 kB       0  [emitted]  common
   1.1.b5cb21.js  248 bytes       1  [emitted]  
   2.2.7e12e6.js  249 bytes       2  [emitted]  
   app.a6b7b3.js    1.66 kB       3  [emitted]  app
  page.58818b.js  226 bytes       4  [emitted]  page
chunk    {0} common.2a05d0.js (common) 109 bytes [rendered]
    > common [5] multi common 
    [0] ./common-dep1.js 81 bytes {0} [built]
        cjs require ./common-dep1.js [1] ./a.js 1:10-37
        cjs require ./common-dep1.js [2] ./b.js 1:10-37
        single entry ./common-dep1.js [5] multi common
    [5] multi common 28 bytes {0} [built]
chunk    {1} 1.1.b5cb21.js 41 bytes {3} [rendered]
    > [1] ./a.js 13:1-17:3
    [7] ./load_in_runtime2.js 41 bytes {1} [built]
        cjs require ./load_in_runtime2.js [1] ./a.js 14:16-48
chunk    {2} 2.2.7e12e6.js 42 bytes {3} [rendered]
    > [1] ./a.js 5:2-9:4
    [6] ./load_in_runtime1.js 42 bytes {2} [built]
        cjs require ./load_in_runtime1.js [1] ./a.js 6:18-50
chunk    {3} app.a6b7b3.js (app) 729 bytes {0} [rendered]
    > app [3] ./index.js 
    [1] ./a.js 515 bytes {3} [built]
        cjs require ./a.js [3] ./index.js 1:8-25
    [2] ./b.js 87 bytes {3} [built]
        cjs require ./b.js [3] ./index.js 2:8-25
    [3] ./index.js 127 bytes {3} [built]
chunk    {4} page.58818b.js (page) 58 bytes {0} [rendered]
    > page [4] ./page.js 
    [4] ./page.js 58 bytes {4} [built]
```

## Minimized (uglify-js, no zip)

```
Hash: 989184c44bd9ebd4db9d
Version: webpack 2.0.2-beta
Time: 163ms
           Asset       Size  Chunks             Chunk Names
common.2a05d0.js    1.19 kB       0  [emitted]  common
   1.1.b5cb21.js   88 bytes       1  [emitted]  
   2.2.7e12e6.js   88 bytes       2  [emitted]  
   app.a6b7b3.js  634 bytes       3  [emitted]  app
  page.58818b.js   99 bytes       4  [emitted]  page
chunk    {0} common.2a05d0.js (common) 109 bytes [rendered]
    > common [5] multi common 
    [0] ./common-dep1.js 81 bytes {0} [built]
        cjs require ./common-dep1.js [1] ./a.js 1:10-37
        cjs require ./common-dep1.js [2] ./b.js 1:10-37
        single entry ./common-dep1.js [5] multi common
    [5] multi common 28 bytes {0} [built]
chunk    {1} 1.1.b5cb21.js 41 bytes {3} [rendered]
    > [1] ./a.js 13:1-17:3
    [7] ./load_in_runtime2.js 41 bytes {1} [built]
        cjs require ./load_in_runtime2.js [1] ./a.js 14:16-48
chunk    {2} 2.2.7e12e6.js 42 bytes {3} [rendered]
    > [1] ./a.js 5:2-9:4
    [6] ./load_in_runtime1.js 42 bytes {2} [built]
        cjs require ./load_in_runtime1.js [1] ./a.js 6:18-50
chunk    {3} app.a6b7b3.js (app) 729 bytes {0} [rendered]
    > app [3] ./index.js 
    [1] ./a.js 515 bytes {3} [built]
        cjs require ./a.js [3] ./index.js 1:8-25
    [2] ./b.js 87 bytes {3} [built]
        cjs require ./b.js [3] ./index.js 2:8-25
    [3] ./index.js 127 bytes {3} [built]
chunk    {4} page.58818b.js (page) 58 bytes {0} [rendered]
    > page [4] ./page.js 
    [4] ./page.js 58 bytes {4} [built]
```