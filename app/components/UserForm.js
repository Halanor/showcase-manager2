'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserForm({
  mode = 'register', // 'register' or 'edit'
  initialData = {},
  onSuccess, // callback after successful submit
}) {
  const router = useRouter();
  const [user, setUser] = useState({
    name: '',
    lastname: '',
    dateOfBirth: '',
    email: '',
    address: {
      street: '',
      number: '',
      postalCode: '',
      city: '',
    },
    phone1: '',
    phone2: '',
    username: '',
    password: '',
    ...initialData,
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // regex patterns
  const lettersPattern = /^[\p{L}\s'-]+$/u;
  const numbersPattern = /^\d+$/;

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setUser((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...validationErrors };

    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      if (['street', 'city'].includes(field) && value && !lettersPattern.test(value)) {
        newErrors[name] = 'Only letters allowed';
      } else if (['number', 'postalCode'].includes(field) && value && !numbersPattern.test(value)) {
        newErrors[name] = 'Only numbers allowed';
      } else {
        delete newErrors[name];
      }
      setValidationErrors(newErrors);
      setUser((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      if (['name', 'lastname'].includes(name) && value && !lettersPattern.test(value)) {
        newErrors[name] = 'Only letters allowed';
      } else if (['phone1', 'phone2'].includes(name) && value && !numbersPattern.test(value)) {
        newErrors[name] = 'Only numbers allowed';
      } else {
        delete newErrors[name];
      }
      setValidationErrors(newErrors);
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const passwordStrength = (password) => {
    if (password.length < 6) return 'Weak';
    if (/[A-Za-z]/.test(password) && /\d/.test(password) && password.length >= 8) return 'Strong';
    return 'Medium';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (user.password !== confirmPassword) {
        setError('Passwords do not match!');
        return;
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      setError('Invalid email address!');
      return;
    }

    try {
      let res;
      if (mode === 'register') {
        res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
      } else {
        res = await fetch('/api/users', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: user.username,
            updates: {
              name: user.name,
              lastname: user.lastname,
              dateOfBirth: user.dateOfBirth,
              email: user.email,
              address: user.address,
              phone1: user.phone1,
              phone2: user.phone2,
            },
          }),
        });
      }

      if (res.ok) {
        setSuccessMessage(
          mode === 'register'
            ? 'Registration successful! Redirecting...'
            : 'Information updated successfully!'
        );
        if (mode === 'register') {
          setTimeout(() => router.push('/'), 2000);
        }
        if (onSuccess) onSuccess();
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Error submitting form.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded p-6 space-y-3 w-full shadow">
      {successMessage && (
        <div className="bg-green-100 text-green-800 rounded p-3 text-center font-semibold">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 rounded p-3 text-center font-semibold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {/* name */}
        <div>
          <input
            required
            name="name"
            placeholder="First Name"
            value={user.name}
            onChange={handleChange}
            className="p-2 rounded border w-full"
          />
          {validationErrors.name && (
            <span className="text-red-500 text-sm">{validationErrors.name}</span>
          )}
        </div>
        {/* lastname */}
        <div>
          <input
            required
            name="lastname"
            placeholder="Last Name"
            value={user.lastname}
            onChange={handleChange}
            className="p-2 rounded border w-full"
          />
          {validationErrors.lastname && (
            <span className="text-red-500 text-sm">{validationErrors.lastname}</span>
          )}
        </div>

        {/* date of birth*/}
        <div className="col-span-1">
          {/* <label className="text-sm font-semibold">Date of Birth</label> */}
          <input
            required
            type="date"
            name="dateOfBirth"
            value={user.dateOfBirth}
            onChange={handleChange}
            className="p-2 rounded border w-full"
          />
        </div>

        {/* email */}
        <div className="col-span-2">
          <input
            required
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="p-2 rounded border w-full"
          />
        </div>

        {/* address */}
        <div>
          <input
            required
            name="address.street"
            placeholder="Street"
            value={user.address.street}
            onChange={handleChange}
            className="p-2 rounded border w-full"
          />
          {validationErrors['address.street'] && (
            <span className="text-red-500 text-sm">{validationErrors['address.street']}</span>
          )}
        </div>
        <div>
          <input
            required
            name="address.number"
            placeholder="Number"
            value={user.address.number}
            onChange={handleChange}
            className="p-2 rounded border w-full"
          />
          {validationErrors['address.number'] && (
            <span className="text-red-500 text-sm">{validationErrors['address.number']}</span>
          )}
        </div>
        <div>
          <input
            required
            name="address.postalCode"
            placeholder="Postal Code"
            value={user.address.postalCode}
            onChange={handleChange}
            className="p-2 rounded border w-full"
          />
          {validationErrors['address.postalCode'] && (
            <span className="text-red-500 text-sm">{validationErrors['address.postalCode']}</span>
          )}
        </div>
        <div>
          <input
            required
            name="address.city"
            placeholder="City"
            value={user.address.city}
            onChange={handleChange}
            className="p-2 rounded border w-full"
          />
          {validationErrors['address.city'] && (
            <span className="text-red-500 text-sm">{validationErrors['address.city']}</span>
          )}
        </div>

        {/* phones */}
        <div>
          <input
            required
            name="phone1"
            placeholder="Phone 1"
            value={user.phone1}
            onChange={handleChange}
            className="p-2 rounded border w-full"
          />
          {validationErrors.phone1 && (
            <span className="text-red-500 text-sm">{validationErrors.phone1}</span>
          )}
        </div>
        <div>
          <input
            name="phone2"
            placeholder="Phone 2"
            value={user.phone2}
            onChange={handleChange}
            className="p-2 rounded border w-full"
          />
          {validationErrors.phone2 && (
            <span className="text-red-500 text-sm">{validationErrors.phone2}</span>
          )}
        </div>
      </div>

      {/* account details */}
      {mode === 'register' && (
        <>
          <div className="border-t pt-3 mt-3">
            <h2 className="text-lg font-semibold text-gray-600 text-center">Account Details</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              name="username"
              placeholder="Username"
              value={user.username}
              onChange={handleChange}
              className="p-2 rounded border w-full"
            />
            <input
              required
              name="password"
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              className="p-2 rounded border w-full"
            />
            <input
              required
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 rounded border w-full col-span-2"
            />
          </div>
          <div className="text-sm text-gray-600 text-center mt-1">
            Password Strength:{' '}
            <span
              className={`font-bold ${
                passwordStrength(user.password) === 'Strong'
                  ? 'text-green-600'
                  : passwordStrength(user.password) === 'Medium'
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}
            >
              {passwordStrength(user.password)}
            </span>
          </div>
        </>
      )}

      <button
        type="submit"
        className="bg-gray-600 text-white rounded p-3 mt-4 w-full hover:bg-gray-700"
      >
        {mode === 'register' ? 'Register' : 'Save'}
      </button>
    </form>
  );
}
