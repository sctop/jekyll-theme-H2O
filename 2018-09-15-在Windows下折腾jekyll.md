# Windows下Jekyll环境搭建

[TOC]

hello大家好！

本周，由于我要开发一个新的功能给我的博客，所以，我用了半个小时来按照教程安装jekyll。

安装的过程中有些小插曲，这里也是写一篇文章来给大家提个醒。

下面我们来开始吧！

## https://jekyllcn.com/
这是我这次安装的教程指导网址。讲真，这个网站的教程虽然有点老了，但还是可以用（这个网站今天起必须强制https不然会重置连接）

关于Windows下安装：https://jekyllcn.com/docs/windows/

在这个教程里，我将手把手将你怎么依照教程安装。

## 安装choco
首先，https://jekyllcn.com/docs/windows/ 这个教程（以下简称“教程”）里，有一些不是很适用于现在的。但是第一步，你必须得要安装教程中所讲的“[Chocolatey](https://chocolatey.org/install)”。如果不想进的话请看主要内容：

在cmd（命令提示符）下运行命令

```bash
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

或者在powershell下运行命令（请注意，Get-ExecutionPolicy必须不被限制）

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

在cmd或powershell运行上述命令后，等待安装完成即可。

## 安装ruby
下一个安装的是ruby。请注意，不要按教程上的指示用choco安装。在我运行`choco install ruby2.devkit`以安装devkit时，发生了错误。错误代码提示无法获取到其中的一个gem，退出码404（文件未找到）。

所以我们不能直接用这样的方法去安装ruby。我们要使用[RubyInstaller](https://rubyinstaller.org/downloads/)。RubyInstaller专门为Windows设计，兼容性强。

如果你已经进到了下载页面，你应该会看到多种版本。有附带Devkit的（WITH DEVKIT）和不附带Devkit的（WITHOUT DEVKIT）。我们要选择附带Devkit的安装包。按照官方的说法，官方说他们推荐2.4.X的，所以我们选附带Devkit下的“Ruby+Devkit 2.4.4-2”。请注意，安装包分32位（x86）和64位（x64）。

[Ruby+Devkit 2.4.4-2 32位](https://github.com/oneclick/rubyinstaller2/releases/download/rubyinstaller-2.4.4-2/rubyinstaller-devkit-2.4.4-2-x86.exe)

[Ruby+Devkit 2.4.4-2 64位](https://github.com/oneclick/rubyinstaller2/releases/download/rubyinstaller-2.4.4-2/rubyinstaller-devkit-2.4.4-2-x64.exe)

由于使用github，可能会出现无法下载的情况，今天我安装的时候还不错。笔记本的就尽量插网线吧，我昨天刚在笔记本上安了，下这个的时候遇到好几次超时，还特别慢；有线的速度能达到1MB/s，偶尔会掉到几百Kb/s，正常现象。

下载完毕之后，一路Next即可（不改安装路径是为了更好地管理，同时还能避免某些错误）。安装程序退出后，会出现一个命令提示符的界面，问你要干什么。我们输入1安装MSYS2，可能速度会较慢。安装完毕之后（命令提示符会被刷新成只有一页），关闭命令提示符即可。

安装好了ruby，下一步该[nokogiri](https://jekyllcn.com/docs/windows/#nokogiri%E8%BD%AF%E4%BB%B6%E5%8C%85%E5%AE%89%E8%A3%85)了！

## 安装nokogiri
在这时候，chocolatey就起作用了。如果你是64位的机子，教程中的那几条命令必须执行：

```bash
choco install libxml2 -Source "https://www.nuget.org/api/v2/"
```

```bash
choco install libxslt -Source "https://www.nuget.org/api/v2/"
```

```bash
choco install libiconv -Source "https://www.nuget.org/api/v2/"
```

64位的机子运行完后（32位直接跳过上述步骤），运行以下命令即可（注：全选复制所有命令后粘贴到命令提示符回车）：

```bash
gem install nokogiri --^
   --with-xml2-include=C:\Chocolatey\lib\libxml2.2.7.8.7\build\native\include^
   --with-xml2-lib=C:\Chocolatey\lib\libxml2.redist.2.7.8.7\build\native\bin\v110\x64\Release\dynamic\cdecl^
   --with-iconv-include=C:\Chocolatey\lib\libiconv.1.14.0.11\build\native\include^
   --with-iconv-lib=C:\Chocolatey\lib\libiconv.redist.1.14.0.11\build\native\bin\v110\x64\Release\dynamic\cdecl^
   --with-xslt-include=C:\Chocolatey\lib\libxslt.1.1.28.0\build\native\include^
   --with-xslt-lib=C:\Chocolatey\lib\libxslt.redist.1.1.28.0\build\native\bin\v110\x64\Release\dynamic
```

在一开始可能不会有响应，不要失去耐心，几分钟后就会有变化了。耐心等待安装完成，然后就进入最后一步啦！

## 即将完成
首先打开你的命令行，然后输入下面的命令：

```bash
gem install bundler
```

等待安装完毕。接下来cd进你的网站目录。如果cd不了的用文件管理器打开你的博客目录，然后选择“文件”选择卡，在下拉出的选择框中选择“在此处运行Powershell（管理员）”。

打开powershell之后，在你的博客根目录新建一个叫做`Gemfile`的文件，不要有后缀。

然后往里面添加以下内容：

```ruby
source 'http://rubygems.org'
gem 'github-pages'
gem 'tzinfo-data'
```

可是官方并没有说要添加`gem 'tzinfo-data'`啊！嘛，在这里呢，有个小插曲。

在我按照官方的说法后执行了下一步命令`bundle install`（注：可能会输出一大堆内容，其实这是在fetch和install软件包，而且可能会卡住），并且乐滋滋的`jekyll s`之后，它输出了一个错误信息：

```
Configuration file: F:/GitFile/sctop.github.io/_config.yml
       Deprecation: The 'gems' configuration option has been renamed to 'plugins'. Please update your config file accordingly.
jekyll 3.7.4 | Error:  No source of timezone data could be found.
Please refer to http://tzinfo.github.io/datasourcenotfound for help resolving this error.
```

上面说找不到时区数据源（No source of timezone data could be found），让我去https://tzinfo.github.io/datasourcenotfound 上查看帮助信息，于是我去看了，它实际上导向https://github.com/tzinfo/tzinfo/wiki/Resolving-TZInfo::DataSourceNotFound-Errors 页面。

在这个页面上，有段话是这样的：

> You may encounter a `TZInfo::DataSourceNotFound` exception with the message `No source of timezone data could be found` when you use TZInfo or other libraries that depend on it (for example, Active Support and Ruby on Rails). The error indicates that TZInfo was unable to find a source of time zone data on your system. This will typically occur if you are using Windows.
> 
> The simplest way to resolve this error is to install the tzinfo-data gem, either by editing your `Gemfile` or by running `gem install tzinfo-data`.
> 
> On most Unix-based systems (e.g. Linux), TZInfo is able to use the system zoneinfo directory as a source of data. However, Windows doesn't include such a directory, so the tzinfo-data gem needs to be installed instead. The tzinfo-data gem contains the same zoneinfo data, but is packaged as a set of Ruby modules.

中文的意思是：
> 当您使用TZInfo或依赖它的其他库（例如，Active Support和Ruby on Rails）时，您可能会遇到`TZInfo::DataSourceNotFound`消息异常`No source of timezone data could be found`。该错误表示TZInfo无法在您的系统上找到时区数据源。如果您使用的是Windows，通常会发生这种情况。
> 
> 解决此错误的最简单方法是通过编辑`Gemfile`或运行`gem install tzinfo-data`来安装tzinfo-data gem 。
> 
> 在大多数基于Unix的系统（例如Linux）上，TZInfo能够使用系统zoneinfo目录作为数据源。但是，Windows不包含此类目录，因此需要安装tzinfo-data gem。tzinfo-data gem包含相同的zoneinfo数据，但打包为一组Ruby模块。

简而言之，就是在基于Unix的系统上，系统有个叫做zoneinfo的时区信息目录，TZInfo默认是使用这个目录作为时区信息的。但是在Windows上没有这个目录，因此会出现这个错误。解决这个方法的原因，就是在Gemfile文件中添加`gem 'tzinfo-data'`。添加完后，再重新运行一遍`bundle install`后，`jekyll s`就不会报错了。

注意：`bundle install`安装一次后就不需要再在其它的存储库中进行同样的操作了。以后只需要在需要的存储库直接运行`jekyll s`即可。以下是一个正常运行的命令输出：

```
Configuration file: F:/GitFile/sctop.github.io/_config.yml
       Deprecation: The 'gems' configuration option has been renamed to 'plugins'. Please update your config file accordingly.
            Source: F:/GitFile/sctop.github.io
       Destination: F:/GitFile/sctop.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
     Build Warning: Layout 'page' requested in test.html does not exist.
                    done in 4.005 seconds.
  Please add the following to your Gemfile to avoid polling for changes:
    gem 'wdm', '>= 0.1.0' if Gem.win_platform?
 Auto-regeneration: enabled for 'F:/GitFile/sctop.github.io'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```

在输出中，`Configuration file`指的是`_config.yml`文件，如果这个文件不存在，那么就会输出`none`。

现在，只需要在浏览器中输入`http://127.0.0.1:4000/`即可本地访问你的博客了！若要停止，直接关闭窗口或按Ctrl+C停止。