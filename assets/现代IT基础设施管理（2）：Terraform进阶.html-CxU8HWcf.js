import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as e,o as n}from"./app-DMLfTCjG.js";const t={};function l(r,i){return n(),a("div",null,i[0]||(i[0]=[e(`<h1 id="现代it基础设施管理-2-terraform进阶" tabindex="-1"><a class="header-anchor" href="#现代it基础设施管理-2-terraform进阶"><span>现代IT基础设施管理（2）：Terraform进阶</span></a></h1><p>上一篇对Terraform进行了简单介绍，并尝试一个创建虚拟机实例的演示实验，对IaC（基础设施即代码）有了初步的认识，这一篇我们稍微深入一些，继续对Terraform进行进阶尝试，使用高级特性更安全高效管理基础设施，尽量还原实际生产使用。</p><p>代码仓库地址：<a href="https://github.com/robin-2016/terraform-demo" target="_blank" rel="noopener noreferrer">https://github.com/robin-2016/terraform-demo</a>，如果没有克隆到本地的，先克隆代码仓库到本地，如之前克隆过，请将代码更新到最新。</p><p>一、变量</p><p>Terraform支持变量，变量使用场景一般为下面几种情况，一个配置需要多次引用，经常需要修改的配置，还有像AK和SK等敏感信息需要单独文件保存，一般情况是单独保存在名为vars.tf文件中，这样修改时只修改vars.tf一个文件即可，demo2就是这样的示例，将AK、SK、区域、镜像ID和实例规格等都放在vars.tf文件中，根据类型分别放在不同的配置文件中，归类方便在配置较多时能较快找到对应的配置信息，在其他配置文件中通过var.加上具体变量名称就能引用到变量的值。vars.tf部分内容如下：</p><div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" data-title="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">variable </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;AWS_ACCESS_KEY&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  type</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">        =</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> string</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  default</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">     =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> &quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">variable </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;AWS_SECRET_KEY&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  type</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">        =</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> string</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  default</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">     =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> &quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">variable </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;AWS_REGION&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  type</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">        =</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> string</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  default</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">     =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> &quot;ap-east-1&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">variable </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;AMI&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  type</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">        =</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> string</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  default</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">     =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> &quot;ami-0ad7f83eab34d93a7&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">variable </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;INSTANCE_TYPE&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  type</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">        =</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;"> string</span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">  default</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">     =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> &quot;t3.micro&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如AWS_ACCESS_KEY变量，值的内容为default字段，type为变量类型，示例中变量都是string字符串类型，Terraform变量还支持number数值类型、true-false布尔类型、list列表类型和map字典类型，本次示例中只演示了字符串类型使用，其他类型请参考下面官网文档链接使用：<a href="https://developer.hashicorp.com/terraform/tutorials/configuration-language/variables" target="_blank" rel="noopener noreferrer">https://developer.hashicorp.com/terraform/tutorials/configuration-language/variables</a></p><p>二、生产环境示例</p><p>切换到demo-2目录下，根据资源类型，将配置拆分到不同的配置文件中。</p><p>目录文件介绍：instance.tf是虚拟机实例配置，provider.tf是供应商配置，vars.tf是变量，key.tf是实例ssh密钥，相比密码，密钥安全性更高，securitygroup.tf是安全组配置，允许访问ssh服务，output.tf是执行结束输出配置，这里配置是创建实例的公网IP地址，user_data.tftpl是虚拟机初始化脚本模版文件，下部分会详细讲解，vpc.tf是虚拟网络配置，versions.tf是供应商版本配置信息，这样根据需求只修改对应内容文件即可。</p><p>准备工作，这里主要修改是vars.tf，填写AWS的AK和SK对应到AWS_ACCESS_KEY和AWS_SECRET_KEY，再生成密钥对文件，使用下面命令生成：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssh-keygen</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mykey</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>准备工作完成，正式开始创建资源，步骤和上一讲相同</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#初始化</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">terraform</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> init</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#查看执行计划</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">terraform</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> plan</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#应用，创建资源</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">terraform</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> apply</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行完成后会在最后Outputs部分输出虚拟机示例的公网IP地址，之后能使用下面ssh命令远程连接虚拟机示例了：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssh</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mykey</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ubuntu@公网IP</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>注：如果没有连接上，可以等一会再尝试，安装配置软件需要一点时间，本示例使用Ubuntu镜像，用户名为ubuntu是镜像默认用户名，使用其他镜像需根据镜像调整。</p><p>登录后查看服务状态，nginx已经启动，并已开启80端口，登录上AWS控制台，实例、VPC、安全组、密钥对都已经配置完成。这里只是简单演示，实际会更复杂。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> status</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> nginx</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ss</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -ntlp</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>三、user data</p><p>上面示例中，使用的公共镜像创建虚拟机实例，最终完成时却已安装nginx，使用的就是user data，在云上创建虚拟机实例时，都会在虚拟机创建完成的首次启动执行user_data中的命令进行初始化，之后虚拟机实例再启动不会再执行，这样就能使用user_data功能完成对虚拟机的初始化，下面为demo-2中user_data.tftpl内容，和普通bash脚本内容基本相同，示例中主要是安装并启动了nginx，还可以写更复杂，模版文件还支持变量输入，自行学习探索。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> apt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> update</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> apt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> nginx</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -y</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> start</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> nginx</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个方式是Packer自定义镜像，提前安装需要应用环境，Packer还可以和Jenkins等CI持续集成工具结合，Packer配置变化后，重新执行流水线构建新的自定义镜像。</p><p>推荐使用user data方式，基本云环境都支持user data，减少不再依赖三方工具，更好管理，自定义镜像方式启动快一些，可以根据实际需要自行选择。</p><p>四、模块</p><p>上面是所有配置都是自己写，如果想抽出部分作为公共配置，供其他项目引用，或者环境不同，但配置相同，只是变量不同，会存在许多重复配置，这样情况下就需要用到Terraform的模块，我们可以直接引用模块写更少的配置文件，官网模块地址：<a href="https://registry.terraform.io/browse/modules" target="_blank" rel="noopener noreferrer">https://registry.terraform.io/browse/modules</a>，官方提供了许多模块供开发者引用，也可以自定义模块使用，一些第三方同样提供模块。在demo-3中，我们通过dev开发环境和prod生产环境区分，引用官方实例模块来创建实例，内容示例：</p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">module &quot;ec2_instance&quot; {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  source  = &quot;terraform-aws-modules/ec2-instance/aws&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  name = &quot;demo-3-prod&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  instance_type          = &quot;t3.micro&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  key_name               = &quot;mykeypair&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  monitoring             = true</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  vpc_security_group_ids = [&quot;sg-12345678&quot;]</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  subnet_id              = &quot;subnet-eddcdzz4&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  tags = {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    Terraform   = &quot;true&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    Environment = &quot;prod&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>五、相关生态开源工具：Infisical密钥管理平台</p><p>使用Terraform时，会有AK和SK管理问题，如直接存储在配置文件中有泄露的风险，不存储在配置文件中每次使用都需要人工配置，多人使用，还需要相互传递，官方有对应收费版本的HCP Terraform，功能齐全，不差钱可以直接使用HCP Terraform。</p><p>如果想降低成本，又想提高安全性和便利性，使用开源项目就是非常不错的选择，Infisical 是开源密钥管理平台，GitHub地址：<a href="https://github.com/Infisical/infisical" target="_blank" rel="noopener noreferrer">https://github.com/Infisical/infisical</a>，产品定位：在您的团队/基础设施中同步密钥，防止密钥泄漏，非常合适搭配Terraform使用，并提供内部 PKI，有Python、Go、Java等编程语言SDK，同样适用于普通程序开发中需要用到一些敏感信息的地方</p><p>对于Terraform就介绍到这里，相信你对于Terraform已经有更深的了解，自己动手实操起来，阅读官网文档，定能熟练使用Terraform。如果对你有帮助，请点个关注，如果需要定制Terraform详细教程请留言咨询，嘿嘿。</p>`,31)]))}const d=s(t,[["render",l],["__file","现代IT基础设施管理（2）：Terraform进阶.html.vue"]]),k=JSON.parse('{"path":"/posts/%E7%8E%B0%E4%BB%A3IT%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E7%AE%A1%E7%90%86%EF%BC%882%EF%BC%89%EF%BC%9ATerraform%E8%BF%9B%E9%98%B6.html","title":"现代IT基础设施管理（2）：Terraform进阶","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-11-11T00:00:00.000Z","category":["运维"],"tag":["Terraform","AWS"],"description":"现代IT基础设施管理（2）：Terraform进阶 上一篇对Terraform进行了简单介绍，并尝试一个创建虚拟机实例的演示实验，对IaC（基础设施即代码）有了初步的认识，这一篇我们稍微深入一些，继续对Terraform进行进阶尝试，使用高级特性更安全高效管理基础设施，尽量还原实际生产使用。 代码仓库地址：https://github.com/robi...","head":[["meta",{"property":"og:url","content":"https://robin-2016.github.io/posts/%E7%8E%B0%E4%BB%A3IT%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E7%AE%A1%E7%90%86%EF%BC%882%EF%BC%89%EF%BC%9ATerraform%E8%BF%9B%E9%98%B6.html"}],["meta",{"property":"og:site_name","content":"RobinDevNotes"}],["meta",{"property":"og:title","content":"现代IT基础设施管理（2）：Terraform进阶"}],["meta",{"property":"og:description","content":"现代IT基础设施管理（2）：Terraform进阶 上一篇对Terraform进行了简单介绍，并尝试一个创建虚拟机实例的演示实验，对IaC（基础设施即代码）有了初步的认识，这一篇我们稍微深入一些，继续对Terraform进行进阶尝试，使用高级特性更安全高效管理基础设施，尽量还原实际生产使用。 代码仓库地址：https://github.com/robi..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-26T15:19:09.000Z"}],["meta",{"property":"article:tag","content":"Terraform"}],["meta",{"property":"article:tag","content":"AWS"}],["meta",{"property":"article:published_time","content":"2024-11-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-26T15:19:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"现代IT基础设施管理（2）：Terraform进阶\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-11-11T00:00:00.000Z\\",\\"dateModified\\":\\"2024-11-26T15:19:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Robin\\",\\"url\\":\\"https://robin-2016.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1732634349000,"updatedTime":1732634349000,"contributors":[{"name":"robin","email":"xuhb@itshixun.com","commits":1}]},"readingTime":{"minutes":5.82,"words":1747},"filePathRelative":"posts/现代IT基础设施管理（2）：Terraform进阶.md","localizedDate":"2024年11月11日","excerpt":"\\n<p>上一篇对Terraform进行了简单介绍，并尝试一个创建虚拟机实例的演示实验，对IaC（基础设施即代码）有了初步的认识，这一篇我们稍微深入一些，继续对Terraform进行进阶尝试，使用高级特性更安全高效管理基础设施，尽量还原实际生产使用。</p>\\n<p>代码仓库地址：<a href=\\"https://github.com/robin-2016/terraform-demo\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/robin-2016/terraform-demo</a>，如果没有克隆到本地的，先克隆代码仓库到本地，如之前克隆过，请将代码更新到最新。</p>","autoDesc":true}');export{d as comp,k as data};
