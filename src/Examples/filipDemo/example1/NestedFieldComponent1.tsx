import {useFieldArray, useFormContext} from "react-hook-form";
import {defaultSingleNestedField, FieldArrayData} from "../useFieldArrayDemoFormSchema";
import SingleNestedField1 from "./SingleNestedField1";
import React, {ReactElement} from "react";
import {Button, Grid} from "@mui/material";


const NestedFieldComponent1 = (): ReactElement => {

    const {control} = useFormContext<FieldArrayData>();
    const {
        fields: nestedFieldArray,
        append: appendNestedField,
        prepend: prependNestedField,
        remove: removeNestedField,
    } = useFieldArray({
        control,
        name: "nestedField",
    });

    return (
        <Grid container spacing={3}>
            <Grid item xs={2}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => appendNestedField({...defaultSingleNestedField, name: "append"})}
                >
                    Add section at the end (append)
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => prependNestedField({...defaultSingleNestedField, name: "prepend"})}
                >
                    Add section at the beginning (prepend)
                </Button>
            </Grid>
            <Grid item xs={12}>
                {nestedFieldArray
                    .map((field, index) =>
                        <SingleNestedField1
                            index={index}
                            key={field.id}
                            remove={removeNestedField}
                        />
                    )
                }
            </Grid>
        </Grid>
    );
};
export default NestedFieldComponent1;