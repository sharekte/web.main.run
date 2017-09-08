<template>
  <div class="editor" :style="{width: editWith + 'px'}">
    <div class="editor-body">
      <div class="left" v-if="markdown" :style="{width: editLeftWith + 'px'}">
        <codemirror ref="myEditor" v-model="code" :options="editorOption" @inputRead="refresh"></codemirror>
      </div>
      <div class="right" v-if="preview" :style="{width: editRightWith + 'px'}">
        <div v-html="html" class="html">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import codemirror from '@/components/CodeMirror'
import MarkdownIt from 'markdown-it'

//require('codemirror/addon/selection/active-line.js')
require('codemirror/keymap/sublime.js')

import '@/assets/css/paraiso-light2.css'

import HtmlDiff from '@/lib/htmldiff.js'

export default {
  components: {
    codemirror
  },
  data() {
    return {
      code: '',
      html: '',
      preHtml: '',
      editorOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/x-gfm',
        theme: 'paraiso-light2',
        lineWrapping: true,
        keyMap: "sublime",
        highlightFormatting: true,
      },
      editWith: 900,
      editLeftWith: 900,
      editRightWith: 900
    }
  },
  props: {
    content: String,
    markdown: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: true
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  computed: {

  },
  watch: {
    code(val, Oldval) {

      if (this.preHtml === '') {
        this.preHtml = this.md.render(val)
      }

      if (this.isEdit) {
        this.html = HtmlDiff.compare(this.preHtml, this.md.render(val))
      } else {
        this.html = this.md.render(val)
      }

      this.$emit('update:content', val)
    },
    content(val, Oldval) {
      this.code = val
    },
    markdown(val, Oldval) {
      this.aaa()
    },
    preview(val, Oldval) {
      this.aaa()
    }
  },
  created() {
    this.md = new MarkdownIt()
  },
  mounted () {
    this.aaa()
  },
  methods: {
    refresh (editor) {
      editor.refresh()
    },
    aaa () {
      if (this.markdown && this.preview) {
        this.editWith = 1200
        this.editLeftWith = 600
        this.editRightWith = 600
      } else {
        this.editWith = 900
        this.editLeftWith = 900
        this.editRightWith = 900
      }
    }
  }

}
</script>

<style lang="stylus" scope>

.editor {
    margin: 20px auto;
}

.editor-body {
    //background: #e7e9db;
    min-height: 600px;
    
    display: flex;
    
    .left {
      flex-grow: 1;
      padding: 10px 10px 10px 0;
    }
    
    .right {
      flex-grow: 1;
      padding: 10px;

      .html {
        
      }
    }
}
</style>
