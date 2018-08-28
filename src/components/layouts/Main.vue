<template>
    <div class="main">
        <my-header></my-header>
        <div class="content">
            <router-view></router-view>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
import MyHeader from "./Header"
import MyFooter from "./Footer"

export default {
    components: {
        MyHeader,
        MyFooter
    }
};
</script>

<style lang="stylus" scoped>
.main {
    position: relative;
    min-height: 100%;
    display: flex;
    flex-direction: column;

    .content {
        flex: 1 0 auto;
        padding: 10px;
    }
}
</style>
