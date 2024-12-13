import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as e,o as a}from"./app-p7pPCU4K.js";const t="/assets/images/write.webp",l={};function o(r,i){return a(),s("div",null,i[0]||(i[0]=[e('<h1 id="使用notion写博客" tabindex="-1"><a class="header-anchor" href="#使用notion写博客"><span>使用Notion写博客</span></a></h1><p>本文总结最近了写博客的经验，如果你同样在写博客，或者需要一款知识管理软件，本文或许能有所帮助。</p><p>先上图，下面流程图是画的我文章发布流程，Notion有着关键作用。</p><figure><img src="'+t+`" alt="write.webp" tabindex="0" loading="lazy"><figcaption>write.webp</figcaption></figure><div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">graph LR</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">A[Notion]--&gt;|导出|B[Markdown]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">A--&gt;C[NotionConverter]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">C--&gt;L[公众号]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">A--&gt;K[今日头条]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">B--&gt;D[博客园]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">B--&gt;E[稀土掘金]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">B--&gt;F[简书]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">B--&gt;G[CSDN]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">B--&gt;H[segmentfault]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">B--&gt;J[知乎]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">B--&gt;M[GitHub Pages]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="我为什么使用notion写内容" tabindex="-1"><a class="header-anchor" href="#我为什么使用notion写内容"><span>我为什么使用Notion写内容</span></a></h3><p>1.Notion支持Markdown。现在大部分博客平台支持使用Markdown格式写文章，Markdown格式表现力强，代码高亮显示，相比纯文本能保留代码格式，一开始我写的时候，会对代码部分直接截图，导致文章内图片较多，大部分博客平台对图片外链支持并不友好，如果图片太多，发布时图片需手动重新上传一次，比较繁琐，像代码放在Markdown格式的代码块中，能一定程度减少图片使用。</p><p>2.使用NotionConverter浏览器插件一键将Notion内容转为微信公众号格式。登录Notion网页版，找到对应文章，点击插件就能一键转换完成，有多种格式可以选择，默认格式是免费的，更好看的格式是收费的，图片都能直接转为公众号链接，无需再过多调整格式，默认格式已满足要求。</p><p>3.所见即所得的编辑界面，无需记忆复杂的Markdown语法。在Notion中正常写内容即可，能直接导出为Markdown格式，再用导出的Markdown文件发布到多个平台即可，相当于Markdown的可视化操作。</p><h3 id="文章发布流程" tabindex="-1"><a class="header-anchor" href="#文章发布流程"><span>文章发布流程</span></a></h3><p>目前我是将文章发布到了多个平台，包括公众号、博客园、稀土掘金、简书、CSDN、segmentfault、知乎、今日头条和上期自建的GitHub Pages（如还有我忽略的技术类型平台，可以留言我加上），发布平台较多，微信公众号直接使用NotionConverter插件转换后的结果，今日头条不支持Markdown文件上传，是直接复制上去，其他平台都是通过Notion导出的Markdown文件上传，再少量修改就能发布了，能快速发布到多个平台。</p><h3 id="什么是notion" tabindex="-1"><a class="header-anchor" href="#什么是notion"><span>什么是Notion</span></a></h3><p>Notion是一款知识管理工具，基本文档和笔记管理，支持代码块，有浏览器插件支持网页剪切，可以将网页保存到Notion中，客户端跨平台支持，客户端数量不受限制，有丰富的模版，可以通过模版市场使用其他人共享的模版，待办事项、项目管理、个人记账理财、学习计划和规划等类型模版，我常用待办事项模版，有免费和收费的，支持团队协作与分享，可以嵌套，在现在AI时代，Notion也集成了AI，每月10刀，可以简单理解为是一款增强且功能丰富的电子笔记应用，之前我是使用印象笔记，现在主要使用Notion了，感兴趣的小伙伴可以体验一下。</p>`,13)]))}const h=n(l,[["render",o],["__file","使用Notion写博客.html.vue"]]),c=JSON.parse('{"path":"/posts/%E4%BD%BF%E7%94%A8Notion%E5%86%99%E5%8D%9A%E5%AE%A2.html","title":"使用Notion写博客","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-12-06T00:00:00.000Z","category":["blog"],"tag":["Notion","Markdown"],"description":"使用Notion写博客 本文总结最近了写博客的经验，如果你同样在写博客，或者需要一款知识管理软件，本文或许能有所帮助。 先上图，下面流程图是画的我文章发布流程，Notion有着关键作用。 write.webpwrite.webp 我为什么使用Notion写内容 1.Notion支持Markdown。现在大部分博客平台支持使用Markdown格式写文章，...","head":[["meta",{"property":"og:url","content":"https://robin-2016.github.io/posts/%E4%BD%BF%E7%94%A8Notion%E5%86%99%E5%8D%9A%E5%AE%A2.html"}],["meta",{"property":"og:site_name","content":"RobinDevNotes"}],["meta",{"property":"og:title","content":"使用Notion写博客"}],["meta",{"property":"og:description","content":"使用Notion写博客 本文总结最近了写博客的经验，如果你同样在写博客，或者需要一款知识管理软件，本文或许能有所帮助。 先上图，下面流程图是画的我文章发布流程，Notion有着关键作用。 write.webpwrite.webp 我为什么使用Notion写内容 1.Notion支持Markdown。现在大部分博客平台支持使用Markdown格式写文章，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://robin-2016.github.io/assets/images/write.webp"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-13T06:33:51.000Z"}],["meta",{"property":"article:tag","content":"Notion"}],["meta",{"property":"article:tag","content":"Markdown"}],["meta",{"property":"article:published_time","content":"2024-12-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-13T06:33:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Notion写博客\\",\\"image\\":[\\"https://robin-2016.github.io/assets/images/write.webp\\"],\\"datePublished\\":\\"2024-12-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-13T06:33:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Robin\\",\\"url\\":\\"https://robin-2016.github.io\\"}]}"]]},"headers":[{"level":3,"title":"我为什么使用Notion写内容","slug":"我为什么使用notion写内容","link":"#我为什么使用notion写内容","children":[]},{"level":3,"title":"文章发布流程","slug":"文章发布流程","link":"#文章发布流程","children":[]},{"level":3,"title":"什么是Notion","slug":"什么是notion","link":"#什么是notion","children":[]}],"git":{"createdTime":1734071631000,"updatedTime":1734071631000,"contributors":[{"name":"robin","email":"xuhb@itshixun.com","commits":1}]},"readingTime":{"minutes":2.78,"words":833},"filePathRelative":"posts/使用Notion写博客.md","localizedDate":"2024年12月6日","excerpt":"\\n<p>本文总结最近了写博客的经验，如果你同样在写博客，或者需要一款知识管理软件，本文或许能有所帮助。</p>\\n<p>先上图，下面流程图是画的我文章发布流程，Notion有着关键作用。</p>\\n<figure><img src=\\"/assets/images/write.webp\\" alt=\\"write.webp\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>write.webp</figcaption></figure>\\n<div class=\\"language-mermaid line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"mermaid\\" data-title=\\"mermaid\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">graph LR</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">A[Notion]--&gt;|导出|B[Markdown]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">A--&gt;C[NotionConverter]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">C--&gt;L[公众号]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">A--&gt;K[今日头条]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">B--&gt;D[博客园]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">B--&gt;E[稀土掘金]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">B--&gt;F[简书]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">B--&gt;G[CSDN]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">B--&gt;H[segmentfault]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">B--&gt;J[知乎]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">B--&gt;M[GitHub Pages]</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{h as comp,c as data};
