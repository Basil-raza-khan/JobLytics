import React, { useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion, useAnimation } from 'framer-motion';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const controls = useAnimation();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    useEffect(() => {
        const sequence = async () => {
            while (true) {
                await controls.start({
                    x: '-50%', // Move left by half the total width
                    transition: { duration: 20, ease: 'linear' }, // Adjust duration for speed
                });
                await controls.start({
                    x: 0, // Reset to the start position
                    transition: { duration: 0 }, // Instant reset
                });
            }
        };
        sequence();
    }, [controls]);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto my-10 sm:my-16 lg:my-20 overflow-hidden">
                <CarouselContent as={motion.div} animate={controls} className="flex">
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex-shrink-0">
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="rounded-full w-full text-xs sm:text-sm md:text-base"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                    {/* Duplicate items for seamless looping */}
                    {category.map((cat, index) => (
                        <CarouselItem key={`duplicate-${index}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex-shrink-0">
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="rounded-full w-full text-xs sm:text-sm md:text-base"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;