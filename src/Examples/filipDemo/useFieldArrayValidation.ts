import * as yup from "yup";

const PHONE_NUMBER_REGEX = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// export const UseFieldArrayValidation: yup.SchemaOf<FieldArrayData> = yup.object({
export const UseFieldArrayValidation = yup.object({
    nestedField: yup.array(yup.object({
        name: yup.string().required("This field is required!"),
        surname: yup.string().required("This field is required!"),
        phoneNumber: yup.string()
            .matches(PHONE_NUMBER_REGEX, "Phone number is invalid"),
        age: yup.number().required(),
        orderAlcohol: yup.string()
            .when(["age", "orderAlcohol"], {
                is: (age: string) => Number(age) >= 18,
                then: yup.string().required("This field is required!"),
                otherwise: yup.string(),
            }),
    })),
});