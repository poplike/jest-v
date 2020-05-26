<template>
  <div>
    {{ message }}
    <div>123</div>
    <el-button @click="handleClick"></el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'name',
    };
  },
  methods: {
    handleClick() {
      this.message = 'new name';
    },

    onBtnClick() {
      this.message = 'new name bn1';
    },
  },
};
</script>
<style scoped></style>
