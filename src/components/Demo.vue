<template>
  <div class="demo">
    <div class="v-row v-container">
      <div class="v-col-1"><div class="v-box">col-1</div></div>
      <div class="v-col-1"><div class="v-box">col-1</div></div>
      <div class="v-col-1"><div class="v-box">col-1</div></div>
      <div class="v-col-1"><div class="v-box">col-1</div></div>
      <div class="v-col-1"><div class="v-box">col-1</div></div>
      <div class="v-col-1"><div class="v-box">col-1</div></div>
      <div class="v-col-1"><div class="v-box">col-1</div></div>
      <div class="v-col-1"><div class="v-box">col-1</div></div>
      <div class="v-col-1"><div class="v-box">col-1</div></div>
      <div class="v-col-1"><div class="v-box">col-1</div></div>
      <div class="v-col-1"><div class="v-box">col-1</div></div>
      <div class="v-col-1"><div class="v-box">col-1</div></div>

      <div class="v-col-2"><div class="v-box">col-2</div></div>
      <div class="v-col-2"><div class="v-box">col-2</div></div>
      <div class="v-col-2"><div class="v-box">col-2</div></div>
      <div class="v-col-2"><div class="v-box">col-2</div></div>
      <div class="v-col-2"><div class="v-box">col-2</div></div>
      <div class="v-col-2"><div class="v-box">col-2</div></div>

      <div class="v-col-3"><div class="v-box">col-3</div></div>
      <div class="v-col-3"><div class="v-box">col-3</div></div>
      <div class="v-col-3"><div class="v-box">col-3</div></div>
      <div class="v-col-3"><div class="v-box">col-3</div></div>

      <div class="v-col-4"><div class="v-box">col-4</div></div>
      <div class="v-col-4"><div class="v-box">col-4</div></div>
      <div class="v-col-4"><div class="v-box">col-4</div></div>

      <div class="v-col-5"><div class="v-box">col-5</div></div>
      <div class="v-col-7"><div class="v-box">col-7</div></div>

      <div class="v-col-6"><div class="v-box">col-6</div></div>
      <div class="v-col-6"><div class="v-box">col-6</div></div>

      <div class="v-col-7"><div class="v-box">col-7</div></div>
      <div class="v-col-5"><div class="v-box">col-5</div></div>

      <div class="v-col-8"><div class="v-box">col-8</div></div>
      <div class="v-col-4"><div class="v-box">col-4</div></div>

      <div class="v-col-9"><div class="v-box">col-9</div></div>
      <div class="v-col-3"><div class="v-box">col-3</div></div>

      <div class="v-col-10"><div class="v-box">col-10</div></div>
      <div class="v-col-2"><div class="v-box">col-2</div></div>

      <div class="v-col-11"><div class="v-box">col-11</div></div>
      <div class="v-col-1"><div class="v-box">col-1</div></div>

      <div class="v-col-12"><div class="v-box">col-12</div></div>

      <div class="v-col-offset-0 v-col-12"><div class="v-box">col-offset-0</div></div>
      <div class="clearfix"></div>
      <div class="v-col-offset-1 v-col-11"><div class="v-box">col-offset-1</div></div>
      <div class="clearfix"></div>
      <div class="v-col-offset-2 v-col-10"><div class="v-box">col-offset-2</div></div>
      <div class="clearfix"></div>
      <div class="v-col-offset-3 v-col-9"><div class="v-box">col-offset-3</div></div>
      <div class="clearfix"></div>
      <div class="v-col-offset-4 v-col-8"><div class="v-box">col-offset-4</div></div>
      <div class="clearfix"></div>
      <div class="v-col-offset-5 v-col-7"><div class="v-box">col-offset-5</div></div>
      <div class="clearfix"></div>
      <div class="v-col-offset-6 v-col-6"><div class="v-box">col-offset-6</div></div>
      <div class="clearfix"></div>
      <div class="v-col-offset-7 v-col-5"><div class="v-box">col-offset-7</div></div>
      <div class="clearfix"></div>
      <div class="v-col-offset-8 v-col-4"><div class="v-box">col-offset-8</div></div>
      <div class="clearfix"></div>
      <div class="v-col-offset-9 v-col-3"><div class="v-box">col-offset-9</div></div>
      <div class="clearfix"></div>
      <div class="v-col-offset-10 v-col-2"><div class="v-box">col-offset-10</div></div>
      <div class="clearfix"></div>
      <div class="v-col-offset-11 v-col-1"><div class="v-box">col-offset-11</div></div>
      <div class="clearfix"></div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style scoped>
.demo {
  padding-top: 10px;
}
  .demo [class*="v-col-"] {
    margin-bottom: 10px;
  }

    .demo .v-box {
      box-shadow: inset 0 0 0 1px #dddddd;
    }
</style>
