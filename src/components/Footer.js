
const Footer = () => {
  const year = new Date().getFullYear();
  return(
    <footer className="footer container">
      <p className="footer__copywriter">&copy; {year}</p>
    </footer>
  )
}
export default Footer;
