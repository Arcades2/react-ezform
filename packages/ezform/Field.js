import { createElement, useCallback, useEffect } from "react";
import { useEZFormContext } from "./context/EZFormContext";
import get from "lodash.get";
import set from "lodash.set";

const Field = ({ component, children, is, onBlur, ...props }) => {
  const { errors, touched, setTouched, submitting } = useEZFormContext();

  const errorProps =
    get(errors, props.name) && get(touched, props.name)
      ? { error: get(errors, props.name) }
      : {};

  const handleBlur = useCallback(
    (e) => {
      setTouched((prev) => {
        const newTouched = { ...prev };
        set(newTouched, e.target.name, true);

        return newTouched;
      });
      if (onBlur) {
        onBlur(e);
      }
    },
    [setTouched, onBlur]
  );

  useEffect(
    () => () => {
      // Pass field at false in touched state on component unmount
      setTouched((prev) => {
        const newTouched = { ...prev };
        set(newTouched, props.name, false);

        return newTouched;
      });
    },
    [setTouched, props.name]
  );

  if (component) {
    return createElement(
      component,
      {
        ...props,
        disabled: props.disabled || submitting,
        ...errorProps,
        onBlur: handleBlur
      },
      children
    );
  }

  return createElement(
    "input",
    {
      ...props,
      onBlur: handleBlur
    },
    children
  );
};

export default Field;
