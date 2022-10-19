import {DeepPartial, FieldValues, FormProvider, useForm} from "react-hook-form";
import {ReactElement} from "react";

interface WrapperProps<T> {
    defaultValues?: DeepPartial<T>
    onSubmit?: (data: T, event: React.BaseSyntheticEvent) => void
    children: JSX.Element
}

const ReactHookFormWrapper = <T extends FieldValues>({defaultValues, onSubmit, children}: WrapperProps<T>): ReactElement => {
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