import { MongoClient } from 'mongodb';

class ShowcaseDAO {
  constructor() {
    this.client = null;
    this.collection = null;
    this.uri = 'mongodb://localhost:27017';
  }

  async connect() {
    if (!this.client || !this.client.topology?.isConnected()) {
      this.client = new MongoClient(this.uri);
      await this.client.connect();
      this.collection = this.client.db('admin').collection('showcases');
    }
    return this.collection;
  }

  async add(data) {
    const collection = await this.connect();
    return collection.insertOne(data);
  }

  async remove(name) {
    const collection = await this.connect();
    return collection.deleteOne({ name });
  }

  async rename(oldName, newName) {
    const collection = await this.connect();
    return collection.updateOne({ name: oldName }, { $set: { name: newName } });
  }

  async list() {
    const collection = await this.connect();
    return collection.find({}).toArray();
  }

  async updateField({ name, field, value }) {
    const collection = await this.connect();
    return collection.updateOne({ name }, { $set: { [field]: value } }); 
  }

  async close() {
    if (this.client?.topology?.isConnected()) {
      await this.client.close();
    }
  }
}

export const showcaseDAO = new ShowcaseDAO();

