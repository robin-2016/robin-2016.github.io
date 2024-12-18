import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as e,o as n}from"./app-BdA0F5uv.js";const t={};function l(p,s){return n(),a("div",null,s[0]||(s[0]=[e(`<h1 id="在openstack中keepalived的vip配置" tabindex="-1"><a class="header-anchor" href="#在openstack中keepalived的vip配置"><span>在OpenStack中keepalived的VIP配置</span></a></h1><p>问题描述： 在openstack环境下安装配置keepalived后，VIP只能在所在的主机节点ping通，其他节点无法ping通 解决方式： 需要配置allowed-address-pairs 红帽官网对allowed-address-pairs的解释：allowed-address-pairs 允许您指定 mac_address/ip_address（CIDR）对，使它们可以在不考虑子网的情况下通过一个端口。这会启用对一些协议的使用，如 VRRP，它会在两个实例间浮动一个 IP 地址，从而实现快速故障切换功能。</p><p>配置步骤：（在openstack的neutron的控制节点操作）</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#查看需要使用VIP网络id</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">neutron</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> net-list</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#创建带有allowed-address-pairs功能的IP</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">neutron</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> port-create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –fixed-ip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –allowed-address-pairs</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> subnet_id=子网id,ip_address=VIP</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 网络id</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#在需要启动keepalived所有实例的网络接口上启用allowed-address-pairs功能</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">neutron</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> port-update</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 实例网卡id</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –allowed-address-pair</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ip_address=VIP</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#查找实例的网络接口的信息</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">neutron</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> port-list</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 实例IP</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[root@openstack ~]# neutron net-list</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">neutron</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> CLI</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> is</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> deprecated</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> and</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> will</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> be</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> removed</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> in</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> the</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> future.</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Use</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> openstack</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> CLI</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> instead.</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">+--------------------------------------+--------+----------------------------------+-----------------------------------------------------+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">| </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">tenant_id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">subnets</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> |</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">+--------------------------------------+--------+----------------------------------+-----------------------------------------------------+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">| </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">12e41d31-5be5-4cf9-a45c-4ee374388759</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">EX-NET</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">a2ff5d90248e46328448f02252f190ec</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">6489102f-60c1-4938-b5f5-7a97689429f5</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 192.168.1.0/24</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> |</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">| </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">a8751de8-016d-4038-afc1-bcff552044a2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">YTJY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">a2ff5d90248e46328448f02252f190ec</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">327a7ca8-9fb5-4ab3-850e-9d835e7575ee</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 192.168.2.0/24</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> |</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">+--------------------------------------+--------+----------------------------------+-----------------------------------------------------+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[root@openstack ~]# neutron port-create --fixed-ip </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">subnet_id</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">327a7ca8-9fb5-4ab3-850e-9d835e7575ee,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">ip_address</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">192.168.2.6</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> a8751de8-016d-4038-afc1-bcff552044a</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[root@openstack ~]# neutron port-list |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">grep</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 192.168.2.4</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">neutron</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> CLI</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> is</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> deprecated</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> and</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> will</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> be</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> removed</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> in</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> the</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> future.</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Use</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> openstack</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> CLI</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> instead.</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">| </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">69ebfd68-a789-4330-88d5-8f5ba4370caa</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> |      | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">a2ff5d90248e46328448f02252f190ec</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">fa:16:3e:55:90:c7</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | {</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot;subnet_id&quot;</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;327a7ca8-9fb5-4ab3-850e-9d835e7575ee&quot;,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;ip_address&quot;:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 192.168.2.4</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;}  |</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">[root@openstack ~]# neutron port-update 69ebfd68-a789-4330-88d5-8f5ba4370caa --allowed-address-pair ip_address=192.168.2.6</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有实例都开启allowed-address-pairs就可以正常使用keepalived了</p>`,7)]))}const d=i(t,[["render",l],["__file","在openstack中keepalived的VIP配置.html.vue"]]),r=JSON.parse('{"path":"/posts/%E5%8E%86%E5%8F%B2%E6%96%87%E7%AB%A0/%E5%9C%A8openstack%E4%B8%ADkeepalived%E7%9A%84VIP%E9%85%8D%E7%BD%AE.html","title":"在OpenStack中keepalived的VIP配置","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2019-04-15T00:00:00.000Z","category":["云计算"],"tag":["OpenStack","运维","keepalive"],"description":"在OpenStack中keepalived的VIP配置 问题描述： 在openstack环境下安装配置keepalived后，VIP只能在所在的主机节点ping通，其他节点无法ping通 解决方式： 需要配置allowed-address-pairs 红帽官网对allowed-address-pairs的解释：allowed-address-pairs...","head":[["meta",{"property":"og:url","content":"https://robin-2016.github.io/posts/%E5%8E%86%E5%8F%B2%E6%96%87%E7%AB%A0/%E5%9C%A8openstack%E4%B8%ADkeepalived%E7%9A%84VIP%E9%85%8D%E7%BD%AE.html"}],["meta",{"property":"og:site_name","content":"RobinDevNotes"}],["meta",{"property":"og:title","content":"在OpenStack中keepalived的VIP配置"}],["meta",{"property":"og:description","content":"在OpenStack中keepalived的VIP配置 问题描述： 在openstack环境下安装配置keepalived后，VIP只能在所在的主机节点ping通，其他节点无法ping通 解决方式： 需要配置allowed-address-pairs 红帽官网对allowed-address-pairs的解释：allowed-address-pairs..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-13T06:33:51.000Z"}],["meta",{"property":"article:tag","content":"OpenStack"}],["meta",{"property":"article:tag","content":"运维"}],["meta",{"property":"article:tag","content":"keepalive"}],["meta",{"property":"article:published_time","content":"2019-04-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-13T06:33:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在OpenStack中keepalived的VIP配置\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-04-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-13T06:33:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Robin\\",\\"url\\":\\"https://robin-2016.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1734071631000,"updatedTime":1734071631000,"contributors":[{"name":"robin","email":"xuhb@itshixun.com","commits":1}]},"readingTime":{"minutes":1.38,"words":414},"filePathRelative":"posts/历史文章/在openstack中keepalived的VIP配置.md","localizedDate":"2019年4月15日","excerpt":"\\n<p>问题描述：\\n在openstack环境下安装配置keepalived后，VIP只能在所在的主机节点ping通，其他节点无法ping通\\n解决方式：\\n需要配置allowed-address-pairs\\n红帽官网对allowed-address-pairs的解释：allowed-address-pairs 允许您指定 mac_address/ip_address（CIDR）对，使它们可以在不考虑子网的情况下通过一个端口。这会启用对一些协议的使用，如 VRRP，它会在两个实例间浮动一个 IP 地址，从而实现快速故障切换功能。</p>\\n<p>配置步骤：（在openstack的neutron的控制节点操作）</p>","autoDesc":true}');export{d as comp,r as data};
