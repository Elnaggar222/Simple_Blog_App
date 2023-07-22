import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../../contexts/PostsContext";
import { useContext } from "react";
import PostCard from "../../blogs/PostCard";

const LastArticles = () => {
  const Navigate = useNavigate();
  const { data, loading, error } = useContext(PostsContext);

  return (
    <section className="py-5">
      <Container>
        <h2 className="text-center mb-5">Latest Articles</h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : null}

        {error ? (
          <div>
            <Alert variant="variant">{error}</Alert>
          </div>
        ) : null}

        {!error && !loading && data && !data.length && (
          <div className="tex-center">Empty Data</div>
        )}

        {!error && !loading && data && data.length ? (
          <Row xs="1" sm="2" md="3" lg="4" className="g-4">
            {data.slice(0, 4).map((post) => (
              <Col key={post.id}>
                <PostCard post={post} />
              </Col>
            ))}
          </Row>
        ) : null}

        <div className="text-center mt-4">
          <Button
            className="px-5"
            variant="outline-dark"
            onClick={() => Navigate("/Blogs")}
          >
            see all
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default LastArticles;
