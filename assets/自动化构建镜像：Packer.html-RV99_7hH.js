import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,b as i,a as t,t as l,o as r}from"./app-CNBNuUhf.js";const p="/assets/images/packer.png",h={};function k(a,s){return r(),n("div",null,[s[0]||(s[0]=i('<h1 id="自动化构建镜像-packer" tabindex="-1"><a class="header-anchor" href="#自动化构建镜像-packer"><span>自动化构建镜像：Packer</span></a></h1><p>在介绍Packer之前，先来回顾一下未使用Packer时自定义虚拟机镜像的步骤。先在本地启动一个虚拟机，从安装系统开始，再进行自定义配置或应用安装，最后封装压缩成镜像，详细操作步骤可以参考我之前写的文档，制作Centos 7镜像：<a href="https://robin-2016.github.io/2019/04/08/%E5%88%B6%E4%BD%9Copenstack%E7%9A%84centos7%E9%95%9C%E5%83%8F/" target="_blank" rel="noopener noreferrer">https://robin-2016.github.io/2019/04/08/制作openstack的centos7镜像/</a>，制作Windows镜像：<a href="https://robin-2016.github.io/2019/04/23/%E5%88%B6%E4%BD%9Copenstack%E7%9A%84windows-server-2016%E9%95%9C%E5%83%8F/" target="_blank" rel="noopener noreferrer">https://robin-2016.github.io/2019/04/23/制作openstack的windows-server-2016镜像/</a>。还可以借助阿里云或华为云等公有云，可以直接运行一个虚拟机实例，再进行相关配置，最后导出镜像，使用公有云相比本地构建镜像节省了安装系统的时间，相关云配置也能减少，只需进行自定义相关配置。</p><p>不论在本地还是在云上构建虚拟机镜像，都需要很多手动操作步骤，而Packer就是为了构建镜像自动化，和Terraform一样都是HashiCorp公司出品，官网地址：<a href="https://www.packer.io/" target="_blank" rel="noopener noreferrer">https://www.packer.io/</a>，在官网首页还提出了镜像即代码（Images as code）的概念，支持虚拟机和容器镜像构建，我体验了一下容器构建过程，相比dockerfile略显复杂难懂，推荐容器镜像还是写dockerfile，用Packer来构建虚拟机镜像，容器构建之前已经实现了自动化，虚拟机镜像构建还是手动操作，Packer能大大提高效率。下面进入实操演示。</p><p>Packer安装，参考官网：<a href="https://developer.hashicorp.com/packer/install" target="_blank" rel="noopener noreferrer">https://developer.hashicorp.com/packer/install</a>，基本1-2条命令就能完成安装，示例配置文件代码仓库：<a href="https://github.com/robin-2016/terraform-demo" target="_blank" rel="noopener noreferrer">https://github.com/robin-2016/terraform-demo</a>，克隆后进行packer-demo目录下</p>',4)),t("p",null,"先来看一下aws-demo.pkr.hcl配置文件内容结构，第一部分packer部分定义了使用的插件，这里使用的AWS云，AWS第一次注册使用有750小时免费使用计划（限定规格）。第二部分source部分定义了镜像来源，amazon-ebs标识是AWS的云硬盘，ami_name为最终生成的镜像名称，"+l(a.timestamp)+"为时间戳变量，多次执行时镜像名称会因为执行时间不同而不同，不会名称冲突，instance_type为虚拟机实例规格，其实Packer底层原理还是创建了一个虚拟机实例，执行脚本命令，导出镜像，再删除虚拟机实例，Packer是把上面步骤自动化了，region为实例运行区域，ap-east-1是香港地区，source_ami为基础镜像ID，这里选择的公有Ubuntu Server 24镜像。第三部分build是定义构建过程，主要是shell部分，可以写脚本来安装配置应用程序，示例中是安装的redis程序。",1),s[1]||(s[1]=i(`<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" data-title="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">packer {</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  required_plugins</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> {</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">    amazon</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> =</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> {</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">      version</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> &quot;&gt;= 1.2.8&quot;</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">      source</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> &quot;github.com/hashicorp/amazon&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">source </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;amazon-ebs&quot;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;ubuntu&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  ami_name</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">      =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> &quot;aws-demo-ubuntu-{{timestamp}}&quot;</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  instance_type</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> &quot;t3.micro&quot;</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  region</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">        =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> &quot;ap-east-1&quot;</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  source_ami</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">    =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> &quot;ami-0ad7f83eab34d93a7&quot;</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  ssh_username</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> &quot;ubuntu&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">build {</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  name</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> &quot;learn-packer&quot;</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  sources</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> =</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> [</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    &quot;source.amazon-ebs.ubuntu&quot;</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  ]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  provisioner</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> &quot;shell&quot;</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> {</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">    environment_vars</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> =</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> [</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      &quot;FOO=hello world&quot;</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">,</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">    ]</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">    inline</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> =</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> [</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      &quot;echo Installing Redis&quot;</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      &quot;sleep 30&quot;</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      &quot;sudo apt-get update&quot;</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      &quot;sudo apt-get install -y redis-server&quot;</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      &quot;echo </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\&quot;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">FOO is $FOO</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\&quot;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> &gt; example.txt&quot;</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">,</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">    ]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在具体执行前先配置下面两个环境变量，AWS的AK和SK，Packer会读取环境变量就能有权限操作AWS了。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> AWS_ACCESS_KEY_ID</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;&lt;YOUR_AWS_ACCESS_KEY_ID&gt;&quot;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> AWS_SECRET_ACCESS_KEY</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;&lt;YOUR_AWS_SECRET_ACCESS_KEY&gt;&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>依次执行下面命令，就能完成镜像的构建了，先进行初始化，格式化和验证配置文件命令是可选的，最后进行镜像构建，操作看着和Terraform非常相似。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#初始化</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">packer</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> init</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#格式化配置-可选</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">packer</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> fmt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#验证配置-可选</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">packer</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> validate</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#构建镜像</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">packer</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> build</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> aws-demo.pkr.hcl</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等待构建命令执行完成，镜像就构建完成了，可以登录进入到AWS的镜像服务，就能看到本次Packer构建的镜像了，演示完成后如不需要记得手动删除镜像。</p><figure><img src="`+p+'" alt="packer.png" tabindex="0" loading="lazy"><figcaption>packer.png</figcaption></figure><p>本示例构建镜像过程耗时大约5分钟，相比之前手动操作效率提高不少，还可以把配置文件添加到代码仓库中，同代码一起进行版本管理，和Jenkins等工具结合，实现流水线构建镜像，AWS支持Windows镜像，需要使用Powershell脚本，参考官网文档：<a href="https://developer.hashicorp.com/packer/integrations/hashicorp/amazon/latest/components/builder/ebs#windows-2016-sysprep-commands-for-amazon-windows-amis-only" target="_blank" rel="noopener noreferrer">https://developer.hashicorp.com/packer/integrations/hashicorp/amazon/latest/components/builder/ebs#windows-2016-sysprep-commands-for-amazon-windows-amis-only</a>。</p><p>AWS支持并行构建多个镜像，参考官网文档：<a href="https://developer.hashicorp.com/packer/tutorials/aws-get-started/aws-get-started-parallel-builds" target="_blank" rel="noopener noreferrer">https://developer.hashicorp.com/packer/tutorials/aws-get-started/aws-get-started-parallel-builds</a></p><p>Packer官方供应商还支持阿里云、腾讯云和OpenStack，没有华为云，但在华为云自己的文档中有使用Packer构建镜像文档，参考链接：<a href="https://support.huaweicloud.com/bestpractice-ims/ims_bp_0031.html" target="_blank" rel="noopener noreferrer">https://support.huaweicloud.com/bestpractice-ims/ims_bp_0031.html</a>，在阿里云、腾讯云和华为云中没有看到对Windows镜像支持的文档，对比来看，还是AWS使用文档最详细。</p><p>Packer介绍和演示到此结束，如果对你有帮助，请点个关注，嘿嘿。</p>',11))])}const F=e(h,[["render",k],["__file","自动化构建镜像：Packer.html.vue"]]),c=JSON.parse('{"path":"/posts/%E8%87%AA%E5%8A%A8%E5%8C%96%E6%9E%84%E5%BB%BA%E9%95%9C%E5%83%8F%EF%BC%9APacker.html","title":"自动化构建镜像：Packer","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-11-15T00:00:00.000Z","category":["运维"],"tag":["Packer","AWS","镜像"],"description":"自动化构建镜像：Packer 在介绍Packer之前，先来回顾一下未使用Packer时自定义虚拟机镜像的步骤。先在本地启动一个虚拟机，从安装系统开始，再进行自定义配置或应用安装，最后封装压缩成镜像，详细操作步骤可以参考我之前写的文档，制作Centos 7镜像：https://robin-2016.github.io/2019/04/08/制作opens...","head":[["meta",{"property":"og:url","content":"https://robin-2016.github.io/posts/%E8%87%AA%E5%8A%A8%E5%8C%96%E6%9E%84%E5%BB%BA%E9%95%9C%E5%83%8F%EF%BC%9APacker.html"}],["meta",{"property":"og:site_name","content":"RobinDevNotes"}],["meta",{"property":"og:title","content":"自动化构建镜像：Packer"}],["meta",{"property":"og:description","content":"自动化构建镜像：Packer 在介绍Packer之前，先来回顾一下未使用Packer时自定义虚拟机镜像的步骤。先在本地启动一个虚拟机，从安装系统开始，再进行自定义配置或应用安装，最后封装压缩成镜像，详细操作步骤可以参考我之前写的文档，制作Centos 7镜像：https://robin-2016.github.io/2019/04/08/制作opens..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://robin-2016.github.io/assets/images/packer.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-26T15:19:09.000Z"}],["meta",{"property":"article:tag","content":"Packer"}],["meta",{"property":"article:tag","content":"AWS"}],["meta",{"property":"article:tag","content":"镜像"}],["meta",{"property":"article:published_time","content":"2024-11-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-26T15:19:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"自动化构建镜像：Packer\\",\\"image\\":[\\"https://robin-2016.github.io/assets/images/packer.png\\"],\\"datePublished\\":\\"2024-11-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-11-26T15:19:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Robin\\",\\"url\\":\\"https://robin-2016.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1732634349000,"updatedTime":1732634349000,"contributors":[{"name":"robin","email":"xuhb@itshixun.com","commits":1}]},"readingTime":{"minutes":4.28,"words":1284},"filePathRelative":"posts/自动化构建镜像：Packer.md","localizedDate":"2024年11月15日","excerpt":"\\n<p>在介绍Packer之前，先来回顾一下未使用Packer时自定义虚拟机镜像的步骤。先在本地启动一个虚拟机，从安装系统开始，再进行自定义配置或应用安装，最后封装压缩成镜像，详细操作步骤可以参考我之前写的文档，制作Centos 7镜像：<a href=\\"https://robin-2016.github.io/2019/04/08/%E5%88%B6%E4%BD%9Copenstack%E7%9A%84centos7%E9%95%9C%E5%83%8F/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://robin-2016.github.io/2019/04/08/制作openstack的centos7镜像/</a>，制作Windows镜像：<a href=\\"https://robin-2016.github.io/2019/04/23/%E5%88%B6%E4%BD%9Copenstack%E7%9A%84windows-server-2016%E9%95%9C%E5%83%8F/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://robin-2016.github.io/2019/04/23/制作openstack的windows-server-2016镜像/</a>。还可以借助阿里云或华为云等公有云，可以直接运行一个虚拟机实例，再进行相关配置，最后导出镜像，使用公有云相比本地构建镜像节省了安装系统的时间，相关云配置也能减少，只需进行自定义相关配置。</p>","autoDesc":true}');export{F as comp,c as data};
