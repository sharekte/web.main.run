<template>
    <button class="m-button"
            ref="button"
            @click="handleClick"
            :disabled="disabled"
            :class="[
                disabled ? 'disabled' : '',
                fit ? 'fit' : '',
                size ? size: '',
                next ? 'next' : '',
                special ? 'special' : ''
            ]"

    >
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>
<script>
export default {
    name: "MButton",
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        size: String,
        fit: Boolean,
        next: Boolean,
        special: Boolean
    },
    computed: {
        buttonSize() {
            return this.size;
        }
    },
    methods: {
        handleClick(event) {
            this.$emit("click", event);
        }
    }
};
</script>
