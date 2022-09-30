import { useCallback } from "react";
import get from "lodash.get";
import set from "lodash.set";

const useFormData = (formRef) =>
  useCallback(() => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      // Add to form data all unchecked checkbox
      formRef.current
        .querySelectorAll('input[type="checkbox"]:not(:checked)')
        .forEach((checkbox) => {
          formData.append(checkbox.name, false);
        });

      return Array.from(formData.entries()).reduce((formValues, [key, val]) => {
        if (get(formValues, key)) {
          if (Array.isArray(get(formValues, key))) {
            get(formValues, key).push(val);
          } else {
            set(formValues, key, [get(formValues, key), val]);
          }
        } else {
          set(formValues, key, val);
        }

        return formValues;
      }, {});
    }

    return {};
  }, [formRef]);

export default useFormData;
