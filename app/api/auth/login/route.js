import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return new Response(
      JSON.stringify({ error: "Missing username or password" }),
      { status: 400 }
    );
  }

  try {
    await client.connect();
    const database = client.db("admin");
    const usersCollection = database.collection("users");

    const user = await usersCollection.findOne({ username });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid username or password" }),
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid username or password" }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: {
          username: user.username,
          role: user.role || "maintenant" // fallback just in case
        }
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
