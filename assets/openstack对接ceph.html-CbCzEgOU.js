import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as n,o as e}from"./app-Biw8uw9f.js";const l={};function p(t,s){return e(),a("div",null,s[0]||(s[0]=[n(`<h1 id="openstack对接ceph" tabindex="-1"><a class="header-anchor" href="#openstack对接ceph"><span>OpenStack对接Ceph</span></a></h1><p>本文章是参考<a href="http://docs.ceph.com/docs/master/rbd/rbd-openstack/" target="_blank" rel="noopener noreferrer">http://docs.ceph.com/docs/master/rbd/rbd-openstack/</a></p><p>进行操作的，是官网文档文章，只是没有说明openstack-cinder-volume应该部署的位置，我尝试了几次才成功，希望你看完文章后能减少一点弯路。</p><p>与文章的差别是我没有使用openstack-cinder-backup。</p><p>openstack版本为rock版，ceph为luminous版本。前提是已经有openstack和ceph环境。</p><p>一、创建ceph存储池并初始化</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> osd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pool</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> volumes</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 128</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> osd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pool</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> images</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 128</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> osd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pool</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> compute</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 128</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#初始化</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">rbd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pool</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> init</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> volumes</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">rbd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pool</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> init</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> images</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">rbd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pool</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> init</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> compute</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>二、配置ceph客户端</p><p>注意：openstack-cinder-volume应该部署在ceph的mon所在节点上。不是cinder-api节点，也不是ceph的osd节点。（我就是在这里尝试了多次）</p><p>复制ceph集群的/etc/ceph/ceph.conf配置文件到glance-api，cinder-volume，nova-compute的/etc/ceph/ceph.conf</p><p>glance-api节点安装python-rbd</p><p>yum install python-rbd</p><p>nova-compute，cinder-backup和上cinder-volume节点上安装ceph-common</p><p>yum install ceph-common</p><p>如果ceph启用了认证，还需要创建用户和生成认证文件，并将认证文件复制的openstack的节点</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> auth</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> get-or-create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> client.glance</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mon</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;profile rbd&#39;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> osd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;profile rbd pool=images&#39;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> auth</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> get-or-create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> client.cinder</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mon</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;profile rbd&#39;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> osd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;profile rbd pool=volumes, profile rbd pool=compute, profile rbd pool=images&#39;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> auth</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> get-or-create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> client.glance</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> glance</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> tee</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /etc/ceph/ceph.client.glance.keyring</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> glance</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> chown</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> glance:glance</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /etc/ceph/ceph.client.glance.keyring</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> auth</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> get-or-create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> client.cinder</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> cinder</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> tee</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /etc/ceph/ceph.client.cinder.keyring</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> cinder</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> chown</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> cinder:cinder</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /etc/ceph/ceph.client.cinder.keyring</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> auth</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> get-or-create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> client.cinder</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> nova-compute</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> tee</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /etc/ceph/ceph.client.cinder.keyring</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nova-compute节点创建密钥环文件</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ceph</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> auth</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> get-key</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> client.cinder</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ssh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> nova-compute</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> tee</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> client.cinder.key</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">uuidgen</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">457eb676-33da-42ec-9a8c-9293d545c337</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">cat</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &gt; </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">secret.xml</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">EOF</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&lt;secret ephemeral=&#39;no&#39; private=&#39;no&#39;&gt;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  &lt;uuid&gt;457eb676-33da-42ec-9a8c-9293d545c337&lt;/uuid&gt;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  &lt;usage type=&#39;ceph&#39;&gt;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &lt;name&gt;client.cinder secret&lt;/name&gt;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  &lt;/usage&gt;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&lt;/secret&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">EOF</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">virsh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> secret-define</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --file</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> secret.xml</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">virsh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> secret-set-value</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --secret</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 457eb676-33da-42ec-9a8c-9293d545c337</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --base64</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> $(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">cat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> client.cinder.key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) &amp;&amp; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">rm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> client.cinder.key</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> secret.xml</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三、配置openstack使用ceph</p><p>glance增加下面配置</p><p>编辑/etc/glance/glance-api.conf配置文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>[glance_store]</span></span>
<span class="line"><span>stores = rbd</span></span>
<span class="line"><span>default_store = rbd</span></span>
<span class="line"><span>rbd_store_chunk_size = 8</span></span>
<span class="line"><span>rbd_store_pool = images</span></span>
<span class="line"><span>rbd_store_user = glance</span></span>
<span class="line"><span>rbd_store_ceph_conf = /etc/ceph/ceph.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[paste_deploy]</span></span>
<span class="line"><span>flavor = keystone</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>cinder-volume增加下面配置，编辑/etc/cinder/cinder.conf配置文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>[DEFAULT]</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>enabled_backends = ceph</span></span>
<span class="line"><span>glance_api_version = 2</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>[ceph]</span></span>
<span class="line"><span>volume_driver = cinder.volume.drivers.rbd.RBDDriver</span></span>
<span class="line"><span>volume_backend_name = ceph</span></span>
<span class="line"><span>rbd_pool = volumes</span></span>
<span class="line"><span>rbd_ceph_conf = /etc/ceph/ceph.conf</span></span>
<span class="line"><span>rbd_flatten_volume_from_snapshot = false</span></span>
<span class="line"><span>rbd_max_clone_depth = 5</span></span>
<span class="line"><span>rbd_store_chunk_size = 4</span></span>
<span class="line"><span>rados_connect_timeout = -1</span></span>
<span class="line"><span>rbd_user = cinder</span></span>
<span class="line"><span>rbd_secret_uuid = 457eb676-33da-42ec-9a8c-9293d545c337</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nova-compute配置，编辑/etc/nova/nova.conf配置文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>[libvirt]</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>libvirt_images_type = rbd</span></span>
<span class="line"><span>libvirt_images_rbd_pool = vms</span></span>
<span class="line"><span>libvirt_images_rbd_ceph_conf = /etc/ceph/ceph.conf</span></span>
<span class="line"><span>disk_cachemodes=&quot;network=writeback&quot;</span></span>
<span class="line"><span>rbd_user = cinder</span></span>
<span class="line"><span>rbd_secret_uuid = 457eb676-33da-42ec-9a8c-9293d545c337</span></span>
<span class="line"><span>inject_password = false</span></span>
<span class="line"><span>inject_key = false</span></span>
<span class="line"><span>inject_partition = -2</span></span>
<span class="line"><span>live_migration_flag = “VIR_MIGRATE_UNDEFINE_SOURCE，VIR_MIGRATE_PEER2PEER，VIR_MIGRATE_LIVE，VIR_MIGRATE_PERSIST_DEST，VIR_MIGRATE_TUNNELLED”</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编辑/etc/ceph/ceph.conf配置文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>[client]</span></span>
<span class="line"><span>rbd cache = true</span></span>
<span class="line"><span>rbd cache writethrough until flush = true</span></span>
<span class="line"><span>admin socket = /var/run/ceph/guests/$cluster-$type.$id.$pid.$cctid.asok</span></span>
<span class="line"><span>log file = /var/log/qemu/qemu-guest-$pid.log</span></span>
<span class="line"><span>rbd concurrent management ops = 20</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#执行</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mkdir</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /var/run/ceph/guests/</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /var/log/qemu/</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">chown</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> qemu:libvirtd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /var/run/ceph/guests</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /var/log/qemu/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到此配置完成，在服务对应节点重启openstack的服务：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> openstack-glance-api</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> openstack-nova-compute</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> openstack-cinder-volume</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,31)]))}const d=i(l,[["render",p],["__file","openstack对接ceph.html.vue"]]),k=JSON.parse('{"path":"/posts/%E5%8E%86%E5%8F%B2%E6%96%87%E7%AB%A0/openstack%E5%AF%B9%E6%8E%A5ceph.html","title":"OpenStack对接Ceph","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2019-04-08T00:00:00.000Z","category":["云计算"],"tag":["OpenStack","Ceph","运维"],"description":"OpenStack对接Ceph 本文章是参考http://docs.ceph.com/docs/master/rbd/rbd-openstack/ 进行操作的，是官网文档文章，只是没有说明openstack-cinder-volume应该部署的位置，我尝试了几次才成功，希望你看完文章后能减少一点弯路。 与文章的差别是我没有使用openstack-cin...","head":[["meta",{"property":"og:url","content":"https://robin-2016.github.io/posts/%E5%8E%86%E5%8F%B2%E6%96%87%E7%AB%A0/openstack%E5%AF%B9%E6%8E%A5ceph.html"}],["meta",{"property":"og:site_name","content":"RobinDevNotes"}],["meta",{"property":"og:title","content":"OpenStack对接Ceph"}],["meta",{"property":"og:description","content":"OpenStack对接Ceph 本文章是参考http://docs.ceph.com/docs/master/rbd/rbd-openstack/ 进行操作的，是官网文档文章，只是没有说明openstack-cinder-volume应该部署的位置，我尝试了几次才成功，希望你看完文章后能减少一点弯路。 与文章的差别是我没有使用openstack-cin..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenStack"}],["meta",{"property":"article:tag","content":"Ceph"}],["meta",{"property":"article:tag","content":"运维"}],["meta",{"property":"article:published_time","content":"2019-04-08T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"OpenStack对接Ceph\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-04-08T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Robin\\",\\"url\\":\\"https://robin-2016.github.io\\"}]}"]]},"headers":[],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":2.23,"words":669},"filePathRelative":"posts/历史文章/openstack对接ceph.md","localizedDate":"2019年4月8日","excerpt":"\\n<p>本文章是参考<a href=\\"http://docs.ceph.com/docs/master/rbd/rbd-openstack/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">http://docs.ceph.com/docs/master/rbd/rbd-openstack/</a></p>\\n<p>进行操作的，是官网文档文章，只是没有说明openstack-cinder-volume应该部署的位置，我尝试了几次才成功，希望你看完文章后能减少一点弯路。</p>\\n<p>与文章的差别是我没有使用openstack-cinder-backup。</p>","autoDesc":true}');export{d as comp,k as data};
