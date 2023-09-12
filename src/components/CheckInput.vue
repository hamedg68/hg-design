<template>
  <FormItem :name="name" :error-message="errorMessage || ''" :meta="meta">
    <div style="display: flex; align-items: center">
      <input
        v-model="inputValue"
        :name="name"
        :id="name"
        type="checkbox"
        @input="onInputChange($event)"
      />
      <label v-if="label" class="label" :for="name">{{ label }}</label>
      <label v-else class="label" style="margin: 0" :for="name"
        ><slot name="label"></slot
      ></label>
    </div>
  </FormItem>
</template>

<script setup lang="ts">
import { toRef, watch } from "vue";
import { useField } from "vee-validate";
import FormItem from "./FormItem.vue";
const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    modelValue?: boolean | null;
  }>(),
  {
    modelValue: undefined,
  }
);

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validate needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, "name");

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  meta,
} = useField(name, undefined, {
  type: "radio",
  initialValue: props.modelValue,
});

const emit = defineEmits<{
  (e: "update:modelValue", event: boolean): void;
}>();

function onInputChange(event: Event) {
  const val = (event.target as HTMLInputElement).checked;
  inputValue.value = val;
  emit("update:modelValue", val);
}

watch(
  () => props.modelValue,
  () => {
    props.modelValue !== undefined && (inputValue.value = props.modelValue);
  }
);
</script>
