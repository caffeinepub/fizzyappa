import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

module {
  type OldProduct = {
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

  type OldActor = {
    nextOrderId : Nat;
    orderMap : Map.Map<Nat, Order>;
    productMap : Map.Map<Nat, OldProduct>;
    cities : [Text];
    seededProducts : [OldProduct];
  };

  type NewProduct = {
    id : Nat;
    name : Text;
    priceInPaisa : Nat;
    stock : Nat;
  };

  type NewActor = {
    nextOrderId : Nat;
    orderMap : Map.Map<Nat, Order>;
    productMap : Map.Map<Nat, NewProduct>;
    cities : [Text];
    seededProducts : [NewProduct];
  };

  public func run(old : OldActor) : NewActor {
    let newSeededProducts : [NewProduct] = [
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

    // Transform old productMap to only include new products
    let newProductMap = Map.empty<Nat, NewProduct>();

    for (product in newSeededProducts.values()) {
      newProductMap.add(product.id, product);
    };

    {
      nextOrderId = old.nextOrderId;
      orderMap = old.orderMap;
      productMap = newProductMap;
      cities = old.cities;
      seededProducts = newSeededProducts;
    };
  };
};
