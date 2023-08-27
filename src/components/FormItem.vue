<template>
  <div
    class="form-item"
    :class="{
      'has-error': !!errorMessage && meta.validated && meta.touched,
      success: meta.valid && meta.dirty,
    }"
  >
    <label :for="name">{{ label }}</label>
    <slot></slot>

    <div
      class="help-message"
      v-show="
        (errorMessage && meta.validated && meta.touched) ||
        (meta.valid && meta.dirty)
      "
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { FieldMeta } from "vee-validate";

defineProps<{
  name: string;
  label: string;
  errorMessage: string;
  meta: FieldMeta<string>;
}>();
</script>
