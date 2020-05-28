<template>
  <div>
    <h1>测试props</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
      default: () => {
        return '默认内容';
      },
    },
  },
};
</script>

<style></style>
