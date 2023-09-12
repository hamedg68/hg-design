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
        placeholder="نام شما..."
      />
      <TextInput
        v-model="state.form.email"
        name="email"
        type="email"
        placeholder="ایمیل..."
      />
      <TextInput
        v-model="state.form.password"
        name="password"
        type="password"
        placeholder="گذرواژه"
      />
      <TextInput
        name="confirm_password"
        type="password"
        placeholder="تکرار گذرواژه"
      />
      <SelectionInput
        v-model="state.form.province"
        name="province"
        :options="provinces"
        placeholder="استان"
      />
      <SelectionInput
        v-model="state.form.city"
        name="city"
        :options="
          provinces.find((item) => item.id === state.form.province)?.cities ||
          []
        "
        placeholder="شهر"
      />
      <DatePicker
        v-model="state.form.birthDate"
        name="birthDate"
        placeholder="تاریخ تولد"
        disable-incoming-days
      />

      <CheckInput name="confirmRegulations">
        <template #label>
          <div>
            لطفا
            <a
              href="http://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              >قوانین</a
            >
            را تایید کنید
          </div>
        </template>
      </CheckInput>
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
import CheckInput from "./components/CheckInput.vue";
import { provinces } from "./data";

function onSubmit(values: any) {
  alert(JSON.stringify(values, null, 2));
}
function onInvalidSubmit() {}

type Form = {
  name: string;
  email: string;
  province: string;
  city: string;
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
  province: Yup.string().required("استان را انتخاب کنید"),
  city: Yup.string().required("شهر را انتخاب کنید"),
  birthDate: Yup.string().required("تاریخ تولد را وارد کنید"),
  password: Yup.string()
    .min(6, "گذرواژه حداقل باید ۶ کاراکتر باشد")
    .required("گذرواژه را وارد کنید"),
  confirm_password: Yup.string()
    .required("تکرار گذرواژه را وارد کنید")
    .oneOf([Yup.ref("password")], "تکرار گذرواژه یکسان نیست"),
  confirmRegulations: Yup.boolean()
    .required("قوانین را تایید کنید")
    .oneOf([true], "قوانین را تایید کنید"),
});
</script>
