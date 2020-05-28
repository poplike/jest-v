<template>
  <div>
    <button @click="handleClick">点击</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log('触发啊');
      this.$emit('emit_click', 'emit消息');
      return 'is_click';
    },
  },
};
</script>

<style></style>
