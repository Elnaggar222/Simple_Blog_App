import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={`${styles.footer} bg-dark`}>
            <p>copyrights &copy; {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer