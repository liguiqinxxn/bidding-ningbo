<template>
  <div class="smooth-carousel" ref="carouselRef">
    <div 
      class="carousel-wrapper" 
      :style="{ transform: `translateX(${offset}px)` }"
      @mouseenter="pauseAutoPlay"
      @mouseleave="resumeAutoPlay"
    >
      <div 
        v-for="(item, index) in clonedItems" 
        :key="index" 
        class="carousel-item"
      >
        <img class="carousel-img" :src="item.logo" :alt="item.title" />
        <p class="title" v-if="item.title">{{ item.title }}</p>
      </div>
    </div>
    <!-- 指示器 -->
    <div class="carousel-indicators" v-if="showIndicators && originalItems.length > 1">
      <span 
        v-for="(item, index) in originalItems" 
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue';

export default defineComponent({
  name: 'SmoothCarousel',
  props: {
    items: {
      type: Array,
      required: true
    },
    height: {
      type: String,
      default: '400px'
    },
    interval: {
      type: Number,
      default: 3000
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const carouselRef = ref<HTMLElement | null>(null);
    const offset = ref(0);
    const currentIndex = ref(0);
    const autoPlayTimer = ref<number | null>(null);
    const itemWidth = ref(0);
    const isTransitioning = ref(false);

    // 克隆项目以实现无限循环
    const clonedItems = computed(() => {
      if (!props.items || props.items.length === 0) return [];
      
      // 只有当项目数量大于1时才需要克隆
      if (props.items.length <= 1) {
        return props.items as any[];
      }
      
      // 在开头添加最后一项，在结尾添加第一项
      const items = [...props.items as any[]];
      items.unshift(props.items[props.items.length - 1]); // 在开头添加最后一项
      items.push(props.items[0]); // 在结尾添加第一项
      return items;
    });

    const originalItems = computed(() => props.items as any[]);

    // 获取单个轮播项的宽度
    const getItemWidth = () => {
      if (carouselRef.value && clonedItems.value.length > 0) {
        const firstItem = carouselRef.value.querySelector('.carousel-item');
        if (firstItem) {
          itemWidth.value = firstItem.clientWidth;
          return itemWidth.value;
        }
      }
      return 0;
    };

    // 更新偏移量
    const updateOffset = (immediate = false) => {
      const width = getItemWidth();
      if (width > 0) {
        // +1 是因为我们在开头添加了一个克隆项
        const newOffset = -width * (currentIndex.value + 1);
        if (immediate) {
          // 立即设置，无过渡效果
          const wrapper = carouselRef.value?.querySelector('.carousel-wrapper') as HTMLElement;
          if (wrapper) {
            wrapper.style.transition = 'none';
            offset.value = newOffset;
            // 强制重绘
            wrapper.offsetHeight;
            wrapper.style.transition = '';
          }
        } else {
          offset.value = newOffset;
        }
      }
    };

    // 下一张
    const next = () => {
      if (isTransitioning.value || clonedItems.value.length <= 1) return;
      
      isTransitioning.value = true;
      currentIndex.value++;
      updateOffset();

      // 当到达克隆的最后一项时，无缝跳转到第一项
      if (currentIndex.value >= props.items.length) {
        setTimeout(() => {
          isTransitioning.value = false;
          currentIndex.value = 0;
          // 瞬间跳转，无过渡效果
          updateOffset(true);
        }, 500); // 与CSS过渡时间匹配
      } else {
        setTimeout(() => {
          isTransitioning.value = false;
        }, 500);
      }
    };

    // 上一张
    const prev = () => {
      if (isTransitioning.value || clonedItems.value.length <= 1) return;
      
      isTransitioning.value = true;
      currentIndex.value--;
      updateOffset();

      // 当到达克隆的第一项时，无缝跳转到最后一项
      if (currentIndex.value < 0) {
        setTimeout(() => {
          isTransitioning.value = false;
          currentIndex.value = props.items.length - 1;
          // 瞬间跳转，无过渡效果
          updateOffset(true);
        }, 500); // 与CSS过渡时间匹配
      } else {
        setTimeout(() => {
          isTransitioning.value = false;
        }, 500);
      }
    };

    // 跳转到指定幻灯片
    const goToSlide = (index: number) => {
      if (isTransitioning.value || index === currentIndex.value || index >= props.items.length) return;
      
      isTransitioning.value = true;
      currentIndex.value = index;
      updateOffset();
      
      setTimeout(() => {
        isTransitioning.value = false;
      }, 500);
    };

    // 开始自动播放
    const startAutoPlay = () => {
      if (!props.autoPlay) return;
      
      if (autoPlayTimer.value) {
        clearInterval(autoPlayTimer.value);
      }
      if (props.interval > 0 && clonedItems.value.length > 1) {
        autoPlayTimer.value = window.setInterval(() => {
          next();
        }, props.interval);
      }
    };

    // 暂停自动播放
    const pauseAutoPlay = () => {
      if (autoPlayTimer.value) {
        clearInterval(autoPlayTimer.value);
        autoPlayTimer.value = null;
      }
    };

    // 恢复自动播放
    const resumeAutoPlay = () => {
      startAutoPlay();
    };

    // 初始化轮播图
    const initCarousel = () => {
      nextTick(() => {
        getItemWidth();
        // 初始化位置（第一项）
        currentIndex.value = 0;
        updateOffset(true); // 立即设置位置
        startAutoPlay();
      });
    };

    // 监听items变化
    watch(() => props.items, () => {
      nextTick(() => {
        getItemWidth();
        currentIndex.value = 0;
        updateOffset(true);
      });
    }, { deep: true });

    // 监听窗口大小变化
    const handleResize = () => {
      getItemWidth();
      updateOffset(true); // 立即更新位置
    };

    onMounted(() => {
      initCarousel();
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
      if (autoPlayTimer.value) {
        clearInterval(autoPlayTimer.value);
      }
      window.removeEventListener('resize', handleResize);
    });

    return {
      carouselRef,
      offset,
      currentIndex,
      clonedItems,
      originalItems,
      next,
      prev,
      goToSlide,
      pauseAutoPlay,
      resumeAutoPlay
    };
  }
});
</script>

<style lang="less" scoped>
.smooth-carousel {
  position: relative;
  width: 100%;
  height: v-bind(height);
  overflow: hidden;

  .carousel-wrapper {
    display: flex;
    height: 100%;
    transition: transform 0.5s ease-in-out;

    .carousel-item {
      position: relative;
      min-width: 100%;
      width: 100%;
      height: 100%;
      flex-shrink: 0;
      
      .carousel-img {
        width: 100%;
        height: 80%;
        object-fit: cover;
        padding-right: 20px;
        box-sizing: border-box;
      }

      .title {
        width: 100%;
        position: absolute;
        bottom: 0;
        text-align: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        background-color: #19478b;
        line-height: 36px;
        padding-bottom: 30px;
        margin: 0;
      }
    }
  }

  .carousel-indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 10;

    span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: background-color 0.3s;
      border: none;

      &.active {
        background-color: #ffffff;
      }
    }
  }
}
</style>