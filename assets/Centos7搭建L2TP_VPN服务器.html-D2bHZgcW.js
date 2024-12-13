import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,b as n,o as a}from"./app-p7pPCU4K.js";const l={};function p(t,s){return a(),e("div",null,s[0]||(s[0]=[n(`<h1 id="centos-7搭建l2tp-vpn服务器" tabindex="-1"><a class="header-anchor" href="#centos-7搭建l2tp-vpn服务器"><span>Centos 7搭建L2TP VPN服务器</span></a></h1><p>说明：Centos 7 作为L2TP服务器，h3c ER5200G2作为客户端</p><p>本文参照<a href="https://blog.csdn.net/kitvv/article/details/50696585" target="_blank" rel="noopener noreferrer">这篇文件</a>进行搭建配置</p><p>1.先看看你的主机是否支持pptp，返回结果为yes就表示通过。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">modprobe</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ppp-compress-18</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &amp;&amp; </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> yes</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>2 .是否开启了TUN，有的虚拟机主机需要开启，返回结果为cat: /dev/net/tun: File descriptor in bad state。就表示通过。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">cat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /dev/net/tun</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>3.更新一下再安装</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> update</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> update</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -y</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>4安装EPEL源（CentOS7官方源中已经去掉了xl2tpd）</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -y</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> epel-release</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>5.安装xl2tpd和libreswan(openswan已经停止维护)</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -y</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> xl2tpd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> libreswan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> lsof</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>6.编辑/etc/xl2tpd/xl2tpd.conf</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>[global]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[lns default]</span></span>
<span class="line"><span>ip range = 172.1.1.10-172.1.1.20   #地址池</span></span>
<span class="line"><span>local ip = 172.1.1.1</span></span>
<span class="line"><span>require chap = yes</span></span>
<span class="line"><span>refuse pap = yes</span></span>
<span class="line"><span>require authentication = yes</span></span>
<span class="line"><span>name = firewall_c</span></span>
<span class="line"><span>ppp debug = yes</span></span>
<span class="line"><span>pppoptfile = /etc/ppp/options.xl2tpd</span></span>
<span class="line"><span>length bit = yes</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>7.编辑/etc/ppp/options.xl2tpd</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>ipcp-accept-local</span></span>
<span class="line"><span>ipcp-accept-remote</span></span>
<span class="line"><span>ms-dns  8.8.8.8</span></span>
<span class="line"><span>noccp</span></span>
<span class="line"><span>auth</span></span>
<span class="line"><span>idle 1800</span></span>
<span class="line"><span>mtu 1410</span></span>
<span class="line"><span>mru 1410</span></span>
<span class="line"><span>nodefaultroute</span></span>
<span class="line"><span>debug</span></span>
<span class="line"><span>proxyarp</span></span>
<span class="line"><span>connect-delay 5000</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>8.编辑/etc/ipsec.conf</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>config setup   </span></span>
<span class="line"><span>    virtual_private=%v4:10.0.0.0/8,%v4:192.168.0.0/16,%v4:172.1.0.0/12,%v4:25.0.0.0/8,%v4:100.64.0.0/10,%v6:fd00::/8,%v6:fe80::/10</span></span>
<span class="line"><span>include /etc/ipsec.d/*.conf</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主要添加对应自己地址池的配置%v4:172.1.0.0/12</p><p>9.编辑/etc/ipsec.d/l2tp-ipsec.conf</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>conn L2TP-PSK-NAT</span></span>
<span class="line"><span>    rightsubnet=0.0.0.0/0</span></span>
<span class="line"><span>    dpddelay=10</span></span>
<span class="line"><span>    dpdtimeout=20</span></span>
<span class="line"><span>    dpdaction=clear</span></span>
<span class="line"><span>    forceencaps=yes</span></span>
<span class="line"><span>    also=L2TP-PSK-noNAT</span></span>
<span class="line"><span>conn L2TP-PSK-noNAT</span></span>
<span class="line"><span>    authby=secret</span></span>
<span class="line"><span>    pfs=no</span></span>
<span class="line"><span>    auto=add</span></span>
<span class="line"><span>    keyingtries=3</span></span>
<span class="line"><span>    rekey=no</span></span>
<span class="line"><span>    ikelifetime=8h</span></span>
<span class="line"><span>    keylife=1h</span></span>
<span class="line"><span>    type=transport</span></span>
<span class="line"><span>    left=192.168.1.1</span></span>
<span class="line"><span>    leftprotoport=17/1701</span></span>
<span class="line"><span>    right=%any</span></span>
<span class="line"><span>    rightprotoport=17/%any</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>left对应系统外网地址</p><p>10.设置用户名和密码，编辑/etc/ppp/chap-secrets</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># client server secret IP addresses</span></span>
<span class="line"><span>username * passwd *</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>11.编辑/etc/ipsec.d/default.secrets</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>: PSK “123456”</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>12.设置防火墙</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">firewall-cmd</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --permanent</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --add-service=ipsec</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">firewall-cmd</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --permanent</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --add-port=1701/udp</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">firewall-cmd</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --permanent</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --add-port=4500/udp</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">firewall-cmd</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --permanent</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --add-masquerade</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">firewall-cmd</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --reload</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>13.配置转发等，编辑/etc/sysctl.conf</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>net.ipv4.ip_forward = 1</span></span>
<span class="line"><span>net.ipv4.conf.all.accept_redirects = 0</span></span>
<span class="line"><span>net.ipv4.conf.all.rp_filter = 0</span></span>
<span class="line"><span>net.ipv4.conf.all.send_redirects = 0</span></span>
<span class="line"><span>net.ipv4.conf.default.accept_redirects = 0</span></span>
<span class="line"><span>net.ipv4.conf.default.rp_filter = 0</span></span>
<span class="line"><span>net.ipv4.conf.default.send_redirects = 0</span></span>
<span class="line"><span>net.ipv4.conf.ip_vti0.accept_redirects = 0</span></span>
<span class="line"><span>net.ipv4.conf.ip_vti0.rp_filter = 0</span></span>
<span class="line"><span>net.ipv4.conf.ip_vti0.send_redirects = 0</span></span>
<span class="line"><span>net.ipv4.conf.lo.accept_redirects = 0</span></span>
<span class="line"><span>net.ipv4.conf.lo.rp_filter = 0</span></span>
<span class="line"><span>net.ipv4.conf.lo.send_redirects = 0</span></span>
<span class="line"><span>net.ipv4.conf.enp0s3.rp_filter = 0</span></span>
<span class="line"><span>net.ipv4.conf.enp0s8.rp_filter = 0</span></span>
<span class="line"><span># 避免放大攻击</span></span>
<span class="line"><span>net.ipv4.icmp_echo_ignore_broadcasts = 1</span></span>
<span class="line"><span># # 开启恶意icmp错误消息保护</span></span>
<span class="line"><span>net.ipv4.icmp_ignore_bogus_error_responses = 1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行 sysctl -p 生效配置</p><p>14.ipsec启动&amp;检查</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> enable</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ipsec</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ipsec</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>检查：ipsec verify 全部通过。</p><p>15.设置隧道认证，编辑/etc/xl2tpd/l2tp-secrets</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#格式为us them secret    ,这个them就是路由器中的本段名称</span></span>
<span class="line"><span>* them secret</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>16.启动xl2tp</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> enable</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> xl2tpd</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> xl2tpd</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>17.路由器连接设置在客户端还要添加一条策略路由：目标为192.168.2.1 的从l2tp端口出。路由器在L2TP客户端中填写用户信息和隧道认证，连接就可以了。</p>`,40)]))}const h=i(l,[["render",p],["__file","Centos7搭建L2TP_VPN服务器.html.vue"]]),c=JSON.parse('{"path":"/posts/%E5%8E%86%E5%8F%B2%E6%96%87%E7%AB%A0/Centos7%E6%90%AD%E5%BB%BAL2TP_VPN%E6%9C%8D%E5%8A%A1%E5%99%A8.html","title":"Centos 7搭建L2TP VPN服务器","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2018-09-08T00:00:00.000Z","category":["运维"],"tag":["Centos7","L2TP"],"description":"Centos 7搭建L2TP VPN服务器 说明：Centos 7 作为L2TP服务器，h3c ER5200G2作为客户端 本文参照这篇文件进行搭建配置 1.先看看你的主机是否支持pptp，返回结果为yes就表示通过。 2 .是否开启了TUN，有的虚拟机主机需要开启，返回结果为cat: /dev/net/tun: File descriptor in ...","head":[["meta",{"property":"og:url","content":"https://robin-2016.github.io/posts/%E5%8E%86%E5%8F%B2%E6%96%87%E7%AB%A0/Centos7%E6%90%AD%E5%BB%BAL2TP_VPN%E6%9C%8D%E5%8A%A1%E5%99%A8.html"}],["meta",{"property":"og:site_name","content":"RobinDevNotes"}],["meta",{"property":"og:title","content":"Centos 7搭建L2TP VPN服务器"}],["meta",{"property":"og:description","content":"Centos 7搭建L2TP VPN服务器 说明：Centos 7 作为L2TP服务器，h3c ER5200G2作为客户端 本文参照这篇文件进行搭建配置 1.先看看你的主机是否支持pptp，返回结果为yes就表示通过。 2 .是否开启了TUN，有的虚拟机主机需要开启，返回结果为cat: /dev/net/tun: File descriptor in ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-13T06:33:51.000Z"}],["meta",{"property":"article:tag","content":"Centos7"}],["meta",{"property":"article:tag","content":"L2TP"}],["meta",{"property":"article:published_time","content":"2018-09-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-13T06:33:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Centos 7搭建L2TP VPN服务器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-09-08T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-13T06:33:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Robin\\",\\"url\\":\\"https://robin-2016.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1734071631000,"updatedTime":1734071631000,"contributors":[{"name":"robin","email":"xuhb@itshixun.com","commits":1}]},"readingTime":{"minutes":1.99,"words":598},"filePathRelative":"posts/历史文章/Centos7搭建L2TP_VPN服务器.md","localizedDate":"2018年9月8日","excerpt":"\\n<p>说明：Centos 7 作为L2TP服务器，h3c ER5200G2作为客户端</p>\\n<p>本文参照<a href=\\"https://blog.csdn.net/kitvv/article/details/50696585\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">这篇文件</a>进行搭建配置</p>\\n<p>1.先看看你的主机是否支持pptp，返回结果为yes就表示通过。</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"bash\\" data-title=\\"bash\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">modprobe</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> ppp-compress-18</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> &amp;&amp; </span><span style=\\"--shiki-light:#0184BC;--shiki-dark:#56B6C2\\">echo</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> yes</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{h as comp,c as data};
