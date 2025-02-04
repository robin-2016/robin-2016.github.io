import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,b as s,o as i}from"./app-DuDK_xH-.js";const a={};function n(r,p){return i(),t("div",null,p[0]||(p[0]=[s(`<h1 id="linux-性能优化-cpu篇" tabindex="-1"><a class="header-anchor" href="#linux-性能优化-cpu篇"><span>Linux 性能优化 CPU篇</span></a></h1><h2 id="cpu使用率" tabindex="-1"><a class="header-anchor" href="#cpu使用率"><span><strong>CPU使用率</strong></span></a></h2><p>CPU 使用率描述了非空闲时间占总 CPU 时间的百分比，根据 CPU 上运行任务的不同，又被分为用户 CPU、系统 CPU、等待 I/O CPU、软中断和硬中断等。</p><p>1.用户 CPU 使用率，包括用户态 CPU 使用率（user）和低优先级用户态 CPU 使用率（nice），表示 CPU 在用户态运行的时间百分比。用户 CPU 使用率高，通常说明有应用程序比较繁忙。</p><p>2.系统 CPU 使用率，表示 CPU 在内核态运行的时间百分比（不包括中断）。系统 CPU 使用率高，说明内核比较繁忙。</p><p>3.等待 I/O 的 CPU 使用率，通常也称为 iowait，表示等待 I/O 的时间百分比。iowait 高，通常说明系统与硬件设备的 I/O 交互时间比较长。</p><p>4.软中断和硬中断的 CPU 使用率，分别表示内核调用软中断处理程序、硬中断处理程序的时间百分比。它们的使用率高，通常说明系统发生了大量的中断。</p><p>5.除了上面这些，还有在虚拟化环境中会用到的窃取 CPU 使用率（steal）和客户 CPU 使用率（guest），分别表示被其他虚拟机占用的 CPU 时间百分比，和运行客户虚拟机的 CPU 时间百分比。</p><ul><li>从 top 的输出可以得到各种 CPU 使用率以及僵尸进程和平均负载等信息。</li><li>从 vmstat 的输出可以得到上下文切换次数、中断次数、运行状态和不可中断状态的进程数。</li><li>从 pidstat 的输出可以得到进程的用户 CPU 使用率、系统 CPU 使用率、以及自愿上下文切换和非自愿上下文切换情况。</li></ul><p>stress Linux系统压测工具</p><p>mpstat 多核CPU性能分析工具</p><p>pidstat 进程性能分析工具</p><p>stress –cpu 1 –timeout 600 压测一个cpu</p><p>mpstat -P ALL 5 每隔5秒 查看所有cpu</p><p>pidstat -u 5 1 5秒后输出1组数据 u 表示汇总CPU利用率</p><p>stress -i 1 –timeout 500 I/O压测</p><p>stress -c 8 –timeout 500 8进程压测， 多进程压测</p><p>dstat是新的性能工具</p><p>yum install dstat -y</p><p>dstat -c -m -d</p><p>查询进程的线程数</p><p>watch “ps hH p | wc -l”</p><p>ps -Lf | wc -l</p><p>查看磁盘设备使用者</p><p>fuser -vm 挂载点|设备</p><p>查看实时IO</p><p>iotop -oP</p><h2 id="cpu使用率达到100-是怎么办" tabindex="-1"><a class="header-anchor" href="#cpu使用率达到100-是怎么办"><span><strong>CPU使用率达到100%是怎么办</strong></span></a></h2><p>先使用ps或top确定是哪个进程导致的，再使用perf排查具体调用函数</p><p>pidstat</p><p>%usr 用户态</p><p>%system 内核态</p><p>%guest 运行虚拟机CPU使用率</p><p>%wait 等待CPU使用率</p><p>%cpu 总CPU使用率</p><p>perf top</p><p>Samples 采样数 event时间类型 event count事件总数 注意：采样数过少的问题</p><p>overhead 性能事件在所有采样中的占比</p><p>shared 函数或指令所在的动态共享对象</p><p>object 动态共享对象的类型 [.]用户空间可以执行程序或动态链接库 [k]内核空间</p><p>symbol 符号名 函数名 当函数名未知时使用十六进制的地址表示</p><p>perf record 记录数据 perf report 解析展示</p><p>perf top -g -p 21515 -g开启调用关系分析 -p指定进程号 方向键选择指定的进程，回车展开调用关系</p><h2 id="cpu使用率很高-却找不到高cpu的应用" tabindex="-1"><a class="header-anchor" href="#cpu使用率很高-却找不到高cpu的应用"><span><strong>CPU使用率很高，却找不到高cpu的应用</strong></span></a></h2><p>首先想是不是短时应用导致的问题：应用里调用了其他二进制程序，运行比较短，top不容易发现，或者应用不停的崩溃重启，启动时占用资源较多</p><p>perf record -g 记录性能事件</p><p>perf report 查看报告</p><p>execsnoop 专为短时进程设计的，使用ftrace的动态追踪技术，一般用于Linux内核运行时的行为</p><p>wget <a href="https://raw.githubusercontent.com/brendangregg/perf-tools/master/execsnoop" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/brendangregg/perf-tools/master/execsnoop</a></p><p>是一个bash的脚本，直接执行就可以</p><h2 id="僵尸进程" tabindex="-1"><a class="header-anchor" href="#僵尸进程"><span><strong>僵尸进程</strong></span></a></h2><p>查找僵尸进程的父进程 pstree -aps pid</p><p>pidstat -d 展示I/O统计数据</p><p>strace 最常用的跟踪进程系统调用工具</p><p>strace -p pid</p><h2 id="软中断原理" tabindex="-1"><a class="header-anchor" href="#软中断原理"><span><strong>软中断原理</strong></span></a></h2><p>中断处理分为上半部和下半部</p><p>上半部对应硬件中断，用来快速处理中断</p><p>下半部对应软中断，用来异步处理上半部未完成的工作</p><p>cat /proc/softirqs 查看软中断运行情况</p><p>cat /proc/interrupts 查看硬中断运行情况</p><p>TIMER 定时中断</p><p>NET_TX 网络发送</p><p>NET_RX 网络接收</p><p>SCHED 内核调度</p><p>RCU rcu锁</p><p>大量的小网络包会导致频繁的硬中断和软中断，导致性能下降</p><p>软中断是以内核线程的方式运行，每一个CPU对应一个软中断内核线程</p><p>ps aux |grep softirq</p><h2 id="软中断处理" tabindex="-1"><a class="header-anchor" href="#软中断处理"><span><strong>软中断处理</strong></span></a></h2><p>查看中断时不是中断的累计次数，而是增加的频率</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">watch</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -d</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> cat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /proc/softirqs</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">hping3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -S</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -p</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 80</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> u100</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 192.168.0.30</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>-S 参数表示设置 TCP 协议的 SYN（同步序列号），-p 表示目的端口为 80</p><p>-i u100 表示每隔 100 微秒发送一个网络帧</p><p>注：如果你在实践过程中现象不明显，可以尝试把 100 调小，比如调成 10 甚至 1</p><p>star -n DEV 1 -n DEV 表示显示网络收发的报告</p><p>第三四列表示每秒接收、发送的网络帧数，pps</p><p>第五六列表示每秒接收、发送的千字节数，bps</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">tcpdum</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> eth0</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> tcp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> port</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 80</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,79)]))}const o=e(a,[["render",n],["__file","Linux-性能优化-CPU篇.html.vue"]]),c=JSON.parse('{"path":"/posts/%E5%8E%86%E5%8F%B2%E6%96%87%E7%AB%A0/Linux-%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96-CPU%E7%AF%87.html","title":"Linux 性能优化 CPU篇","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2020-05-04T00:00:00.000Z","star":true,"category":["运维"],"tag":["Linux","优化"],"description":"Linux 性能优化 CPU篇 CPU使用率 CPU 使用率描述了非空闲时间占总 CPU 时间的百分比，根据 CPU 上运行任务的不同，又被分为用户 CPU、系统 CPU、等待 I/O CPU、软中断和硬中断等。 1.用户 CPU 使用率，包括用户态 CPU 使用率（user）和低优先级用户态 CPU 使用率（nice），表示 CPU 在用户态运行的时...","head":[["meta",{"property":"og:url","content":"https://robin-2016.github.io/posts/%E5%8E%86%E5%8F%B2%E6%96%87%E7%AB%A0/Linux-%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96-CPU%E7%AF%87.html"}],["meta",{"property":"og:site_name","content":"RobinDevNotes"}],["meta",{"property":"og:title","content":"Linux 性能优化 CPU篇"}],["meta",{"property":"og:description","content":"Linux 性能优化 CPU篇 CPU使用率 CPU 使用率描述了非空闲时间占总 CPU 时间的百分比，根据 CPU 上运行任务的不同，又被分为用户 CPU、系统 CPU、等待 I/O CPU、软中断和硬中断等。 1.用户 CPU 使用率，包括用户态 CPU 使用率（user）和低优先级用户态 CPU 使用率（nice），表示 CPU 在用户态运行的时..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-04T06:07:49.000Z"}],["meta",{"property":"article:tag","content":"Linux"}],["meta",{"property":"article:tag","content":"优化"}],["meta",{"property":"article:published_time","content":"2020-05-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-04T06:07:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux 性能优化 CPU篇\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-05-04T00:00:00.000Z\\",\\"dateModified\\":\\"2025-01-04T06:07:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Robin\\",\\"url\\":\\"https://robin-2016.github.io\\"}]}"]]},"headers":[{"level":2,"title":"CPU使用率","slug":"cpu使用率","link":"#cpu使用率","children":[]},{"level":2,"title":"CPU使用率达到100%是怎么办","slug":"cpu使用率达到100-是怎么办","link":"#cpu使用率达到100-是怎么办","children":[]},{"level":2,"title":"CPU使用率很高，却找不到高cpu的应用","slug":"cpu使用率很高-却找不到高cpu的应用","link":"#cpu使用率很高-却找不到高cpu的应用","children":[]},{"level":2,"title":"僵尸进程","slug":"僵尸进程","link":"#僵尸进程","children":[]},{"level":2,"title":"软中断原理","slug":"软中断原理","link":"#软中断原理","children":[]},{"level":2,"title":"软中断处理","slug":"软中断处理","link":"#软中断处理","children":[]}],"git":{"createdTime":1734071631000,"updatedTime":1735970869000,"contributors":[{"name":"robin","email":"xuhb@itshixun.com","commits":2}]},"readingTime":{"minutes":4.61,"words":1383},"filePathRelative":"posts/历史文章/Linux-性能优化-CPU篇.md","localizedDate":"2020年5月4日","excerpt":"\\n<h2><strong>CPU使用率</strong></h2>\\n<p>CPU 使用率描述了非空闲时间占总 CPU 时间的百分比，根据 CPU 上运行任务的不同，又被分为用户 CPU、系统 CPU、等待 I/O CPU、软中断和硬中断等。</p>\\n<p>1.用户 CPU 使用率，包括用户态 CPU 使用率（user）和低优先级用户态 CPU 使用率（nice），表示 CPU 在用户态运行的时间百分比。用户 CPU 使用率高，通常说明有应用程序比较繁忙。</p>\\n<p>2.系统 CPU 使用率，表示 CPU 在内核态运行的时间百分比（不包括中断）。系统 CPU 使用率高，说明内核比较繁忙。</p>","autoDesc":true}');export{o as comp,c as data};
