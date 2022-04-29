import './style.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';

const Header = () => {

    const { user, setUser } = useUserContext();

    const mediaQuery = useMediaQuery({ minWidth: 768 });

    if (user) {
        return (
            <Navbar id="header" className="fixed-top px-3 d-flex" collapseOnSelect expand="md" bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/"><div id="brand"><h2>db</h2></div></Navbar.Brand>
                <Nav.Link className="p-0 me-auto" as={Link} to="/"><div id="moto"><p>sinta-se em</p><p id='motoHighlight'>casa</p></div></Nav.Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav">
                    <FontAwesomeIcon
                        icon={faBars} color="var(--primary-color)" size="lg" />
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav >
                        {user.role === "user" && <Nav.Link className="access" as={Link} to={`/${user.id}/reservas`}><button className="logout">reservas</button></Nav.Link>}
                        
                        {user.role === "admin" && <Nav.Link className="access" as={Link} to={`/administracao`}><button className="logout">administração</button></Nav.Link>}

                        {mediaQuery && <div id="separator">|</div>}

                        <Nav.Link className="d-flex align-items-center noPointer" as={Link} to="/"><div id="avatar" className="me-2">{user.name.charAt(0)}{user.lastName.charAt(0)}</div><p className="m-0 greeting">Olá, {user.name}!</p></Nav.Link>

                        <Nav.Link className="access d-flex align-items-center" as={Link} to="/" onClick={() => {
                            localStorage.removeItem('signed');
                            setUser();
                        }}><button
                            className="logout">sair</button></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

    return (
        <Navbar className="fixed-top px-3" collapseOnSelect expand="md" bg="dark" variant="dark">
            <Navbar.Brand className="me auto" as={Link} to="/"><div id="brand"><h2>db</h2></div></Navbar.Brand>
            <Nav.Link className="p-0 me-auto" as={Link} to="/"><div id="moto"><p>sinta-se em</p><p id='motoHighlight'> casa</p></div></Nav.Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav d-flex" className="justify-content-end">
                <Nav >
                    <Nav.Link className="access" as={Link} to="/login"><button className="logout">login</button></Nav.Link>
                    <Nav.Link className="access" as={Link} to="/cadastro"><button className="logout">cadastrar</button></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;