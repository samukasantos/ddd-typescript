import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerRepositoryInterface from "./customer.repository.interface";


export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: Customer): Promise<void> {
        
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            rewardPoints: entity.rewardPoints,
            active: entity.isActive()
        });
    }
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
        {
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            rewardPoints: entity.rewardPoints,
            active: entity.isActive()
        },
        {
            where: {
                id: entity.id
            }
        })
    }
    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({
                where: {
                    id
                },
                rejectOnEmpty: true,
            });
        } catch (error) {
            throw new Error('Customer not found.');    
        }

        const customer = new Customer(customerModel.id, customerModel.name);
        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zipcode,
            customerModel.city
        );
        customer.changeAddress(address);

        return customer;
    }

    async findAll(): Promise<Customer[]> {
        
        const customerModels = await CustomerModel.findAll();

        const customers = customerModels.map(customerModel => {
           let customer = new Customer(customerModel.id, customerModel.name);
           customer.AddRewardPoints(customerModel.rewardPoints);
           const address = new Address(
                customerModel.street, 
                customerModel.number,
                customerModel.zipcode,
                customerModel.city
            );
            customer.changeAddress(address);
            if(customerModel.active){
                customer.activate();
            }
            return customer;
        });

        return customers;
    }

}