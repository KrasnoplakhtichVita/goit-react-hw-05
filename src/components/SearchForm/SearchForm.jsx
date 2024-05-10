import { Formik, Form, Field, validateYupSchema } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import css from "./SearchForm.module.css";

const FeedbackSchema = Yup.object().shape({
  query: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const initialValues = { query: "" };

export default function SearchForm({ onSubmit }) {
  const nameFieldId = useId();

  const handleSubmit = (values, actions) => {
    if (values.query.trim() === "") {
      return;
    }
    onSubmit(values.query);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form>
        <Field
          type="text"
          name="query"
          id={nameFieldId}
          className={css.input}
        ></Field>
        <button className={css.button} type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  );
}
