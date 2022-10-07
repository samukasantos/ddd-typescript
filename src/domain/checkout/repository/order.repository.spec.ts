import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model";
import OrderItemModel from "../../../infra/order/repository/sequelize/order.item.model";
import OrderModel from "../../../infra/order/repository/sequelize/order.model";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import Address from "../../customer/value-object/address";
import Customer from "../../customer/entity/customer";
import CustomerRepository from "../../customer/repository/customer.repository";
import Product from "../../product/entity/product";
import ProductRepository from "../../product/repository/product.repository";
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import OrderRepository from "./order.repository";

describe("Order Repository test", () => {
    
    let sequelize: Sequelize;

    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true}
        });

        await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, 2205, "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
           id: "123",
           customer_id: "123",
           total: order.total(),
           items:[
            {
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: "123",
                product_id: "123"
            }
           ]
        })
    });

});