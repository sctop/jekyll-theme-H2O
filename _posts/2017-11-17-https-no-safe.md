---
layout: post
title: 'https不安全？'
subtitle: '敢黑我https？！'
date: 2017-11-17
categories: CloudFlare
tags: https CloudFlare 站长之家
---

hi，every boby~

前段时间我偶然发现http://scris.top/ （作者注：Scratch吧小吧主e4361的网站）的whois信息很有趣。这是他的网站whois信息：

```
域名
scris.top

注册商
shanghai meicheng technology information development co ltd

联系人
JingTaoQiu

联系邮箱
slaaker@126.com

联系电话
057186696126

创建时间
2015年07月26日

过期时间
2018年07月26日

公司
Qiu JingTao

域名服务器
whois.cndns.com

DNS
jamie.ns.cloudflare.com
rick.ns.cloudflare.com

状态
客户端设置禁止转移(clientTransferProhibited)

(信息来自http://whois.chinaz.com/scris.top)
```

我发现它的注册商是“shanghai meicheng technology information development co ltd”，即美橙互联。本身它的DNS应该是基于“cndns.com”后缀的，但是它不是。它是“cloudflare.com”。我直接访问了这个网站。网站的响应速度很慢，我ping了一下：

```
正在 Ping cloudflare.com [198.41.214.162] 具有 32 字节的数据:
来自 198.41.214.162 的回复: 字节=32 时间=51ms TTL=52
来自 198.41.214.162 的回复: 字节=32 时间=53ms TTL=52
来自 198.41.214.162 的回复: 字节=32 时间=50ms TTL=53
来自 198.41.214.162 的回复: 字节=32 时间=73ms TTL=53

198.41.214.162 的 Ping 统计信息:
    数据包: 已发送 = 4，已接收 = 4，丢失 = 0 (0% 丢失)，
往返行程的估计时间(以毫秒为单位):
    最短 = 50ms，最长 = 73ms，平均 = 56ms
```

我不觉得它的响应能如此低，于是我用“站长之家”的“ping检测”功能检测了一下：

```
137个探测点
完成137个

平均155.2ms
最快美国[海外] ＜1ms
最慢浙江湖州[联通] 807ms
```

然后我瞥了一眼IP归属地...

AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH......

IP归属地全部都是**美国 百度云加速节点**，很明显的玩我们嘛！

---GIVE YOU SOME COLOUR SEE SEE---

好了，不说了，我们回到正题。

首先咱们来普及一个概念，就是，为什么要发明https：

```
HTTPS和HTTP的区别
超文本传输协议HTTP协议被用于在Web浏览器和网站服务器之间传递信息。HTTP协议以明文方式发送内容，不提供任何方式的数据加密，如果攻击者截取了Web浏览器和网站服务器之间的传输报文，就可以直接读懂其中的信息，因此HTTP协议不适合传输一些敏感信息，比如信用卡号、密码等。
为了解决HTTP协议的这一缺陷，需要使用另一种协议：安全套接字层超文本传输协议HTTPS。为了数据传输的安全，HTTPS在HTTP的基础上加入了SSL协议，SSL依靠证书来验证服务器的身份，并为浏览器和服务器之间的通信加密。
HTTPS和HTTP的区别主要为以下四点：
一、https协议需要到ca申请证书，一般免费证书很少，需要交费。
二、http是超文本传输协议，信息是明文传输，https 则是具有安全性的ssl加密传输协议。
三、http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
四、http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。
```

这里提到了一个东西——SSL，我们来看看SSL是什么：

```
Secure Socket Layer，为Netscape所研发，用以保障在Internet上数据传输之安全，利用数据加密(Encryption)技术，可确保数据在网络上之传输过程中不会被截取及窃听。一般通用之规格为40 bit之安全标准，美国则已推出128 bit之更高安全标准，但限制出境。只要3.0版本以上之I.E.或Netscape浏览器即可支持SSL。
当前版本为3.0。它已被广泛地用于Web浏览器与服务器之间的身份认证和加密数据传输。
SSL协议位于TCP/IP协议与各种应用层协议之间，为数据通讯提供安全支持。SSL协议可分为两层： SSL记录协议（SSL Record Protocol）：它建立在可靠的传输协议（如TCP）之上，为高层协议提供数据封装、压缩、加密等基本功能的支持。 SSL握手协议（SSL Handshake Protocol）：它建立在SSL记录协议之上，用于在实际的数据传输开始前，通讯双方进行身份认证、协商加密算法、交换加密密钥等。
```

简单的说，https其实就是为了防止数据在使用http传输时被他人看见（这很重要，特别是在传输隐私数据时）。这点对于黑客来讲是很重要的。假设淘宝没有https，那么大家的账号就全部GG的了。

也因为如此，他给了我一个网址， http://www.freebuf.com/articles/neopoints/45822.html ，我进去看了一下，有一张图是本次争议最大的部分：

![本次争议最大的部分](http://image.3001.net/images/20141004/14124026869523.png)

根据我的理解，我们来看看这幅图的三个部分：

第一个部分，Flexible SSL。Flexible的意思是“灵活的; 易弯曲的; 柔韧的; 易被说服的;”（我想这个指的意思应该是“主机不支持SSL，但是又要半加密传输时的模式”，详见第二部分剖析）。在这张图中，我们可以看到，CloudFlare对源服务器是不进行https加密传输的，只在传输到Cloudflare后，Cloudflare再传给用户时才是加密的。

第二个部分，Full SSL。这个full大家比较好理解，全部的意思。这张图在源服务器下有一行小字，上面写着“Requires SSL on your host”（需要主机上的SSL），也就是说需要主机支持SSL（https），这也就是为什么我称“Flexible SSL”为“主机不支持SSL，但是又要半加密传输时的模式”的原因。从这张图上我们很明显地看出，Cloudflare无论是对源服务器数据的提取，还是对用户的传输，都是使用https加密传输的。所以我们也没有什么好顾忌的了，因为全程都是加密传输的。

第三个部分，Full SSL (strict)。这个就相对于Full SSL更严格了。我们看到源服务器旁边还有一个证书，并且下面的小字“Requires a valid SSL cert”（需要SSL证书），也就是说服务器本身都需要弄进来一个证书才可以进行通讯，这就更加严格了。（我亲身试过，由于找不到证书，Cloudflare不允许我访问网站。）

**（作者注：作者的网站cnfast.top是Github Pages技术的。但Github早已支持https，所以当初我添加上去的时候系统是默认Full SSL的，根本不会出现外泄的情况）**

**（作者注2：作者的网站在Cloudflare上开启了Always Online™功能。在实验Full SSL (strict)时，由于作者的网站没有证书（也根本不可能添加证书），所以造成了无法访问的情况。不过Cloudflare提示了Always Online™功能、、、）**

所以，**无论是cnfast.top还是taobao.com，都是安全的。众所周知阿里云和Github都是支持https的，所以至少会达到Full SSL这样的等级，大家再也不用担心了！**



附：scris.top的whois详细信息
```
Domain Name: scris.top
Registry Domain ID: D20150726G10001G_41173349-top
Registrar WHOIS Server: whois.cndns.com
Registrar URL: http://www.cndns.com
Updated Date: 2017-07-12T08:39:38Z
Creation Date: 2015-07-26T07:43:12Z
Registry Expiry Date: 2018-07-26T07:43:12Z
Registrar: shanghai meicheng technology information development co ltd
Registrar IANA ID: 1621
Registrar Abuse Contact Email: tld@cndns.com
Registrar Abuse Contact Phone: +86.02151697771
Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited
Registry Registrant ID: C20170416C_17291120-top
Registrant Name: JingTao Qiu
Registrant Organization: Qiu JingTao
Registrant Street: hangzhou city binjiang puyan lianzhuang second qu
Registrant City: hangzhoushi
Registrant State/Province: zhejiang
Registrant Postal Code: 
Registrant Country: CN
Registrant Phone: +86.057186696126
Registrant Phone Ext: 456
Registrant Fax: +86.057186696126
Registrant Fax Ext: 123
Registrant Email: slaaker@126.com
Registry Admin ID: C20170416C_17291120-top
Admin Name: JingTao Qiu
Admin Organization: Qiu JingTao
Admin Street: hangzhou city binjiang puyan lianzhuang second qu
Admin City: hangzhoushi
Admin State/Province: zhejiang
Admin Postal Code: 
Admin Country: CN
Admin Phone: +86.057186696126
Admin Phone Ext: 456
Admin Fax: +86.057186696126
Admin Fax Ext: 123
Admin Email: slaaker@126.com
Registry Tech ID: C20170416C_17291120-top
Tech Name: JingTao Qiu
Tech Organization: Qiu JingTao
Tech Street: hangzhou city binjiang puyan lianzhuang second qu
Tech City: hangzhoushi
Tech State/Province: zhejiang
Tech Postal Code: 
Tech Country: CN
Tech Phone: +86.057186696126
Tech Phone Ext: 456
Tech Fax: +86.057186696126
Tech Fax Ext: 123
Tech Email: slaaker@126.com
Name Server: jamie.ns.cloudflare.com
Name Server: rick.ns.cloudflare.com
DNSSEC: unsigned
URL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/
>>> Last update of WHOIS database: 2017-11-17T13:50:22Z <<<

For more information on Whois status codes, please visit https://icann.org/epp

NOTICE: The expiration date displayed in this record is the date the
registrar's sponsorship of the domain name registration in the registry is
currently set to expire. This date does not necessarily reflect the expiration
date of the domain name registrant's agreement with the sponsoring
registrar.  Users may consult the sponsoring registrar's Whois database to
view the registrar's reported date of expiration for this registration.

TERMS OF USE: The information in the Whois database is collected through ICANN-accredited registrars. Jiangsu bangning science & technology Co., Ltd(“BANGNING”) make this information available to you and do not guarantee its accuracy or completeness. By submitting a whois query, you agree to abide by the following terms of use: you agree that you may use this data only for lawful purposes and that under no circumstances will you use this data to:  (1) to allow， enable， or otherwise support the transmission of mass unsolicited， commercial advertising or solicitations via direct mail， electronic mail， or by telephone; (2) in contravention of any applicable data and privacy protection acts; or (3) to enable high volume， automated， electronic processes that apply to BANGNING (or its computer systems). Compilation， repackaging， dissemination， or other use of the WHOIS database in its entirety， or of a substantial portion thereof， is not allowed without BANGNING prior written permission. You agree not to use electronic processes that are automated and high-volume to access or query the whois database except as reasonably necessary to register domain names or modify existing registrations. BANGNING reserves the right to restrict your access to the whois database in its sole discretion to ensure operational stability.  BANGNING may restrict or terminate your access to the whois database for failure to abide by these terms of use. BANGNING reserves the right to modify these terms at any time without prior or subsequent notification of any kind.
```