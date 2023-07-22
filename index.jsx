import { Container , Row , Col , Form } from "react-bootstrap"

const MainNewPost = () => {
    return (
        <section className="py-5">
            <Container>
                <Row>
                    <Col>
                        <h2>Add new post</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicTitle">
                                <Form.Label>Post Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default MainNewPost