<template>
  <div
    class="TextInput"
    :class="{
      'has-error': !!errorMessage && meta.validated && meta.touched,
      success: meta.valid && meta.dirty,
    }"
  >
    <label :for="name">{{ label }}</label>
    <input
      v-model="inputValue"
      :name="name"
      :id="name"
      :type="type"
      :placeholder="placeholder"
    />

    <p
      class="help-message"
      v-show="(errorMessage && meta.validated && meta.touched) || (meta.valid && meta.dirty)"
    >
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = withDefaults(
  defineProps<{
    label: string;
    name: string;
    type?: string;
    value?: string;
    successMessage?: string;
    placeholder?: string;
  }>(),
  {
    type: "text",
    value: undefined,
    successMessage: "",
    placeholder: "",
  }
);

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, "name");

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>
