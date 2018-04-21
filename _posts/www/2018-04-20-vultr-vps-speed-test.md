---
layout: post
title: 'Vultr VPS机房速度测试'
subtitle: 'Choose good Server-room always correct'
date: 2018-04-21
categories: VPS
tags: VPS Vultr

---
# Hi, everyone!

博客三个月没有更新，今天迎来了第一更——

...and it is first update ~~in April~~...

今天我发布的这篇文章，是为了给大家测试Vultr VPS的各个机房的速度。

## 那么，选择一个机房重要吗？
重要。实际上，无论是国内还是国外，VPS或虚拟主机提供商几乎都会提供国内外的机房。比如香港啦、纽约啦、硅谷啦、东京啦，还有新加坡啦等等机房。

机房的速度除了你购买的带宽外（国外一般都是1000M直接连接，只给你限制流量），还和当地的网络情况以及各大ISP的傻逼情况有关。实际上，当你访问一个网站时，各大ISP首先会通过缓存DNS库找IP，然后通过“优胜劣汰”的方式找出传输信息的最佳路径。但是国内ISP非常SB，我看过国内ISP能把新加坡VPS的IP首先飞到美国去接着才飞到新加坡，相当于绕了地球一圈......

有一些地区的网络非常不好，所以买了相当于没买（部分地区不到1MB/s）。

说了这么多，Let's begin!

****

>运营商：中国移动
>
>
>地区：广东河源
>
>
>带宽：100MB（即10MB/s满速）

|地理位置|测试IP|稳定-最低速度|稳定-最高速度|加速到稳定时间-网络整体情况|
|--------|--------|
|德国 法兰克福Frankfurt, DE|http://fra-de-ping.vultr.com/|4.5MB/s|5MB/s|较慢提升-中等|
|法国 巴黎Paris, France|http://par-fr-ping.vultr.com/|2.8MB/s|3.2MB/s|很慢提升-中慢|
|荷兰 阿姆斯特丹Amsterdam, NL|http://ams-nl-ping.vultr.com/|7.1MB/s|7.5MB/s|中快提升-快速|
|英国 伦敦London, UK|http://lon-gb-ping.vultr.com/|1.3MB/s|1.5MB/s|较慢提升-慢|
|美国 纽约（新泽西州）New York (NJ)|http://nj-us-ping.vultr.com/|8.7MB/s|9.2MB/s|快速提升-极快|
|新加坡Singapore|http://sgp-ping.vultr.com/|4MB/s|6.7MB/s|不稳定-中快|
|芝加哥 伊利诺伊州Chicago, Illinois|http://il-us-ping.vultr.com/|2.4MB/s|4.1MB/s|不稳定-快速|
|美国 佐治亚州 亚特兰大Atlanta, Georgia|http://ga-us-ping.vultr.com/|0.05MB/s|0.065MB/s|快速-龟速|
|美国 佛罗里达 迈阿密Miami, Florida|http://fl-us-ping.vultr.com/|0.003MB/s|0.05MB/s|快速-龟速|
|日本东京Tokyo, Japan|http://hnd-jp-ping.vultr.com/|9.7MB/s|满速|极快-极速|
|美国 德州 达拉斯Dallas, Texas|http://tx-us-ping.vultr.com/|0.11MB/s|0.13MB/s|快速-龟速|
|美国 西雅图 华盛顿Seattle, Washington|http://wa-us-ping.vultr.com/|9.8MB/s|满速|极快-极速|
|美国 加州 硅谷Silicon Valley, California|http://sjo-ca-us-ping.vultr.com/|4MB/s|4.9MB/s|不稳定-中等|
|美国 加州 洛杉矶Los Angeles, California|http://lax-ca-us-ping.vultr.com/|5.3MB/s|5.9MB/s|中等-中等|
|澳大利亚 悉尼Sydney, Australia|http://syd-au-ping.vultr.com/|9.9MB/s|满速|较快-极速|

基于这些结果，（至少在我这边）这些机房是首选的（有“❤”的是大家首选的，“※”是我推荐的，“▲”为警告）：

>极速机房
>美国 纽约-极快【※】
>日本东京-极快【❤】【※】【▲封IP风险较大】
>美国 西雅图 华盛顿-极速
>澳大利亚 悉尼-极速
>
>
>中等机房
>荷兰 阿姆斯特丹-快速
>美国 加州 洛杉矶-中等

基于上述信息，我们就可以选择较好的机房了。

其实有些机房也是挺不错的，在正式测试之前这几个机房我认为是比较快的：

>荷兰阿姆斯特丹
>新加坡
>日本东京
>洛杉矶

如果你想要两全其美——加载快速度快的机房，基于这个结果，这几个机房较为不错：

>美国纽约
>日本东京
>美国西雅图华盛顿
>澳大利亚悉尼

一般来讲，美国西海岸的机房离中国比较近——速度也快。