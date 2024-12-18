import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as e,o as n}from"./app-BS6vFozP.js";const l={};function h(p,s){return n(),a("div",null,s[0]||(s[0]=[e(`<h1 id="搭建ceph分布式存储" tabindex="-1"><a class="header-anchor" href="#搭建ceph分布式存储"><span>搭建ceph分布式存储</span></a></h1><p>下面所有操作都是基于ceph的luminous版本进行的 官网安装非常详细，之前我安装这个版本的时候官网文档还未更新，现在官网已更新。下面记录了我安装的一些步骤供大家参考。 最少有一个admin节点，即操作部署节点，两个node存储节点</p><p>一、所有节点都操作 1.yum源(注意文件名必须为ceph.repo)</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">cat</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &gt; </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/etc/yum.repo.d/ceph.repo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;&lt; </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">EOF</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">[Ceph]</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">name=Ceph packages for </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$basearch</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">baseurl=http://mirrors.aliyun.com/ceph/rpm-luminous/el7/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$basearch</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">enabled=1</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">gpgcheck=1</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">type=rpm-md</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">gpgkey=https://download.ceph.com/keys/release.asc</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">priority=1</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">[Ceph-noarch]</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">name=Ceph noarch packages</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">baseurl=http://mirrors.aliyun.com/ceph/rpm-luminous/el7/noarch</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">enabled=1</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">gpgcheck=1</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">type=rpm-md</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">gpgkey=https://download.ceph.com/keys/release.asc</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">priority=1</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">[ceph-source]</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">name=Ceph source packages</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">baseurl=http://mirrors.aliyun.com/ceph/rpm-luminous/el7/SRPMS</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">enabled=1</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">gpgcheck=1</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">type=rpm-md</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">gpgkey=https://download.ceph.com/keys/release.asc</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">priority=1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">EOF</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.ntp时间同步 关闭firewall和selinux</p><p>3.host解析 192.168.1.128 admin 192.168.1.129 node1 192.168.1.130 node2 192.168.1.131 node3</p><p>二、admin 节点操作 1.ssh 信任</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssh-keygen</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssh-copy-id</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> admin</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssh-copy-id</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> node1</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssh-copy-id</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> node2</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssh-copy-id</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> node3</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.使用ceph-deploy进行部署(生产可用，ceph-deploy安装的都是rpm包)</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ceph-deploy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> python-pip</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#创建存放认证文件的目录</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mkdir</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> my-cluster</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> my-cluster/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.创建一个集群</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph-deploy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> new</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> node1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>如果是少于三节点的osd可以在/etc/ceph/ceph.conf中增加下面的配置，默认是三节点osd可用才为active+clean</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>osd pool default size = 2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#安装ceph包</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph-deploy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> admin</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> node1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> node2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> node3</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#mon初始化</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph-deploy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mon</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create-initial</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会在当前目录下生成一些认证文件</p><p>4.部署osd（使用整个硬盘和使用lvm卷二选一即可，建议使用整个磁盘的方式。） 4.1使用整个硬盘。注意：下面操作会擦除磁盘，谨慎操作</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph-deploy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> disk</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> zap</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> node1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /dev/vdb</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph-deploy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> osd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> node1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --data</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /dev/vdb</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>4.2使用lvm卷 经过测试，不太稳定，重启后可能会服务无法自动启动</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph-deploy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> osd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> node2</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --data</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /dev/centos/data</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph-deploy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> osd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> node3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --data</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /dev/centos/data</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>5.创建mgr</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph-deploy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mgr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> admin</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>6.创建对象网关，使用对象存储时需要进行安装</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph-deploy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> rgw</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> node2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>7.创建元数据节点（是为cephFS提供服务的，如果不使用cephFS可以不安装）</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph-deploy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mds</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> node3</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>8.执行ceph -s 查看集群的健康状态</p><p>执行前需要把ceph.client.admin.keyring复制到/etc/ceph目录下</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">cp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ceph.client.admin.keyring</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /etc/ceph/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>用 ceph-deploy 把配置文件和 admin 密钥拷贝到管理节点和 Ceph 节点，这样你每次执行 Ceph 命令行时就无需指定 monitor 地址和 ceph.client.admin.keyring 了。（如果只在admin节点查看，无需操作）</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph-deploy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> admin</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> admin-node</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> node1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> node2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> node3</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>查看存储池</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> osd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> lspools</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>9.创建存储池</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> osd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pool</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> test</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 128</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>test为存储池名称，128为pg_unm的值，归置组计算方式如下:</p><p>少于 5 个 OSD 时可把 pg_num 设置为 128</p><p>OSD 数量在 5 到 10 个时，可把 pg_num 设置为 512</p><p>OSD 数量在 10 到 50 个时，可把 pg_num 设置为 4096</p><p>OSD 数量大于 50 时，你得理解权衡方法、以及如何自己计算 pg_num 取值</p><p>自己计算 pg_num 取值时可借助 pgcalc 工具</p><p>优化：</p><p>硬盘和文件系统：</p><p>建议系统和osd分别使用不同的硬盘，或者是不同的分区</p><p>开启认证：（ceph-deploy部署方式默认是开启认证的）</p><p>使用cephx协议进行认证，防止中间人攻击</p><p>心跳：</p><p>各 OSD 每 6 秒会与其他 OSD 进行心跳检查，如果一个 OSD 20 秒都没有心跳，集群就认为它 down 了，用 [osd] 下的 osd heartbeat grace 可更改宽限期、或者运行时更改。</p><p>本文只是入门，ceph的部署在生产环境使用时，还需要考虑mgr,mon,osd,mds等服务的高可用，网络方面可以分成两个网络，即存储网络和管理网络。</p>`,49)]))}const k=i(l,[["render",h],["__file","搭建ceph分布式存储.html.vue"]]),r=JSON.parse('{"path":"/posts/%E5%8E%86%E5%8F%B2%E6%96%87%E7%AB%A0/%E6%90%AD%E5%BB%BAceph%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8.html","title":"搭建ceph分布式存储","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2019-03-30T00:00:00.000Z","category":["运维"],"tag":["Ceph","存储"],"description":"搭建ceph分布式存储 下面所有操作都是基于ceph的luminous版本进行的 官网安装非常详细，之前我安装这个版本的时候官网文档还未更新，现在官网已更新。下面记录了我安装的一些步骤供大家参考。 最少有一个admin节点，即操作部署节点，两个node存储节点 一、所有节点都操作 1.yum源(注意文件名必须为ceph.repo) 2.ntp时间同步 ...","head":[["meta",{"property":"og:url","content":"https://robin-2016.github.io/posts/%E5%8E%86%E5%8F%B2%E6%96%87%E7%AB%A0/%E6%90%AD%E5%BB%BAceph%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8.html"}],["meta",{"property":"og:site_name","content":"RobinDevNotes"}],["meta",{"property":"og:title","content":"搭建ceph分布式存储"}],["meta",{"property":"og:description","content":"搭建ceph分布式存储 下面所有操作都是基于ceph的luminous版本进行的 官网安装非常详细，之前我安装这个版本的时候官网文档还未更新，现在官网已更新。下面记录了我安装的一些步骤供大家参考。 最少有一个admin节点，即操作部署节点，两个node存储节点 一、所有节点都操作 1.yum源(注意文件名必须为ceph.repo) 2.ntp时间同步 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-13T06:33:51.000Z"}],["meta",{"property":"article:tag","content":"Ceph"}],["meta",{"property":"article:tag","content":"存储"}],["meta",{"property":"article:published_time","content":"2019-03-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-13T06:33:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"搭建ceph分布式存储\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-30T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-13T06:33:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Robin\\",\\"url\\":\\"https://robin-2016.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1734071631000,"updatedTime":1734071631000,"contributors":[{"name":"robin","email":"xuhb@itshixun.com","commits":1}]},"readingTime":{"minutes":3.25,"words":976},"filePathRelative":"posts/历史文章/搭建ceph分布式存储.md","localizedDate":"2019年3月30日","excerpt":"\\n<p>下面所有操作都是基于ceph的luminous版本进行的\\n官网安装非常详细，之前我安装这个版本的时候官网文档还未更新，现在官网已更新。下面记录了我安装的一些步骤供大家参考。\\n最少有一个admin节点，即操作部署节点，两个node存储节点</p>\\n<p>一、所有节点都操作\\n1.yum源(注意文件名必须为ceph.repo)</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"bash\\" data-title=\\"bash\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">cat</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> &gt; </span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">/etc/yum.repo.d/ceph.repo</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> &lt;&lt; </span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">EOF</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">[Ceph]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">name=Ceph packages for </span><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">$basearch</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">baseurl=http://mirrors.aliyun.com/ceph/rpm-luminous/el7/</span><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">$basearch</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">enabled=1</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">gpgcheck=1</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">type=rpm-md</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">gpgkey=https://download.ceph.com/keys/release.asc</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">priority=1</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">[Ceph-noarch]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">name=Ceph noarch packages</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">baseurl=http://mirrors.aliyun.com/ceph/rpm-luminous/el7/noarch</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">enabled=1</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">gpgcheck=1</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">type=rpm-md</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">gpgkey=https://download.ceph.com/keys/release.asc</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">priority=1</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">[ceph-source]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">name=Ceph source packages</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">baseurl=http://mirrors.aliyun.com/ceph/rpm-luminous/el7/SRPMS</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">enabled=1</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">gpgcheck=1</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">type=rpm-md</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">gpgkey=https://download.ceph.com/keys/release.asc</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\">priority=1</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">EOF</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{k as comp,r as data};
