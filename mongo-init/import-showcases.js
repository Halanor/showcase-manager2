db = db.getSiblingDB('admin');
const showcases = cat('/docker-entrypoint-initdb.d/showcases.json');
JSON.parse(showcases).forEach(doc => db.showcases.insertOne(doc));