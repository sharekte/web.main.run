<template>
  <div class="home">
    <div class="home-bg">
      <div class="slant-left"></div>
      <div class="slant-right"></div>
      <!-- <div class="info">
        
      </div> -->
    </div>

    <div>
    <textarea id='ta' style="outline:none" contenteditable=true v-text="msg">
    </textarea>
    </div>



  </div>
</template>

<script>

import woofmark from 'woofmark'
import megamark from 'megamark'
import domador from 'domador'

var demo = 'https://raw.githubusercontent.com/bevacqua/woofmark/master/resources/demo.png';
var rfence = /(^|\s)md-lang-((?:[^\s]|$)+)/;
var rimage = /^image\/(gif|png|p?jpe?g)$/i;

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      edit: {},
    }
  },
  mounted: function () {
    console.log("mounted")

    this.edit = document.querySelector("#ta")

    this.setCaretPosition(this.edit, 0)

    console.log(this.edit)

    console.log(this.edit.parentElement.children.length)

    woofmark(this.edit, {
      parseMarkdown: megamark,
      parseHTML: domador,
      //fencing: true,
    });


  },
  watch: {
    msg: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)

      //var p1 = document.querySelector("#ta")

      console.log(this.getCursortPosition(this.edit))
    }
  },
  methods: {
    /**
     * 获取当前光标位置
     * @param ctrl
     * @returns {number}
     */
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

    /**
     * 设置光标位置
     * @param ctrl
     * @param pos
     */
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

    /*
    parseHTML: function (value, options) {
      return domador(value, {
        fencing: true,
        fencinglanguage: fences,
        markers: options.markers
      });
    },

    fences: function (el) {
      var match = el.firstChild.className.match(rfence);
      if (match) {
        return match.pop();
      }
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
    }
    */

  }
}
</script>
<style scoped>
.home {
  height: 1600px;
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
