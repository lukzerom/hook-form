import React, {ChangeEvent, ReactElement, useCallback} from "react";
import {Button, Divider, Grid, MenuItem, TextField} from "@mui/material";
import {Controller, useFormContext, useWatch} from "react-hook-form";
import {Alcohol, FieldArrayData} from "../useFieldArrayDemoFormSchema";

interface SingleNestedFieldProps {
    index: number
    remove: (value: number) => void
}

const SingleNestedField1 = (
    {
        index,
        remove,
    }: SingleNestedFieldProps): ReactElement => {

    const {control, setValue} = useFormContext<FieldArrayData>();

    const age = useWatch({
        control,
        name: `nestedField.${index}.age`,
    });

    const handleAgeChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setValue(`nestedField.${index}.age`, Number(event.target.value));
        if (Number(event.target.value) < 18) {
            setValue(`nestedField.${index}.orderAlcohol`, "NONE");
        }
    }, [index, setValue]);

    const handleRemoveClick = useCallback(() => {
        remove(index);
    },[index, remove]);

    return (
        <>
            {index !== 0 && <Divider style={{marginTop: "20px"}}/>}
            <Grid container spacing={2} style={{marginTop: "5px"}}>
                <Grid item xs={1}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleRemoveClick}
                            >
                                Remove
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={11}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Controller
                                name={`nestedField.${index}.name`}
                                control={control}
                                render={({field, fieldState}) => <TextField
                                    {...field}
                                    fullWidth
                                    placeholder="Enter something..."
                                    label="Name"
                                    error={!!fieldState.error}
                                    helperText={fieldState?.error?.message}
                                />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name={`nestedField.${index}.surname`}
                                control={control}
                                render={({field, fieldState}) => <TextField
                                    {...field}
                                    fullWidth
                                    placeholder="Enter something..."
                                    label="Surname"
                                    error={!!fieldState.error}
                                    helperText={fieldState?.error?.message}
                                />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name={`nestedField.${index}.phoneNumber`}
                                control={control}
                                render={({field, fieldState}) => <TextField
                                    {...field}
                                    fullWidth
                                    placeholder="Enter something..."
                                    label="Phone Number"
                                    error={!!fieldState.error}
                                    color={fieldState.error ? "error" : "primary"}
                                    helperText={fieldState.error?.message}
                                />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name={`nestedField.${index}.age`}
                                control={control}
                                rules={{required: true}}
                                render={({field, fieldState}) =>
                                    <TextField
                                        {...field}
                                        label="Age"
                                        fullWidth
                                        onChange={handleAgeChange}
                                        inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                                        error={!!fieldState.error}
                                        helperText={fieldState?.error?.message}
                                    />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name={`nestedField.${index}.orderAlcohol`}
                                control={control}
                                render={({field, fieldState}) => (
                                    <TextField
                                        {...field}
                                        select
                                        fullWidth
                                        label="What alcohol you prefer?"
                                        error={!!fieldState.error}
                                        helperText={fieldState?.error?.message}
                                        disabled={age < 18}
                                    >
                                        {Alcohol.map((item, idx) =>
                                            <MenuItem key={idx} value={item}>{item}</MenuItem>
                                        )}
                                    </TextField>
                                )}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
export default SingleNestedField1;