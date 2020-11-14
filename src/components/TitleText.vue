<template>
  <div id="titleText">
    <div class="w-100 mb-20">
      <strong class="font-s-30">{{ title }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
  },
};
</script>