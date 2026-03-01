import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

import Migration "migration";

(with migration = Migration.run)
actor {
  type Product = {
    id : Nat;
    name : Text;
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

  var nextOrderId = 1;
  let orderMap = Map.empty<Nat, Order>();
  let productMap = Map.empty<Nat, Product>();

  let cities = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
  ];

  let seededProducts : [Product] = [
    // Classic Bombs
    {
      id = 1;
      name = "Mango Tango Classic Bomb";
      priceInPaisa = 8900;
      stock = 100;
    },
    {
      id = 2;
      name = "Berry Blast Classic Bomb";
      priceInPaisa = 8900;
      stock = 100;
    },
    {
      id = 3;
      name = "Rose Lychee Classic Bomb";
      priceInPaisa = 8900;
      stock = 100;
    },
    {
      id = 4;
      name = "Mint Mojito Classic Bomb";
      priceInPaisa = 8900;
      stock = 100;
    },
    {
      id = 5;
      name = "Watermelon Wave Classic Bomb";
      priceInPaisa = 8900;
      stock = 100;
    },
    {
      id = 6;
      name = "Sex on the Beach Classic Bomb";
      priceInPaisa = 8900;
      stock = 100;
    },
    {
      id = 7;
      name = "Citrus Zing Classic Bomb";
      priceInPaisa = 45000;
      stock = 100;
    },
    // Party Packs
    {
      id = 8;
      name = "Mango Tango Party Pack";
      priceInPaisa = 34900;
      stock = 100;
    },
    {
      id = 9;
      name = "Berry Blast Party Pack";
      priceInPaisa = 34900;
      stock = 100;
    },
    {
      id = 10;
      name = "Citrus Zing Party Pack";
      priceInPaisa = 34900;
      stock = 100;
    },
    // Mega Box
    {
      id = 11;
      name = "Mango Tango Mega Box";
      priceInPaisa = 54900;
      stock = 100;
    },
    {
      id = 12;
      name = "Berry Blast Mega Box";
      priceInPaisa = 54900;
      stock = 100;
    },
  ];

  public query ({ caller }) func getProducts() : async [Product] {
    productMap.values().toArray();
  };

  public query ({ caller }) func getProduct(id : Nat) : async ?Product {
    productMap.get(id);
  };

  public query ({ caller }) func getAvailableCities() : async [Text] {
    cities;
  };

  public query ({ caller }) func getOrders() : async [Order] {
    orderMap.values().toArray();
  };

  public shared ({ caller }) func placeOrder(
    customerName : Text,
    customerPhone : Text,
    deliveryCity : Text,
    deliveryAddress : Text,
    items : [OrderItem]
  ) : async Nat {
    let total = items.foldLeft(
      0,
      func(acc, item) {
        acc + (item.priceInPaisa * item.quantity);
      },
    );

    let order : Order = {
      id = nextOrderId;
      customerName;
      customerPhone;
      deliveryCity;
      deliveryAddress;
      items;
      totalInPaisa = total;
      status = "Pending";
      createdAt = Time.now();
    };

    orderMap.add(nextOrderId, order);
    nextOrderId += 1;
    order.id;
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, status : Text) : async () {
    let order = switch (orderMap.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?o) { o };
    };

    let updatedOrder : Order = {
      id = order.id;
      customerName = order.customerName;
      customerPhone = order.customerPhone;
      deliveryCity = order.deliveryCity;
      deliveryAddress = order.deliveryAddress;
      items = order.items;
      totalInPaisa = order.totalInPaisa;
      status = status;
      createdAt = order.createdAt;
    };

    orderMap.add(orderId, updatedOrder);
  };
};
