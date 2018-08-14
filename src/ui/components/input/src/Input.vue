<template>
    <input
        class="m-input"
        :type="inputType"
        :value="currentValue"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        :class="[
            disabled ? 'disabled' : '',
            size ? size: '',
        ]"
    >
</template>>
<script>
    export default {
        name: "MInput",
        data() {
            return {
                currentValue: this.value
            }
        },
        props: {
            value: {
                type: [String, Number],
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            },
            size: String,
            disabled: {
                type: Boolean,
                default: false
            },
        },
        computed: {
            inputType() {
                return this.type
            }
        },
        methods: {
            onInput(event) {
                this.$emit("input", event.target.value);
            },
            onFocus() {
                console.log("focus")
            },
            onBlur() {
                console.log("blur")
            }
        }

    }
</script>