<template>
  <div>
    <p>{{ state.form }}</p>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      @invalid-submit="onInvalidSubmit"
    >
      <TextInput
        v-model="state.form.name"
        name="name"
        type="text"
        label="نام"
        placeholder="نام شما..."
      />
      <TextInput
        v-model="state.form.email"
        name="email"
        type="email"
        label="ایمیل"
        placeholder="ایمیل..."
      />
      <TextInput
        v-model="state.form.password"
        name="password"
        type="password"
        label="گذرواژه"
        placeholder="گذرواژه"
      />
      <TextInput
        name="confirm_password"
        type="password"
        label="تکرار گذرواژه"
        placeholder="تکرار گذرواژه"
      />

      <SelectionInput
        v-model="state.form.region"
        name="region"
        label="شهر"
        :items="listRegions"
        placeholder="شهر"
      />

      <DatePicker
        v-model="state.form.birthDate"
        name="birthDate"
        label="تاریخ تولد"
        placeholder="تاریخ تولد"
      ></DatePicker>

      <button class="submit-btn" type="submit">تایید</button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Form } from "vee-validate";
import * as Yup from "yup";
import TextInput from "./components/TextInput.vue";
import SelectionInput from "./components/SelectionInput.vue";
import DatePicker from "./components/DatePicker.vue";

function onSubmit(values: any) {
  alert(JSON.stringify(values, null, 2));
}
function onInvalidSubmit() {}
const listRegions = [
  {
    id: 1,
    title: "یزد",
  },
  {
    id: 2,
    title: "شیراز",
  },
  {
    id: 3,
    title: "مشهد",
  },
  {
    id: 4,
    title: "تهران",
  },
  {
    id: 5,
    title: "بندرعباس",
  },
  {
    id: 6,
    title: "کرمان",
  },
];

type Form = {
  name: string;
  email: string;
  region: string;
  password: string;
  birthDate: string;
};

const state = reactive<{
  form: Form;
}>({
  form: {} as Form,
});
// Using yup to generate a validation schema
// https://vee-validate.logaretm.com/v4/guide/validation#validation-schemas-with-yup
const schema = Yup.object().shape({
  name: Yup.string().required("نام را وارد کنید"),
  email: Yup.string().email("ایمیل صحیح نیست").required("ایمیل را وارد کنید"),
  region: Yup.string().required("شهر را انتخاب کنید"),
  birthDate: Yup.string().required("تاریخ تولد را وارد کنید"),
  password: Yup.string()
    .min(6, "گذرواژه حداقل باید ۶ کاراکتر باشد")
    .required("گذرواژه را وارد کنید"),
  confirm_password: Yup.string()
    .required("تکرار گذرواژه را وارد کنید")
    .oneOf([Yup.ref("password")], "تکرار گذرواژه یکسان نیست"),
});
</script>
