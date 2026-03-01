import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";

actor {
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
    // Mango Tango
    {
      id = 1;
      name = "Mango Tango Classic Bomb";
      flavor = "Mango Tango";
      productType = "Classic Bomb";
      description = "Fizzy mango mocktail bomb";
      priceInPaisa = 8900;
      stock = 100;
    },
    {
      id = 2;
      name = "Mango Tango Taster Kit";
      flavor = "Mango Tango";
      productType = "Taster Kit";
      description = "Taster kit version";
      priceInPaisa = 34900;
      stock = 100;
    },
    {
      id = 3;
      name = "Mango Tango Party Pack";
      flavor = "Mango Tango";
      productType = "Party Pack";
      description = "Party pack with 15 bombs";
      priceInPaisa = 54900;
      stock = 100;
    },
    {
      id = 4;
      name = "Mango Tango Mega Box";
      flavor = "Mango Tango";
      productType = "Mega Box";
      description = "Bulk box with 30 bombs";
      priceInPaisa = 99900;
      stock = 100;
    },
    // Berry Blast
    {
      id = 5;
      name = "Berry Blast Classic Bomb";
      flavor = "Berry Blast";
      productType = "Classic Bomb";
      description = "Berry mocktail bomb";
      priceInPaisa = 8900;
      stock = 100;
    },
    {
      id = 6;
      name = "Berry Blast Taster Kit";
      flavor = "Berry Blast";
      productType = "Taster Kit";
      description = "Taster kit version";
      priceInPaisa = 34900;
      stock = 100;
    },
    {
      id = 7;
      name = "Berry Blast Party Pack";
      flavor = "Berry Blast";
      productType = "Party Pack";
      description = "Party pack with 15 bombs";
      priceInPaisa = 54900;
      stock = 100;
    },
    {
      id = 8;
      name = "Berry Blast Mega Box";
      flavor = "Berry Blast";
      productType = "Mega Box";
      description = "Bulk box with 30 bombs";
      priceInPaisa = 99900;
      stock = 100;
    },
    // Citrus Zing
    {
      id = 9;
      name = "Citrus Zing Classic Bomb";
      flavor = "Citrus Zing";
      productType = "Classic Bomb";
      description = "Citrus mocktail bomb";
      priceInPaisa = 45000;
      stock = 100;
    },
    {
      id = 10;
      name = "Citrus Zing Taster Kit";
      flavor = "Citrus Zing";
      productType = "Taster Kit";
      description = "Taster kit version";
      priceInPaisa = 34900;
      stock = 100;
    },
    {
      id = 11;
      name = "Citrus Zing Party Pack";
      flavor = "Citrus Zing";
      productType = "Party Pack";
      description = "Party pack with 15 bombs";
      priceInPaisa = 54900;
      stock = 100;
    },
    {
      id = 12;
      name = "Citrus Zing Mega Box";
      flavor = "Citrus Zing";
      productType = "Mega Box";
      description = "Bulk box with 30 bombs";
      priceInPaisa = 99900;
      stock = 100;
    },
    // Rose Lychee
    {
      id = 13;
      name = "Rose Lychee Classic Bomb";
      flavor = "Rose Lychee";
      productType = "Classic Bomb";
      description = "Rose lychee mocktail bomb";
      priceInPaisa = 8900;
      stock = 100;
    },
    {
      id = 14;
      name = "Rose Lychee Taster Kit";
      flavor = "Rose Lychee";
      productType = "Taster Kit";
      description = "Taster kit version";
      priceInPaisa = 34900;
      stock = 100;
    },
    {
      id = 15;
      name = "Rose Lychee Party Pack";
      flavor = "Rose Lychee";
      productType = "Party Pack";
      description = "Party pack with 15 bombs";
      priceInPaisa = 54900;
      stock = 100;
    },
    {
      id = 16;
      name = "Rose Lychee Mega Box";
      flavor = "Rose Lychee";
      productType = "Mega Box";
      description = "Bulk box with 30 bombs";
      priceInPaisa = 99900;
      stock = 100;
    },
    // Mint Mojito
    {
      id = 17;
      name = "Mint Mojito Classic Bomb";
      flavor = "Mint Mojito";
      productType = "Classic Bomb";
      description = "Mint mojito mocktail bomb";
      priceInPaisa = 8900;
      stock = 100;
    },
    {
      id = 18;
      name = "Mint Mojito Taster Kit";
      flavor = "Mint Mojito";
      productType = "Taster Kit";
      description = "Taster kit version";
      priceInPaisa = 34900;
      stock = 100;
    },
    {
      id = 19;
      name = "Mint Mojito Party Pack";
      flavor = "Mint Mojito";
      productType = "Party Pack";
      description = "Party pack with 15 bombs";
      priceInPaisa = 54900;
      stock = 100;
    },
    {
      id = 20;
      name = "Mint Mojito Mega Box";
      flavor = "Mint Mojito";
      productType = "Mega Box";
      description = "Bulk box with 30 bombs";
      priceInPaisa = 99900;
      stock = 100;
    },
    // Watermelon Wave
    {
      id = 21;
      name = "Watermelon Wave Classic Bomb";
      flavor = "Watermelon Wave";
      productType = "Classic Bomb";
      description = "Watermelon mocktail bomb";
      priceInPaisa = 8900;
      stock = 100;
    },
    {
      id = 22;
      name = "Watermelon Wave Taster Kit";
      flavor = "Watermelon Wave";
      productType = "Taster Kit";
      description = "Taster kit version";
      priceInPaisa = 34900;
      stock = 100;
    },
    {
      id = 23;
      name = "Watermelon Wave Party Pack";
      flavor = "Watermelon Wave";
      productType = "Party Pack";
      description = "Party pack with 15 bombs";
      priceInPaisa = 54900;
      stock = 100;
    },
    {
      id = 24;
      name = "Watermelon Wave Mega Box";
      flavor = "Watermelon Wave";
      productType = "Mega Box";
      description = "Bulk box with 30 bombs";
      priceInPaisa = 99900;
      stock = 100;
    },
    // Special product
    {
      id = 25;
      name = "Sex on the Beach Classic Bomb";
      flavor = "Sex on the Beach";
      productType = "Classic Bomb";
      description = "Classic bomb";
      priceInPaisa = 8900;
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
    let total = items.values().foldLeft(
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
