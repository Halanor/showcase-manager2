db = db.getSiblingDB('admin');

db.users.insertOne({
  username: "admin",
  password: "$2b$10$dx./.Z2nwjgap2e7AC3TMe0ah0XGZMT6EhImGkGgZ5bqcjmfzlVRq",
  role: "admin"
});

db.showcases.insertMany([
  {
    _id: ObjectId("6856a622c9af8dd4bda803cd"),
    name: "Showcase 1",
    exhibit: "Egypt",
    temps: [
      23, 25, 28, 23, 24, 23, 22, 24, 23, 23, 23, 24,
      25, 26, 27, 26, 25, 24, 24, 23, 23, 24, 24, 24
    ],
    light: true,
    humidity: [
      45, 47, 43, 46, 47, 44, 42, 41, 41, 42, 44, 44,
      45, 44, 43, 46, 45, 43, 42, 43, 44, 43, 43, 44
    ],
    led: true,
    spot: true,
    lock: true
  },
  {
    _id: ObjectId("6856a622c9af8dd4bda803ce"),
    name: "Showcase 2",
    exhibit: "Sparta",
    temps: [
      21, 25, 27, 22, 27, 24, 25, 22, 21, 26, 27, 24,
      25, 23, 22, 21, 24, 25, 24, 22, 25, 27, 26, 24
    ],
    humidity: [
      47, 48, 44, 46, 47, 45, 43, 41, 42, 44, 47, 46,
      45, 43, 44, 41, 46, 47, 45, 44, 46, 47, 48, 45
    ],
    light: true,
    led: true,
    spot: true,
    lock: true
  },
  {
    _id: ObjectId("6856a622c9af8dd4bda803cf"),
    name: "Showcase 3",
    exhibit: "Drama",
    temps: [
      22, 24, 28, 22, 24, 25, 23, 22, 25, 27, 26, 24,
      22, 23, 21, 24, 25, 27, 26, 25, 24, 22, 21, 23
    ],
    humidity: [
      41, 42, 45, 46, 44, 43, 41, 47, 48, 46, 44, 43,
      41, 45, 46, 48, 44, 43, 41, 44, 46, 47, 48, 45
    ],
    light: true,
    led: true,
    spot: true,
    lock: true
  },
  {
    _id: ObjectId("6857290763ba85f9d6d944cf"),
    name: "Showcase 4",
    temps: [
      21, 22, 24, 25, 21, 26, 27, 25, 24, 21, 22, 25,
      26, 27, 24, 21, 22, 24, 25, 27, 22, 25, 24, 27
    ],
    humidity: [
      44, 41, 46, 43, 45, 47, 44, 46, 41, 44, 45, 46,
      41, 47, 43, 44, 46, 47, 41, 43, 45, 46, 47, 44
    ],
    exhibit: "Modern",
    createdAt: ISODate("2025-06-21T21:49:59.950Z"),
    light: true,
    led: true,
    spot: true,
    lock: true
  },
  {
    _id: ObjectId("685c549b528d827b3f61d54f"),
    name: "Showcase 5",
    temperature: 0,
    humidity: [
      44, 43, 41, 46, 47, 44, 41, 46, 43, 45, 46, 41,
      44, 43, 46, 44, 45, 43, 41, 46, 44, 45, 46, 47
    ],
    temps: [
      20, 21, 22, 25, 27, 24, 23, 25, 22, 24, 25, 27,
      24, 21, 22, 25, 27, 24, 23, 22, 25, 24, 21, 27
    ],
    lock: true,
    led: true,
    spot: true,
    light: true,
    createdAt: ISODate("2025-06-25T19:57:15.137Z")
  },
]);