import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as n,o as t}from"./app-DvFRQb53.js";const e={};function h(l,i){return t(),a("div",null,i[0]||(i[0]=[n(`<h1 id="制作windows-server-2016镜像" tabindex="-1"><a class="header-anchor" href="#制作windows-server-2016镜像"><span>制作Windows server 2016镜像</span></a></h1><p>先介绍一下总体思路：由于virtio-win.iso和系统安装镜像都是iso格式的，不能添加两个光驱，cdrom无法热添加，先使用普通驱动进行系统安装，添加virtio驱动的磁盘和网卡，更新之前安装设备网卡驱动，可以删除后来添加的设备，也可以删除安装系统时使用的设备，再进行系统优化。</p><p>安装系统：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">virt-install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> winserver2016</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --memory</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 8192</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --vcpus</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 4</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --network</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> network=default</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --disk</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> path=ws2016.qcow2,format=qcow2,device=disk</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --cdrom</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /home/iso/cn_windows_server_2016_updated_feb_2018_x64_dvd_11636703.iso</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --graphics</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> vnc,listen=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0.0.0.0</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --virt-type</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> kvm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --os-type</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> windows</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --os-variant</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> win2k16</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>使用vnc远程连接安装系统</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#弹出系统镜像，添加virtio-win.iso（下载地址可以到下面的参考链接中找到）</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">virsh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> attach-disk</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> winserver2016</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /home/iso/virtio-win.iso</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –type</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> cdrom</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –mode</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> readonly</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –target</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ide</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#添加新磁盘，磁盘的virtio类型的驱动在virtio-win.iso的violator目录中</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">virsh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> attach-disk</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> winserver2016</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –source</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /home/vms/winserver2016/ws2016-test.qcow2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –target</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> vdb</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –targetbus=virtio</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –persistent</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –driver</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> qemu</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –subdriver</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> qcow2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#添加网卡，网卡驱动在NetKVM目录中</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">virsh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> attach-interface</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> winserver2016</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –type</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> bridge</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –source</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> virbr0</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –model</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> virtio</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>登录后操作： 更新所有磁盘和网卡的驱动</p><p>系统优化： 关闭防火墙 安装telnet客户端 开启远程桌面 组策略：关机：允许系统在未登录的情况下关闭 系统更新</p><p>安装QEMU guest agent</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">virsh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> edit</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> winserver2016</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>添加如下内容</p><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">channel</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;unix&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">source</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> mode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;bind&#39;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;/var/lib/libvirt/qemu/win7x86.agent&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">target</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;virtio&#39;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;org.qemu.guest_agent.0&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">address</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;virtio-serial&#39;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> controller</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;0&#39;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> bus</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;0&#39;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> port</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;1&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">channel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">channel</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;spicevmc&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">target</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;virtio&#39;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;com.redhat.spice.0&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">address</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;virtio-serial&#39;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> controller</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;0&#39;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> bus</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;0&#39;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> port</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;2&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">channel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过virsh 重新启动，这样才会重读xml文件</p><p>更新驱动（其中一个是设备管理中未识别的）</p><p>两个驱动：Balloon vioserial</p><p>要允许Cloudbase-Init在实例引导期间运行脚本，请将PowerShell执行策略设置为不受限制：</p><div class="language-powershell line-numbers-mode" data-highlighter="shiki" data-ext="powershell" data-title="powershell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">C:\\Set-ExecutionPolicy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> Unrestricted</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#下载并安装Cloudbase-Init：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">C:\\Invoke-WebRequest</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">UseBasicParsing https:</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">//</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">cloudbase.it</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">downloads</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">CloudbaseInitSetup_Stable_x64.msi </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">OutFile cloudbaseinit.msi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">C:.\\cloudbaseinit.msi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在配置选项窗口中，更改以下设置：</p><p>用户名： Administrator</p><p>要配置的网络适配器： Red Hat VirtIO Ethernet Adapter</p><p>用于记录的串行端口： COM1</p><p>安装完成后，在“ 完成Cloudbase-Init安装向导”窗口中，选中“ 运行Sysprep”和“ 关闭” 复选框，然后单击“ 完成”。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#压缩镜像</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">virt-sparsify</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –compress</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ws2016.qcow2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Winserver2016.qcow2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#上传镜像 可修改密码参数–property hw_qemu_guest_agent=yes</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">openstack</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> image</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –file</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Winserver2016.qcow2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –container-format</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> bare</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –disk-format</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> qcow2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –public</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –property</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> hw_qemu_guest_agent=yes</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Winserver2016</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#可能会用到重置密码</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">virsh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> set-user-password</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> instance</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –user</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> administrator</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> –password</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> password</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样镜像就制作完成了。</p><p>OpenStack官方镜像制作2012参考：</p><p><a href="https://docs.openstack.org/image-guide/create-images-manually-example-windows-image.html" target="_blank" rel="noopener noreferrer">https://docs.openstack.org/image-guide/create-images-manually-example-windows-image.html</a></p>`,26)]))}const r=s(e,[["render",h],["__file","制作Windows_server_2016镜像.html.vue"]]),d=JSON.parse('{"path":"/posts/%E5%8E%86%E5%8F%B2%E6%96%87%E7%AB%A0/%E5%88%B6%E4%BD%9CWindows_server_2016%E9%95%9C%E5%83%8F.html","title":"制作Windows server 2016镜像","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2019-04-23T00:00:00.000Z","category":["Image"],"tag":["OpenStack","Image","运维","KVM"],"description":"制作Windows server 2016镜像 先介绍一下总体思路：由于virtio-win.iso和系统安装镜像都是iso格式的，不能添加两个光驱，cdrom无法热添加，先使用普通驱动进行系统安装，添加virtio驱动的磁盘和网卡，更新之前安装设备网卡驱动，可以删除后来添加的设备，也可以删除安装系统时使用的设备，再进行系统优化。 安装系统： 使用vn...","head":[["meta",{"property":"og:url","content":"https://robin-2016.github.io/posts/%E5%8E%86%E5%8F%B2%E6%96%87%E7%AB%A0/%E5%88%B6%E4%BD%9CWindows_server_2016%E9%95%9C%E5%83%8F.html"}],["meta",{"property":"og:site_name","content":"RobinDevNotes"}],["meta",{"property":"og:title","content":"制作Windows server 2016镜像"}],["meta",{"property":"og:description","content":"制作Windows server 2016镜像 先介绍一下总体思路：由于virtio-win.iso和系统安装镜像都是iso格式的，不能添加两个光驱，cdrom无法热添加，先使用普通驱动进行系统安装，添加virtio驱动的磁盘和网卡，更新之前安装设备网卡驱动，可以删除后来添加的设备，也可以删除安装系统时使用的设备，再进行系统优化。 安装系统： 使用vn..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-13T06:33:51.000Z"}],["meta",{"property":"article:tag","content":"OpenStack"}],["meta",{"property":"article:tag","content":"Image"}],["meta",{"property":"article:tag","content":"运维"}],["meta",{"property":"article:tag","content":"KVM"}],["meta",{"property":"article:published_time","content":"2019-04-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-13T06:33:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"制作Windows server 2016镜像\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-04-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-13T06:33:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Robin\\",\\"url\\":\\"https://robin-2016.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":1732723734000,"updatedTime":1734071631000,"contributors":[{"name":"robin","email":"xuhb@itshixun.com","commits":1}]},"readingTime":{"minutes":2.23,"words":670},"filePathRelative":"posts/历史文章/制作Windows_server_2016镜像.md","localizedDate":"2019年4月23日","excerpt":"\\n<p>先介绍一下总体思路：由于virtio-win.iso和系统安装镜像都是iso格式的，不能添加两个光驱，cdrom无法热添加，先使用普通驱动进行系统安装，添加virtio驱动的磁盘和网卡，更新之前安装设备网卡驱动，可以删除后来添加的设备，也可以删除安装系统时使用的设备，再进行系统优化。</p>\\n<p>安装系统：</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"bash\\" data-title=\\"bash\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">virt-install</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> --name</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> winserver2016</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> --memory</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> 8192</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> --vcpus</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> 4</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> --network</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> network=default</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> --disk</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> path=ws2016.qcow2,format=qcow2,device=disk</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> --cdrom</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> /home/iso/cn_windows_server_2016_updated_feb_2018_x64_dvd_11636703.iso</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> --graphics</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> vnc,listen=</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\">0.0.0.0</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> --virt-type</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> kvm</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> --os-type</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> windows</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> --os-variant</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> win2k16</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{r as comp,d as data};
