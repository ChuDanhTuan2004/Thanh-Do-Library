import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-lg mb-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0b328f] to-transparent text-white p-4">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-[#f2a429]">{item.description}</p>
          </div>
        </div>
      ))}
      <button 
        onClick={prevSlide} 
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 shadow-md hover:bg-opacity-75 transition-colors duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-[#0b328f]" />
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 shadow-md hover:bg-opacity-75 transition-colors duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-[#0b328f]" />
      </button>
    </div>
  );
};

export default Carousel;
