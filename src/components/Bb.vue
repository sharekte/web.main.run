<template>
  <div class="home">
    <div class="home-bg">
      <div class="slant-left"></div>
      <div class="slant-right"></div>
      <!-- <div class="info">
        
      </div> -->
    </div>

    <div>
    <!-- <textarea id='ta' style="outline:none" contenteditable=true v-text="msg"> -->
    </textarea>
    <codemirror v-model="code" :options="editorOptions"></codemirror>
    </div>

    <button @click="submit">提交</button>



  </div>
</template>

<script>

import woofmark from 'woofmark'
import megamark from 'megamark'
import domador from 'domador'
//import hyperdown from 'hyperdown'
import { codemirror } from 'vue-codemirror'


  // require active-line.js
  require('codemirror/addon/selection/active-line.js')
  // styleSelectedText
  require('codemirror/addon/selection/mark-selection.js')
  require('codemirror/addon/search/searchcursor.js')
  // highlightSelectionMatches
  require('codemirror/addon/scroll/annotatescrollbar.js')
  require('codemirror/addon/search/matchesonscrollbar.js')
  require('codemirror/addon/search/searchcursor.js')
  require('codemirror/addon/search/match-highlighter.js')
  // keyMap
  require('codemirror/mode/clike/clike.js')
  require('codemirror/addon/edit/matchbrackets.js')
  require('codemirror/addon/comment/comment.js')
  require('codemirror/addon/dialog/dialog.js')
  require('codemirror/addon/dialog/dialog.css')
  require('codemirror/addon/search/searchcursor.js')
  require('codemirror/addon/search/search.js')
  require('codemirror/keymap/sublime.js')
  // foldGutter
  require('codemirror/addon/fold/foldgutter.css')
  require('codemirror/addon/fold/brace-fold.js')
  require('codemirror/addon/fold/comment-fold.js')
  require('codemirror/addon/fold/foldcode.js')
  require('codemirror/addon/fold/foldgutter.js')
  require('codemirror/addon/fold/indent-fold.js')
  require('codemirror/addon/fold/markdown-fold.js')
  require('codemirror/addon/fold/xml-fold.js')


var demo = 'https://raw.githubusercontent.com/bevacqua/woofmark/master/resources/demo.png';
var rfence = /(^|\s)md-lang-((?:[^\s]|$)+)/;
var rimage = /^image\/(gif|png|p?jpe?g)$/i;

export default {
  components: {
    codemirror,
  },
  data () {
    return {
      code: 'const a = 10',
      editorOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/x-markdown',
        theme: 'base16-dark',
        lineNumbers: false,
        line: true,

        // 高级配置（需要引入对应的插件包）,codemirror advanced options(You need to manually introduce the corresponding codemirror function script code)
        // sublime、emacs、vim三种键位模式，支持你的不同操作习惯
        keyMap: "sublime",
        // 按键映射，比如Ctrl键映射autocomplete，autocomplete是hint代码提示事件
        extraKeys: { "Ctrl": "autocomplete" },
        // 代码折叠
        foldGutter: false,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        // 选中文本自动高亮，及高亮方式
        styleSelectedText: true,
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        // more codemirror options...
        // 如果有hint方面的配置，也应该出现在这里
      }
    }
  },
  mounted: function () {
    //console.log("mounted")

    //this.edit = document.querySelector("#ta")

    //console.log(codemirror)

  },
  watch: {
    msg: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)

      //var p1 = document.querySelector("#ta")

      //console.log(this.getCursortPosition(this.edit))
    }
  },
  methods: {
    submit: function () {
      //console.log(this.editor.value())

      var data = {
        Title: 'title',
        //Content: a
      }

      this.$http.post('http://127.0.0.1:8000/article', data).then(response => {
        console.log(response)
      }, response => {

      })
    },
    /**
     * 获取当前光标位置
     * @param ctrl
     * @returns {number}
     */
    /*
    getCursortPosition: function (element) {
      var CaretPos = 0;
      if (document.selection) {//支持IE
        element.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -element.value.length);
        CaretPos = Sel.text.length;
      } else if (element.selectionStart || element.selectionStart == '0') {
        CaretPos = element.selectionStart;
      }
      return (CaretPos);
    },
  */
    /**
     * 设置光标位置
     * @param ctrl
     * @param pos
     */
    /*
    setCaretPosition: function (element, pos){
      if(element.setSelectionRange) {
        element.focus();
        element.setSelectionRange(pos,pos);
      } else if (element.createTextRange) {
        var range = element.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    },

    check: function() {
      var p1 = document.querySelector("#ta")

      console.log('start: %s', p1.selectionStart)
      console.log('end: %s', p1.selectionEnd)
      console.log(p1.selectionDirection)

      console.log('select: %s', this.msg.substring(this.edit.selectionStart, this.edit.selectionEnd))

      this.pos = this.getCursortPosition(this.edit)
    },
  */
    parseHTML: function (value, options) {
      if (options === void 0) { options = {markers: []} }
      return domador(value, {
        fencing: true,
        fencinglanguage: this.fences,
        markers: options.markers
      });
    },

    fences: function (el) {
      console.log(el.firstChild)
      //var match = el.firstChild.className.match(rfence);
      //console.log(match)
      //if (match) {
        //return match.pop();
      //}
    },

    parseMarkdown: function (value, options) {
      if (options === void 0) { options = {markers: []} }
      return megamark(value, {
        markers: options.markers
      })
    },

    mockXhr: function (options, done) {
      setTimeout(function uploading () {
        done(null, {
          statusCode: 200
        }, {
          title: 'Surely you should be using real XHR!',
          href: demo + '?t=' + new Date().valueOf()
        });
      }, 2500);
    },

    imageValidator: function (file) {
      return rimage.test(file.type);
    },

    onEditorCursorActivity(codemirror) {
        console.log('onEditorCursorActivity', codemirror)
      },
      onEditorReady(codemirror) {
        console.log('onEditorReady', codemirror)
      },
      onEditorFocus(codemirror) {
        console.log('onEditorFocus', codemirror)
      },
      onEditorBlur(codemirror) {
        console.log('onEditorBlur', codemirror)
      }

  }
}
</script>
<style scoped>
.home {
  min-height: 1600px;
  -background: #ff6600;
  position: relative;
  overflow: hidden;
}
  .home-bg {  
    position: relative;
    width: 100%;
    height: 550px;
    background-image: url(../assets/images/home-bg.jpg);
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    z-index: -1;
  }
    .slant-left {
      width: 101%;
      height: 200px;
      position: absolute;
      bottom: -12%;
      right: 48%;
      transform: rotate(6deg);
      background: #FFF;
    }
    .slant-right {
      width: 101%;
      height: 200px;
      position: absolute;
      bottom: -12%;
      left: 48%;
      transform: rotate(-6deg);
      background: #FFF;
    }
    .info {
      position: relative;
      max-width: 800px;
      height: 200px;
      background: #ff6600;
      top: 35%;
      left: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
    }

#ta {
  font-family: Consolas, monaco, monospace;
}
</style>
