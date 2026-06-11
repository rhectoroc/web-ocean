import { useRef, useState, useEffect } from 'react';
import {
    FileText,
    PencilRuler,
    Calculator,
    Home,
    Hammer,
    RefreshCw,
    Wrench,
    Droplets,
    ShieldCheck,
    ArrowRight,
    X,
    CheckCircle2,
    Volume2,
    VolumeX
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ServicesSection = () => {
    const container = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [selectedService, setSelectedService] = useState<number | null>(null);
    const [isMuted, setIsMuted] = useState(true); // Muted by default to ensure autoplay

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = 0.05; // 5% volume for subtle background
        }
    }, []);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
            if (isMuted) {
                videoRef.current.play().catch(() => {
                    console.log("Browser blocked audio play");
                });
            }
        }
    };

    useGSAP(() => {
        // Animate Process Steps
        gsap.from(".process-step", {
            scrollTrigger: {
                trigger: "#process-flow",
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
        });

        // Animate Service Cards
        // Animate Service Cards  
        gsap.fromTo(".service-card",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "#service-grid",
                    start: "top 80%", // Trigger earlier
                }
            }
        );

    }, { scope: container });

    // Handle ESC key to close modal and prevent body scroll
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedService(null);
        };

        if (selectedService !== null) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
            return () => {
                document.removeEventListener('keydown', handleEsc);
                document.body.style.overflow = 'unset';
            };
        }
    }, [selectedService]);

    const processSteps = [
        { icon: FileText, title: "Plan / Spec", description: "Detailed Analysis" },
        { icon: PencilRuler, title: "Design", description: "Custom Drafting" }, // Renamed 'Services' to Design for clarity based on icon
        { icon: Calculator, title: "Cost Estimation", description: "Transparent Pricing" },
        { icon: Home, title: "Project Building", description: "Expert Execution" },
    ];

    const services = [
        {
            icon: Hammer,
            title: "Constructions",
            description: "New builds from the ground up.",
            fullDescription: "Transform your vision into reality with our comprehensive construction services. From residential homes to commercial spaces, we handle every aspect of your new build project with precision and expertise.",
            benefits: [
                "Custom design and planning tailored to your needs",
                "High-quality materials and expert craftsmanship",
                "On-time delivery and transparent communication",
                "Full compliance with building codes and regulations",
                "Warranty coverage on all construction work"
            ],
            process: [
                "Initial consultation and site assessment",
                "Design development and permit acquisition",
                "Foundation and structural work",
                "Interior and exterior finishing",
                "Final inspection and handover"
            ]
        },
        {
            icon: RefreshCw,
            title: "Renovations",
            description: "Modernizing your existing spaces.",
            fullDescription: "Breathe new life into your property with our expert renovation services. Whether it's a kitchen remodel, bathroom upgrade, or complete home transformation, we deliver stunning results that exceed expectations.",
            benefits: [
                "Increase property value and functionality",
                "Modern designs with timeless appeal",
                "Minimal disruption to your daily routine",
                "Energy-efficient upgrades available",
                "Before and after project documentation"
            ],
            process: [
                "Space evaluation and design consultation",
                "3D rendering and material selection",
                "Demolition and preparation",
                "Installation and finishing work",
                "Quality control and final walkthrough"
            ]
        },
        {
            icon: Wrench,
            title: "Repairs",
            description: "Quick and reliable fixes.",
            fullDescription: "Don't let small problems become big headaches. Our repair services address issues quickly and effectively, restoring your property to perfect condition with minimal hassle.",
            benefits: [
                "Fast response time for urgent repairs",
                "Experienced technicians for all repair types",
                "Competitive pricing with no hidden fees",
                "Quality parts and materials guaranteed",
                "Emergency services available 24/7"
            ],
            process: [
                "Damage assessment and diagnosis",
                "Detailed repair quote and timeline",
                "Professional repair execution",
                "Testing and quality verification",
                "Follow-up support and warranty"
            ]
        },
        {
            icon: Droplets,
            title: "Waterproofing",
            description: "Protecting your home from water damage.",
            fullDescription: "Protect your investment from water damage with our advanced waterproofing solutions. We use cutting-edge techniques and premium materials to keep your property dry and secure year-round.",
            benefits: [
                "Prevent costly water damage and mold growth",
                "Advanced membrane and sealant technologies",
                "Basement, roof, and foundation protection",
                "Long-lasting results with warranty coverage",
                "Improves overall structural integrity"
            ],
            process: [
                "Moisture inspection and leak detection",
                "Surface preparation and cleaning",
                "Application of waterproofing systems",
                "Drainage optimization if needed",
                "Final testing and certification"
            ]
        },
        {
            icon: Wrench,
            title: "Plumbing",
            description: "Expert piping and fixture installation.",
            fullDescription: "From simple faucet repairs to complete plumbing system installations, our licensed plumbers deliver reliable solutions that stand the test of time. We handle residential and commercial projects with equal expertise.",
            benefits: [
                "Licensed and insured plumbing professionals",
                "Modern fixtures and water-saving solutions",
                "Pipe repair, replacement, and installation",
                "Drain cleaning and sewer line services",
                "Water heater installation and maintenance"
            ],
            process: [
                "Plumbing system inspection",
                "Problem diagnosis and solution planning",
                "Professional installation or repair",
                "Pressure testing and leak checks",
                "System optimization and maintenance tips"
            ]
        },
        {
            icon: ShieldCheck,
            title: "Maintenance",
            description: "Long-term care for your property.",
            fullDescription: "Keep your property in peak condition with our comprehensive maintenance programs. Regular upkeep prevents costly repairs and extends the life of your home or building.",
            benefits: [
                "Customized maintenance schedules",
                "Preventive care to avoid major issues",
                "Priority service for maintenance clients",
                "Detailed inspection reports",
                "Cost savings through early problem detection"
            ],
            process: [
                "Property assessment and plan creation",
                "Scheduled inspections and servicing",
                "Preventive repairs and upgrades",
                "Detailed maintenance logs",
                "Annual review and plan adjustment"
            ]
        }
    ];

    return (
        <div ref={container} id="services" className="font-sans scroll-mt-28 relative">
            {/* Background Video Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    ref={videoRef}
                    src="/Abstract_Deep_Sea_Wallpaper_Generation.mp4"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay to ensure text readability */}
                <div className="absolute inset-0 bg-ocean-900/60 z-10 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-black/40 z-20"></div>
            </div>

            {/* Audio Toggle Button */}
            <button
                onClick={toggleMute}
                className="absolute top-6 right-6 sm:top-12 sm:right-12 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-3 rounded-full transition-all border border-white/20 flex items-center justify-center gap-3 group"
                aria-label="Toggle background sound"
            >
                {isMuted ? <VolumeX size={20} className="group-hover:scale-110 transition-transform" /> : <Volume2 size={20} className="group-hover:scale-110 transition-transform" />}
                <span className="text-sm font-medium hidden sm:block tracking-wide uppercase">{isMuted ? "Unmute Ocean" : "Mute Ocean"}</span>
            </button>

            {/* Top Section: Process Flow */}
            <section id="process-flow" className="py-20 text-white relative z-20">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Our Services</h2>
                        <p className="text-ocean-300 text-xl font-light tracking-wide uppercase">30 Years Experience</p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4 relative">
                        {processSteps.map((step, index) => (
                            <div key={index} className="process-step flex flex-col items-center relative group w-full md:w-1/5">
                                <div className="w-24 h-24 bg-white text-ocean-900 rounded-xl flex items-center justify-center mb-6 shadow-lg transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-ocean-500/50 group-hover:scale-110">
                                    <step.icon size={40} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                {/* Arrow Connector (Hidden on last item and mobile) */}
                                {index < processSteps.length - 1 && (
                                    <div className="hidden md:block absolute top-12 -right-[50%] w-full h-full pointer-events-none text-ocean-600">
                                        <ArrowRight className="mx-auto w-8 h-8 opacity-50" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Section: Service Grid with Parallax Look */}
            <section id="service-grid" className="py-24 relative z-20">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                            What can we do for your property?
                        </h2>
                        <div className="w-24 h-1 bg-ocean-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedService(index)}
                                className="service-card group relative bg-white/5 backdrop-blur-md border border-white/10 p-4 sm:p-8 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-ocean-500/10 rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:bg-ocean-500/20"></div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-transparent border-2 border-ocean-400/30 rounded-full text-ocean-400 group-hover:text-white group-hover:bg-ocean-500 group-hover:border-ocean-500 transition-all duration-300 transform group-hover:rotate-6">
                                        <service.icon className="w-6 h-6 sm:w-9 sm:h-9" />
                                    </div>
                                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-ocean-300 transition-colors">{service.title}</h3>
                                    <p className="text-gray-300 text-xs sm:text-base group-hover:text-white transition-colors">{service.description}</p>
                                    <p className="text-ocean-400 text-xs sm:text-sm mt-2 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity">Click for more details →</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service Detail Modal */}
            {selectedService !== null && (
                <div
                    className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm"
                    onClick={() => setSelectedService(null)}
                >
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div
                            className="relative w-full max-w-3xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute top-4 right-4 z-10 p-2 sm:p-3 bg-ocean-900/80 text-white rounded-full hover:bg-ocean-800 transition-colors flex items-center justify-center"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-6 md:p-12">
                                {/* Header */}
                                <div className="flex items-center gap-4 sm:gap-6 mb-6">
                                    <div className="p-3 sm:p-4 bg-ocean-500 text-white rounded-2xl hidden sm:block">
                                    {(() => {
                                        const ServiceIcon = services[selectedService].icon;
                                        return <ServiceIcon size={48} />;
                                    })()}
                                </div>
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-ocean-900 mb-2">
                                        {services[selectedService].title}
                                    </h2>
                                    <p className="text-ocean-600 text-lg">
                                        {services[selectedService].description}
                                    </p>
                                </div>
                            </div>

                            {/* Full Description */}
                            <div className="mb-8">
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    {services[selectedService].fullDescription}
                                </p>
                            </div>

                            {/* Benefits */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-ocean-900 mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="text-ocean-500" size={28} />
                                    Key Benefits
                                </h3>
                                <ul className="space-y-3">
                                    {services[selectedService].benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle2 className="text-ocean-500 flex-shrink-0 mt-1" size={20} />
                                            <span className="text-gray-700">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Process */}
                            {services[selectedService].process && (
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-ocean-900 mb-4">Our Process</h3>
                                    <div className="space-y-4">
                                        {services[selectedService].process.map((step, idx) => (
                                            <div key={idx} className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 bg-ocean-500 text-white rounded-full flex items-center justify-center font-bold">
                                                    {idx + 1}
                                                </div>
                                                <p className="text-gray-700 pt-1">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Call to Action */}
                            <div className="pt-6 border-t border-gray-200">
                                <a
                                    href="#contact"
                                    onClick={() => setSelectedService(null)}
                                    className="block w-full md:w-auto md:inline-block text-center bg-ocean-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-ocean-700 transition-colors min-h-[44px]"
                                >
                                    Get a Free Quote
                                </a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServicesSection;
