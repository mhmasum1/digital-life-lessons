import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#FFF7ED] border-t border-orange-100 py-10 mt-10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white font-bold text-lg shadow-sm">
                            DL
                        </span>
                        <div>
                            <h2 className="font-semibold text-lg text-gray-900">Digital Life Lessons</h2>
                        </div>
                    </div>


                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Contact Info</h3>
                        <p className="text-sm text-gray-700">Email: support@digitallessons.com</p>
                        <p className="text-sm text-gray-700">Phone: +880 1234-567890</p>
                        <p className="text-sm text-gray-700">Dhaka, Bangladesh</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link to="/pricing" className="hover:text-primary">Pricing</Link></li>
                            <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-10 border-t border-orange-100 pt-5">
                    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Digital Life Lessons. All rights reserved.</p>

                    <div className="flex gap-4 text-xl text-gray-600">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-primary">
                            <FaFacebook />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary">
                            <FaInstagram />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-primary">
                            <FaYoutube />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
