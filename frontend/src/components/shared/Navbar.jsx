import React, { useState, useEffect } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';

const DIM_COLORS = ["#2F4F4F", "#708090", "#778899", "#B0C4DE"];

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const color = useMotionValue(DIM_COLORS[0]);

    useEffect(() => {
        animate(color, DIM_COLORS, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        });
    }, []);

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <motion.div
            style={{ backgroundImage }}
            className="relative bg-gray-950"
        >
            {/* Stars Animation */}
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <Stars radius={50} count={1000} factor={2} fade speed={2} />
                </Canvas>
            </div>

            {/* Navbar Content */}
            <div className="relative z-10 bg-opacity-70 bg-gray-950">
                <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img src="rbi.png" alt="Logo" className="h-8 w-8" />
                        <h1 className="text-2xl font-bold">
                            <Link to="/">
                                <span className="text-white">Job</span>
                                <span className="text-[#02e8f8]">Lytics</span>
                            </Link>
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <nav className="flex items-center gap-6">
                            <ul className="flex items-center gap-6 text-white font-medium">
                                {user && user.role === 'recruiter' ? (
                                    <>
                                        <li>
                                            <Link to="/admin/companies" className="hover:text-[#02e8f8] transition-colors">
                                                Companies
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/admin/jobs" className="hover:text-[#02e8f8] transition-colors">
                                                Jobs
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/" className="hover:text-[#02e8f8] transition-colors">
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/jobs" className="hover:text-[#02e8f8] transition-colors">
                                                Jobs
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/browse" className="hover:text-[#02e8f8] transition-colors">
                                                Browse
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>

                        {/* Desktop User Actions */}
                        <div className="flex items-center gap-4">
                            {!user ? (
                                <>
                                    <Link to="/login">
                                        <Button variant="outline" className="bg-transparent hover:bg-gray-800">
                                            <span className="text-white">Login</span>
                                        </Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                                            Signup
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#6A38C2]">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-80 bg-gray-900 border-gray-800 text-white">
                                        <div className="space-y-4">
                                            <div className="flex gap-3 items-center">
                                                <Avatar className="ring-2 ring-[#6A38C2]">
                                                    <AvatarImage
                                                        src={user?.profile?.profilePhoto}
                                                        alt="Profile"
                                                    />
                                                </Avatar>
                                                <div>
                                                    <h4 className="font-semibold">{user?.fullname}</h4>
                                                    <p className="text-sm text-gray-400">
                                                        {user?.profile?.bio || 'No bio provided'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                {user.role === 'student' && (
                                                    <Button
                                                        asChild
                                                        variant="ghost"
                                                        className="w-full justify-start hover:bg-gray-800"
                                                    >
                                                        <Link to="/profile" className="text-[#6A38C2]">
                                                            <User2 className="mr-2 h-4 w-4" />
                                                            View Profile
                                                        </Link>
                                                    </Button>
                                                )}
                                                <Button
                                                    onClick={logoutHandler}
                                                    variant="ghost"
                                                    className="w-full justify-start hover:bg-gray-800 text-[#6A38C2]"
                                                >
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <DropdownMenu onOpenChange={setIsMobileMenuOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="hover:bg-gray-800">
                                    {isMobileMenuOpen ? (
                                        <X className="h-6 w-6 text-white" />
                                    ) : (
                                        <Menu className="h-6 w-6 text-white" />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="bg-gray-950 text-white border-gray-800 w-64"
                            >
                                {user && user.role === 'recruiter' ? (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                to="/admin/companies"
                                                className="hover:bg-gray-800 hover:text-[#02e8f8] cursor-pointer"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Companies
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                to="/admin/jobs"
                                                className="hover:bg-gray-800 hover:text-[#02e8f8] cursor-pointer"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Jobs
                                            </Link>
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                to="/"
                                                className="hover:bg-gray-800 hover:text-[#02e8f8] cursor-pointer"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Home
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                to="/jobs"
                                                className="hover:bg-gray-800 hover:text-[#02e8f8] cursor-pointer"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Jobs
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                to="/browse"
                                                className="hover:bg-gray-800 hover:text-[#02e8f8] cursor-pointer"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Browse
                                            </Link>
                                        </DropdownMenuItem>
                                    </>
                                )}

                                <DropdownMenuSeparator className="bg-gray-800" />

                                {!user ? (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                to="/login"
                                                className="w-full hover:bg-gray-800"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <Button
                                                    variant="outline"
                                                    className="w-full bg-transparent hover:bg-gray-800 border-gray-700"
                                                >
                                                    <span className="text-white">Login</span>
                                                </Button>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                to="/signup"
                                                className="w-full hover:bg-gray-800"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">
                                                    Signup
                                                </Button>
                                            </Link>
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                to="/profile"
                                                className="w-full hover:bg-gray-800 hover:text-[#02e8f8] cursor-pointer"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span>View Profile</span>
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage
                                                            src={user?.profile?.profilePhoto}
                                                            alt="Profile"
                                                        />
                                                    </Avatar>
                                                    
                                                </div>
                                            </Link>

                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={logoutHandler}
                                            className="w-full hover:bg-gray-800 hover:text-[#02e8f8] cursor-pointer"
                                        >
                                            <div className="flex items-center gap-2">
                                                <LogOut className="h-4 w-4" />
                                                <span>Logout</span>
                                            </div>
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;