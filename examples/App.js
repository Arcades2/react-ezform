import * as Yup from "yup";
import { EZForm, Field } from "./EZForm";
import TextField from "./TextField";

export default function App() {
  const validationSchema = Yup.object({
    test: Yup.object({
      test: Yup.string().required("Required"),
      textField: Yup.string().required("Required")
    }),
    email: Yup.string().email("Should be a valid email").required("Required"),
    conditional: Yup.string()
      .equals(["abc"], 'Field must equal "abc"')
      .required("Required")
  });

  return (
    <div className="App">
      <EZForm
        validationSchema={validationSchema}
        onSubmit={({ data, setSubmitting }) => {
          console.log({ data });
          setSubmitting(false);
        }}
      >
        {({ values, errors }) => {
          // your field transformations
          return (
            <div>
              {/* Field */}
              <Field
                component={TextField}
                name="test.textField"
                label="TextField"
              />

              {/* simple input */}
              <input type="text" name="test.test" />
              {errors.test?.test}

              {/* Field without component */}
              <Field label="Email" name="email" type="email" />
              {errors.email}

              {/* Conditional component */}
              {values.test === "test" && (
                <>
                  <Field label="Conditional" name="conditional" />
                  {errors.conditional}
                </>
              )}

              {/* Checkbox group */}
              <div role="group">
                <input type="checkbox" name="check" value="1" />
                <input type="checkbox" name="check" value="2" />
                <input type="checkbox" name="check" value="3" />
              </div>

              <input type="checkbox" name="toggle" />
              <button type="submit">Submit</button>
              <div
                style={{
                  height: "1px",
                  backgroundColor: "black",
                  marginTop: "16px"
                }}
              />
              {values && (
                <>
                  <h1>Values</h1>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                </>
              )}

              <div
                style={{
                  height: "1px",
                  backgroundColor: "black",
                  marginTop: "16px"
                }}
              />
              {errors && (
                <>
                  <h1>Errors</h1>
                  <pre>{JSON.stringify(errors, null, 2)}</pre>
                </>
              )}
            </div>
          );
        }}
      </EZForm>
    </div>
  );
}
