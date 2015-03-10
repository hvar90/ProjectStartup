# -*- encoding: utf-8 -*-
"""
    Yet another Markdown subset parser.
    Translated from asyncboard.dmark (https://github.com/pyos/asyncboard/)
    using dg version 1.

    Currently supported syntax:
        * paragraphs (as in Github Flavoured Markdown, they span
            until the next newline)
        * lists (both unordered and ordered)
        * blockquotes (they cannot be nested, though)
        * code blocks (syntax highlighting is supported, too)
        * headings and subheadings using the # notation
        * inline links
"""

import re
from django.conf import settings

from xml.sax.saxutils import escape, unescape
from collections import deque

try:
    import pygments.lexers
    import pygments.formatters
except ImportError:
    pygments = None
    
 
# The regex which matches plain-text links.
# Stolen^W Borrowed from tornado.escape.
# https://github.com/facebook/tornado/blob/master/tornado/escape.py
_URL_RE = re.compile(r'''
    \b((?:([\w-]+):(/{1,3})|www[.])(?:(?:(?:[^\s&()]|&amp;|&quot;)*
    (?:[^!"#$%&'()*+,.:;<=>?@\[\]^`{|}~\s]))|
    (?:\((?:[^\s&()]|&amp;|&quot;)*\)))+)
''', re.X)


# Supported video and audio hosting sites.
_VIDEOS = {
    re.compile(
        r'(?:https?://)?(?:www\.)?youtube\.com/'
        r'watch\?v=([a-z0-9_-]+)[&=\d\w]?', re.I):
        (
           
            '<a   href="javascript:activateVideo(\'{0}\');" width="560" height="315" class="youtube-player" id="{0}" >'
            '<span class="mediaPlay-container">'
            '<img width="560" height="315"  class="youtube-player" style="cursor: pointer;"'
            'src="http://img.youtube.com/vi/{0}/0.jpg"' 
            '/>'
            '<img class="mediaPlayIcon" src="https://s3-us-west-2.amazonaws.com/filesocialchan1/media/image/play.png">'
            '</span>'
            '</a>'
        ),
    re.compile(r'http://rutube\.ru/tracks/\d+.html\?v=([a-z0-9]{32})', re.I):
        (
            '<object width="320" height="262"><param name="movie"'
            ' value="http&#58;//video.rutube.ru/{0}"></param>'
            '<param name="wmode" value="window"></param>'
            '<param name="allowfullscreen" value="true"></param>'
            '<embed src="http&#58;//video.rutube.ru/{0}'
            'type="application/x-shockwave-flash" wmode="window" '
            'width="320" height="262"'
            'allowfullscreen="true" ></embed></object>'
        ),
    re.compile(r'http://(?:www\.)?vimeo\.com/(\d+)/?', re.I):
        (
            '<iframe src="http&#58;//player.vimeo.com/video/{}"'
            ' width="533" height="300" frameborder="0"></iframe>'
        ),
    re.compile(
        r'http://(?:vkontakte\.ru|vk\.com)/(video_ext\.php\?oid=\d+&id=\d+'
        r'&hash=[a-f\d]+(?:&hd=\d)?)', re.I):
        (
            '<iframe src="http&#58;//vkontakte.ru/{0}" width="607" '
            'height="360" frameborder="0"></iframe>'
        ),
}


class DMark(object):
    # Parser states:
    #     empty, paragraph, unordered list, ordered list,
    #     code, quote, heading, subheading
    NOP, P, UL, OL, CODE, QUOTE, H1, H2 = range(8)
    # Events:
    #     entered state, beginning-of-line, end-of-line, left state
    ENTERED, BOL, EOL, LEFT = range(4)

    # Actions to perform on events.
    statemap = {
        # empty: do nothing
        NOP: ("", "", "", ""),
        # paragraph: wrap lines in <p />
        P: ("", "<p>", "</p>", ""),

        # unordered list: wrap block in <ul /> and lines in <li />
        UL: ("<ul>", "<li>", "</li>", "</ul>"),
        # ordered list: same as for UL, except this uses the <ol /> tag
        OL: ("<ol>", "<li>", "</li>", "</ol>"),

        # quote: similar to paragraph, but wraps blocks in <blockquote />
        QUOTE: ("<blockquote>", "<p>", "</p>", "</blockquote>"),

        # code: preserve whitespace
        CODE: ("<pre>", "", "\n", "</pre>"),

        # heading, subheading: wrap lines in <h1 /> and <h2 />, respectively
        H1: ("", "<h1>", "</h1>", ""),
        H2: ("", "<h2>", "</h2>", "")     
    }

    # Markdown-like tags for emphasis.
    tags = {         
        "**": "strong",  # **strong emphasis**
        "*":  "em",      # *emphasis*
        "--": "del",     # --strikethrough--
        "%%": 'span class="spoiler"'  # %%hidden text%%       
    }

    def __init__(self):
        self.youtube_limit = 1

    def open(self, tag):
        """Construct an opening tag."""
        return "<{}> ".format(self.tags[tag])

    def close(self, tag):
        """Construct a closing tag."""
        return "</{}>".format(self.tags[tag].split(" ", 1)[0])

    def linkify(self, line):        
        
        # http://link/ and www.link
       
        def _19ab9f(match):
            url, proto = match.groups()[:2]   
          
            for char in ("*", "-", "%", '"'):
                urlAux = url.replace(char, "&#{};".format(ord(char)))
            href = urlAux if proto else "http://" + urlAux                       
            if not re.compile("(?:www\.)?youtube\.com").search(url) :
                return '<a target="_blank" href="{}">{}</a>'.format(href, urlAux) 
            else :     
				return  url             
            
        line = re.sub(_URL_RE, _19ab9f, line)
       
       
        """Transform everything that looks like a link into anchors."""
        # Youtube videos, up to a maximum of 1 per message.
        def _19ab14(match):
            if self.youtube_limit > 0:
                self.youtube_limit -= 1
                return _VIDEOS[regex].format(*match.groups())
            return match.group()
        for regex in _VIDEOS:
            line = regex.sub(_19ab14, line, 1)
     
  
        
        # >>post and >>/board/post
        return re.sub(
            r"&gt;&gt;(|/\w+/)(\d+)",
            r'<a class="postlink" href="\1#post\2">&gt;&gt;\1\2</a>', line
        )
        
    def emotify(self, line):
		
        EMOTICONS= u"(?<!https)(?<!http)(\?-\)|:-\)|(?<!&gt;):\)|:o\)|:c\)|:\^\)|:-D|:-\(|(?<!&gt;):\)|:-9|;-\)|:-P|:-p|:-b|:-O|:-/|:-X|:-#|B-\)|8-\)|:-\\\\|:\]|:&gt;|=\]|8\)|:\}|:D|8D|XD|xD|(?<!&gt;):\(|:&lt;|:\[|:\{|:-Þ|:Þ|(?<!&gt;);\)|;\]|;D|:P|:p|=P|=p|:b|:O|8O|:/|=/|:S|:#|:X|B\)|O:\))"
        EMOTICONSPINK= r"&lt;3"
        EMOTICONS_RED= r";\(|&gt;:\)|&gt;;\)|&gt;:\("
        EMOTICONS_NOROTATE= r"O_o|O_O|o_o|0_o|T_T|\^_\^"		 
          
        def emoticonspinky(match): 
             return '<span  class="css-emoticon pink-emoticon counter-rotated">'+match.group(0)+'</span>' 
        def emoticonsred(match): 
             return '<span  class="css-emoticon red-emoticon ">'+match.group(0)+'</span>' 
        def emoticonsnorotate(match): 
             return '<span  class="css-emoticon no-rotate">'+match.group(0)+'</span>'
        def emoticons(match): 
             return '<span  class="css-emoticon">'+match.group(0)+'</span>'     
      
       
        line = re.sub(EMOTICONSPINK, emoticonspinky,line)
        line = re.sub(EMOTICONS_RED, emoticonsred,line)
        line = re.sub(EMOTICONS_NOROTATE, emoticonsnorotate,line)
        line = re.sub(EMOTICONS, emoticons,line)
        return line
        
    def emotify_twitter(self, line):		
      
        EMOTICONS= r":(\w+):"          
     
        def emoticons(match): 
             name= match.group(0).replace(":", "".format(ord(":")))
             return '<IMG class="emoticon" WIDTH="25" HEIGHT="25" SRC="'+settings.STATIC_URL+'emoji/'+name+'.png" >'      
  
        line = re.sub(EMOTICONS, emoticons,line)
        return line
              
      

    def line(self, line):
        """Parse a single line of text."""
        line = escape(line)
        line = self.linkify(line)
        line = self.emotify_twitter(line)
        stack = deque()

        def _19b53c(match):
            tag = match.group()
            if tag not in stack:
                # Got an opening tag.
                stack.append(tag)
                return self.open(tag)

            def _19ba4b():
                # Make sure all tags are closed properly.
                while stack[-1] != tag:
                    yield self.close(stack.pop())
                yield self.close(stack.pop())
            return "".join(_19ba4b())
        line = re.sub(r"\*\*|\*|--|%%", _19b53c, line)

        return line + "".join(map(self.close, reversed(stack)))

    def tokenize(self, text):
        """
            Generate a stream of string tokens mixed with parser opcodes
            based on some input text.
        """
        for line in text.split("\n"):
            if line.startswith("    "):
                # code = "    ", anything
                yield self.CODE
                yield escape(line[4:])
                continue
            

            line = line.strip()
            if not line:
                # paragraph break = whitespace*
                yield self.NOP
                continue

            code, pos = (
                # subheading = "!", anything
                (self.H2, 2)    if line.startswith("##") else
                # heading = "#", anything
                (self.H1, 1)    if line.startswith("#")  else
                # quote = ">", not ">", anything
                (self.QUOTE, 1) if re.match(r">(?!>)", line) else
                # unordered list item = "* ", anything
                (self.UL, 2)    if line.startswith("* ") else
                # ordered list item = number, ". ", anything
                (self.OL, line.find(" ") + 1) if re.match(r"\d+\. ", line) else
                # paragraph = anything
                (self.P, 0)
            )
            yield code
            yield self.line(line[pos:])
        # Reset the state to close every tag left.
        yield self.NOP

    def parse(self, text):
        """Parse a chunk of dmark-formatted text."""
        state = self.NOP
        for token in self.tokenize(text):
            if isinstance(token, int):
                # Got an event.  This means there was an end of line.
                yield self.statemap[state][self.EOL]
                if state != token:
                    # The state has changed.
                    yield self.statemap[state][self.LEFT]
                    yield self.statemap[token][self.ENTERED]
                yield self.statemap[token][self.BOL]
                # Switch into the new state.
                state = token
            else:
                # Got a string token.
                yield token

    def posttransform(self, text):
        """Apply some transformations to the HTML-formatted text."""
        # More precisely, highlight every piece of code in it.
        if not pygments:
            # Nothing to highlight the code with, abort.
            return text

        def _19c469(match):
            code = unescape(match.group(2))
            lexer = (match.group(1) or "").strip()
            try:
                lexer = pygments.lexers.get_lexer_by_name(lexer)
            except Exception:
                # Invalid language name.
                lexer = pygments.lexers.guess_lexer(code)

            formatter = pygments.formatters.HtmlFormatter()
            return pygments.highlight(code, lexer, formatter)
        # If the first line of the code block starts with :::,
        # treat this as language name declaration.
        return re.sub(r"<pre>(?::::(.+?)\n)?(.*?)</pre>", _19c469,
                      text, 0, re.S)

    def convert(self, text):
        """Transform the text into HTML and then apply some fixes to it."""       
        text = u"".join(self.parse(text))       
        return self.posttransform(text)

if __name__ == "__main__":
    from sys import stdin    
    print(DMark().convert(stdin.read()))
