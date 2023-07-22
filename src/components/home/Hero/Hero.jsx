import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import HeroImg from '../../../assets/images/logo.png'
import styles from './Hero.module.css' 
const Hero = () => {

    const Navigate = useNavigate()

    return (
        <section className="py-5 bg-light">
            <Container>
                <Row>
                    <Col lg="8" md="10" xs="12" sm="12" className="mx-auto">
                        <div className="d-flex flex-column align-items-center text-center">
                            <img className={styles.hero_Img} src={HeroImg} alt="Hero Img" />
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Necessitatibus error aliquid magnam minima fugit sequi officia vel laudantium impedit?
                                Ex, ipsam. Nemo ea alias deleniti?
                            </p>
                            <Button className="mt-4 fs-6" size="lg" onClick={()=> Navigate("/blogs/new")}>Add New Article</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Hero