import { useState, useEffect, useMemo, useCallback } from 'react';

export const useForm = (initialForm = {}, validator = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [validatedValues, setValidatedValues] = useState({});

  // Function to validate all form fields
  const fieldValidator = useCallback(() => {
    const formCheckedValues = {};
    for (let key in validator) {
      const [validateFn, errMessage] = validator[key];
      const fieldValue = formState[key];

      formCheckedValues[`${key}Valid`] = validateFn(fieldValue)
        ? null
        : errMessage;
    }

    setValidatedValues(formCheckedValues);
  }, [formState]);

  // Check if the entire form is valid
  const isFormValid = useMemo(() => {
    return Object.values(validatedValues).every((value) => value === null);
  }, [validatedValues]);

  // Handle input changes
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset the form to its initial state
  const onResetForm = useCallback(() => {
    setFormState(initialForm);
  }, [initialForm]);

  // Revalidate fields whenever the formState changes
  useEffect(() => {
    fieldValidator();
  }, [formState, fieldValidator]);

  // Reset form state if initialForm changes
  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

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
