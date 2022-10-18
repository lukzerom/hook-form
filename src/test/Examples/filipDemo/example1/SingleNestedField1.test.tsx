import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import SingleNestedField1 from "../../../../Examples/filipDemo/example1/SingleNestedField1";
import ReactHookFormWrapper from "../../../reactHookFormWrapper";
import {FieldArrayData} from "../../../../Examples/filipDemo/useFieldArrayDemoFormSchema";


describe('SingleNestedField1', () => {

    const removeMock = jest.fn();
    const onSubmitMock = jest.fn();

    const defaultValues: FieldArrayData = {
        nestedField: [
            {
                name: "Test",
                surname: "Surname",
                age: 19,
                phoneNumber: "123-123-123",
                orderAlcohol: "RUM",
            },
        ],
    };

    beforeEach(() => {
        removeMock.mockReset();
        onSubmitMock.mockReset();
    });

    const renderComponent = () => {
        return render(
            <ReactHookFormWrapper defaultValues={defaultValues} onSubmit={onSubmitMock}>
                <SingleNestedField1
                    index={0}
                    remove={removeMock}
                />
            </ReactHookFormWrapper>
        );
    };

    test("should match snapshot", () => {
        const {container} = renderComponent();

        expect(container).toMatchSnapshot();
    });

    test("should show submitted object", async () => {
        renderComponent();

        fireEvent.change(screen.getByLabelText("Name"), {target: {value: "testName"}});
        fireEvent.change(screen.getByLabelText("Surname"), {target: {value: "testSurname"}});
        fireEvent.change(screen.getByLabelText("Phone Number"), {target: {value: "999-999-999"}});
        fireEvent.change(screen.getByLabelText("Age"), {target: {value: "99"}});

        fireEvent.click(screen.getByTestId("submitMock"));

        await waitFor(() => {
            expect(onSubmitMock.mock.calls[0][0]).toMatchObject({
                nestedField: [
                    {
                        name: "testName",
                        surname: "testSurname",
                        age: 99,
                        phoneNumber: "999-999-999",
                        orderAlcohol: "RUM",
                    },
                ],
            } as FieldArrayData);
        });
    });
});
