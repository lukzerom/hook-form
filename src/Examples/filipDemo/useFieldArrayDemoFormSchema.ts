
export enum Alcohol {
    WODKA="WODKA",
    GIN="GIN",
    RUM="RUM",
    BEER="BEER",
    WINE="WINE"
}

export type NestedField = {
    name: string
    surname: string
    age: number
    orderAlcohol: Alcohol
}

export type MovieData = {
    isMovieFan: boolean
    movieType: string[]
}

export type FieldArrayData = {
    stringField: string
    booleanField: boolean
    integerField: number
    nestedField: NestedField[]
    movieType: MovieData[]
}

export const defaultFieldArrayData: FieldArrayData = {
    stringField: "",
    booleanField: false,
    integerField: 0,
    nestedField: [],
    movieType: []
}