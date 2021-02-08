import React from 'react';

const Footer = () => {
    return (
        <footer className="footer text-center">
            Copyright © {(new Date().getFullYear())} SmartPoke | 
            All Rights Reserved. Powered by <a href="https://www.esmartit.es" rel="noopener noreferrer" target="_blank">eSmartIT</a>.
            Template {'AdminPro'} by <a href="https://wrappixel.com" rel="noopener noreferrer" target="_blank">WrapPixel</a>.
        </footer>
    );
}
export default Footer;
