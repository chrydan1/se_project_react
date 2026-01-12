import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__left">Developed by Christian Avila Pertuz</p>
      <p className="footer__right"> © {currentYear}</p>
    </footer>
  );
}

export default Footer;