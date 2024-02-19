<template>
  <div>
    <grid-layout
        v-model::layout="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
    >

      <grid-item v-for="item in layout"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 :key="item.i">
        {{item.i}}
      </grid-item>
    </grid-layout>
  </div>
</template>

<script setup lang="ts">

import {GridLayout, GridItem} from 'vue-grid-layout';
import {ref} from "vue";

const layout = ref([
  { "x": 0, "y": 0, "w": 2, "h": 2, "i": "0" },
  { "x": 2, "y": 0, "w": 2, "h": 2, "i": "1" },
  { "x": 4, "y": 0, "w": 2, "h": 2, "i": "2" },
  { "x": 0, "y": 1, "w": 6, "h": 2, "i": "3" },
])

</script>

<style scoped>

</style>