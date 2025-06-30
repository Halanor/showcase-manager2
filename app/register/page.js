import UserForm from '../components/UserForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">Create an Account</h1>
      <div className="w-full max-w-2xl">
        <UserForm mode="register" />
      </div>
    </div>
  );
}
