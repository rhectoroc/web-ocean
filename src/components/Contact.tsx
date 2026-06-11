
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Reveal } from './Animations';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal width="100%">
                    <div className="text-center mb-16">
                        <h2 className="text-ocean-600 font-bold uppercase tracking-wide mb-2">Contact Us</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Get In Touch</h3>
                        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                            Ready to start your project? Contact us today for a free estimate.
                        </p>
                    </div>
                </Reveal>

                <div className="max-w-2xl mx-auto">
                    {/* Contact Info */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h4 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h4>

                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-ocean-100 rounded-lg flex items-center justify-center text-ocean-600">
                                        <Phone size={24} />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h5 className="text-lg font-bold text-gray-900">Phone & WhatsApp</h5>
                                    <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="text-ocean-600 font-semibold hover:underline mt-1 block">
                                        +1 (555) 123-4567
                                    </a>
                                    <p className="text-sm text-gray-500">Mon-Fri 8am-6pm</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-ocean-100 rounded-lg flex items-center justify-center text-ocean-600">
                                        <Mail size={24} />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h5 className="text-lg font-bold text-gray-900">Email</h5>
                                    <p className="text-gray-600 mt-1">info@oceanconstruction.us</p>
                                    <p className="text-sm text-gray-500">Online support 24/7</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-ocean-100 rounded-lg flex items-center justify-center text-ocean-600">
                                        <MapPin size={24} />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h5 className="text-lg font-bold text-gray-900">Office</h5>
                                    <p className="text-gray-600 mt-1">123 Construction Blvd,<br />Builder City, FL 33000</p>
                                </div>
                            </div>

                            <div className="mt-8 border-t pt-8">
                                <div className="flex items-center text-gray-600">
                                    <Clock size={20} className="mr-2 text-ocean-500" />
                                    <span>Serving the entire Tri-County area</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
