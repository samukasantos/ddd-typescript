import Customer from './domain/customer/entity/customer';
import Address from './domain/customer/value-object/address';


let customer = new Customer('123', 'Sam Santos');
let address = new Address('Hirst Street', 207, 2205, 'Turrella');
customer.address = address;
customer.activate();

// let item1 = new OrderItem("1", "Mouse", 22);
// let item2 = new OrderItem("2", "Monitor", 67);
// let item3 = new OrderItem("3", "Motherboard", 1232);
// let order = new Order('5', '123', [item1, item2, item3])
