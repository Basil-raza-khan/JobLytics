import React, { useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import gsap from 'gsap';

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carouselRef = useRef();
  const tl = useRef(null); // GSAP timeline reference

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  useEffect(() => {
    const carouselContent = carouselRef.current;
    const totalItems = [...carouselContent.children];

    // Duplicate items for a seamless loop
    totalItems.forEach((item) => {
      carouselContent.appendChild(item.cloneNode(true));
    });

    // GSAP Infinite Scroll Animation
    tl.current = gsap.timeline({ repeat: -1 }).to(carouselContent, {
      x: `-${100 * category.length}%`,
      duration: 15, // Control speed
      ease: "linear",
    });

    // Hover Events for Pausing and Resuming
    carouselContent.addEventListener("mouseenter", () => tl.current.pause());
    carouselContent.addEventListener("mouseleave", () => tl.current.play());

    return () => {
      tl.current.kill(); // Cleanup GSAP instance
    };
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto my-10 sm:my-16 lg:my-20 overflow-hidden">
        <CarouselContent ref={carouselRef} className="flex">
          {category.map((cat, index) => (
            <CarouselItem key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
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
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
