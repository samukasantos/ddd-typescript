import Order from "./order";
import OrderItem from "./orderItem";

describe('Order unit tests', ()=>{
   
    it("should throw error when id is empty", ()=>{
       expect(()=>{
        let order = new Order("", "123", []);
       }).toThrowError("Id is required.");
    });

    it("should throw error when customerId is empty", ()=>{
        expect(()=>{
         let order = new Order("123", "", []);
        }).toThrowError("Id is required.");
     });

     it("should throw error when quantity of items is zero", ()=>{
        expect(()=>{
         let order = new Order("123", "123", []);
        }).toThrowError("Item quantity must be greater than 0.");
     });

     it("should calculate total", ()=>{
        let item1 = new OrderItem("i1", "Item 1", 100, "p1", 2);
        let item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
        let order = new Order("o1", "c1", [item1]);
        
        let total = order.total();

        expect(total).toBe(200)

        let order2 = new Order("o2", "c2", [item1, item2]);
        total = order2.total();
        
        expect(total).toBe(600);
     });

     it("should throw error if the item quantity is less or equal 0", ()=>{
      expect(()=>{
         let item1 = new OrderItem("i1", "Item 1", 100, "p1", 0);
         let order = new Order("o1", "c1", [item1]);
      }).toThrowError("Quantity must be greater than 0.")
   });
});