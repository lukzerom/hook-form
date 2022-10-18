import React, {ReactElement, useCallback} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {FieldArrayData, NestedField} from "../useFieldArrayDemoFormSchema";
import {UseFieldArrayValidation} from "../useFieldArrayValidation";
import {Button, Grid} from "@mui/material";
import NestedFieldComponent2 from "./NestedFieldComponent2";
import {DevTool} from "@hookform/devtools";

const UseFieldArrayDemo2 = (): ReactElement => {

    const initialValues: NestedField = {
        name: " John",
        surname: "Nope",
        phoneNumber: "123-123-321".trim(),
        age: 22,
        orderAlcohol: "RUM",
    };

    const form = useForm<FieldArrayData>({
        defaultValues: {nestedField: [initialValues]},
        mode: "onChange",
        resolver: yupResolver(UseFieldArrayValidation),
    });

    const onSubmit = useCallback((data: FieldArrayData) => {
        console.log(data);
    }, []);

    return (
        <>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <h1>
                                Nested Component
                            </h1>
                            <NestedFieldComponent2/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="success"
                                type="submit"
                            >
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
            <DevTool control={form.control}/>
        </>
    );
};
export default UseFieldArrayDemo2;