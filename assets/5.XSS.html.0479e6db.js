const t=JSON.parse(`{"key":"v-7866bb26","path":"/posts/Web%E5%AE%89%E5%85%A8/5.XSS.html","title":"XSS","lang":"zh-CN","frontmatter":{"icon":"edit","date":"2023-03-19T00:00:00.000Z","author":"xywtbb","order":1,"category":["安全"],"description":"定义：XSS全称跨站点脚本攻击。跨站点脚本攻击是一种注射型攻击，攻击者在可信的网页中嵌入恶意代码，用户访问可信网页时触发XSS而被攻击。 原理：通过用户端注入可执行脚本，变量接受数据的时候，数据可以写成JavaScript脚本代码，服务器对用户提交的数据过滤不严，将输入的数据进行回显（输出），从而造成攻击。由于数据是JS脚本代码，是可以被浏览器识别并执...","head":[["meta",{"property":"og:url","content":"https://xywtbb.github.io/posts/Web%E5%AE%89%E5%85%A8/5.XSS.html"}],["meta",{"property":"og:site_name","content":"xywtbb's Blog"}],["meta",{"property":"og:title","content":"XSS"}],["meta",{"property":"og:description","content":"定义：XSS全称跨站点脚本攻击。跨站点脚本攻击是一种注射型攻击，攻击者在可信的网页中嵌入恶意代码，用户访问可信网页时触发XSS而被攻击。 原理：通过用户端注入可执行脚本，变量接受数据的时候，数据可以写成JavaScript脚本代码，服务器对用户提交的数据过滤不严，将输入的数据进行回显（输出），从而造成攻击。由于数据是JS脚本代码，是可以被浏览器识别并执..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-03-22T13:03:30.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"xywtbb"}],["meta",{"property":"article:published_time","content":"2023-03-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-22T13:03:30.000Z"}]]},"excerpt":"","headers":[{"level":3,"title":"Cookie和Session","slug":"cookie和session","link":"#cookie和session","children":[]},{"level":3,"title":"Http Only","slug":"http-only","link":"#http-only","children":[]},{"level":3,"title":"防御","slug":"防御","link":"#防御","children":[]},{"level":3,"title":"常见WAF绕过","slug":"常见waf绕过","link":"#常见waf绕过","children":[]}],"git":{"createdTime":1679208708000,"updatedTime":1679490210000,"contributors":[{"name":"xywtbb","email":"1104274383@qq.com","commits":3}]},"readingTime":{"minutes":4.18,"words":1254},"autoDesc":true,"localizedDate":"2023年3月19日","filePathRelative":"posts/Web安全/5.XSS.md"}`);export{t as data};