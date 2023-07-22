import { useContext, useEffect, useRef } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { PostsContext } from "../../contexts/PostsContext";
import PostCard from "./PostCard";

const MainBlogs = () => {
  const { data, loading, error, fetchNextDataFrom, fetching } =
    useContext(PostsContext);
  const observedRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // console.log(entries);
      if (entries[0].isIntersecting) {
        // fetch next data
        // console.log("ddddddd");
        fetchNextDataFrom();
      }
    }, {});

    observedRef.current && observer.observe(observedRef.current);

    return () => {
      observedRef.current && observer.unobserve(observedRef.current);
    };
  }, [fetchNextDataFrom]);

  return (
    <section className="py-5">
      <Container>
        <h2 className="text-center mb-5">Latest Posts</h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : null}

        {error ? (
          <div>
            <Alert variant="danger">{error}</Alert>
          </div>
        ) : null}

        {!error && !loading && data && !data.length && (
          <div className="text-center">Empty Data</div>
        )}

        {!error && !loading && data && data.length ? ( //&& !fetching
          <Row xs="1" sm="2" md="3" lg="4" className="g-4">
            {data.map((post) => (
              <Col key={post.id}>
                <PostCard post={post} />
              </Col>
            ))}
          </Row>
        ) : null}

        {fetching ? <p className="text-center">Loading ....</p> : null}

        <div ref={observedRef}></div>
      </Container>
    </section>
  );
};

export default MainBlogs;
// last two conditions work together at fetching state
