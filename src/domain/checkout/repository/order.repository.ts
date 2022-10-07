import OrderItemModel from "../../../infra/order/repository/sequelize/order.item.model";
import OrderModel from "../../../infra/order/repository/sequelize/order.model";
import Order from "../entity/order";
import OrderRepositoryInterface from "./order.repository.interface";


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