import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,b as a,o as t}from"./app-DvFRQb53.js";const n={};function l(r,s){return t(),e("div",null,s[0]||(s[0]=[a(`<h1 id="用vuepress在github-pages上搭建博客" tabindex="-1"><a class="header-anchor" href="#用vuepress在github-pages上搭建博客"><span>用VuePress在GitHub Pages上搭建博客</span></a></h1><p>体验用VuePress搭建博客的效果（logo还没有合适的替换），目前部署在GitHub Pages上，国内访问速度还可以，再阅读本文感受来龙去脉和搭建过程。</p><p>最近准备自己要写点小项目，当前技术栈是以运维和后端为主，自己要写项目的话还是要会一些前端技术，选择学习国内比较流行的Vue（知识都学杂了），先看了极客时间的《玩转Vue 3全家桶》，原理居多，现在在B站看大佬小满zs的《<strong>Vue3 + vite + Ts + pinia + 实战 + 源码 + electron</strong>》，讲得细致，深入浅出，有独特的视角，推荐学习，需要先了解一点Vue和TypeScript。</p><p>我之前GitHub上的静态博客是用Hexo搭建的，现在在学Vue，就想着Vue有没有对应方面的框架，搜索一番，了解到Vue生态下的VuePress和VitePress，VitePress更轻快，VuePress可配置和灵活性多一些，可自行根据需要选择，我选择功能较多的VuePress。</p><p>下面开始VuePress创建和配置，VuePress有社区类型主题供选择，可以使用VuePress默认配置直接创建，同样可以选择对应的主题去创建，选择下面两条命令中一条命令去执行即可。</p><p>使用默认配置直接创建</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pnpm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> vuepress</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> vuepress-starter</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>使用vuepress theme hope主题创建</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pnpm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> vuepress-theme-hope</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> vuepress-starter</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>最后一个参数vuepress-starter为创建的项目目录名称，执行后会出现下面几个问题，根据需求选择合适的，项目就创建完成了。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">✔</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Select</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> a</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> language</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> to</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> display</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 选择显示语言</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 简体中文</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">✔</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 选择包管理器</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pnpm</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">✔</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 你想要使用哪个打包器？</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> vite</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">生成</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> package.json...</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">✔</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 设置应用名称</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> RobinDevNotes</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">✔</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 设置应用描述</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Robin&#39;s dev notes</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">✔ 设置应用版本号 2.0.0</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">✔ 设置协议 MIT</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">生成 tsconfig.json...</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">✔ 你想要创建什么类型的项目？ blog</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">✔ 项目需要用到多语言么? no</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">生成模板...</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">✔ 是否初始化 Git 仓库? yes</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">✔ 是否需要一个自动部署文档到 GitHub Pages 的工作流？ no</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">安装依赖...</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">这可能需要数分钟，请耐心等待.</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入项目目录，执行下面命令就能启动项目了，执行后在浏览器中访问http://localhost:8080可以看到项目的初始状态的样子了。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pnpm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> docs:dev</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>我选择使用vuepress theme hope主题，对应配置文件在src/.vuepress目录下，config.ts是VuePress配置文件，navbar.ts是上方导航栏配置文件，sidebar.ts是侧边栏配置文件，theme.ts是主题配置文件，文章以markdown格式放在src/posts目录下，src/intro.md是介绍页。修改完成配置后，接下来构建生成静态网站文件。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pnpm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> docs:build</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>默认生成的静态网站文件在src/.vuepress/dist目录下，将生成的文件上传覆盖到之前代码仓库目录下，访问https://USERNAME.github.io 地址就能看到更新后的博客了，就是文章开头链接的博客了。</p><p>如果是首次配置GitHub Pages，在GitHub上创建一个以自己用户名+github.io为名称的代码仓库，例如我的GitHub用户名是robin-2016，我创建的仓库名称即为robin-2016.github.io，同样将src/.vuepress/dist目录下所有文件上传刚创建的代码仓库即可，静态博客网站就由GitHub托管运行了。</p><p>在上面学习实践过程中，发现现在每个GitHub仓库都可以配置对应的Pages静态网站了，我之前一直认为是一个账号只能有一个代码仓库可以设置，现在才知道是每一个代码仓库可以对应一个，访问的地址和上面的有所不同，需要在之前的基础上增加以当前代码仓库名称的前缀，如果代码仓库名称为test，以我的GitHub为例，则对应这个代码仓库的Pages地址为https://USERNAME.github.io/test/，具体设置在对应代码仓库的Settings下的Pages，基于某一个分支进行部署，还可以直接这个已有的<a href="https://github.com/JamesIves/github-pages-deploy-action" target="_blank" rel="noopener noreferrer">GitHub Actions</a>来执行，如果你发现一个项目下有一个名为gh-pages的分支，大概率就是这个项目的GitHub Pages静态网站，一些开源项目用的较多。</p><p>如果在项目初期，完全可以使用VuePress和GitHub Pages来建立项目的在线文档或项目官网网站，选择合适的主题或模式即可。</p>`,19)]))}const d=i(n,[["render",l],["__file","用VuePress在GitHub-Pages上搭建博客.html.vue"]]),k=JSON.parse('{"path":"/posts/%E7%94%A8VuePress%E5%9C%A8GitHub-Pages%E4%B8%8A%E6%90%AD%E5%BB%BA%E5%8D%9A%E5%AE%A2.html","title":"用VuePress在GitHub Pages上搭建博客","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-11-29T00:00:00.000Z","category":["前端"],"tag":["VuePress","Vue","GitHub Pages"],"description":"用VuePress在GitHub Pages上搭建博客 体验用VuePress搭建博客的效果（logo还没有合适的替换），目前部署在GitHub Pages上，国内访问速度还可以，再阅读本文感受来龙去脉和搭建过程。 最近准备自己要写点小项目，当前技术栈是以运维和后端为主，自己要写项目的话还是要会一些前端技术，选择学习国内比较流行的Vue（知识都学杂了）...","head":[["meta",{"property":"og:url","content":"https://robin-2016.github.io/posts/%E7%94%A8VuePress%E5%9C%A8GitHub-Pages%E4%B8%8A%E6%90%AD%E5%BB%BA%E5%8D%9A%E5%AE%A2.html"}],["meta",{"property":"og:site_name","content":"RobinDevNotes"}],["meta",{"property":"og:title","content":"用VuePress在GitHub Pages上搭建博客"}],["meta",{"property":"og:description","content":"用VuePress在GitHub Pages上搭建博客 体验用VuePress搭建博客的效果（logo还没有合适的替换），目前部署在GitHub Pages上，国内访问速度还可以，再阅读本文感受来龙去脉和搭建过程。 最近准备自己要写点小项目，当前技术栈是以运维和后端为主，自己要写项目的话还是要会一些前端技术，选择学习国内比较流行的Vue（知识都学杂了）..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-29T14:36:34.000Z"}],["meta",{"property":"article:tag","content":"VuePress"}],["meta",{"property":"article:tag","content":"Vue"}],["meta",{"property":"article:tag","content":"GitHub Pages"}],["meta",{"property":"article:published_time","content":"2024-11-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-29T14:36:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"用VuePress在GitHub Pages上搭建博客\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-11-29T00:00:00.000Z\\",\\"dateModified\\":\\"2024-11-29T14:36:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Robin\\",\\"url\\":\\"https://robin-2016.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1732890994000,"updatedTime":1732890994000,"contributors":[{"name":"robin","email":"xuhb@itshixun.com","commits":1}]},"readingTime":{"minutes":3.92,"words":1176},"filePathRelative":"posts/用VuePress在GitHub-Pages上搭建博客.md","localizedDate":"2024年11月29日","excerpt":"\\n<p>体验用VuePress搭建博客的效果（logo还没有合适的替换），目前部署在GitHub Pages上，国内访问速度还可以，再阅读本文感受来龙去脉和搭建过程。</p>\\n<p>最近准备自己要写点小项目，当前技术栈是以运维和后端为主，自己要写项目的话还是要会一些前端技术，选择学习国内比较流行的Vue（知识都学杂了），先看了极客时间的《玩转Vue 3全家桶》，原理居多，现在在B站看大佬小满zs的《<strong>Vue3 + vite + Ts + pinia + 实战 + 源码 + electron</strong>》，讲得细致，深入浅出，有独特的视角，推荐学习，需要先了解一点Vue和TypeScript。</p>","autoDesc":true}');export{d as comp,k as data};
