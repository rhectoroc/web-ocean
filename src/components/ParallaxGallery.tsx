import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import { fetchActiveGalleryImages } from '../lib/galleryApi';
import type { GalleryImage } from '../lib/galleryApi';
import './ParallaxGallery.css';

gsap.registerPlugin(Draggable);

const API_URL = import.meta.env.VITE_API_URL || '';

const ParallaxGallery = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const draggerRef = useRef<HTMLDivElement>(null);
    const xPosRef = useRef(0);
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    useEffect(() => {
        const getImages = async () => {
            try {
                const data = await fetchActiveGalleryImages();
                // We need at least 6 images for the effect to look good, so we'll duplicate if needed
                let galleryImages = data;
                if (data.length > 0 && data.length < 6) {
                    while (galleryImages.length < 6) {
                        galleryImages = [...galleryImages, ...data];
                    }
                }
                setImages(galleryImages);
            } catch (error) {
                console.error('Failed to load gallery images:', error);
            } finally {
                setLoading(false);
            }
        };

        getImages();
    }, []);

    useEffect(() => {
        if (loading || images.length === 0) return;

        const container = containerRef.current;
        const ring = ringRef.current;
        const dragger = draggerRef.current;

        if (!container || !ring || !dragger) return;

        // Force 3D rendering context
        container.style.transformStyle = 'preserve-3d';
        ring.style.transformStyle = 'preserve-3d';

        const imgs = Array.from(ring.children) as HTMLElement[];



        // Initial setup
        gsap.set(dragger, { opacity: 0 });
        gsap.set(ring, { rotationY: 180 });

        const isMobile = window.innerWidth < 640;
        const radius = isMobile ? 250 : 600;

        imgs.forEach((img, i) => {
            gsap.set(img, {
                rotateY: i * -60,
                transformOrigin: `50% 50% ${radius}px`,
                z: -radius,
                // backgroundPosition is simple center, we rely on the 3D rotation for the effect
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backfaceVisibility: 'hidden',
                force3D: true
            });
        });

        // Entrance animation
        gsap.from(imgs, {
            duration: 1.5,
            y: 200,
            opacity: 0,
            stagger: 0.1,
            ease: 'expo'
        });

        // Draggable setup
        Draggable.create(dragger, {
            trigger: container, // Use container to allow clicks on images to pass through
            onDragStart: (e: any) => {
                if (e.touches) e.clientX = e.touches[0].clientX;
                xPosRef.current = Math.round(e.clientX);
            },

            onDrag: (e: any) => {
                if (e.touches) e.clientX = e.touches[0].clientX;

                gsap.to(ring, {
                    rotationY: '-=' + ((Math.round(e.clientX) - xPosRef.current) % 360)
                });

                xPosRef.current = Math.round(e.clientX);
            },

            onDragEnd: () => {
                gsap.set(dragger, { x: 0, y: 0 });
            }
        });

        return () => {
            Draggable.get(dragger)?.kill();
        };
    }, [loading, images]);

    if (loading) {
        return <div className="py-20 bg-black text-white text-center">Loading gallery...</div>;
    }

    if (images.length === 0) {
        return null; // Or hide section if no images
    }

    return (
        <section id="gallery" className="py-20 bg-ocean-900 relative overflow-hidden scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Our Work Gallery
                    </h2>
                </div>

                <div className="parallax-container" ref={containerRef}>
                    <div id="parallax-ring" ref={ringRef}>
                        {images.map((img, index) => (
                            <div
                                key={`${img.id}-${index}`}
                                className="parallax-img cursor-pointer"
                                onClick={() => setSelectedImage(index)}
                                style={{
                                    backgroundImage: `url(${API_URL}${img.image_url})`
                                }}
                            ></div>
                        ))}
                    </div>
                    <div className="parallax-vignette"></div>
                    <div id="parallax-dragger" ref={draggerRef} style={{ pointerEvents: 'none' }}></div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage !== null && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
                    onClick={() => setSelectedImage(null)}
                >
                    <button 
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                    >
                        <X size={28} />
                    </button>
                    
                    <button 
                        className="absolute left-4 md:left-12 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full"
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            setSelectedImage((prev) => prev === 0 ? images.length - 1 : prev! - 1); 
                        }}
                    >
                        <ChevronLeft size={36} />
                    </button>

                    <div className="w-full max-w-5xl px-4 md:px-24 flex justify-center" onClick={(e) => e.stopPropagation()}>
                        <img 
                            src={`${API_URL}${images[selectedImage].image_url}`} 
                            alt={images[selectedImage].title || undefined}
                            className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
                        />
                    </div>

                    <button 
                        className="absolute right-4 md:right-12 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full"
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            setSelectedImage((prev) => prev === images.length - 1 ? 0 : prev! + 1); 
                        }}
                    >
                        <ChevronRight size={36} />
                    </button>
                </div>
            )}
        </section>
    );
};

export default ParallaxGallery;
