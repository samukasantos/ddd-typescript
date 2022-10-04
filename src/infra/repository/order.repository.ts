import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order.item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                product_id: item.productId
            }))
        },
        {
            include: [{ model: OrderItemModel }]
        });
    }

    async update(entity: Order): Promise<void> {
        throw new Error("Not implemented");
        
    }
    async find(id: string): Promise<Order> {
        throw new Error("Not implemented");
    }

    async findAll(): Promise<Order[]> {
        throw new Error("Not implemented");
    }

}