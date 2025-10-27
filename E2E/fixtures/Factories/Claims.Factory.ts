export const claimFactory = ({number, type, condition,year,make,model}: IMockClaim): IMockClaim => {
    return {
        number: number,
        type: type,
        condition: condition,
        year: year,
        make: make,
        model: model
    }
}

interface IMockClaim {
    number: string,
    type: string,
    condition: string,
    year: string,
    make: string,
    model: string
}