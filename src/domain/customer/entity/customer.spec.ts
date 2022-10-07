import Address from "../value-object/address";
import Customer from "./customer";

describe('Customer unit tests', ()=>{
   
    it("should throw error when id is empty", ()=>{
        expect(()=>{
            let customer = new Customer("","Test")
        }).toThrowError("Id is required.")
    });

    it("should throw error when name is empty", ()=>{
        expect(()=>{
            let customer = new Customer("123","")
        }).toThrowError("Name is required.")
    });

    it("should change name", ()=>{
        //ARRANGE
        let customer = new Customer("123", "John");

        //ACT
        customer.changeName("Jane");

        //ASSERT
        expect(customer.name).toBe("Jane")
    });

    it("should activate customer", ()=>{
        //ARRANGE
        let customer = new Customer("123", "John");
        let address = new Address("Street One", 123, 2205, "Sydney")
        //ACT
        customer.address = address;
        customer.activate();

        //ASSERT
        expect(customer.isActive()).toBe(true)
    });

    it("should deactivate customer", ()=>{
        //ARRANGE
        let customer = new Customer("123", "John");

        //ACT
        customer.deactivate();

        //ASSERT
        expect(customer.isActive()).toBe(false)
    });

    it("should add reward points", ()=>{
        let customer = new Customer("123", "John");
        expect(customer.rewardPoints).toBe(0);
        
        customer.AddRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.AddRewardPoints(20);
        expect(customer.rewardPoints).toBe(20);
    });

    it("should add reward points", ()=>{
        //ARRANGE
        let customer = new Customer("123", "John");

        //ACT
        customer.deactivate();

        //ASSERT
        expect(customer.isActive()).toBe(false)
    });

    it("should throw error when Address is undefined when the customer is activated", ()=>{
        
        expect(()=>{
            let customer = new Customer("123", "John");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer.")
    });
})