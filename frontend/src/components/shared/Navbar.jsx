import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu, X } from 'lucide-react'; // Added Menu and X icons for mobile
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';

const DIM_COLORS = ["#2F4F4F", "#708090", "#778899", "#B0C4DE"]; // Dimmer colors

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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <motion.div
            style={{
                backgroundImage,
            }}
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
                    {/* Logo and Brand Name */}
                    <div className="flex items-center gap-2">
                        <img src="rbi.png" alt="Logo" className="h-8 w-8" />
                        <h1 className="text-2xl font-bold">
                            <Link to="/">
                                <span className="text-[#ffffff]">Job</span><span className="text-[#02e8f8]">Lytics</span>
                            </Link>
                        </h1>
                    </div>

                    {/* Hamburger Menu for Mobile */}
                    <div className="md:hidden">
                        <Button variant="" onClick={toggleMobileMenu}>
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </Button>
                    </div>

                    {/* Navigation and User Actions */}
                    <div
                        className={`md:flex items-center gap-12 ${isMobileMenuOpen ? 'block' : 'hidden'
                            }`}
                    >
                        <ul className="flex flex-col md:flex-row font-medium items-center gap-5 text-[#ffffff]">
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <li>
                                        <Link
                                            to="/admin/companies"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Companies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/jobs"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Jobs
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/jobs" onClick={() => setIsMobileMenuOpen(false)}>
                                            Jobs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/browse"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Browse
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                        {!user ? (
                            <div className="flex flex-col md:flex-row items-center gap-2 text-[#ffffff]">
                                <Link to="/login">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <span className="text-[#000000]">Login</span>
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button
                                        className="bg-[#6A38C2] hover:bg-[#5b30a6]"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt="@shadcn"
                                        />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 text-[#ffffff]">
                                    <div className="">
                                        <div className="flex gap-2 space-y-2">
                                            <Avatar className="cursor-pointer ring-2 ring-offset-2 ring-[#6A38C2] ring-offset-gray-950 text-[#ffffff]">
                                                <AvatarImage
                                                    src={user?.profile?.profilePhoto}
                                                    alt="@shadcn"
                                                />
                                            </Avatar>
                                            <div>
                                                <h4 className="font-medium">{user?.fullname}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {user?.profile?.bio}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col my-2 text-gray-600 ">
                                            {user && user.role === 'student' && (
                                                <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                    <User2 className="text-[#6A38C2]" />
                                                    <Button variant="link" className="text-[#6A38C2]">
                                                        <Link to="/profile">View Profile</Link>
                                                    </Button>
                                                </div>
                                            )}
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <LogOut className="text-[#6A38C2]" />
                                                <Button onClick={logoutHandler} variant="link" className="text-[#6A38C2]">
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;
