<template>
    <button v-if="design == 'default'"
        class="m-button-default"
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
        class="m-button-common-1 button--winona"
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
        class="m-button-common-1 button--ujarak"
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
        class="m-button-common-2 button--wayra"
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
        class="m-button-common-2 button--rayen"
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
        class="m-button-common-2 button--moema"
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
            // buttonDisabled() {
            //     return this.disabled
            // }
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
