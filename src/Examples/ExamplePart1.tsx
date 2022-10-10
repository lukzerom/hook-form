import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
type ExamplePart1Props = {};

type FormTypes = {
  name: string;
  age: number;
};

const schema = yup
  .object()
  .shape({
    name: yup.string().required("This field is required"),
    age: yup
      .number()
      .typeError("This must be number!")
      .required("This field is required"),
  })
  .required();

const ExamplePart1: FunctionComponent<ExamplePart1Props> = () => {
  const {
    register,
    unregister,
    formState,
    watch,
    handleSubmit,
    reset,
    resetField,
    setError,
    clearErrors,
    setValue,
    setFocus,
    getValues,
    getFieldState,
  } = useForm<FormTypes>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
  });

  const { errors } = formState;

  return (
    <>
      <h1>Basics </h1>
      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <input {...register("name")} />
        <div>{errors?.name?.message}</div>
        <input type="number" {...register("age")} />
        <div>{errors?.age?.message}</div>
        <input type="submit" />
      </form>
    </>
  );
};

export default ExamplePart1;
