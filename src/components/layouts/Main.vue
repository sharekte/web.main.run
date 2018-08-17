<template>
    <div class="main">
        <headers></headers>
        <!-- <keep-alive> -->
        <div class="content">
            <router-view></router-view>
        </div>
        <!-- </keep-alive> -->
        <footers></footers>
    </div>
</template>

<script>
import Headers from "@/components/layouts/Header";
import Footers from "@/components/layouts/Footer";

export default {
  components: {
    Headers,
    Footers
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
    }
}
</style>
