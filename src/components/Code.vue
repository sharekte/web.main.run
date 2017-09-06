<template>
  <div class="codemirror">
    <codemirror ref="myEditor" v-model="code" :options="editorOption"></codemirror>
  </div>
</template>

<script>
import codemirror from '@/components/CodeMirror'


require('codemirror/addon/selection/active-line.js')
require('codemirror/addon/selection/mark-selection.js')

export default {
  components: {
    codemirror
  },
  data() {
    const code = ''
      return {
        code,
        editorOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          mode: 'text/x-markdown',
          theme: 'paraiso-light',
          lineWrapping: true
        }
      }
    },

  computed: {
    editor() {
      return this.$refs.myEditor.editor
    }
  },
  mounted: function () {
    console.log(this.$refs.myEditor.editor)
    console.log(this.$refs.myEditor.editor.doc)
  }

}
</script>

<style scope>
.codemirror {
  margin: 0 auto;
  width: 700px;
}
</style>
