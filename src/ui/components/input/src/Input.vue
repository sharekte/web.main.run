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

    <span v-else-if="design == 'yoko'"
        class="m-input-common"
        :class="[
            currentValue != '' ? 'm-input--filled': ''
        ]"
    >
        <input
            class="m-input__field m-input__field--yoko"
            type="text"
            :id="inputId"
            :value="currentValue"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
        >
        <label class="m-input__label m-input__label--yoko" :for="inputId">
            <span class="m-input__label-content m-input__label-content--yoko">yoko</span>
        </label>
    </span>
    <!-- <span v-else-if="design == 'yoko'"
        class="input input--minoru">
        <input class="input__field input__field--yoko" type="text" id="input-16" />
        <label class="input__label input__label--yoko" for="input-16">
            <span class="input__label-content input__label-content--yoko">Street</span>
        </label>     
    </span> -->
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

<style>


/*
.m-input__field--yoko {
    z-index: 10;
    width: 100%;
    background: transparent;
    color: #f5f5f5;
    opacity: 0;
    -webkit-transition: opacity 0.3s;
    transition: opacity 0.3s;
}

.m-input__label--yoko {
    position: relative;
    width: 100%;
    color: #b04b40;
    text-align: left;
}

.m-input__label--yoko::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 100%;
    height: 4em;
    background: #c5564a;
    -webkit-transform: perspective(1000px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(1000px) rotate3d(1, 0, 0, 90deg);
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    -webkit-transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
}

.m-input__label--yoko::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.25em;
    background: #ad473c;
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
    -webkit-transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
}

.m-input__label-content--yoko {
    padding: 0.75em 0;
}

.m-input__field--yoko:focus,
.m-input--filled .input__field--yoko {
    opacity: 1;
    -webkit-transition-delay: 0.3s;
    transition-delay: 0.3s;
}

.m-input__field--yoko:focus + .m-input__label--yoko::before,
.m-input--filled .m-input__label--yoko::before {
    -webkit-transform: perspective(1000px) rotate3d(1, 0, 0, 0deg);
    transform: perspective(1000px) rotate3d(1, 0, 0, 0deg);
}

.m-input__field--yoko:focus + .m-input__label--yoko,
.m-input--filled .m-input__label--yoko {
    pointer-events: none;
}

.m-input__field--yoko:focus + .m-input__label--yoko::after,
.m-input--filled .m-input__label--yoko::after {
    -webkit-transform: perspective(1000px) rotate3d(1, 0, 0, -90deg);
    transform: perspective(1000px) rotate3d(1, 0, 0, -90deg);
}
*/

</style>