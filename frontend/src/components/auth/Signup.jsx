import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant.js';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: '',
    });
    const { loading, user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(); // FormData object
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('role', input.role);
        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen p-4">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-md border border-gray-200 rounded-md p-6 shadow-lg"
                >
                    <h1 className="font-bold text-2xl mb-6 text-center">Sign Up</h1>

                    {/* Full Name Input */}
                    <div className="mb-4">
                        <Label htmlFor="fullname">Full Name</Label>
                        <Input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            placeholder="Enter your full name"
                            className="w-full mt-1"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            className="w-full mt-1"
                        />
                    </div>

                    {/* Phone Number Input */}
                    <div className="mb-4">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            placeholder="Enter your phone number"
                            className="w-full mt-1"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className="w-full mt-1"
                        />
                    </div>

                    {/* Role Selection */}
                    <div className="mb-4">
                        <Label className="block mb-2">Role</Label>
                        <RadioGroup className="flex space-x-6 sm:space-x-8">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id="student"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="w-4 h-4 cursor-pointer"
                                />
                                <Label htmlFor="student" className="cursor-pointer text-sm">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id="recruiter"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="w-4 h-4 cursor-pointer"
                                />
                                <Label htmlFor="recruiter" className="cursor-pointer text-sm">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Profile Picture Upload */}
                    <div className="mb-6">
                        <Label htmlFor="file" className="block mb-2">
                            Profile Picture
                        </Label>
                        <Input
                            type="file"
                            id="file"
                            accept="image/*"
                            onChange={changeFileHandler}
                            className="w-full"
                        />
                    </div>

                    {/* Submit Button */}
                    {loading ? (
                        <Button className="w-full" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                    )}

                    {/* Login Link */}
                    <div className="mt-4 text-center">
                        <span className="text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 hover:underline">
                                Login
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;