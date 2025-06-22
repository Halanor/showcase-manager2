import { MongoClient } from 'mongodb';

export default class ShowcaseController {
  constructor() {
    this.client = null;
    this.collection = null;
    this.uri = 'mongodb://localhost:27017';
  }

  async connect() {
    if (!this.client || !this.client.topology || !this.client.topology.isConnected()) {
      this.client = new MongoClient('mongodb://localhost:27017');
      try {
        await this.client.connect();
        console.log('Connected to MongoDB');
      } catch (err) {
        console.error('MongoDB connection error:', err);
        return null;
      }
    }

    this.collection = this.client.db('admin').collection('showcases'); // You can change 'admin' to your real DB
    return this.collection;
  }

  async add(name) {
    const collection = await this.connect();
    if (!collection) return;

    await collection.insertOne({
      name,
      lights: ['spots', 'LED Strip'],
      temps: [],
      humidity: [],
      createdAt: new Date(),
    });

    console.log('Showcase inserted');
  }

  async remove(name) {
    const collection = await this.connect();
    if (!collection) return;

    const result = await collection.deleteOne({ name });
    if (result.deletedCount > 0) {
      console.log(`Showcase '${name}' removed`);
    } else {
      console.log(`Showcase '${name}' not found`);
    }
  }

  async rename(oldName, newName) {
    const collection = await this.connect();
    if (!collection) return;

    const result = await collection.updateOne(
      { name: oldName },
      { $set: { name: newName } }
    );

    if (result.matchedCount > 0) {
      console.log(`Showcase renamed from '${oldName}' to '${newName}'`);
    } else {
      console.log(`Showcase '${oldName}' not found`);
    }
  }

  async list() {
    const collection = await this.connect();
    if (!collection) return [];

    const all = await collection.find({}).toArray();
    return all;
  }

  async close() {
    if (this.client && this.client.topology?.isConnected()) {
      await this.client.close();
      console.log('MongoDB connection closed');
    }
  }
}
