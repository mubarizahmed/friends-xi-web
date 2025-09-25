import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-fximoonstone font-family-sans px-8 py-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Club Info */}
          <div className="text-white">
            <h3 className={`mb-6 text-2xl font-bold`}>Friends XI e.V.</h3>
            <p className="mb-4 leading-relaxed opacity-90">
              Bochum&apos;s premier cricket team and a proud member of the
              Deutsche Cricket Union (DCU).
            </p>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-semibold">Founded:</span>
              <span className="opacity-90">2012</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Registration:</span>
              <span className="opacity-90">VR 12345</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-white">
            <h3 className={`mb-6 text-2xl font-bold`}>Contact</h3>
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Email</p>
                <p className="opacity-90">info@friendsxi.de</p>
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="opacity-90">+49 (0) 234 123 456</p>
              </div>
              <div>
                <p className="font-semibold">Training Ground</p>
                <p className="opacity-90">Bochum Cricket Ground</p>
                <p className="text-sm opacity-90">Musterstraße 123</p>
                <p className="text-sm opacity-90">44801 Bochum, Germany</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-white">
            <h3 className={`mb-6 text-2xl font-bold`}>Quick Links</h3>
            <div className="space-y-2">
              <a
                href="/news"
                className="block opacity-90 transition-opacity hover:opacity-100"
              >
                Latest News
              </a>
              <a
                href="/squad"
                className="block opacity-90 transition-opacity hover:opacity-100"
              >
                Our Squad
              </a>
              <a
                href="#"
                className="block opacity-90 transition-opacity hover:opacity-100"
              >
                Match Fixtures
              </a>
              <a
                href="#"
                className="block opacity-90 transition-opacity hover:opacity-100"
              >
                Team Statistics
              </a>
              <a
                href="#"
                className="block opacity-90 transition-opacity hover:opacity-100"
              >
                Join the Team
              </a>
              <a
                href="#"
                className="block opacity-90 transition-opacity hover:opacity-100"
              >
                Sponsorship
              </a>
              <a
                href="#"
                className="block opacity-90 transition-opacity hover:opacity-100"
              >
                Club Constitution
              </a>
              <a
                href="#"
                className="block opacity-90 transition-opacity hover:opacity-100"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div className="text-white">
            <h3 className={`mb-6 text-2xl font-bold`}>Stay Connected</h3>
            <div className="space-y-4">
              <div>
                <p className="mb-3 font-semibold">Follow Us</p>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/FriendsXIbochum/"
                    className="opacity-90 transition-opacity hover:opacity-100"
                    title="Facebook"
                  >
                    <FaFacebook className="h-6 w-6" />
                  </a>
                  {/* <a
                    href="#"
                    className="opacity-90 transition-opacity hover:opacity-100"
                    title="Instagram"
                  >
                    <FaInstagram className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="opacity-90 transition-opacity hover:opacity-100"
                    title="Twitter"
                  >
                    <FaTwitter className="h-6 w-6" />
                  </a> */}
                  <a
                    href="https://www.youtube.com/@FriendsXIe.V"
                    className="opacity-90 transition-opacity hover:opacity-100"
                    title="YouTube"
                  >
                    <FaYoutube className="h-6 w-6" />
                  </a>
                </div>
              </div>
              <div>
                <p className="mb-3 font-semibold">Newsletter</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 rounded-none px-3 py-2 text-sm text-black"
                  />
                  <button className="hover:bg-opacity-90 rounded-none bg-white px-4 py-2 text-sm font-semibold text-black transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-opacity-20 mt-12 border-t border-white pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-white md:flex-row">
            <div className="text-center md:text-left">
              <p className="opacity-90">
                © {new Date().getFullYear()} Friends XI e.V. All rights
                reserved.
              </p>
              <p className="mt-1 text-sm opacity-75">
                Registered in Germany | Deutsche Cricket Union Member
              </p>
            </div>
            <div className="flex gap-6 text-sm opacity-90">
              <a href="#" className="transition-opacity hover:opacity-100">
                Terms of Service
              </a>
              <a href="#" className="transition-opacity hover:opacity-100">
                Privacy Policy
              </a>
              <a href="#" className="transition-opacity hover:opacity-100">
                Impressum
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
