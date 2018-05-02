<template>
    <div class="content-inner">
        <div class="left">
            <code-mirror v-model="code" :options="editorOption" @inputRead="refresh"></code-mirror>
        </div>
        <div class="right">
            <div v-html="html" class="html-rander"></div>
        </div>
    </div>
</template>
<script>
import CodeMirror from '@/components/edit/CodeMirror'
import MarkdownIt from 'markdown-it'
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
        }
    },
    created() {
        this.md = new MarkdownIt()
    },
    methods: {
        refresh (editor) {
            editor.refresh()
        }
    }
}
</script>

<style lang="stylus" scoped>
.content-inner {
    min-height 100%
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
            white-space: normal;
            word-wrap: break-word;
            word-break: break-all;
        } 
    }
}
</style>

