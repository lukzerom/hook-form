export const Alcohol = [
    "NONE",
    "VODKA",
    "GIN",
    "RUM",
    "BEER",
    "WINE",
]

export interface NestedField {
    name: string
    surname: string
    age: number
    phoneNumber: string
    orderAlcohol: ("NONE" | "VODKA" | "GIN" | "RUM" | "BEER" | "WINE")
}

// export interface MovieData {
//     isMovieFan: boolean
//     movieType: string[]
// }

export interface FieldArrayData {
    nestedField: NestedField[]
}

export const defaultFieldArrayData: FieldArrayData = {
    nestedField: [],
}

export const defaultSingleNestedField: NestedField = {
    name: "",
    surname: "",
    phoneNumber: "",
    age: 1,
    orderAlcohol: "NONE"
}