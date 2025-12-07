import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "Learn Life's Most Valuable Lessons",
            subtitle: "Discover wisdom from real experiences shared by people around the world",
            bg: "from-orange-500 to-pink-500"
        },
        {
            title: "Share Your Story, Inspire Others",
            subtitle: "Your life experiences can guide someone through their journey",
            bg: "from-purple-500 to-indigo-500"
        },
        {
            title: "Build Better Habits, Transform Your Life",
            subtitle: "Access practical lessons that make a real difference in daily living",
            bg: "from-blue-500 to-cyan-500"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative h-[500px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <div className={`h-full bg-gradient-to-r ${slide.bg} flex items-center justify-center`}>
                        <div className="text-center text-white px-4 max-w-4xl">
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">{slide.title}</h1>
                            <p className="text-xl md:text-2xl mb-8 text-white/90">{slide.subtitle}</p>
                            <button className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                                Explore Lessons
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition"
            >
                <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
export default HeroSlider