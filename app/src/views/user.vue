<template>
  <div>
    {{ message }}
    <button class="btn" @click="handleClick"></button>
    <button class="btn1" @click="onBtnClick"></button>
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
      this.onBtnClick();
    },

    onBtnClick() {
      this.message = 'new name bn1';
    },
  },
};
</script>
<style scoped></style>
