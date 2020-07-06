<template>
  <div id="app">
    <base-tree :data="data" />
  </div>
</template>

<script>
import BaseTree from "./Tree";
export default {
  components: {
    BaseTree
  },
  data() {
    return {
      data: [
        {
          label: "一级 1-1",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 3-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2-1",
          children: [
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 3-2"
                }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>