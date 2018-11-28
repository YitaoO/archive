<!-- Item0模板 -->
<template>
<div class="my-loading" v-show="!!loading">
  <img src="../../assets/loding.gif" alt="">
</div>
</template>

<script>
export default {
  name: 'my-loading',
  data() {
    return {}
  },
  props: {
    loading: Boolean
  },
  created() {

  },


};
</script>

<style lang="scss">
.my-loading {
    width: 30px;
    height: 30px;
    @include verHorCenter;

}
</style>
