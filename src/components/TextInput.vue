<template>
  <FormItem
    :name="name"
    :label="label"
    :error-message="errorMessage || ''"
    :meta="meta"
  >
    <div class="TextInput">
      <input
        :model-value="inputValue"
        :name="name"
        :id="name"
        :type="type"
        :placeholder="placeholder"
        @input="($event)=>{
          const val = ($event.target as HTMLInputElement).value;
          inputValue = val
          emit('update:modelValue', val)
        }"
      />
    </div>
  </FormItem>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";
import FormItem from "./FormItem.vue";
const props = withDefaults(
  defineProps<{
    label: string;
    name: string;
    type?: string;
    modelValue?: string;
    placeholder?: string;
  }>(),
  {
    type: "text",
    modelValue: undefined,
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
  initialValue: props.modelValue,
});

const emit = defineEmits<{
  (e: "update:modelValue", event: string): void;
}>();
</script>
