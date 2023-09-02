<template>
  <FormItem
    :name="name"
    :label="label"
    :error-message="errorMessage || ''"
    :meta="meta"
  >
    <div>
      <v-select
        class="v-select"
        v-model="inputValue"
        :options="items"
        :label="props.selectionLabel"
        :reduce="(val : Record<string, any>) => val[props.selectionValue]"
        @update:model-value="onChange"
      ></v-select>
    </div>
  </FormItem>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";
import FormItem from "./FormItem.vue";
import "vue-select/dist/vue-select.css";
const props = withDefaults(
  defineProps<{
    label: string;
    name: string;
    type?: string;
    modelValue?: string;
    placeholder?: string;
    items: Array<Record<string, any>>;
    selectionLabel?: string;
    selectionValue?: string;
  }>(),
  {
    type: "text",
    modelValue: undefined,
    placeholder: "",
    selectionLabel: "title",
    selectionValue: "id",
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
  initialValue: props.items.find(
    (item) => item[props.selectionValue] == props.modelValue
  )?.[props.selectionLabel],
});

const onChange = (value: string) => {
  // const value = (event.target as HTMLSelectElement).value;
  //   handleChange(value);
  emit("update:modelValue", value);
};

const emit = defineEmits<{
  (e: "update:modelValue", event: string): void;
}>();
</script>
