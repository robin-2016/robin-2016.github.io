import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,b as a,o as t}from"./app-p7pPCU4K.js";const p={};function n(l,i){return t(),e("div",null,i[0]||(i[0]=[a(`<h1 id="linux-性能优化-磁盘篇" tabindex="-1"><a class="header-anchor" href="#linux-性能优化-磁盘篇"><span>Linux-性能优化-磁盘篇</span></a></h1><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span><strong>概述</strong></span></a></h2><p>衡量磁盘性能的基本指标。使用率，是指磁盘处理 I/O 的时间百分比。过高的使用率（比如超过 80%），通常意味着磁盘 I/O 存在性能瓶颈。饱和度，是指磁盘处理 I/O 的繁忙程度。过高的饱和度，意味着磁盘存在严重的性能瓶颈。当饱和度为 100% 时，磁盘无法接受新的 I/O 请求。IOPS（Input/Output Per Second），是指每秒的 I/O 请求数。吞吐量，是指每秒的 I/O 请求大小。响应时间，是指 I/O 请求从发出到收到响应的间隔时间。</p><p>iostat -d -x 1 每个磁盘的I/O情况 -d -x表示显示所有磁盘I/O的指标</p><p>pidstat -d 1 每个进程的I/O情况</p><p>iotop 根据 I/O 大小对进程排序</p><p>df -i 查看索引节点的使用情况</p><p>文件系统，是对存储设备上的文件，进行组织管理的一种机制。</p><p>为了支持各类不同的文件系统，Linux 在各种文件系统实现上，抽象了一层虚拟文件系统（VFS）。VFS 定义了一组所有文件系统都支持的数据结构和标准接口。这样，用户进程和内核中的其他子系统，就只需要跟 VFS 提供的统一接口进行交互。</p><p>为了降低慢速磁盘对性能的影响，文件系统又通过页缓存、目录项缓存以及索引节点缓存，缓和磁盘延迟对应用程序的影响。</p><p>strace -p PID 查看对应进程的系统调用</p><p>lsof -p PID 用来查看进程打开文件列表</p><p>可以用 iostat ，确认是否有 I/O 性能瓶颈。再用 strace 和 lsof ，来定位应用程序以及它正在写入的日志文件路径</p><p>filetop 主要跟踪内核中文件的读写情况，并输出线程 ID（TID）、读写大小、读写类型以及文件名称</p><p>opensnoop 可以动态跟踪内核中的 open 系统调用</p><p>在strace -p PID后加上-f，多进程和多线程都可以跟踪。</p><p>写文件是由子线程执行的，所以直接strace跟踪进程没有看到write系统调用，可以通过pstree查看进程的线程信息，再用strace跟踪。或者，通过strace -fp pid 跟踪所有线程</p><p>pstree -p PID 查看进程树</p><p>pstree -t -a -p PID -t表示显示线程，-a表示显示命令行参数</p><p>IO性能问题首先可以通过top 查看机器的整体负载情况，一般会出现CPU 的iowait 较高的现象</p><p>然后使用 pidstat -d 1 找到读写磁盘较高的进程</p><p>然后通过 strace -f -TT 进行跟踪，查看系统读写调用的频率和时间</p><p>通过lsof 找到 strace 中的文件描述符对应的文件 opensnoop可以找到对应的问题位置</p><h2 id="i-o基准测试" tabindex="-1"><a class="header-anchor" href="#i-o基准测试"><span><strong>I/O基准测试</strong></span></a></h2><p>推荐用性能测试工具 fio ，来测试磁盘的 IOPS、吞吐量以及响应时间等核心指标。但还是那句话，因地制宜，灵活选取。在基准测试时，一定要注意根据应用程序 I/O 的特点，来具体评估指标。</p><p>fio 测试</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#随机读</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">fio</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -name=randread</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -direct=1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -iodepth=64</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -rw=randread</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -ioengine=libaio</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -bs=4k</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -size=1G</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -numjobs=1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -runtime=1000</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -group_reporting</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -filename=/dev/sdb</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#随机写</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">fio</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -name=randwrite</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -direct=1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -iodepth=64</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -rw=randwrite</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -ioengine=libaio</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -bs=4k</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -size=1G</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -numjobs=1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -runtime=1000</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -group_reporting</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -filename=/dev/sdb</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#顺序读</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">fio</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -name=read</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -direct=1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -iodepth=64</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -rw=read</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -ioengine=libaio</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -bs=4k</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -size=1G</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -numjobs=1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -runtime=1000</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -group_reporting</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -filename=/dev/sdb</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#顺序写</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">fio</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -name=write</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -direct=1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -iodepth=64</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -rw=write</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -ioengine=libaio</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -bs=4k</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -size=1G</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -numjobs=1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -runtime=1000</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -group_reporting</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -filename=/dev/sdb</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>direct，表示是否跳过系统缓存。上面示例中，我设置的 1 ，就表示跳过系统缓存。iodepth，表示使用异步 I/O（asynchronous I/O，简称 AIO）时，同时发出的 I/O 请求上限。在上面的示例中，我设置的是 64。rw，表示 I/O 模式。我的示例中， read/write 分别表示顺序读 / 写，而 randread/randwrite 则分别表示随机读 / 写。ioengine，表示 I/O 引擎，它支持同步（sync）、异步（libaio）、内存映射（mmap）、网络（net）等各种 I/O 引擎。上面示例中，我设置的 libaio 表示使用异步 I/O。bs，表示 I/O 的大小。示例中，我设置成了 4K（这也是默认值）。filename，表示文件路径，当然，它可以是磁盘路径（测试磁盘性能），也可以是文件路径（测试文件系统性能）。示例中，我把它设置成了磁盘 /dev/sdb。不过注意，用磁盘路径测试写，会破坏这个磁盘中的文件系统，所以在使用前，你一定要事先做好数据备份</p><h2 id="优化思路" tabindex="-1"><a class="header-anchor" href="#优化思路"><span><strong>优化思路</strong></span></a></h2><p>首先，我们来看一下，从应用程序的角度有哪些优化 I/O 的思路。</p><p>应用程序优化：</p><p>应用程序处于整个 I/O 栈的最上端，它可以通过系统调用，来调整 I/O 模式（如顺序还是随机、同步还是异步）， 同时，它也是 I/O 数据的最终来源。在我看来，可以有这么几种方式来优化应用程序的 I/O 性能。</p><p>第一，可以用追加写代替随机写，减少寻址开销，加快 I/O 写的速度。</p><p>第二，可以借助缓存 I/O ，充分利用系统缓存，降低实际 I/O 的次数。</p><p>第三，可以在应用程序内部构建自己的缓存，或者用 Redis 这类外部缓存系统。这样，一方面，能在应用程序内部，控制缓存的数据和生命周期；另一方面，也能降低其他应用程序使用缓存对自身的影响。</p><p>比如，在前面的 MySQL 案例中，我们已经见识过，只是因为一个干扰应用清理了系统缓存，就会导致 MySQL 查询有数百倍的性能差距（0.1s vs 15s）。</p><p>再如， C 标准库提供的 fopen、fread 等库函数，都会利用标准库的缓存，减少磁盘的操作。而你直接使用 open、read 等系统调用时，就只能利用操作系统提供的页缓存和缓冲区等，而没有库函数的缓存可用。</p><p>第四，在需要频繁读写同一块磁盘空间时，可以用 mmap 代替 read/write，减少内存的拷贝次数。</p><p>第五，在需要同步写的场景中，尽量将写请求合并，而不是让每个请求都同步写入磁盘，即可以用 fsync() 取代 O_SYNC。</p><p>第六，在多个应用程序共享相同磁盘时，为了保证 I/O 不被某个应用完全占用，推荐你使用 cgroups 的 I/O 子系统，来限制进程 / 进程组的 IOPS 以及吞吐量。</p><p>最后，在使用 CFQ 调度器时，可以用 ionice 来调整进程的 I/O 调度优先级，特别是提高核心应用的 I/O 优先级。ionice 支持三个优先级类：Idle、Best-effort 和 Realtime。其中， Best-effort 和 Realtime 还分别支持 0-7 的级别，数值越小，则表示优先级别越高。</p><p>文件系统优化:</p><p>应用程序访问普通文件时，实际是由文件系统间接负责，文件在磁盘中的读写。所以，跟文件系统中相关的也有很多优化 I/O 性能的方式。</p><p>第一，你可以根据实际负载场景的不同，选择最适合的文件系统。比如 Ubuntu 默认使用 ext4 文件系统，而 CentOS 7 默认使用 xfs 文件系统。</p><p>相比于 ext4 ，xfs 支持更大的磁盘分区和更大的文件数量，如 xfs 支持大于 16TB 的磁盘。但是 xfs 文件系统的缺点在于无法收缩，而 ext4 则可以。</p><p>第二，在选好文件系统后，还可以进一步优化文件系统的配置选项，包括文件系统的特性（如 ext_attr、dir_index）、日志模式（如 journal、ordered、writeback）、挂载选项（如 noatime）等等。</p><p>比如， 使用 tune2fs 这个工具，可以调整文件系统的特性（tune2fs 也常用来查看文件系统超级块的内容）。 而通过 /etc/fstab ，或者 mount 命令行参数，我们可以调整文件系统的日志模式和挂载选项等。</p><p>第三，可以优化文件系统的缓存。</p><p>比如，你可以优化 pdflush 脏页的刷新频率（比如设置 dirty_expire_centisecs 和 dirty_writeback_centisecs）以及脏页的限额（比如调整 dirty_background_ratio 和 dirty_ratio 等）。</p><p>再如，你还可以优化内核回收目录项缓存和索引节点缓存的倾向，即调整 vfs_cache_pressure（/proc/sys/vm/vfs_cache_pressure，默认值 100），数值越大，就表示越容易回收。</p><p>最后，在不需要持久化时，你还可以用内存文件系统 tmpfs，以获得更好的 I/O 性能 。tmpfs 把数据直接保存在内存中，而不是磁盘中。比如 /dev/shm/ ，就是大多数 Linux 默认配置的一个内存文件系统，它的大小默认为总内存的一半。</p><p>磁盘优化:</p><p>数据的持久化存储，最终还是要落到具体的物理磁盘中，同时，磁盘也是整个 I/O 栈的最底层。从磁盘角度出发，自然也有很多有效的性能优化方法。</p><p>第一，最简单有效的优化方法，就是换用性能更好的磁盘，比如用 SSD 替代 HDD。</p><p>第二，我们可以使用 RAID ，把多块磁盘组合成一个逻辑磁盘，构成冗余独立磁盘阵列。这样做既可以提高数据的可靠性，又可以提升数据的访问性能。</p><p>第三，针对磁盘和应用程序 I/O 模式的特征，我们可以选择最适合的 I/O 调度算法。比方说，SSD 和虚拟机中的磁盘，通常用的是 noop 调度算法。而数据库应用，我更推荐使用 deadline 算法。</p><p>第四，我们可以对应用程序的数据，进行磁盘级别的隔离。比如，我们可以为日志、数据库等 I/O 压力比较重的应用，配置单独的磁盘。</p><p>第五，在顺序读比较多的场景中，我们可以增大磁盘的预读数据，比如，你可以通过下面两种方法，调整 /dev/sdb 的预读大小。</p><p>调整内核选项 /sys/block/sdb/queue/read_ahead_kb，默认大小是 128 KB，单位为 KB。</p><p>使用 blockdev 工具设置，比如 blockdev –setra 8192 /dev/sdb，注意这里的单位是 512B（0.5KB），所以它的数值总是 read_ahead_kb 的两倍。</p><p>第六，我们可以优化内核块设备 I/O 的选项。比如，可以调整磁盘队列的长度 /sys/block/sdb/queue/nr_requests，适当增大队列长度，可以提升磁盘的吞吐量（当然也会导致 I/O 延迟增大）。</p><p>最后，要注意，磁盘本身出现硬件错误，也会导致 I/O 性能急剧下降，所以发现磁盘性能急剧下降时，你还需要确认，磁盘本身是不是出现了硬件错误。</p><p>比如，你可以查看 dmesg 中是否有硬件 I/O 故障的日志。 还可以使用 badblocks、smartctl 等工具，检测磁盘的硬件问题，或用 e2fsck 等来检测文件系统的错误。如果发现问题，你可以使用 fsck 等工具来修复。小结</p><p>今天，我们一起梳理了常见的文件系统和磁盘 I/O 的性能优化思路和方法。发现 I/O 性能问题后，不要急于动手优化，而要先找出最重要的、可以最大程度提升性能的问题，然后再从 I/O 栈的不同层入手，考虑具体的优化方法。</p><p>记住，磁盘和文件系统的 I/O ，通常是整个系统中最慢的一个模块。所以，在优化 I/O 问题时，除了可以优化 I/O 的执行流程，还可以借助更快的内存、网络、CPU 等，减少 I/O 调用。</p><p>比如，你可以充分利用系统提供的 Buffer、Cache ，或是应用程序内部缓存， 再或者 Redis 这类的外部缓存系统</p>`,66)]))}const d=s(p,[["render",n],["__file","Linux-性能优化-磁盘篇.html.vue"]]),k=JSON.parse('{"path":"/posts/%E5%8E%86%E5%8F%B2%E6%96%87%E7%AB%A0/Linux-%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96-%E7%A3%81%E7%9B%98%E7%AF%87.html","title":"Linux-性能优化-磁盘篇","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2020-05-04T00:00:00.000Z","category":["运维"],"tag":["Linux","优化"],"description":"Linux-性能优化-磁盘篇 概述 衡量磁盘性能的基本指标。使用率，是指磁盘处理 I/O 的时间百分比。过高的使用率（比如超过 80%），通常意味着磁盘 I/O 存在性能瓶颈。饱和度，是指磁盘处理 I/O 的繁忙程度。过高的饱和度，意味着磁盘存在严重的性能瓶颈。当饱和度为 100% 时，磁盘无法接受新的 I/O 请求。IOPS（Input/Output...","head":[["meta",{"property":"og:url","content":"https://robin-2016.github.io/posts/%E5%8E%86%E5%8F%B2%E6%96%87%E7%AB%A0/Linux-%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96-%E7%A3%81%E7%9B%98%E7%AF%87.html"}],["meta",{"property":"og:site_name","content":"RobinDevNotes"}],["meta",{"property":"og:title","content":"Linux-性能优化-磁盘篇"}],["meta",{"property":"og:description","content":"Linux-性能优化-磁盘篇 概述 衡量磁盘性能的基本指标。使用率，是指磁盘处理 I/O 的时间百分比。过高的使用率（比如超过 80%），通常意味着磁盘 I/O 存在性能瓶颈。饱和度，是指磁盘处理 I/O 的繁忙程度。过高的饱和度，意味着磁盘存在严重的性能瓶颈。当饱和度为 100% 时，磁盘无法接受新的 I/O 请求。IOPS（Input/Output..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-13T06:33:51.000Z"}],["meta",{"property":"article:tag","content":"Linux"}],["meta",{"property":"article:tag","content":"优化"}],["meta",{"property":"article:published_time","content":"2020-05-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-13T06:33:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux-性能优化-磁盘篇\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-05-04T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-13T06:33:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Robin\\",\\"url\\":\\"https://robin-2016.github.io\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"I/O基准测试","slug":"i-o基准测试","link":"#i-o基准测试","children":[]},{"level":2,"title":"优化思路","slug":"优化思路","link":"#优化思路","children":[]}],"git":{"createdTime":1734071631000,"updatedTime":1734071631000,"contributors":[{"name":"robin","email":"xuhb@itshixun.com","commits":1}]},"readingTime":{"minutes":10.05,"words":3016},"filePathRelative":"posts/历史文章/Linux-性能优化-磁盘篇.md","localizedDate":"2020年5月4日","excerpt":"\\n<h2><strong>概述</strong></h2>\\n<p>衡量磁盘性能的基本指标。使用率，是指磁盘处理 I/O 的时间百分比。过高的使用率（比如超过 80%），通常意味着磁盘 I/O 存在性能瓶颈。饱和度，是指磁盘处理 I/O 的繁忙程度。过高的饱和度，意味着磁盘存在严重的性能瓶颈。当饱和度为 100% 时，磁盘无法接受新的 I/O 请求。IOPS（Input/Output Per Second），是指每秒的 I/O 请求数。吞吐量，是指每秒的 I/O 请求大小。响应时间，是指 I/O 请求从发出到收到响应的间隔时间。</p>\\n<p>iostat -d -x 1 每个磁盘的I/O情况 -d -x表示显示所有磁盘I/O的指标</p>","autoDesc":true}');export{d as comp,k as data};
