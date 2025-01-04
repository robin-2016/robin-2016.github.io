import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,b as a,o as e}from"./app-DJW5kWJx.js";const t={};function l(h,i){return e(),n("div",null,i[0]||(i[0]=[a(`<h1 id="可能是github-star星最多的golang-web框架-gin初识" tabindex="-1"><a class="header-anchor" href="#可能是github-star星最多的golang-web框架-gin初识"><span>可能是GitHub star星最多的Golang Web框架-Gin初识</span></a></h1><h2 id="对比" tabindex="-1"><a class="header-anchor" href="#对比"><span>对比</span></a></h2><p>目前主流Golang Web框架对比</p><table><thead><tr><th>名称</th><th>描述</th><th>star数量</th></tr></thead><tbody><tr><td>Gin</td><td>Gin 是用 Go （Golang） 编写的 HTTP Web 框架。它具有类似 Martini 的 API，性能要好得多 - 速度提高了 40 倍。</td><td>79.6k</td></tr><tr><td>Fiber</td><td>用 Go 编写的受 Express 启发的 Web 框架</td><td>34.4k</td></tr><tr><td>Beego</td><td>beego 是一个用于 Go 编程语言的开源、高性能 Web 框架。</td><td>31.7k</td></tr><tr><td>Echo</td><td>高性能、极简的 Go Web 框架</td><td>30.2k</td></tr></tbody></table><h2 id="gin特点" tabindex="-1"><a class="header-anchor" href="#gin特点"><span>Gin特点</span></a></h2><ul><li>零分配路由器</li><li>速度</li><li>中间件支持</li><li>自由崩溃（Crash-free，不知道这么翻译对不？）</li><li>JSON 验证</li><li>路由分组</li><li>错误管理</li><li>内置渲染</li><li>支持扩展</li></ul><h2 id="gin小试" tabindex="-1"><a class="header-anchor" href="#gin小试"><span>Gin小试</span></a></h2><p>Gin 需要 Go版本1.21 或更高版本。</p><h3 id="go-mode初始化" tabindex="-1"><a class="header-anchor" href="#go-mode初始化"><span>go mode初始化</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mkdir</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> gin-test</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> gin-test</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mod</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> init</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> gin-test</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代码部分" tabindex="-1"><a class="header-anchor" href="#代码部分"><span>代码部分</span></a></h3><p>新建一个main.go文件，写入以下代码：</p><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">package</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  &quot;net/http&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  &quot;github.com/gin-gonic/gin&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">func</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  r</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> :=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> gin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  r</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">GET</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;/ping&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">func</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">c</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;"> *</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">gin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    c</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">JSON</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">http</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">StatusOK</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">gin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">H</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">      &quot;message&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;pong&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    })</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  })</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  r</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中gin.Default()创建了一个Gin引擎实例，引擎实例只处理一个URL为/ping的GET请求，匿名函数会返回json字符串{&quot;message&quot;:&quot;pong&quot;}，最后r.Run()启动运行Gin引擎实例，默认启动8080端口。</p><h3 id="依赖管理" tabindex="-1"><a class="header-anchor" href="#依赖管理"><span>依赖管理</span></a></h3><p>执行依赖整理，增加或清理依赖</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mod</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> tidy</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="运行代码" tabindex="-1"><a class="header-anchor" href="#运行代码"><span>运行代码</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> main.go</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>访问http://127.0.0.1:8080/ping，返回{&quot;message&quot;:&quot;pong&quot;}表明已正常运行。</p><p>推荐的项目目录结构</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.</span></span>
<span class="line"><span>|--assets</span></span>
<span class="line"><span>|--cmd</span></span>
<span class="line"><span>|--configs</span></span>
<span class="line"><span>|--deployments</span></span>
<span class="line"><span>|--docs</span></span>
<span class="line"><span>|--internal</span></span>
<span class="line"><span>|   |--api</span></span>
<span class="line"><span>|   |--model</span></span>
<span class="line"><span>|   |--pkg</span></span>
<span class="line"><span>|   |--router</span></span>
<span class="line"><span>|   |--service</span></span>
<span class="line"><span>|   |--utils</span></span>
<span class="line"><span>|--logs</span></span>
<span class="line"><span>|--pkg</span></span>
<span class="line"><span>|--scripts</span></span>
<span class="line"><span>|--test</span></span>
<span class="line"><span>|--website</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考<a href="https://github.com/golang-standards/project-layout" target="_blank" rel="noopener noreferrer">https://github.com/golang-standards/project-layout</a></p><p>目前我自己新写项目的话后端更倾向使用Gin框架，占有内存少，性能还不错。</p>`,24)]))}const r=s(t,[["render",l],["__file","Gin-1.html.vue"]]),k=JSON.parse('{"path":"/posts/Gin-1.html","title":"可能是GitHub star星最多的Golang Web框架-Gin初识","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-12-26T00:00:00.000Z","category":["后端"],"tag":["Gin","Go","Golang"],"description":"可能是GitHub star星最多的Golang Web框架-Gin初识 对比 目前主流Golang Web框架对比 Gin特点 零分配路由器 速度 中间件支持 自由崩溃（Crash-free，不知道这么翻译对不？） JSON 验证 路由分组 错误管理 内置渲染 支持扩展 Gin小试 Gin 需要 Go版本1.21 或更高版本。 go mode初始化 ...","head":[["meta",{"property":"og:url","content":"https://robin-2016.github.io/posts/Gin-1.html"}],["meta",{"property":"og:site_name","content":"RobinDevNotes"}],["meta",{"property":"og:title","content":"可能是GitHub star星最多的Golang Web框架-Gin初识"}],["meta",{"property":"og:description","content":"可能是GitHub star星最多的Golang Web框架-Gin初识 对比 目前主流Golang Web框架对比 Gin特点 零分配路由器 速度 中间件支持 自由崩溃（Crash-free，不知道这么翻译对不？） JSON 验证 路由分组 错误管理 内置渲染 支持扩展 Gin小试 Gin 需要 Go版本1.21 或更高版本。 go mode初始化 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"Gin"}],["meta",{"property":"article:tag","content":"Go"}],["meta",{"property":"article:tag","content":"Golang"}],["meta",{"property":"article:published_time","content":"2024-12-26T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"可能是GitHub star星最多的Golang Web框架-Gin初识\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-12-26T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Robin\\",\\"url\\":\\"https://robin-2016.github.io\\"}]}"]]},"headers":[{"level":2,"title":"对比","slug":"对比","link":"#对比","children":[]},{"level":2,"title":"Gin特点","slug":"gin特点","link":"#gin特点","children":[]},{"level":2,"title":"Gin小试","slug":"gin小试","link":"#gin小试","children":[{"level":3,"title":"go mode初始化","slug":"go-mode初始化","link":"#go-mode初始化","children":[]},{"level":3,"title":"代码部分","slug":"代码部分","link":"#代码部分","children":[]},{"level":3,"title":"依赖管理","slug":"依赖管理","link":"#依赖管理","children":[]},{"level":3,"title":"运行代码","slug":"运行代码","link":"#运行代码","children":[]}]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":1.44,"words":432},"filePathRelative":"posts/Gin-1.md","localizedDate":"2024年12月26日","excerpt":"\\n<h2>对比</h2>\\n<p>目前主流Golang Web框架对比</p>\\n<table>\\n<thead>\\n<tr>\\n<th>名称</th>\\n<th>描述</th>\\n<th>star数量</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>Gin</td>\\n<td>Gin 是用 Go （Golang） 编写的 HTTP Web 框架。它具有类似 Martini 的 API，性能要好得多 - 速度提高了 40 倍。</td>\\n<td>79.6k</td>\\n</tr>\\n<tr>\\n<td>Fiber</td>\\n<td>用 Go 编写的受 Express 启发的 Web 框架</td>\\n<td>34.4k</td>\\n</tr>\\n<tr>\\n<td>Beego</td>\\n<td>beego 是一个用于 Go 编程语言的开源、高性能 Web 框架。</td>\\n<td>31.7k</td>\\n</tr>\\n<tr>\\n<td>Echo</td>\\n<td>高性能、极简的 Go Web 框架</td>\\n<td>30.2k</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{r as comp,k as data};
