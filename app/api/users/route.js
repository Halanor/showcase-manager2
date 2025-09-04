import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// get
export async function GET(request) {
  try {
    await client.connect();
    const db = client.db('admin');
    const usersCollection = db.collection('users');

    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (username) {
      // Fetch single user by username
      const user = await usersCollection.findOne(
        { username },
        { projection: { password: 0 } }
      );
      if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
      }
      return new Response(JSON.stringify(user), { status: 200 });
    }

    // fetch users
    const users = await usersCollection
      .find({}, { projection: { password: 0 } })
      .toArray();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  } finally {
    await client.close();
  }
}

// post new users
export async function POST(request) {
  const {
    username,
    password,
    name,
    lastname,
    dateOfBirth,
    email,
    address,
    phone1,
    phone2
  } = await request.json();

  if (!username || !password || !name || !lastname || !dateOfBirth || !email || !address || !phone1) {
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
      name,
      lastname,
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

// patch user info update
export async function PATCH(request) {
  const body = await request.json();
  const { username, role, updates, currentPassword, newPassword } = body;

  if (!username) {
    return new Response(
      JSON.stringify({ error: 'Missing username' }),
      { status: 400 }
    );
  }

  try {
    await client.connect();
    const db = client.db('admin');
    const usersCollection = db.collection('users');

    // ps change
    if (currentPassword && newPassword) {
      const user = await usersCollection.findOne({ username });
      if (!user) {
        return new Response(
          JSON.stringify({ error: 'User not found' }),
          { status: 404 }
        );
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return new Response(
          JSON.stringify({ error: 'Current password is incorrect' }),
          { status: 400 }
        );
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const res = await usersCollection.updateOne(
        { username },
        { $set: { password: hashedPassword } }
      );
      if (res.modifiedCount === 0) {
        return new Response(
          JSON.stringify({ error: 'Password not updated' }),
          { status: 500 }
        );
      }
      return new Response(
        JSON.stringify({ message: 'Password updated successfully' }),
        { status: 200 }
      );
    }

    // role update
    if (role) {
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
    }

    // user info fields update
    if (updates) {
      const res = await usersCollection.updateOne(
        { username },
        { $set: updates }
      );
      if (res.modifiedCount === 0) {
        return new Response(
          JSON.stringify({ error: 'User not found or data unchanged' }),
          { status: 404 }
        );
      }
      return new Response(
        JSON.stringify({ message: 'User updated successfully' }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Nothing to update' }),
      { status: 400 }
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
