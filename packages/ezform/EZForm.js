import { useState, useRef } from "react";
import { EZFormProvider } from "./context/EZFormContext";
import { useFormData } from "./hooks";
import { ValidationError } from "yup";
import get from "lodash.get";
import set from "lodash.set";
import setAllValues from "./utils/setAllValues";

const EZForm = ({ children, validationSchema, onSubmit, id }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);

  const getFormData = useFormData(formRef);

  const validate = () => {
    try {
      validationSchema.validateSync(getFormData(), { abortEarly: false });
      setErrors({});
      return {};
    } catch (yupError) {
      if (!(yupError instanceof ValidationError)) {
        throw yupError;
      }

      const visibleErrors = yupError.inner.reduce((acc, error) => {
        const displayedField = get(getFormData(), error.path) !== undefined;

        if (displayedField) {
          set(acc, error.path, error.message);
        }

        return acc;
      }, {});

      setErrors(visibleErrors);
      return visibleErrors;
    }
  };

  const handleChange = () => {
    if (validationSchema) {
      validate();
    }
  };

  const handleBlur = () => {
    if (validationSchema) {
      validate();
    }
  };

  const handleSubmit = (e) => {
    // We set all field as touched to force all errors to display
    setTouched(setAllValues(getFormData(), true));

    if (validationSchema) {
      const errors = validate();

      if (Object.keys(errors).length) {
        e.preventDefault();
        return;
      }
    }

    setSubmitting(true);

    if (onSubmit && typeof onSubmit === "function") {
      e.preventDefault();
      return onSubmit({ data: getFormData(), setSubmitting });
    }

    // Without onSubmit function, form get its default behaviour and will go to the url in "action" prop or actual url if not provided

    return;
  };

  return (
    <form
      ref={formRef}
      id={id}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    >
      <EZFormProvider value={{ errors, touched, setTouched, submitting }}>
        {typeof children === "function"
          ? children({ values: getFormData(), errors, touched, submitting })
          : children}
      </EZFormProvider>
    </form>
  );
};

export default EZForm;
