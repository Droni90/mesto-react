import logo from "../images/logo.svg";

const Header = () => {
  return(
    <div className="header">
      <a href='/' target="_self" className="header__link">
        <img src={logo} alt="лого" className="logo" />
      </a>
    </div>
  )
}
export default Header;
