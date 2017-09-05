<template>
  <div class="view">
    <div class="function">
      <ul class="actions align-right">
        <li><button class="special small">编辑</button></li>
      </ul>
    </div>
    <article>
        <h3>{{article.Title}}</h3>
        <!-- <div class="content" v-html="toHtml(article.Release.Content)"></div> -->
        <div>
          <textarea id='edit'>
          </textarea>
        </div>
    </article>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'

import woofmark from 'woofmark'
import megamark from 'megamark'
import domador from 'domador'

export default {
  data () {
    return {
      editor: {},
      editElement: {},
      minHeight: 90,
      maxHeight: 0,
      extra: 20,
    }
  },
  computed: {
    article() {
      return this.$store.getters.getArticleRelease
    }
  },
  watch: {
    article(val, oldval) {
      this.editor.value(val.Release.Content)
      this.editor.parseHTML()
      this.editor.parseMarkdown()

      this.change()
    }
  },
  created() {
    this.fecthDate()
  },
  mounted () {
    this.editElement = document.querySelector("#edit")

    this.editor = woofmark(this.editElement, {
      parseMarkdown: this.parseMarkdown,
      parseHTML: this.parseHTML,
      fencing: true,
      html: false
    });

    //this.change()

    //this.autoTextarea(ta, 20)

    this.addEvent('propertychange', this.change);
    this.addEvent('input', this.change);
    this.addEvent('focus', this.change);
    this.change();
  },
  methods: {
    fecthDate() {
      this.$store.dispatch('get_article_release', this.$route.params)
    },
    toHtml(val) {
      var md = new MarkdownIt()

      return md.render('# markdown-it rulezz!')
    },
    parseHTML: function (value, options) {
      if (options === void 0) { options = {markers: []} }
      return domador(value, {
        fencing: true,
        fencinglanguage: this.fences,
        markers: options.markers
      });
    },
    fences: function (el) {
      if (el.firstChild.className !== void 0) {
        var match = el.firstChild.className.match(rfence);
        if (match) {
          return match.pop();
        }
      }
    },
    parseMarkdown: function (value, options) {
      if (options === void 0) { options = {markers: []} }
      return megamark(value, {
        markers: options.markers
      })
    },

    change: function () {
      var scrollTop, height, padding = 0, style = this.editElement.style
      if (this.editElement._length === this.editElement.value.length) {
        return
      }

      var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window
      var isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera')

      if (!isFirefox && !isOpera) {
        padding = parseInt(this.getStyle('paddingTop')) + parseInt(this.getStyle('paddingBottom'))
      }

      this.minHeight = parseFloat(this.getStyle('height'));

      scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

      this.editElement.height = this.minHeight + 'px'

      if (this.editElement.scrollHeight > this.minHeight) {
        if (this.maxHeight && this.editElement.scrollHeight > this.maxHeight) {
          height = this.maxHeight - padding
          style.overflowY = 'auto'
        } else {
          height = this.editElement.scrollHeight - padding
          style.overflowY = 'hidden'
        }

        style.height = height + this.extra + 'px'

        scrollTop += parseInt(style.height) - this.editElement.currHeight
        document.body.scrollTop = scrollTop
        document.documentElement.scrollTop = scrollTop;
        this.editElement.currHeight = parseInt(style.height)
      }
    },

    getStyle: function (name) {
      if (this.editElement.currentStyle) {
        var val = this.editElement.currentStyle[name]

        if (name === 'height' && val.search(/px/i) !== 1) {
          var rect = this.editElement.getBoundingClientRect()

          return rect.bottom - rect.top - parseFloat(this.getStyle('paddingTop')) - parseFloat(this.getStyle('paddingBottom')) + 'px'
        }

        return val
      } else {
        return getComputedStyle(this.editElement, null)[name]
      }
    },

    addEvent: function (type, callback) {
      if (this.editElement.addEventListener) {
        this.editElement.addEventListener(type, callback, false)
      } else {
        this.editElement.attachEvent('on' + type, callback)
      }
    }
    
  }
}
</script>

<style lang="stylus" scoped>
.view {
  margin: 20px auto;
  width: 700px;
}

#edit {
    overflow: hidden;
    resize: none;
    height: 90px;
    font-size: 1.6rem;
    line-height: 1.7;
    background: #FFF;
    padding: 0;
}
</style>
