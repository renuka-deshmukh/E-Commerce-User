import React from "react";
import {
    FaFacebookF,
    FaXTwitter,
    FaInstagram,
    FaYoutube,
} from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            {/* Upper Section */}
            <div className="footer-top">
                {/* LEFT SIDE COLUMNS */}
                <div className="footer-left">
                    <div className="footer-section">
                        <h4>ABOUT</h4>
                        <ul>
                            <li>Contact Us</li>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Press</li>
                            <li>Corporate Information</li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>GROUP COMPANIES</h4>
                        <ul>
                            <li>Myntra</li>
                            <li>Cleartrip</li>
                            <li>Shopsy</li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>HELP</h4>
                        <ul>
                            <li>Payments</li>
                            <li>Shipping</li>
                            <li>Cancellation & Returns</li>
                            <li>FAQ</li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>CONSUMER POLICY</h4>
                        <ul>
                            <li>Cancellation & Returns</li>
                            <li>Terms Of Use</li>
                            <li>Security</li>
                            <li>Privacy</li>
                            <li>Sitemap</li>
                        </ul>
                    </div>
                </div>

                {/* RIGHT SIDE ADDRESSES */}
                <div className="footer-right">
                    <div className="footer-address">
                        <h4>Mail Us:</h4>
                        <p>
                            ShopEase Online Services Pvt. Ltd., <br />
                            Orchid Plaza, Maple & Cedar Towers, <br />
                            Central Business Park, Riverside Avenue, <br />
                            Pune, 411045, Maharashtra, India

                        </p>
                        <div className="footer-social">
                            <FaFacebookF />
                            <FaXTwitter />
                            <FaInstagram />
                            <FaYoutube />
                        </div>
                    </div>

                    <div className="footer-address">
                        <h4>Registered Office Address:</h4>
                        <p>
                            ShopEase Technologies Private Limited, <br />
                            Lotus Square, Aspen & Coral Towers, <br />
                            Tech Garden Business Park, <br />
                            Outer Ring Road, Banerghatta Village, <br />
                            Pune, 411057, Maharashtra, India <br />
                            <br />
                            CIN: U51909MH2021PTC078412 <br />
                            Telephone: <span className="highlight">020-45619800</span> /{" "}
                            <span className="highlight">020-67416500</span>

                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="footer-links">
                    <span>Become a Seller</span>
                    <span>Advertise</span>
                    <span>Gift Cards</span>
                    <span>Help Center</span>
                    <span>© 2007–2025 BuyNest.com</span>
                </div>
                <div className="footer-payments">
                    <img src="/visa.png" alt="Visa" />
                    <img src="/mastercard.png" alt="MasterCard" />
                    <img src="/rupay.png" alt="RuPay" />
                    <img src="/discover.png" alt="Discover" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
