import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as n,o as e}from"./app-DcZA98cq.js";const l={};function t(h,s){return e(),a("div",null,s[0]||(s[0]=[n(`<h1 id="你的专属乐高积木-用crd教kubernetes听懂你的需求" tabindex="-1"><a class="header-anchor" href="#你的专属乐高积木-用crd教kubernetes听懂你的需求"><span>你的专属乐高积木：用CRD教Kubernetes听懂你的需求</span></a></h1><p>想象你有一套乐高积木，但官方只提供基础方块。当你想要搭建一个摩天轮时，发现缺少齿轮零件。这时如果能让乐高公司为你定制特殊齿轮，是不是就能轻松实现创意？Kubernetes CRD（Custom Resource Definition）就是这样的&quot;定制零件工坊&quot;。</p><h3 id="一、为什么需要定制积木" tabindex="-1"><a class="header-anchor" href="#一、为什么需要定制积木"><span>一、为什么需要定制积木？</span></a></h3><p>假设你管理着200个网站，每个网站都需要：</p><ul><li>域名配置</li><li>SSL证书自动续期</li><li>访问量监控</li></ul><p>传统方式需要为每个网站手动编写Deployment、Service、Ingress等YAML文件，就像用基础积木搭建200个不同的城堡，既重复又容易出错。</p><h3 id="二、打造你的第一个定制积木" tabindex="-1"><a class="header-anchor" href="#二、打造你的第一个定制积木"><span>二、打造你的第一个定制积木</span></a></h3><p>让我们创建一个&quot;Website&quot;资源类型：</p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># website-crd.yaml</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">apiVersion</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">apiextensions.k8s.io/v1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">kind</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">CustomResourceDefinition</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">metadata</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">websites.web.example.com</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">spec</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  group</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">web.example.com</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  scope</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Namespaced</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  names</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    plural</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">websites</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    singular</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">websites</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    kind</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Website</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  versions</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">v1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      served</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">true</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      storage</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">true</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      schema</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        openAPIV3Schema</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">          type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">object</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">          properties</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">            spec</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">              type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">object</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">              properties</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">                domain</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">                  type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">string</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">                replicas</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">                  type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">integer</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">                https</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">                  type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">boolean</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在你可以像这样创建网站：</p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># my-blog.yaml</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">apiVersion</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">web.example.com/v1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">kind</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Website</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">metadata</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">my-blog</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">spec</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  domain</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;blog.example.com&quot;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  replicas</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  https</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#查看自定义的crd</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">kubectl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> get</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> crd</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#查看my-blog</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">kubectl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> get</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> website</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、让积木动起来的魔法齿轮" tabindex="-1"><a class="header-anchor" href="#三、让积木动起来的魔法齿轮"><span>三、让积木动起来的魔法齿轮</span></a></h3><p>单纯定义积木还不够，我们需要控制器（Controller）来实现自动化：</p><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 示例代码</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">func</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> reconcile</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">website</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;"> *</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Website</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 自动生成Deployment</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    createDeployment</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">website</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Spec</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Replicas</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 自动配置Ingress</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> website</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Spec</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Https</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        createCert</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">website</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Spec</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Domain</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 监控配置</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    setupMonitoring</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">website</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当kubectl apply时，控制器会自动创建所有关联资源，就像乐高齿轮带动整个摩天轮运转。</p><h3 id="四、定制积木的无限可能" tabindex="-1"><a class="header-anchor" href="#四、定制积木的无限可能"><span>四、定制积木的无限可能</span></a></h3><ul><li>数据库即服务：定义Database资源，自动创建主从集群</li><li>机器学习流水线：声明训练任务，自动调度GPU资源</li><li>物联网设备管理：创建设备类型，自动同步边缘节点</li></ul><p>就像用乐高搭建太空站，CRD让Kubernetes从&quot;集装箱管理&quot;进化成&quot;智能机器人管家&quot;。现在，轮到你创造自己的Kubernetes乐高世界了！</p><p><strong>进阶提示</strong>：结合Operator模式，你可以打包控制器和CRD，像安装APP一样扩展集群能力。尝试从自动备份Operator开始，体验&quot;声明式编程&quot;的魔法吧！</p>`,20)]))}const r=i(l,[["render",t],["__file","CRD-Kubernetes.html.vue"]]),d=JSON.parse('{"path":"/posts/CRD-Kubernetes.html","title":"你的专属乐高积木：用CRD教Kubernetes听懂你的需求","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2025-02-09T00:00:00.000Z","star":true,"category":["DevOps"],"tag":["CRD","Kubernetes"],"description":"你的专属乐高积木：用CRD教Kubernetes听懂你的需求 想象你有一套乐高积木，但官方只提供基础方块。当你想要搭建一个摩天轮时，发现缺少齿轮零件。这时如果能让乐高公司为你定制特殊齿轮，是不是就能轻松实现创意？Kubernetes CRD（Custom Resource Definition）就是这样的\\"定制零件工坊\\"。 一、为什么需要定制积木？ 假...","head":[["meta",{"property":"og:url","content":"https://robin-2016.github.io/posts/CRD-Kubernetes.html"}],["meta",{"property":"og:site_name","content":"RobinDevNotes"}],["meta",{"property":"og:title","content":"你的专属乐高积木：用CRD教Kubernetes听懂你的需求"}],["meta",{"property":"og:description","content":"你的专属乐高积木：用CRD教Kubernetes听懂你的需求 想象你有一套乐高积木，但官方只提供基础方块。当你想要搭建一个摩天轮时，发现缺少齿轮零件。这时如果能让乐高公司为你定制特殊齿轮，是不是就能轻松实现创意？Kubernetes CRD（Custom Resource Definition）就是这样的\\"定制零件工坊\\"。 一、为什么需要定制积木？ 假..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"CRD"}],["meta",{"property":"article:tag","content":"Kubernetes"}],["meta",{"property":"article:published_time","content":"2025-02-09T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"你的专属乐高积木：用CRD教Kubernetes听懂你的需求\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-02-09T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Robin\\",\\"url\\":\\"https://robin-2016.github.io\\"}]}"]]},"headers":[{"level":3,"title":"一、为什么需要定制积木？","slug":"一、为什么需要定制积木","link":"#一、为什么需要定制积木","children":[]},{"level":3,"title":"二、打造你的第一个定制积木","slug":"二、打造你的第一个定制积木","link":"#二、打造你的第一个定制积木","children":[]},{"level":3,"title":"三、让积木动起来的魔法齿轮","slug":"三、让积木动起来的魔法齿轮","link":"#三、让积木动起来的魔法齿轮","children":[]},{"level":3,"title":"四、定制积木的无限可能","slug":"四、定制积木的无限可能","link":"#四、定制积木的无限可能","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":1.99,"words":596},"filePathRelative":"posts/CRD-Kubernetes.md","localizedDate":"2025年2月9日","excerpt":"\\n<p>想象你有一套乐高积木，但官方只提供基础方块。当你想要搭建一个摩天轮时，发现缺少齿轮零件。这时如果能让乐高公司为你定制特殊齿轮，是不是就能轻松实现创意？Kubernetes CRD（Custom Resource Definition）就是这样的\\"定制零件工坊\\"。</p>\\n<h3>一、为什么需要定制积木？</h3>\\n<p>假设你管理着200个网站，每个网站都需要：</p>\\n<ul>\\n<li>域名配置</li>\\n<li>SSL证书自动续期</li>\\n<li>访问量监控</li>\\n</ul>\\n<p>传统方式需要为每个网站手动编写Deployment、Service、Ingress等YAML文件，就像用基础积木搭建200个不同的城堡，既重复又容易出错。</p>","autoDesc":true}');export{r as comp,d as data};
