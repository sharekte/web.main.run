<template>
    <textarea
        class="m-textarea"
        ref="textarea"
        v-bind="$attrs"
        :value="currentValue"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        :placeholder="placeholder"
        :class="[
            disabled ? 'disabled' : '',
            size ? size: '',
        ]"
    ></textarea>
</template>
<script>
export default {
    name: "MTextarea",
    data() {
        return {
            currentValue: this.value
        };
    },
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        size: String,
        placeholder: String,
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        inputType() {
            return this.type;
        }
    },
    methods: {
        onInput(event) {
            const value = event.target.value;

            this.$emit("input", value);
            this.currentValue = value;
        },
        onFocus() {
            // console.log("focus");
        },
        onBlur() {
            // console.log("blur");
        }
    },
    watch: {
        value(val, oldValue) {
            this.currentValue = val;
        }
    }
};
</script>
