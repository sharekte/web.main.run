<template>
    <input v-if="design == 'default'"
        class="m-input-defalut"
        ref="input"
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

    <span v-else-if="design == 'haruki'"
        class="m-input-common m-input--haruki"
        :class="[
            currentValue != '' ? 'm-input--filled': ''
        ]"
    >
        <input
            class="m-input__field m-input__field--haruki"
            type="text"
            :id="inputId"
            :value="currentValue"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
        >
        <label class="m-input__label m-input__label--haruki" :for="inputId">
            <span class="m-input__label-content m-input__label-content--haruki">Haruki</span>
        </label>
    </span>

    <span v-else-if="design == 'minoru'"
        class="m-input-common m-input--minoru"
        :class="[
            currentValue != '' ? 'm-input--filled': ''
        ]"
    >
        <input
            class="m-input__field m-input__field--minoru"
            type="text"
            :id="inputId"
            :value="currentValue"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
        >
        <label class="m-input__label m-input__label--minoru" :for="inputId">
            <span class="m-input__label-content m-input__label-content--minoru">Haruki</span>
        </label>
    </span>
</template>>
<script>
    export default {
        name: "MInput",
        data() {
            return {
                currentValue: this.value,
                inputId: ""
            }
        },
        props: {
            design: {
                type: String,
                default: "default"
            },
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
        created() {
            console.log("created")
            this.inputId = Math.random().toString(36).substr(2);
        },
        computed: {
            inputType() {
                return this.type
            }
        },
        methods: {
            onInput(event) {
                const value = event.target.value;

                this.$emit("input", value);
                this.currentValue = value;
            },
            onFocus() {
                console.log("focus")
            },
            onBlur() {
                console.log("blur")
            }
        },
        watch: {
            'value'(val, oldValue) {
                this.currentValue = val;
            }
        },

    }
</script>