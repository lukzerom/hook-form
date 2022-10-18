import React, {ReactElement, useCallback} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {defaultFieldArrayData, FieldArrayData} from "../useFieldArrayDemoFormSchema";
import {UseFieldArrayValidation} from "../useFieldArrayValidation";
import {Button, Grid} from "@mui/material";
import NestedFieldComponent1 from "./NestedFieldComponent1";
import {DevTool} from "@hookform/devtools";

const UseFieldArrayDemo1 = (): ReactElement => {

    const form = useForm<FieldArrayData>({
        defaultValues: defaultFieldArrayData,
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
                            <NestedFieldComponent1/>
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
export default UseFieldArrayDemo1;