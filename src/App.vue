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
        label="Full Name"
        placeholder="Your Name"
      />
      <TextInput
      v-model="state.form.email"
        name="email"
        type="email"
        label="E-mail"
        placeholder="Your email address"
      />
      <TextInput
      v-model="state.form.password"
        name="password"
        type="password"
        label="Password"
        placeholder="Your password"
      />
      <TextInput
      v-model="state.form.confirm_password"
        name="confirm_password"
        type="password"
        label="Confirm Password"
        placeholder="Type it again"
      />

      <SelectionInput v-model="state.form.region" name="region" label="region" :items="listRegions" />

      <button class="submit-btn" type="submit">Submit</button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
import * as Yup from "yup";
import TextInput from "./components/TextInput.vue";
import SelectionInput from "./components/SelectionInput.vue";
import { reactive } from "vue";

function onSubmit(values: any) {
  alert(JSON.stringify(values, null, 2));
}
function onInvalidSubmit() {}

const listRegions = [
  {
    id: 1,
    title: "italy",
  },
  {
    id: 2,
    title: "Ecuador",
  },
  {
    id: 3,
    title: "brazil",
  },
  {
    id: 4,
    title: "iran",
  },
  {
    id: 5,
    title: "USA",
  },
  {
    id: 6,
    title: "canada",
  },
];

type Form = {
  name: string;
  email: string;
  region: string;
  password: string;
  confirm_password: string;
};
const state = reactive<{
  form: Form;
}>({
  form: {} as Form,
});
// Using yup to generate a validation schema
// https://vee-validate.logaretm.com/v4/guide/validation#validation-schemas-with-yup
const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  region: Yup.string().required(),
  password: Yup.string().min(6).required(),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
</script>
