import showcases from '../../../../showcases.json';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

export async function POST(request) {
  const {
    username,
    password,
    dateOfBirth,
    email,
    address,
    phone1,
    phone2,
  } = await request.json();

  // field validations
  if (!username || !password || !dateOfBirth || !email || !address || !phone1) {
    return new Response(
      JSON.stringify({ error: 'Missing required fields' }),
      { status: 400 }
    );
  }

  // email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: 'Invalid email address' }),
      { status: 400 }
    );
  }

  // address validation
  const { street, number, postalCode, city } = address;
  if (!street || !number || !postalCode || !city) {
    return new Response(
      JSON.stringify({ error: 'Missing required address fields' }),
      { status: 400 }
    );
  }

  // admin.showcases.users is an array check
  if (!Array.isArray(showcases.admin.showcases.users)) {
    showcases.admin.showcases.users = [];
  }

  // check if user already exists
  const userExists = showcases.admin.showcases.users.some((user) => user.username === username);
  if (userExists) {
    return new Response(
      JSON.stringify({ error: 'Username already taken.' }),
      { status: 409 }
    );
  }

  // password hadd
  const hashedPassword = await bcrypt.hash(password, 10);

  // push new user to db
  showcases.admin.showcases.users.push({
    username,
    password: hashedPassword,
    dateOfBirth,
    email,
    address,
    phone1,
    phone2,
  });

  // save showcases.json
  const showcasesFile = path.join(process.cwd(), 'showcases.json');
  fs.writeFileSync(showcasesFile, JSON.stringify(showcases, null, 2));

  return new Response(
    JSON.stringify({ message: 'User registered successfully' }),
    { status: 201 }
  );
}


