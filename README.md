<p><a href="https://github.com/adalenv/htmlson.js"><img src="http://i.imgur.com/s6beA4q.png" alt="N|Solid"></a></p>
<h1><a id="New_Features_4"></a>New Features!</h1>
<ul>
<li>Convert JSON to HTML</li>
</ul>
<p>You can also:</p>
<ul>
<li>Set Table headers independently  or leave it auto</li>
<li>Debug it</li>
</ul>
<h3><a id="Usage_14"></a>Usage</h3>
<p>htmlson.js requires <a href="https://jquery.com/download/">jQuery  3+</a>to run.</p>
<p>Initialize:</p>
<pre><code class="language-js">$(<span class="hljs-string">'.testTable'</span>).htmlson(obj); 
</code></pre>
<p>Set headers manually:</p>
<pre><code class="language-js">$(<span class="hljs-string">'.testTable'</span>).htmlson(obj, {
    <span class="hljs-number">0</span>:<span class="hljs-string">'Color'</span>,
    <span class="hljs-number">1</span>:<span class="hljs-string">'Price'</span>,
    <span class="hljs-number">6</span>:<span class="hljs-string">'Speed'</span>
}); 
</code></pre>
<p>Turn on debug:</p>
<pre><code class="language-js">$(<span class="hljs-string">'.testTable'</span>).htmlson(obj,<span class="hljs-string">'debug'</span>); 
<span class="hljs-comment">// or </span>
$(<span class="hljs-string">'.testTable'</span>).htmlson(obj, {
    <span class="hljs-number">0</span>:<span class="hljs-string">'Color'</span>,
    <span class="hljs-number">1</span>:<span class="hljs-string">'Price'</span>,
    <span class="hljs-number">6</span>:<span class="hljs-string">'Speed'</span>
},<span class="hljs-string">'debug'</span>); 
</code></pre>

<p><strong>Adalen VLADI 2018</strong></p>
