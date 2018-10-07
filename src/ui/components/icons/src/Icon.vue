<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
    name: 'MIcon',
    props: {
        iconClass: {
            type: String,
            required: true
        },
        className: {
            type: String
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`
        },
        svgClass() {
            if (this.className) {
                return 'm-icon ' + this.className
            } else {
                return 'm-icon'
            }
        }
    }
}
</script>

<style scoped>
.m-icon {
    width: 1.2em;
    height: 1.2em;
    vertical-align: -0.3em;
    fill: currentColor;
    overflow: hidden;
}
</style>
