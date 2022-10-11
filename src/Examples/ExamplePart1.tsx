import React, { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { css } from "@emotion/css";
import SectionWrapper from "../components/SectionWrapper";
import HelperText from "../components/HelperText";
import FormItem from "../components/FormItem";

import Terminal from "../components/Terminal";
type ExamplePart1Props = {};

type FieldKeyType = "name" | "age" | "email" | "city" | "url" | "date";

type FormTypes = {
  name: string;
  age: number;
  email: string;
  city: string;
  url: string;
  date: string;
};

const dateRegex = new RegExp(
  /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
);

const schema = yup
  .object()
  .shape({
    name: yup.string().required("This field is required"),
    age: yup
      .number()
      .min(18, "You must be at least 18!")
      .typeError("This must be number!")
      .required("This field is required"),

    email: yup
      .string()
      .email("This should be email")
      .required("This field is required"),
    city: yup
      .string()
      .min(5, "Minimum 5 characters!")
      .required("This field is required"),
    url: yup.string().url("Should be URL"),
    date: yup.string().matches(dateRegex, "Should be date format YYYY-MM-DD"),
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
    criteriaMode: "firstError",
    shouldFocusError: true,
  });

  const [formData, setFormData] = useState<FormTypes>();
  const [isWatchingUrl, setIsWatchingUrl] = useState(false);

  const { errors, isDirty, dirtyFields, touchedFields, isSubmitted, isValid } =
    formState;

  const urlField = watch("url");

  const onSubmit = (data: FormTypes) => {
    setFormData(data);
  };

  const resetEverything = () => {
    reset();
  };

  const resetOnlyCity = () => {
    resetField("city");
  };

  const setSomeValues = () => {
    setValue("name", "Jon Snow");
    setValue("age", 18);
    setValue("email", "snow@gmail.com");
    setValue("city", "Winterfell");
    setValue("url", "https://google.pl");
    setValue("date", "1993-01-01");
  };

  const setSomeValuesAndValidate = () => {
    setValue("name", "Jon Snow", { shouldValidate: true });
    setValue("age", 18, { shouldValidate: true });
    setValue("email", "snow@gmail.com", { shouldValidate: true });
    setValue("city", "Winterfell", { shouldValidate: true });
    setValue("url", "https://google.pl", { shouldValidate: true });
    setValue("date", "1993-01-0", { shouldValidate: true });
  };

  const setErrorToCity = () => {
    setError("city", { message: "Api error", type: "server" });
  };

  const clearAllErrors = () => {
    clearErrors();
  };

  const setFocusToEmail = () => {
    setFocus("email");
  };

  const getAllValues = () => {
    setFormData(getValues());
  };

  const toggleWatchUrl = () => {
    setIsWatchingUrl((prev) => !prev);
  };

  return (
    <div>
      <h1>React Hook Form 7.0 basic implementation </h1>
      <div
        className={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <div
          className={css`
            width: 50%;
          `}
        >
          <SectionWrapper state="nautral">
            <h2>Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormItem>
                <input placeholder="Name" {...register("name")} />
                <HelperText>{errors?.name?.message}</HelperText>
              </FormItem>
              <FormItem>
                <input placeholder="Age" type="number" {...register("age")} />
                <HelperText>{errors?.age?.message}</HelperText>
              </FormItem>
              <FormItem>
                <input placeholder="Email" {...register("email")} />
                <HelperText>{errors?.email?.message}</HelperText>
              </FormItem>
              <FormItem>
                <input placeholder="City" {...register("city")} />
                <HelperText>{errors?.city?.message}</HelperText>
              </FormItem>

              <FormItem>
                <input placeholder="Some URL" {...register("url")} />
                <HelperText>{errors?.url?.message}</HelperText>
              </FormItem>
              <FormItem>
                <input placeholder="Some Date" {...register("date")} />
                <HelperText>{errors?.date?.message}</HelperText>
              </FormItem>
              <input type="submit" />
            </form>
          </SectionWrapper>
          <SectionWrapper state="nautral">
            <h2>Settings</h2>
            <div
              className={css`
                > button {
                  margin: 6px;
                  padding: 4px;
                  cursor: pointer;
                }
              `}
            >
              <button onClick={resetEverything}>Reset everything</button>
              <button onClick={resetOnlyCity}>Reset only city</button>
              <button onClick={setSomeValues}>Set some values </button>
              <button onClick={setSomeValuesAndValidate}>
                Set some values and validate
              </button>
              <button onClick={setErrorToCity}>Set error to city</button>
              <button onClick={clearAllErrors}>Clear all errors</button>
              <button onClick={setFocusToEmail}>Set focus to email</button>
              <button onClick={getAllValues}>Get all values</button>
              <button onClick={toggleWatchUrl}>
                {isWatchingUrl ? "Unwatch URL field" : "Watch URL field"}
              </button>
              <h4> {isWatchingUrl && `URL FIELD: ${urlField}`} </h4>
            </div>
          </SectionWrapper>
        </div>
        <div
          className={css`
            width: 50%;
          `}
        >
          <SectionWrapper state="nautral">
            <h2>Form State</h2>
            <Terminal>
              formData:
              {JSON.stringify(formData, null, 2)}
            </Terminal>

            <Terminal>
              formState:
              {JSON.stringify(
                {
                  isDirty: isDirty ? true : false,
                  isSubmitted: isSubmitted ? true : false,
                  isValid: isSubmitted ? true : false,
                },

                null,
                2
              )}
            </Terminal>

            <Terminal>
              dirtyFields:
              {JSON.stringify(dirtyFields, null, 2)}
            </Terminal>

            <Terminal>
              touchedFields:{JSON.stringify(touchedFields, null, 2)}
            </Terminal>

            <Terminal>
              errors:
              {JSON.stringify(
                errors,
                [
                  "name",
                  "age",
                  "email",
                  "city",
                  "url",
                  "date",
                  "url",
                  "message",
                  "type",
                ],
                2
              )}
            </Terminal>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
};

export default ExamplePart1;
