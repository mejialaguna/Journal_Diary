import { useState, useEffect, useMemo } from "react";

export const useForm = (initialForm = {}, validator = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [validatedValues, setValidatedValues] = useState({});

  // checking if the fields of the forms are valid and only checking on field change
  useEffect(() => {
    fieldValidator();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  // checking if the whole form is valid and only checking if one of the form fields changes
  const isFormValid = useMemo(() => {
    for (const key in validatedValues) {
      if (validatedValues[key] !== null) return false;
    }
    return true;
  }, [validatedValues]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  // field validators
  const fieldValidator = () => {
    const formCheckedValues = {};

    for (let key in validator) {
      const [fn, errMessage] = validator[key];

      formCheckedValues[`${key}Valid`] = fn(formState[key]) ? null : errMessage;
    }
    setValidatedValues(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    validatedValues,
    ...validatedValues,
    isFormValid,
  };
};

// try {
//         let missingKeys = [];

// with a for in loop we dont need to use Object.Values or key or entries because this loop is special for  objects
//          for (let key in requiredValues) {

// we need to use Object.Values or key or entries using for of loop to transform the object into an array
//         for ([key, value] of Object.entries(requiredValues)) {
//             if (key && !value || value === "") {
//                 missingKeys.push(key)
//             }
//         }
//         if (missingKeys.length > 0) {
//             throw new Error(`Missing some required values: ${missingKeys.join(", ")}`)
//         }
