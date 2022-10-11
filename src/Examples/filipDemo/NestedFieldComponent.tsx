import {useFieldArray, useFormContext} from "react-hook-form";
import {FieldArrayData} from "./useFieldArrayDemoFormSchema";
import NestedField from "./NestedField";
import {ReactElement} from "react";


const NestedFieldComponent = (): ReactElement => {

    const {control} = useFormContext<FieldArrayData>();
    const {
        fields: nestedFieldArray
    } = useFieldArray({
        control,
        name: "nestedField"
    });

    return (
        <>
            {nestedFieldArray
                .map((field, index) => <NestedField key={field.id}/>)
            }
        </>
    );
};
export default NestedFieldComponent;