<template>
  <FormItem
    :name="name"
    :label="label"
    :error-message="errorMessage || ''"
    :meta="meta"
  >
    <div class="select">
      <v-select
        :model-value="inputValue"
        class="v-select"
        :class="{ 'v-select-focus': open }"
        :options="items"
        :label="props.selectionLabel"
        :reduce="(val : Record<string, any>) => val[props.selectionValue]"
        @update:modelValue="
          (event : string) => {
            inputValue = event;
            emit('update:modelValue', event);
          }
        "
        @open="open = true"
        @close="open = false"
      >
        <template #no-options="{}">
          <div>
            {{ noOptions }}
          </div>
        </template></v-select
      >
    </div>
  </FormItem>
</template>

<script setup lang="ts">
import { ref, toRef } from "vue";
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
    noOptions?: string;
  }>(),
  {
    type: "text",
    modelValue: undefined,
    placeholder: "",
    selectionLabel: "title",
    selectionValue: "id",
    noOptions: "موردی برای نمایش وجود ندارد",
  }
);

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, "name");
const open = ref(false);
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

const emit = defineEmits<{
  (e: "update:modelValue", event: string): void;
}>();
</script>
