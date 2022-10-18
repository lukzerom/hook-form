import {DeepPartial, useForm, FormProvider, SubmitHandler, FieldValues} from "react-hook-form";
import {ReactElement} from "react";

interface WrapperProps<T extends FieldValues> {
    defaultValues?: DeepPartial<T>
    onSubmit?:  SubmitHandler<T>
    children: JSX.Element
}

const ReactHookFormWrapper = ({defaultValues, onSubmit, children}: WrapperProps<any>): ReactElement => {
    const form = useForm({
        defaultValues: defaultValues,
        mode: "onChange",
    });
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit as any)}>
                {children}
                <input type="submit" data-testid="submitMock"/>
            </form>
        </FormProvider>
    );
};

export default ReactHookFormWrapper;