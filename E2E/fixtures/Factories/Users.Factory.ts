export const userFactory = ({lastName, firstName, primaryPhone,secondaryPhone,email,street,city,state,zip}: IMockUser): IMockUser => {
    return {
        lastName: lastName,
        firstName: firstName,
        primaryPhone: primaryPhone,
        secondaryPhone: secondaryPhone,
        city: city,
        email: email,
        street: street,
        state: state,
        zip: zip
    }
}

interface IMockUser {
    lastName: string,
    firstName: string,
    primaryPhone: string,
    secondaryPhone: string,
    email: string,
    street: string,
    city: string,
    state: string,
    zip: string
}