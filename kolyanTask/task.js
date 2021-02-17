const AIRCRAFT_TYPES = {
    type1: `plane`,
    type2: `copter`,
}

class AircraftTypeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AircraftTypeError';
    }
}



class Aircraft {
    constructor() {}
    
    type = null;

    setType(type) {
        let arrOfTypes = Object.values(AIRCRAFT_TYPES)

        if (!arrOfTypes.includes(type)) {
            throw new AircraftTypeError(`Wrong aircraft type!`)
        } 

        this.type = type; 
    }

    motors = 0;

    addMotors(count) {
        if (this.type == null) {
            throw new AircraftTypeError('Aircraft type not set!')
        }
        if (this.type === AIRCRAFT_TYPES.type1) {
            if (count <= 2) {
                this.motors = count;
            } else  {
                throw new AircraftTypeError('Unacceptable motor count!')
            }
        }
        if (this.type === AIRCRAFT_TYPES.type2) {
            if ((count > 3) && (count <= 8)) {
                this.motors = count;
            } else {
                throw new AircraftTypeError('Unacceptable motor count!')
            }
        }
    }

    propeller = {};

    addPropeller(diam, pitch) {
        if (this.type == null) {
            throw new AircraftTypeError('Aircraft type not set!')
        } else {
        this.propeller.diameter = diam;
        this.propeller.pitch = pitch;
        }
    }   
}
