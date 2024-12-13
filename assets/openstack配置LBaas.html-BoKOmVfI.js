import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,b as i,o as n}from"./app-BGF_mHJ1.js";const t={};function l(r,s){return n(),e("div",null,s[0]||(s[0]=[i(`<h1 id="openstack配置lbaas" tabindex="-1"><a class="header-anchor" href="#openstack配置lbaas"><span>OpenStack配置LBaas</span></a></h1><p>openstack 版本为rocky</p><h3 id="neutron-controller配置" tabindex="-1"><a class="header-anchor" href="#neutron-controller配置"><span><strong>neutron-controller配置</strong></span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> openstack-neutron-lbaas</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -y</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>修改下面的配置文件</p><p>编辑/etc/neutron/neutron.conf配置文件，增加下面配置（router是之前原有，只增加后面的）</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>service_plugins = router,neutron_lbaas.services.loadbalancer.plugin.LoadBalancerPluginv2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>编辑/etc/neutron/neutron_lbaas.conf配置文件，增加下面配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>[service_providers]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>service_provider = LOADBALANCERV2:Haproxy:neutron_lbaas.drivers.haproxy.plugin_driver.HaproxyOnHostPluginDriver:default</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编辑/etc/neutron/lbaas_agent.ini配置文件，增加下面配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>[DEFAULT]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>device_driver = neutron_lbaas.drivers.haproxy.namespace_driver.HaproxyNSDriver</span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface_driver = linuxbridge</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[haproxy]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>user_group = haproxy</span></span>
<span class="line"><span></span></span>
<span class="line"><span>systemctl restart neutron-server</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="computer节点配置" tabindex="-1"><a class="header-anchor" href="#computer节点配置"><span><strong>computer节点配置</strong></span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> openstack-neutron-lbaas</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> haproxy</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -y</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>同样是修改下面的文件</p><p>编辑/etc/neutron/neutron.conf配置文件，增加下面配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>service_plugins = router,neutron_lbaas.services.loadbalancer.plugin.LoadBalancerPluginv2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>编辑/etc/neutron/neutron_lbaas.conf配置文件，增加下面配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>[service_providers]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>service_provider = LOADBALANCERV2:Haproxy:neutron_lbaas.drivers.haproxy.plugin_driver.HaproxyOnHostPluginDriver:default</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编辑/etc/neutron/lbaas_agent.ini配置文件，增加下面配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>[DEFAULT]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>device_driver = neutron_lbaas.drivers.haproxy.namespace_driver.HaproxyNSDriver</span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface_driver = linuxbridge</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[haproxy]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>user_group = haproxy</span></span>
<span class="line"><span></span></span>
<span class="line"><span>systemctl enable neutron-lbaasv2-agent</span></span>
<span class="line"><span></span></span>
<span class="line"><span>systemctl start neutron-lbaasv2-agent</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dashboard-开启lbaas" tabindex="-1"><a class="header-anchor" href="#dashboard-开启lbaas"><span><strong>dashboard 开启lbaas</strong></span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> clone</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> https://git.openstack.org/openstack/neutron-lbaas-dashboard</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> neutron-lbaas-dashboard</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> checkout</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> stable/rocky</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">python</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> setup.py</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">cp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> neutron_lbaas_dashboard/enabled/_1481_project_ng_loadbalancersv2_panel.py</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /usr/share/openstack-dashboard/openstack_dashboard/local/enabled/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编辑/etc/openstack-dashboard/local_settings配置文件</p><p>OPENSTACK_NEUTRON_NETWORK 中添加 ‘enable_lb’: True,</p><p>安装模块pip install neutron-lbaas-dashboard</p><p>不安装模块重启时日志会提示找不到模块，无法启用load balance</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> httpd</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在项目，网络，有load balance</p><p>创建load balance后无法ping通，需要设置安全组</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">neutron</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> lbaas-loadbalancer-show</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> lbaas_name</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">neutron</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> port-update</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –security-group</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> security-group-name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> vip-port-id</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安全组开放80和443端口</p><p>参考资料：</p><p><a href="https://docs.openstack.org/neutron/rocky/admin/config-lbaas.html" target="_blank" rel="noopener noreferrer">https://docs.openstack.org/neutron/rocky/admin/config-lbaas.html</a></p><p><a href="https://www.server-world.info/en/note?os=CentOS_7&amp;p=openstack_rocky2&amp;f=16" target="_blank" rel="noopener noreferrer">https://www.server-world.info/en/note?os=CentOS_7&amp;p=openstack_rocky2&amp;f=16</a></p><p><a href="https://kurisu.love/index.php/archives/82/" target="_blank" rel="noopener noreferrer">https://kurisu.love/index.php/archives/82/</a></p>`,35)]))}const h=a(t,[["render",l],["__file","openstack配置LBaas.html.vue"]]),o=JSON.parse('{"path":"/posts/%E5%8E%86%E5%8F%B2%E6%96%87%E7%AB%A0/openstack%E9%85%8D%E7%BD%AELBaas.html","title":"OpenStack配置LBaas","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2019-04-23T00:00:00.000Z","category":["云计算"],"tag":["OpenStack","LB","运维"],"description":"OpenStack配置LBaas openstack 版本为rocky neutron-controller配置 修改下面的配置文件 编辑/etc/neutron/neutron.conf配置文件，增加下面配置（router是之前原有，只增加后面的） 编辑/etc/neutron/neutron_lbaas.conf配置文件，增加下面配置 编辑/etc...","head":[["meta",{"property":"og:url","content":"https://robin-2016.github.io/posts/%E5%8E%86%E5%8F%B2%E6%96%87%E7%AB%A0/openstack%E9%85%8D%E7%BD%AELBaas.html"}],["meta",{"property":"og:site_name","content":"RobinDevNotes"}],["meta",{"property":"og:title","content":"OpenStack配置LBaas"}],["meta",{"property":"og:description","content":"OpenStack配置LBaas openstack 版本为rocky neutron-controller配置 修改下面的配置文件 编辑/etc/neutron/neutron.conf配置文件，增加下面配置（router是之前原有，只增加后面的） 编辑/etc/neutron/neutron_lbaas.conf配置文件，增加下面配置 编辑/etc..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-13T06:33:51.000Z"}],["meta",{"property":"article:tag","content":"OpenStack"}],["meta",{"property":"article:tag","content":"LB"}],["meta",{"property":"article:tag","content":"运维"}],["meta",{"property":"article:published_time","content":"2019-04-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-13T06:33:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"OpenStack配置LBaas\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-04-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-13T06:33:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Robin\\",\\"url\\":\\"https://robin-2016.github.io\\"}]}"]]},"headers":[{"level":3,"title":"neutron-controller配置","slug":"neutron-controller配置","link":"#neutron-controller配置","children":[]},{"level":3,"title":"computer节点配置","slug":"computer节点配置","link":"#computer节点配置","children":[]},{"level":3,"title":"dashboard 开启lbaas","slug":"dashboard-开启lbaas","link":"#dashboard-开启lbaas","children":[]}],"git":{"createdTime":1734071631000,"updatedTime":1734071631000,"contributors":[{"name":"robin","email":"xuhb@itshixun.com","commits":1}]},"readingTime":{"minutes":1.22,"words":366},"filePathRelative":"posts/历史文章/openstack配置LBaas.md","localizedDate":"2019年4月23日","excerpt":"\\n<p>openstack 版本为rocky</p>\\n<h3><strong>neutron-controller配置</strong></h3>\\n<div class=\\"language-bash line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"bash\\" data-title=\\"bash\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">yum</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> install</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> openstack-neutron-lbaas</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> -y</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{h as comp,o as data};
