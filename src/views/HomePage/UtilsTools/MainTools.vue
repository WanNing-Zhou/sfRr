<template>
  <div class="main-tools">
    <ground-glass>
      <div class="tools">
        <!--
          让这里根据配置文件进行渲染
        -->
        kakax
        <SvgIcon :icon-style="{
          width: '30px',
          height: '30px'
        }" icon-name="utils_shop"></SvgIcon>

        <SvgIcon :icon-style="{
          width: '30px',
          height: '30px',
          fontSize: '30px'
        }" icon-name="config"></SvgIcon>

      </div>
    </ground-glass>
  </div>
</template>

<script setup lang="ts">
import GroundGlass from "@/components/GroundGlass/GroundGlass.vue";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";

</script>
<style scoped lang="scss">
.main-tools{
  position: fixed;
  bottom: 200px ;
  left: 0;
  //width: 100px;
  height: 100px;
  //background-color: #646cff;
  z-index: 10;
  .tools{

  }
}
</style>
