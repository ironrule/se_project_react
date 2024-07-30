import { useState } from "react";

export function useForm(inputValues) {
  const [formValues, setFormValues] = useState(inputValues);

  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return { formValues, handleFormChange, setFormValues };
}
