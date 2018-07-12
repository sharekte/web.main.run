<template>
    <div class="content-inner">
        <div class="content-inner-header">
            <input type="text" :value="article.title" @input="updateTitle">
        </div>
        <div class="content-inner-main">
            <div class="left">
                <code-mirror v-model="code" :options="editorOption" @inputRead="refresh"></code-mirror>
            </div>
            <div class="right">
                <div v-html="html" class="html-rander"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import CodeMirror from '@/components/edit/CodeMirror'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

require('codemirror/keymap/sublime.js')
import '@/assets/css/paraiso-light2.css'

export default {
    components: {
        CodeMirror
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
                mode: 'text/x-markdown',
                theme: 'paraiso-light2',
                lineWrapping: true,
                keyMap: "sublime",
                highlightFormatting: true,
            },
        }
    },
    watch: {
        code(val, old_val) {
            this.html = this.md.render(val)
            this.$store.commit('EDIT_UPDATE_CONTENT', val)
        },
        article(val, old_val) {
            this.code = val.content
        },
        articleId(val, old_val) {
            if (val !== undefined && val !== '') {
                this.$store.dispatch('edit_get_article', val)
            }
        }
    },
    created() {
        let md = new MarkdownIt({
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return '<pre class="hljs"><code>' +
                            hljs.highlight(lang, str, true).value +
                            '</code></pre>';
                    } catch (__) {}
                }

                return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
            }
        })

        this.md = md
    },
    methods: {
        refresh (editor) {
            editor.refresh()
        },
        updateTitle (e) {
            this.$store.commit('EDIT_UPDATE_TITLE', e.target.value)
        }
    },
    computed: mapState({
        article: state => state.edit.article,
        articleId: state => state.edit.article.id
    })
}
</script>

<style lang="stylus" scoped>
.content-inner {
    height 100%

    .content-inner-header {
        height 37px
        border-bottom 1px solid #dddddd

        input {
            background #ffffff
        }
    }
    
    .content-inner-main {
        min-height calc(100% - 37px)
        display flex
        align-items stretch
        //width calc(100%)
                    
        .left {
            width 50%
            flex-grow 1
            border-right 1px solid #dddddd
        }
        .right {
            width 50%
            flex-grow 1

            .html-rander {
                width 100%
                padding 10px
            } 
        }
    }
}
</style>

