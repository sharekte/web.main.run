<template>
    <input v-if="design == 'default'"
           class="m-input"
           ref="input"
           v-bind="$attrs"
           :type="inputType"
           :value="currentValue"
           @input="onInput"
           @focus="onFocus"
           @blur="onBlur"
           :placeholder="placeholder"
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
            :type="inputType"
            v-bind="$attrs"
            :id="inputId"
            :value="currentValue"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
        >
        <label class="m-input__label m-input__label--haruki" :for="inputId">
            <span class="m-input__label-content m-input__label-content--haruki">{{lable}}</span>
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
            :type="inputType"
            v-bind="$attrs"
            :id="inputId"
            :value="currentValue"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
        >
        <label class="m-input__label m-input__label--yoko" :for="inputId">
            <span class="m-input__label-content m-input__label-content--yoko">{{lable}}</span>
        </label>
    </span>

    <span v-else-if="design == 'ichiro'"
          class="m-input-common"
          :class="[
              currentValue != '' ? 'm-input--filled': ''
          ]"
    >
        <input
            class="m-input__field m-input__field--ichiro"
            :type="inputType"
            v-bind="$attrs"
            :id="inputId"
            :value="currentValue"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
        >
        <label class="m-input__label m-input__label--ichiro" :for="inputId">
            <span class="m-input__label-content m-input__label-content--ichiro">{{lable}}</span>
        </label>
    </span>

    <span v-else-if="design == 'juro'"
          class="m-input-common m-input--juro"
          :class="[
              currentValue != '' ? 'm-input--filled': ''
          ]"
    >
        <input
            class="m-input__field m-input__field--juro"
            :type="inputType"
            v-bind="$attrs"
            :id="inputId"
            :value="currentValue"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
        >
        <label class="m-input__label m-input__label--juro" :for="inputId">
            <span class="m-input__label-content m-input__label-content--juro">{{lable}}</span>
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
        };
    },
    props: {
        design: {
            type: String,
            default: "default"
        },
        value: {
            type: [String, Number],
            default: ""
        },
        type: {
            type: String,
            default: "text"
        },
        size: String,
        disabled: {
            type: Boolean,
            default: false
        },
        lable: {
            type: String,
            default: "label"
        },
        placeholder: String
    },
    created() {
        //console.log("created");
        this.inputId = Math.random()
            .toString(36)
            .substr(2);
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
