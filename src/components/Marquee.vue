<template>
  <Vue3Marquee
    :direction="props.direction"
    :duration="props.duration"
    :delay="props.delay"
    :loop="props.loop"
    :gradient="props.gradient"
    :gradient-color="props.gradientColor"
    :pause-on-hover="props.pauseOnHover"
    :pause-on-click="props.pauseOnClick"
    :clone="props.clone"
    style="direction: ltr !important"
  >
    <slot></slot>
  </Vue3Marquee>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Marquee",
});
</script>
<script lang="ts" setup>
//@ts-ignore
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";

const props = withDefaults(
  defineProps<{
    direction?: "reverse" | "normal";
    duration?: number;
    delay?: number;
    loop?: number;
    gradient?: boolean;
    gradientColor?: [number, number, number];
    pauseOnHover?: boolean;
    pauseOnClick?: boolean;
    clone?: boolean;
  }>(),
  {
    direction: "normal",
    duration: 40,
    delay: 0,
    loop: 0,
    gradient: false,
    gradientColor: () => [255, 255, 255],
    pauseOnHover: false,
    pauseOnClick: false,
    clone: false,
  }
);
</script>

<style lang="scss" scoped></style>
