import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type Product = {
    id : Nat;
    name : Text;
    flavor : Text;
    productType : Text;
    description : Text;
    priceInPaisa : Nat;
    stock : Nat;
  };

  type OrderItem = { productId : Nat; quantity : Nat; priceInPaisa : Nat };

  type Order = {
    id : Nat;
    customerName : Text;
    customerPhone : Text;
    deliveryCity : Text;
    deliveryAddress : Text;
    items : [OrderItem];
    totalInPaisa : Nat;
    status : Text;
    createdAt : Int;
  };

  // Only required on first deployment to seed the products.
  type OldActor = {
    productMap : Map.Map<Nat, Product>;
    orderMap : Map.Map<Nat, Order>;
    nextOrderId : Nat;
  };

  type NewActor = {
    productMap : Map.Map<Nat, Product>;
    orderMap : Map.Map<Nat, Order>;
    nextOrderId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    old;
  };
};
