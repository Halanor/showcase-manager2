import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const db = client.db('admin');
    const usersCollection = db.collection('users');
    const users = await usersCollection
      .find({}, { projection: { password: 0 } }) // NEVER expose password hashes
      .toArray();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  const {
    username,
    password,
    dateOfBirth,
    email,
    address,
    phone1,
    phone2
  } = await request.json();

  if (!username || !password || !dateOfBirth || !email || !address || !phone1) {
    return new Response(
      JSON.stringify({ error: 'Missing required fields' }),
      { status: 400 }
    );
  }

  const { street, number, postalCode, city } = address;
  if (!street || !number || !postalCode || !city) {
    return new Response(
      JSON.stringify({ error: 'Missing required address fields' }),
      { status: 400 }
    );
  }

  try {
    await client.connect();
    const db = client.db('admin');
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Username already taken' }),
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      password: hashedPassword,
      role: 'maintenance', // default role
      dateOfBirth,
      email,
      address,
      phone1,
      phone2
    };

    await usersCollection.insertOne(newUser);

    return new Response(
      JSON.stringify({ message: 'User registered successfully' }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function PATCH(request) {
  const { username, role } = await request.json();

  if (!username || !role) {
    return new Response(
      JSON.stringify({ error: 'Missing username or role' }),
      { status: 400 }
    );
  }

  try {
    await client.connect();
    const db = client.db('admin');
    const usersCollection = db.collection('users');

    const res = await usersCollection.updateOne(
      { username },
      { $set: { role } }
    );

    if (res.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ error: 'User not found or role unchanged' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Role updated successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
