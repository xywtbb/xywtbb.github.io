import{_ as e,V as n,W as i,Z as l}from"./framework.0d0b2430.js";const s="/images/Web安全/PHP伪协议.png",a={},d=l(`<h1 id="文件包含漏洞" tabindex="-1"><a class="header-anchor" href="#文件包含漏洞" aria-hidden="true">#</a> 文件包含漏洞</h1><h2 id="文件包含漏洞-1" tabindex="-1"><a class="header-anchor" href="#文件包含漏洞-1" aria-hidden="true">#</a> 文件包含漏洞</h2><p><strong>定义：</strong></p><p>和SQL注入等攻击方式一样，文件包含漏洞也是一种注入型漏洞，其本质就是输入一段用户能够控制的脚本或者代码，并让服务端执行。</p><p>什么叫包含呢？以PHP为例，我们常常把可重复使用的函数写入到单个文件中，在使用该函数时，直接调用此文件，而无需再次编写函数，这一过程叫做包含。PHP为例，包含函数有：include()、require()、include_once()、require_once()</p><p><strong>漏洞成因：</strong></p><p>文件包含函数加载的参数没有经过过滤或者严格的定义，可以被用户控制，包含其他恶意文件，导致了执行了非预期的代码。</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code>网页代码:
<span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
	<span class="token keyword">include</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;test&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token delimiter important">?&gt;</span></span>

创建一个phpinfo.php页面
<span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
	<span class="token function">phpinfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token delimiter important">?&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更改phpinfo.php文件后缀为txt、jpg等后依然可以进行访问。可以看出include()函数并不在意被包含的文件是什么类型，只要有php代码，都会被解析出来。</p><p><strong>文件包含各个脚本代码：</strong></p><p><strong>ASP，PHP，JSP，ASPX等：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!--#include file=&quot;1.asp&quot; --&gt;

&lt;!--#include file=&quot;top.aspx&quot; --&gt;

&lt;c:import url=&quot;http://thief.one/1.jsp&quot;&gt;

&lt;jsp:include page=&quot;head.jsp&quot;/&gt;

&lt;%@ include file=&quot;head.jsp&quot;%&gt;

&lt;?php Include(&#39;test.php&#39;)?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="本地包含-lfi" tabindex="-1"><a class="header-anchor" href="#本地包含-lfi" aria-hidden="true">#</a> 本地包含（LFI）</h4><p>本地包含条件：</p><ol><li><p>allow_url_fopen=On (allow_url_fopen:默认值是ON。允许url里的封装协议访问文件；)</p></li><li><p>用户可以动态控制变量</p></li></ol><h4 id="远程包含-rfi" tabindex="-1"><a class="header-anchor" href="#远程包含-rfi" aria-hidden="true">#</a> 远程包含（RFI）</h4><p>远程包含条件：</p><ol><li>allow_url_include=On (allow_url_include:默认值是OFF。不允许包含url里的封装协议包含文件；)</li><li>用户可以动态控制变量</li></ol><p><strong>防御：</strong></p><p>在php中，文件包含需要配置 allow_url_include=On(远程文件包含)、allow_url_fopen=On(本地文件包含) 。所以，我们可以将其关闭，这样就可以杜绝文件包含漏洞了。但是，某些情况下，不能将其关闭，必须进行包含的话，我们可以使用白名单过滤的方法，只能包含我们指定的文件。这样，就可以杜绝文件包含漏洞了。</p><p><strong>伪协议：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>file:// — 访问本地文件系统
http:// — 访问 HTTP(s) 网址
ftp:// — 访问 FTP(s) URLs
php:// — 访问各个输入/输出流（I/O streams）
zlib:// — 压缩流
data:// — 数据（RFC 2397）
glob:// — 查找匹配的文件路径模式
phar:// — PHP 归档
ssh2:// — Secure Shell 2
rar:// — RAR
ogg:// — 音频流
expect:// — 处理交互式的流
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+s+`" alt="PHP伪协议" loading="lazy"></p><hr><h3 id="文件读取漏洞" tabindex="-1"><a class="header-anchor" href="#文件读取漏洞" aria-hidden="true">#</a> 文件读取漏洞</h3><p><strong>介绍：</strong></p><p>任意文件读取是属于文件操作漏洞的一种，一般任意文件读取漏洞可以读取配置信息甚至系统重要文件。严重的话，就可能导致SSRF，进而漫游至内网。</p><p><strong>原理：</strong></p><ol><li><p>存在读取文件的函数</p></li><li><p>读取文件的路径用户可控，且为校验或校验不严</p></li><li><p>输出了文件内容</p></li></ol><p><strong>文件读取函数：</strong></p><p>readfile()、file_get_contents()、fopen()中，$filename没有经过校验或者校验不合格，用户可控制变量读取任意文件，如/etc/passwd、./index.php、/config.ini</p><h3 id="文件下载漏洞" tabindex="-1"><a class="header-anchor" href="#文件下载漏洞" aria-hidden="true">#</a> 文件下载漏洞</h3><p><strong>介绍：</strong></p><p>一些网站由于业务需求，往往需要提供文件查看或文件下载功能，但若对用户查看或下载的文件不做限制，则恶意用户就能够查看或下载任意敏感文件，这就是目录遍历与下载漏洞。</p><p><strong>原理：</strong></p><ol><li><p>存在读取文件的函数</p></li><li><p>读取文件的路径用户可控，且为校验或校验不严</p></li><li><p>输出了文件内容</p></li><li><p>一个正常的网站，存在一个下载文件的功能，同时还会从浏览器接收文件名字</p></li></ol><p><strong>漏洞发现</strong>（网站URL中存在下载参数，并且未进行过滤../../../字符，且输出了文件内容）</p><ol><li><p><code>Google.search</code></p><p>利用<code>inurl:&quot;readfile.php?file=&quot;</code></p></li><li><p>从链接上看，形如：</p><p><code>download.php?path=</code></p><p><code>download.php?file=</code></p><p><code>data.php?file=</code></p><p><code>readfile.php?file=</code></p></li><li><p>从参数名看，形如： <code>&amp;Realpath=</code><code>&amp;FilePath=</code><code>&amp;url=</code></p></li><li><p><code> index.php?f=../index.php</code></p><p><code>index.php?f=../../../../../../etc/passwd</code></p></li></ol><p>文件被解析，则是文件包含漏洞；显示源代码，则是文件读取漏洞；提示文件下载，则是文件下载漏洞。</p><p>WEB-INF是Java的WEB应用的安全目录。如果想在页面中直接访问其中的文件，必须通过web.xml文件对要访问的文件进行相应映射才能访问。</p><p>WEB-INF主要包含以下文件或目录：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/WEB-INF/web.xml：Web应用程序配置文件，描述了 servlet 和其他的应用组件配置及命名规则。

/WEB-INF/classes/：含了站点所有用的 class 文件，包括 servlet class 和非servlet class，他们不能包含在 .jar文件中

/WEB-INF/lib/：存放web应用需要的各种JAR文件，放置仅在这个应用中要求使用的jar文件,如数据库驱动jar文件

/WEB-INF/src/：源码目录，按照包名结构放置各个java文件。

/WEB-INF/database.properties：数据库配置文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>文件下载的两种方式：</strong></p><ol><li>直接下载：</li></ol><div class="language-HTML line-numbers-mode" data-ext="HTML"><pre class="language-HTML"><code>&lt;a href=&quot;http://www.a.com/xxx.rar&quot;&gt;下载&lt;/a&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>增加header头</li></ol><div class="language-PHP line-numbers-mode" data-ext="PHP"><pre class="language-PHP"><code>&lt;?php
$filename = $_GET[&#39;filename&#39;];
echo&#39;&lt;h1&gt;讲开始下载文件！&lt;/h1&gt;&lt;br/&gt;&lt;br/&gt;&#39;;
echo file_get_contents($filename);
header(&#39;Content-Type:image/jpeg&#39;);
header(&#39;Content-Disposition:attachment;filename=&#39;.$filename);
header(&#39;Content-Lengh:&#39;.filesize($filename));
?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>防护方案：</strong></p><ol><li>过滤../，使用户在URL上不能回溯上级目录；</li><li>正则严格判断用户输入参数的格式；</li><li><code>php.ini</code>配置<code>open_basedir</code>限定文件访问范围；</li><li>使用白名单；</li><li>文件映射、存储和应用分离。</li></ol>`,49),p=[d];function t(r,o){return n(),i("div",null,p)}const u=e(a,[["render",t],["__file","8.文件包含.html.vue"]]);export{u as default};
