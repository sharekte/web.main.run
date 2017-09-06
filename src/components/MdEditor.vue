<template>
  <div class="editor">
    <div class="editor-body">
      <div class="left">
        <codemirror ref="myEditor" v-model="code" :options="editorOption" @inputRead="refresh"></codemirror>
      </div>
      <div class="right">
        <div v-html="html">

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

export default {
  components: {
    codemirror
  },
  data() {
    return {
      code: '',
      html: '',
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
      }
    }
  },
  props: {
    content: String
  },
  watch: {
    code(val, Oldval) {
      this.html = this.md.render(val)
      this.$emit('update:content', val)
    },
    content(val, Oldval) {
      this.code = val
    }
  },
  created() {
    this.md = new MarkdownIt()
  },
  mounted () {

  },
  methods: {
    refresh: function(editor) {
      editor.refresh()
    }
  }

}
</script>

<style lang="stylus" scope>
editWith = 1200px;

.editor {
    width: editWith;
    margin: 20px auto;
}

.editor-body {
    background: #e7e9db;
    min-height: 600px;
    
    display: flex;
    
    .left {
        flex-grow: 1;
        width: (editWith / 2);
    }
    
    .right {
        flex-grow: 1;
        width: (editWith / 2);
    }
}
</style>
