<template>
  <div>
    <p>{{ state.form }}</p>
    <button
      @click="state.status = state.status === 'email' ? 'cellphone' : 'email'"
    >
      {{ state.status }}
    </button>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      @invalid-submit="onInvalidSubmit"
    >
      <TextInput
        v-model="state.form.name"
        name="name"
        type="text"
        label=""
        placeholder="نام"
      />
      <TextInput
        v-model="state.form.family"
        name="family"
        type="text"
        label=""
        placeholder="نام خانوادگی"
      />

      <TextInput
        v-if="state.status === 'cellphone'"
        v-model="state.form.mobile"
        name="mobile"
        type="text"
        label=""
        placeholder="موبایل"
      />

      <TextInput
        v-if="state.status === 'email'"
        v-model="state.form.email"
        name="email"
        type="email"
        label=""
        placeholder="ایمیل"
      />

      <TextInput
        v-if="state.status === 'email'"
        v-model="state.form.password"
        name="password"
        type="password"
        label=""
        placeholder="گذرواژه"
      />

      <TextInput
        v-if="state.status === 'email'"
        name="confirm_password"
        type="password"
        label=""
        placeholder="تکرار گذرواژه"
      />

      <DatePicker
        v-model="state.form.birthDate"
        name="birthDate"
        label=""
        placeholder="تاریخ تولد"
        disable-incoming-days
      ></DatePicker>

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
  console.log(
    "form is valid !!! hello, this is a valid form passed to server you can use this form and its structure to validating form in your projects"
  );
}
function onInvalidSubmit() {}

type Form = {
  name: string;
  family: string;
  mobile: string;
  email: string;
  password: string;
  birthDate: string;
  province: string;
  city: string;
};

type Status = "cellphone" | "email";
const state = reactive<{
  form: Form;
  status: Status;
}>({
  form: {} as Form,
  status: "cellphone",
});

// Using yup to generate a validation schema
// https://vee-validate.logaretm.com/v4/guide/validation#validation-schemas-with-yup
const schema = Yup.object().shape({
  name: Yup.string().required("نام را وارد کنید"),
  family: Yup.string().required("نام خانوادگی را وارد کنید"),
  mobile: Yup.string().when([], {
    is: () => state.status === "cellphone",
    then: () =>
      Yup.string()
        .required("تلفن همراه را وارد کنید")
        .matches(
          /^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/,
          "شماره موبایل صحیح نیست"
        ),
    otherwise: () => Yup.string().optional(),
  }),
  email: Yup.string().when([], {
    is: () => state.status === "email",
    then: () =>
      Yup.string().email("ایمیل صحیح نیست").required("ایمیل را وارد کنید"),
    otherwise: () => Yup.string().optional(),
  }),
  province: Yup.string().required("استان را انتخاب کنید"),
  city: Yup.string().required("شهر را انتخاب کنید"),
  birthDate: Yup.string().required("تاریخ تولد را وارد کنید"),
  password: Yup.string().when([], {
    is: () => state.status === "email",
    then: () =>
      Yup.string()
        .min(6, "گذرواژه حداقل باید ۶ کاراکتر باشد")
        .required("گذرواژه را وارد کنید"),
    otherwise: () => Yup.string().optional(),
  }),
  confirm_password: Yup.string().when([], {
    is: () => state.status === "email",
    then: () =>
      Yup.string()
        .required("تکرار گذرواژه را وارد کنید")
        .oneOf([Yup.ref("password")], "تکرار گذرواژه یکسان نیست"),
    otherwise: () => Yup.string().optional(),
  }),
  confirmRegulations: Yup.boolean()
    .required("قوانین را تایید کنید")
    .oneOf([true], "قوانین را تایید کنید"),
});
</script>
