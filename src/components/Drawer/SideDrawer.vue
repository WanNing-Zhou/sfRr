<!--用于实现侧边栏抽屉-->
<!--<template>
	<div class="wq_drawer_comp">
		<transition name="wq_drawer">
			<div v-show="visible" class="wq_drawer">
				<slot name="content"></slot>
			</div>
		</transition>
		<div class="wq_drawer_switch" @click="visible = !visible">打开抽屉</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 主体可见性
const visible = ref(true);
</script>

<style lang="scss" scoped>
.wq_drawer_comp {
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	background-color: #646cff;
	width: 400px;

	.wq_drawer {
		border: 1px solid #dcdfe6;
		display: inline-block;
		//position: fixed;
		//top: 0;
		//left: 0;
		width: 300px;
		height: 100vh;
		//background-color: #ffffff;
		transition: transform 0.3s ease-in-out;
		background-color: #1a1a1a;
	}
	.wq_drawer-enter-active,
	.wq_drawer-leave-active {
		transition: transform 0.3s ease-in-out;
		transform: translateX(-100%);
	}
	.wq_drawer-leave-active {
	}
	.wq_drawer-enter,
	.wq_drawer-leave-to {
		transition: transform 0.3s ease-in-out;
		transform: translateX(0);
	}
	/**开关样式**/
	.wq_drawer_switch {
		cursor: pointer;
		display: inline-block;
		width: 50px;
		height: 50px;
		background: #f9f1c7;
	}
}
</style>

-->


<template>
  <div class="drawer">
    <div :class="maskClass" @click="closeByMask"></div>
    <div :class="mainClass" :style="mainStyle" class="main">
      <div class="drawer-head">
        <span>{{ title }}</span>
        <span class="close-btn" v-show="closable" @click="closeByButton">X</span>
      </div>
      <div class="drawer-body">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props: {
    // 是否打开
    display: {
      type: Boolean
    },

    // 标题
    title: {
      type: String,
      default: '标题'
    },

    // 是否显示关闭按钮
    closable: {
      type: Boolean,
      default: true
    },

    // 是否显示遮罩
    mask: {
      type: Boolean,
      default: true
    },

    // 是否点击遮罩关闭
    maskClosable: {
      type: Boolean,
      default: true
    },

    // 宽度
    width: {
      type: String,
      default: '400px'
    },

    // 是否在父级元素中打开
    inner: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    maskClass: function () {
      return {
        'mask-show': (this.mask && this.display),
        'mask-hide': !(this.mask && this.display),
        'inner': this.inner
      }
    },
    mainClass: function () {
      return {
        'main-show': this.display,
        'main-hide': !this.display,
        'inner': this.inner
      }
    },
    mainStyle: function () {
      return {
        width: this.width,
        right: this.display ? '0' : `-${this.width}`,
        borderLeft: this.mask ? 'none' : '1px solid #eee'
      }
    }
  },
  mounted () {
    if (this.inner) {
      let box = this.$el.parentNode
      box.style.position = 'relative'
    }
  },
  methods: {
    closeByMask () {
      this.maskClosable && this.$emit('update:display', false)
    },
    closeByButton () {
      this.$emit('update:display', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer {
  /* 遮罩 */
  .mask-show {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0,0,0,.5);
    opacity: 1;
    transition: opacity .5s;
  }
  .mask-hide {
    opacity: 0;
    transition: opacity .5s;
  }

  /* 滑块 */
  .main {
    position: fixed;
    z-index: 10;
    top: 0;
    height: 100%;
    background: #fff;
    transition: all 0.5s;
  }
  .main-show {
    opacity: 1;
  }
  .main-hide {
    opacity: 0;
  }

  /* 某个元素内部显示 */
  .inner {
    position: absolute;
  }

  /* 其他样式 */
  .drawer-head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    .close-btn {
      display: inline-block;
      cursor: pointer;
      height: 100%;
      padding-left: 20px;
    }
  }
  .drawer-body {
    font-size: 14px;
    padding: 15px;
  }
}
</style>
