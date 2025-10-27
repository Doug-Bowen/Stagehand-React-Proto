import {claimFactory} from '../Factories/Claims.Factory';

export class GoodClaim {
    constructor() {
        return claimFactory(
            {
                number: "133",
                type: "Windshield",
                condition: "Good",
                year: "2020",
                make: "Toyota",
                model: "Tundra"
            });
    }
}

export class BadClaim {
    constructor() {
        return claimFactory(
            {
                number: "69420",
                type: "Collateral Damage",
                condition: "Abysmal",
                year: "2001",
                make: "Fjord",
                model: "Fauxcus"
            });
    }
}