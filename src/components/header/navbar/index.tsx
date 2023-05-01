import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <header>
        <Link to="/">
          <img
            src={require("../../../assets/logo.png")}
            alt="Logo"
            className="logo"
          />
        </Link>
        <Link className="navbar-item" to="/">
          Meus Processos
        </Link>
        <Link className="process" to="/process">
          Novo Processo
        </Link>
      </header>
    </div>
  );
}

export default Navbar;
