import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div id="footerWave">
            <svg id="visual" viewBox="0 0 1960 200" width="100%" height="200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 134L29.7 137.2C59.3 140.3 118.7 146.7 178 151.2C237.3 155.7 296.7 158.3 356.2 154.8C415.7 151.3 475.3 141.7 534.8 137.3C594.3 133 653.7 134 713 133C772.3 132 831.7 129 891 128.3C950.3 127.7 1009.7 129.3 1069 135.2C1128.3 141 1187.7 151 1247 157.5C1306.3 164 1365.7 167 1425.2 163C1484.7 159 1544.3 148 1603.8 148.2C1663.3 148.3 1722.7 159.7 1782 160.8C1841.3 162 1900.7 153 1930.3 148.5L1960 144L1960 201L1930.3 201C1900.7 201 1841.3 201 1782 201C1722.7 201 1663.3 201 1603.8 201C1544.3 201 1484.7 201 1425.2 201C1365.7 201 1306.3 201 1247 201C1187.7 201 1128.3 201 1069 201C1009.7 201 950.3 201 891 201C831.7 201 772.3 201 713 201C653.7 201 594.3 201 534.8 201C475.3 201 415.7 201 356.2 201C296.7 201 237.3 201 178 201C118.7 201 59.3 201 29.7 201L0 201Z" fill="#001122"></path></svg>
            <div id="footer">
                <div id="footerII">&copy; 2022 Digital Booking</div>
                <div id="footerIII">
                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><FontAwesomeIcon className="icons" icon={faInstagram} size="xl" /></a>
                    <a href="https://www.twitter.com" target="_blank" rel="noreferrer"><FontAwesomeIcon className="icons" icon={faTwitter} size="xl" /></a>
                    <a href="https://www.whatsapp.com" target="_blank" rel="noreferrer"><FontAwesomeIcon className="icons" icon={faWhatsapp} size="xl" /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer;