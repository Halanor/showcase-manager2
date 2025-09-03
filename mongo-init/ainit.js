db = db.getSiblingDB('admin');
db.users.insertOne({
  username: "admin",
  password: "$2b$10$dx./.Z2nwjgap2e7AC3TMe0ah0XGZMT6EhImGkGgZ5bqcjmfzlVRq",
  role: "admin"
});