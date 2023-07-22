import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useContext } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../contexts/PostsContext";

const MainNewPost = () => {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const { db } = useContext(FirebaseContext);
  const { fetchData } = useContext(PostsContext);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const excert = e.target.excert.value;
    const image = e.target.image.value;
    const slug = title.split(" ").join("-") + "-" + new Date().getTime();
    console.log({ title, excert, image, body, slug });
    const colRef = collection(db, "posts");
    try {
      setLoading(true);
      await addDoc(colRef, {
        title,
        excert,
        image,
        body,
        slug,
        createdAt: serverTimestamp(),
        user: "Mohamed ALi",
      });
      e.target.reset();
      setBody("");
      setLoading(false);
      fetchData();
      Navigate("/blogs/" + slug);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col lg="6" md="8" sm="10" xs="12" className="mx-auto">
            <h2 className="mb-4">Add new post</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Enter post title"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicExcert">
                <Form.Label>Post Excert</Form.Label>
                <Form.Control
                  name="excert"
                  type="text"
                  placeholder="Enter post Excert"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Post Image</Form.Label>
                <Form.Control
                  name="image"
                  type="text"
                  placeholder="Enter Image url"
                />
              </Form.Group>

              <ReactQuill theme="snow" value={body} onChange={setBody} />
              <Button type="submit" className="mt-4 w-100" disabled={loading}>
                Submit {loading ? "...." : ""}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MainNewPost;
