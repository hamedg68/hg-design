<template>
  <FormItem
    :name="name"
    :label="label"
    :error-message="errorMessage || ''"
    :meta="meta"
  >
    <div class="select">
      <vSelect
        v-model="inputValue"
        class="v-select"
        :class="{ 'v-select-focus': open }"
        :options="options"
        :label="props.selectionLabel"
        :reduce="(val : Record<string, any>) => val[props.selectionValue]"
        :placeholder="placeholder"
        @open="open = true"
        @close="open = false"
      >
        <template #no-options="{}">
          <div>
            {{ noOptions }}
          </div>
        </template>
      </vSelect>
    </div>
  </FormItem>
</template>

<script setup lang="ts">
import { ref, toRef, watch } from "vue";
import FormItem from "./FormItem.vue";
import { useField } from "vee-validate";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
const props = withDefaults(
  defineProps<{
    label?: string;
    name: string;
    type?: string;
    modelValue?: string;
    placeholder?: string;
    options: Array<Record<string, any>>;
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
// this is important because vee-validate needs to know if the field name changes
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
  initialValue: props.options.find(
    (item) => item[props.selectionValue] == props.modelValue
  )?.[props.selectionLabel],
});

const emit = defineEmits<{
  (e: "update:modelValue", event: string): void;
}>();

watch(
  () => inputValue.value,
  (value) => {
    emit("update:modelValue", value);
  }
);

watch(
  () => props.options,
  (nVal, oVal) => {
    if (JSON.stringify(nVal) !== JSON.stringify(oVal)) {
      const i = props.options.find(
        (item) => item[props.selectionValue] == inputValue.value
      );
      !i && (inputValue.value = undefined);
    }
  },
  { deep: true }
);
</script>
