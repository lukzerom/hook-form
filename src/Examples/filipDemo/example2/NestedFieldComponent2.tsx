import {useFieldArray, useFormContext} from "react-hook-form";
import {defaultSingleNestedField, FieldArrayData, NestedField} from "../useFieldArrayDemoFormSchema";
import SingleNestedField2 from "./SingleNestedField2";
import React, {ChangeEvent, ReactElement, useCallback, useMemo, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";


const NestedFieldComponent2 = (): ReactElement => {

    const {control} = useFormContext<FieldArrayData>();
    const {
        fields: nestedFieldArray,
        append: appendNestedField,
        update: updateField,
        replace: replaceField,
        swap: swapFields,
        insert: insertNestedField,
        remove: removeNestedField
    } = useFieldArray({
        control,
        name: "nestedField"
    });

    const [fromIndex, setFromIndex] = useState<number>(0);
    const [toIndex, setToIndex] = useState<number>(1);
    const [toIndexInsert, setToIndexInsert] = useState<number>(0);

    const replacedArray: NestedField[] = useMemo(() => {
        return [
            {
                name: " Replaced1",
                surname: "Replaced1",
                phoneNumber: "999-999-999".trim(),
                age: 99,
                orderAlcohol: "NONE"
            },
            {
                name: " Replaced2",
                surname: "Replaced2",
                phoneNumber: "999-999-999".trim(),
                age: 99,
                orderAlcohol: "NONE"
            },
            {
                name: " Replaced3",
                surname: "Replaced3",
                phoneNumber: "999-999-999".trim(),
                age: 99,
                orderAlcohol: "NONE"
            }
        ];
    }, []);

    const handleAppendCLick = useCallback(() => appendNestedField(defaultSingleNestedField), [appendNestedField]);
    const handleReplaceClick = useCallback(() => replaceField(replacedArray), [replaceField, replacedArray])
    const handleSwapClick = useCallback(() => swapFields(fromIndex, toIndex), [fromIndex, swapFields, toIndex])
    const handleInsertClick = useCallback(() => insertNestedField(toIndexInsert, {
        name: "Inserted",
        surname: "Inserted",
        phoneNumber: "123-456-777".trim(),
        age: 20,
        orderAlcohol: "GIN"
    },), [insertNestedField, toIndexInsert])

    return (
        <Grid container spacing={3}>
            <Grid item xs={2}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleAppendCLick}
                >
                    Add section
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleReplaceClick}
                >
                    Replace all array
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleSwapClick}
                        >
                            Swap object from index 0 to index 2
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="From index"
                            value={fromIndex}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setFromIndex(Number(event.target.value))}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                inputProps: {min: 0, max: nestedFieldArray.length - 1}
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            value={toIndex}
                            label="To index"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setToIndex(Number(event.target.value))}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                inputProps: {min: 0, max: nestedFieldArray.length - 1}
                            }}
                        />
                    </Grid>
                </Grid>


            </Grid>
            <Grid item xs={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleInsertClick}
                        >
                            Insert Object to index ${toIndexInsert}
                        </Button>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            label="To index index"
                            value={toIndexInsert}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setToIndexInsert(Number(event.target.value))}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                inputProps: {min: 0, max: nestedFieldArray.length - 1}
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {nestedFieldArray
                    .map((field, index) =>
                        <SingleNestedField2
                            index={index}
                            key={field.id}
                            update={updateField}
                            remove={removeNestedField}
                        />
                    )
                }
            </Grid>
        </Grid>
    );
};
export default NestedFieldComponent2;