import {userFactory} from '../Factories/Users.Factory';

export class ChuckNorris {
    constructor() {
        return userFactory(
            {
                lastName: "Norris",
                firstName: "Chuck",
                primaryPhone: "867-5309",
                secondaryPhone: "1-800-273-8255",
                email: "chuck.norris@texasRangers.org",
                street: "Salt Lick Creek Rd",
                city: "Bugtussle",
                state: "KY",
                zip: "42140"
            });
    }
}

export class SusanGransbury {
    constructor() {
        return userFactory(
            {
                lastName: "Gransbury",
                firstName: "SusannnaLeeAndraAnna",
                primaryPhone: "1-800-700-600-500-400-Collect",
                secondaryPhone: "12X-2344-XX21",
                email: "susan.gransTheGreat@largeShipments.gov",
                street: "Up Yonder Lane",
                city: "onomatopoeia",
                state: "OfMind",
                zip: "A2C44"
            });
    }
}