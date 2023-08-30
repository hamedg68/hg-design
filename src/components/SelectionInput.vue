<template>
  <FormItem
    :name="name"
    :label="label"
    :error-message="errorMessage || ''"
    :meta="meta"
  >
    <div class="TextInput">
      <select v-model="inputValue" :name="name" @change="onChange">
        <!-- <option value="" disabled selected>{{ placeholder }}</option> -->
        <option v-for="(item, index) in items" :key="index" :value="item.value">
          {{ item.text }}
        </option>
      </select>
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
    items: Array<Record<string, any>>;
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

const onChange = (event : Event) => {
    const value = (event.target as HTMLSelectElement).value;
    //   handleChange(value);
    emit("update:modelValue", value);
  
};

const emit = defineEmits<{
  (e: "update:modelValue", event: string): void;
}>();
</script>
