import * as yup from "yup";
import {Alcohol} from "./useFieldArrayDemoFormSchema";


export const UseFieldArrayValidation = yup.object({
    booleanField: yup.boolean(),
    integerField: yup.number(),
    stringField: yup.string(),
    nestedField: yup.array(yup.object({
        name: yup.string().required(),
        surname: yup.string().required(),
        age: yup.number().required(),
        orderAlcohol: yup.mixed<Alcohol>().oneOf(Object.values(Alcohol))
            .when("age", {
                is: ((value: number) => value < 18),
                then: yup.mixed<Alcohol>().oneOf(Object.values(Alcohol))
                    .typeError("You can't buy alcohol legally!!!"),
                otherwise: yup.mixed<Alcohol>().oneOf(Object.values(Alcohol))
            })
    })),
    movieType: yup.array(yup.object({
        isMovieFan: yup.boolean().required(),
        movieType: yup.array(yup.string()).required()
    }))
})