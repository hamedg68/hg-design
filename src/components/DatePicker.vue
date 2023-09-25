<template>
  <FormItem
    :name="name"
    :label="label"
    :error-message="errorMessage || ''"
    :meta="meta"
  >
    <div class="textInputContainer">
      <input
        :value="
          inputValue &&
          new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            calendar: 'persian',
          })
            .format(new Date(inputValue))
            .replace(/\//g, '-')
        "
        class="input custom-input"
        :name="name"
        :id="name"
        type="text"
        :placeholder="placeholder"
      />
    </div>

    <Vue3PersianDatetimePicker
      :model-value="inputValue"
      format="YYYY-MM-DD"
      display-format="jYYYY-jMM-jDD"
      custom-input=".custom-input"
      @update:modelValue="onInputChange($event)"
      :max="disableIncomingDays ? new Date().toISOString().split('T')[0] : max"
      :min="disablePassedDays ? new Date().toISOString().split('T')[0] : min"
    />
  </FormItem>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";
import FormItem from "./FormItem.vue";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";

const props = withDefaults(
  defineProps<{
    label?: string;
    name: string;
    modelValue?: string;
    placeholder?: string;
    max?: string;
    min?: string;
    disableIncomingDays?: boolean;
    disablePassedDays?: boolean;
  }>(),
  {
    modelValue: undefined,
    placeholder: "",
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
  initialValue: props.modelValue,
});

const emit = defineEmits<{
  (e: "update:modelValue", event: string): void;
}>();

function onInputChange(value: string) {
  inputValue.value = value;
  emit("update:modelValue", value);
}
</script>
