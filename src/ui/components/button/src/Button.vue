<template>
    <button v-if="design == 'default'"
        class="m-button-default"
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

    <button v-else-if="design == 'winona'"
        class="m-button-common-1 m-button--winona"
        ref="button"
        :data-text="$slots.default ? $slots.default[0].text : ''"
        @click="handleClick"
        :disabled="disabled"
        :class="[
            disabled ? 'disabled' : '',
            fit ? 'fit' : '',
            size ? size: '',
            special ? 'special' : ''
        ]"
    >
        <span v-if="$slots.default"><slot></slot></span>
    </button>

    <button v-else-if="design == 'ujarak'"
        class="m-button-common-1 m-button--ujarak"
        ref="button"
        :data-text="$slots.default ? $slots.default[0].text : ''"
        @click="handleClick"
        :disabled="disabled"
        :class="[
            disabled ? 'disabled' : '',
            fit ? 'fit' : '',
            size ? size: '',
            special ? 'special' : ''
        ]"
    >
        <span v-if="$slots.default"><slot></slot></span>
    </button>

    <button v-else-if="design == 'wayra'"
        class="m-button-common-2 m-button--wayra"
        ref="button"
        @click="handleClick"
        :disabled="disabled"
        :class="[
            disabled ? 'disabled' : '',
            fit ? 'fit' : '',
            size ? size: '',
            icon ? icon : 'fa-flag'
        ]"
    >
        <span v-if="$slots.default"><slot></slot></span>
    </button>

    <button v-else-if="design == 'rayen'"
        class="m-button-common-2 m-button--rayen"
        ref="button"
        @click="handleClick"
        :disabled="disabled"
        :class="[
            disabled ? 'disabled' : '',
            fit ? 'fit' : '',
            size ? size: '',
            icon ? icon : 'fa-flag'
        ]"
    >
        <span v-if="$slots.default"><slot></slot></span>
    </button>

    <button v-else-if="design == 'moema'"
        class="m-button-common-2 m-button--moema"
        ref="button"
        @click="handleClick"
        :disabled="disabled"
        :class="[
            disabled ? 'disabled' : '',
            fit ? 'fit' : '',
            size ? size: '',
            icon ? icon : 'fa-flag'
        ]"
    >
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>
<script>
    export default {
        name: "MButton",
        props: {
            design: {
                type: String,
                default: "default"
            },
            disabled: {
                type: Boolean,
                default: false
            },
            size: String,
            fit: Boolean,
            next: Boolean,
            special: Boolean,
            icon: String
        },
        computed: {
            buttonSize() {
                return this.size
            }
        },
        methods: {
            handleClick(event) {
                this.$emit("click", event);
            }
        }
    }
</script>
