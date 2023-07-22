import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import Logo from '../../assets/images/logo.png'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'


const NavLinks = ({children,route,end=false}) => {

    return(
        <Nav.Link as="span">
            <NavLink className={styles.navLink} to={route} end={end} >
                {children}
            </NavLink>
        </Nav.Link>
    ) 
}


const Header = () => {

    const {isAuth , logOut} = useContext(AuthContext)

    return (
        <header className={styles.header}>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as="span" >
                        <NavLinks route="/">
                            <img src={Logo} alt="Blog Logo" />
                        </NavLinks>
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <NavLinks route="/" end>Home</NavLinks>
                        <NavLinks route="/blogs" end>All Blogs</NavLinks>
                        {!isAuth ? (
                            <>
                                <NavLinks route="/login" >login</NavLinks>
                                <NavLinks route="/signUp" >signUp</NavLinks>
                            </>
                        ):(
                            <>
                                <NavLinks route="/blogs/new">New Post</NavLinks>
                                <Button onClick={logOut}>Logout</Button>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header