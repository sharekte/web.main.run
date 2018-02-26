<template>
  <div class="quill-wrap">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
    >
    </quill-editor>
  </div>
</template>
<script>
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  import hljs from 'highlight.js'

  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  //import 'quill/dist/quill.bubble.css'

  hljs.configure({   // optionally configure hljs
        languages: ['javascript', 'ruby', 'python']
      });


  Quill.register('modules/ImageExtend', ImageExtend)
  export default {
    components: {quillEditor},
    data() {
      return {
       content: '',
        // 富文本框参数设置
        editorOption: {
          modules: {
            ImageExtend: {
              loading: true,
              name: 'img',
              action: "/",
              response: (res) => {
                return res.info
              }
            },
            syntax: true,
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        }
      }
    },
    mounted () {

    }
  }
</script>
