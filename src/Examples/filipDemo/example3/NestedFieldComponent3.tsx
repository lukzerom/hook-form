import {useFieldArray, useFormContext, useFormState} from "react-hook-form";
import {defaultSingleNestedField, FieldArrayData} from "../useFieldArrayDemoFormSchema";
import SingleNestedField3 from "./SingleNestedField3";
import React, {ReactElement} from "react";
import {Button, Grid} from "@mui/material";


const NestedFieldComponent3 = (): ReactElement => {

    const {control} = useFormContext<FieldArrayData>();
    const {submitCount, dirtyFields, touchedFields, isValid, isSubmitted} = useFormState({
        control  //	control object provided by useForm. It's optional if you are using FormContext.
    });
    const {
        fields: nestedFieldArray,
        append: appendNestedField,
        prepend: prependNestedField,
        remove: removeNestedField
    } = useFieldArray({
        control,
        name: "nestedField"
    });

    return (
        <>
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
                            <SingleNestedField3
                                index={index}
                                key={field.id}
                                remove={removeNestedField}
                            />
                        )
                    }
                </Grid>
                <Grid item xs={12}>
                    <p>Number of submission: {submitCount}</p>
                    <p>Is form submitted: {JSON.stringify(isSubmitted)}</p>
                    <p>Fields which are dirty: {JSON.stringify(dirtyFields)}</p>
                    <p>Touched fields: {JSON.stringify(touchedFields)}</p>
                    <p>Is form valid: {JSON.stringify(isValid)}</p>
                </Grid>
            </Grid>
        </>
    );
};
export default NestedFieldComponent3;