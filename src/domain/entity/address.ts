export default class Address{
    _street: string
    _number: number
    _zip: number
    _city: string

    constructor(street: string, number: number, zip: number, city: string){
        this._street = street;
        this._number = number;
        this._zip = number;
        this._city = city;
    }

    validate(){
        if(this._street.length === 0){
            throw new Error("Street is required.");
        }

        if(this._number === 0){
            throw new Error("Number is required.");
        }

        if(this._zip === 0){
            throw new Error("Zip Code is required.");
        }

        if(this._city.length === 0){
            throw new Error("City is required.");
        }
    }

    get street(): string{
        return this._street;
    }

    get number(): number{
        return this._number;
    }

    get zip(): number{
        return this._zip;
    }

    get city(): string{
        return this._city;
    }

    toString(){
        return `${this._street}, ${this._number}, ${this._zip} ${this._city}`
    }

}