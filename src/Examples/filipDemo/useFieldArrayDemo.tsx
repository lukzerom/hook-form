import React, {ReactElement, useCallback} from "react";
import {FormProvider, useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {defaultFieldArrayData, FieldArrayData} from "./useFieldArrayDemoFormSchema";
import {UseFieldArrayValidation} from "./useFieldArrayValidation";
import {Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField} from "@mui/material";
import NestedFieldComponent from "./NestedFieldComponent";

const UseFieldArrayDemo = (): ReactElement => {

    const form = useForm<FieldArrayData>({
        defaultValues: defaultFieldArrayData,
        mode: "onChange",
        resolver: yupResolver(UseFieldArrayValidation)
    })

    const onSubmit = useCallback((data: FieldArrayData) => {
        console.log(data);
    }, [])

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>
                            String field
                        </h1>
                        <Controller
                            name="stringField"
                            control={form.control}
                            rules={{required: true}}
                            render={({field}) => <TextField
                                {...field}
                                value={field.value}
                                defaultValue={field.value}
                                placeholder="Enter something..."
                                id="outlined-required"
                                label="Write some text :)"
                            />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <h1>
                            Boolean field
                        </h1>
                        <Controller
                            name="booleanField"
                            control={form.control}
                            rules={{required: true}}
                            render={({field}) => <FormControl {...field}>
                                <FormLabel id="demo-row-radio-buttons-group-label">Do you like winter?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    value={field.value}
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value={true} control={<Radio/>} label="Yes"/>
                                    <FormControlLabel value={false} control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <h1>
                            Number field
                        </h1>
                        <Controller
                            name="integerField"
                            control={form.control}
                            rules={{required: true}}
                            render={({field}) =>
                                <TextField
                                    {...field}
                                    value={field.value}
                                    defaultValue={field.value}
                                    inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                                />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <h1>
                            Nested Component
                        </h1>
                        <NestedFieldComponent/>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="success"
                    type="submit"
                >
                    Send
                </Button>
            </form>
        </FormProvider>
    );
}
export default UseFieldArrayDemo;