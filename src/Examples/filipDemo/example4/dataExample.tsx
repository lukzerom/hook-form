import React, {FunctionComponentElement, ReactElement, useCallback, useEffect, useState} from "react";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {Button, Grid, TextField} from "@mui/material";

type Product = {
    name: string
    quantity: number
    price: number
    releaseDate: Date
}

const DataExample = (): FunctionComponentElement<ReactElement> => {

    const defaultProductValues: Product = {
        name: "",
        price: 0.00,
        quantity: 0,
        releaseDate: new Date(),
    };

    const form = useForm({
        defaultValues: defaultProductValues,
        mode: "onChange",
    });

    const [product, setProduct] = useState<Product>();

    const getRandom = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const getProduct = async () => {
        const random = getRandom(1, 4);
        fetch(`http://localhost:8080/products/${random}`)
            .then(response => response.json())
            .then((data) => setProduct(data))
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getProduct();
    }, []);

    useEffect(() => {
        form.reset({
            name: product?.name,
            price: product?.price,
            quantity: product?.quantity,
            releaseDate: product?.releaseDate,
        });
    }, [product]);

    const onSubmit = useCallback((data: Product) => {
        console.log(data);
    }, []);

    return (
        <>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Grid container spacing={2} style={{marginTop: "5px"}}>
                        <Grid item xs={1}>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({field}) => <TextField
                                    {...field}
                                    fullWidth
                                    placeholder="Enter something..."
                                    label="Name"
                                />}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Controller
                                name="quantity"
                                control={form.control}
                                render={({field}) => <TextField
                                    {...field}
                                    fullWidth
                                    placeholder="Enter something..."
                                    label="Quantity"
                                    inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                                />}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Controller
                                name="price"
                                control={form.control}
                                render={({field}) => <TextField
                                    {...field}
                                    fullWidth
                                    placeholder="Enter something..."
                                    label="Price"
                                    inputProps={{inputMode: 'numeric'}}
                                />}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Controller
                                name="releaseDate"
                                control={form.control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        placeholder="Enter something..."
                                        label="Release Date"
                                        inputProps={{inputMode: 'numeric'}}
                                    />}
                            />
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
        </>
    );
};
export default DataExample;