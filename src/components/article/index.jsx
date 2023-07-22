import { useEffect, useRef } from "react";
import { Alert, Card, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useFetchDocParam from "../../hooks/useFetchDocParam";
import styles from "./SingleArticle.module.css";

const getDate = (d) => {
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const MainArticle = () => {
  const isMount = useRef(false);
  const param = useParams();
  //   console.log(param);
  const { getSingleDoc, data, loading, error } = useFetchDocParam(
    "posts",
    param.slug
  );

  useEffect(() => {
    if (!isMount.current) {
      getSingleDoc();
      isMount.current = true;
    }
  }, [getSingleDoc]);

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (loading) return <p className={styles.not_Existed}>Loading ....</p>;

  if (!data)
    return <p className={styles.not_Existed}> No Such Article Existed </p>;

  return (
    <article>
      <div className={styles.hero_img}>
        <img src={data.image} alt={data.title} />
      </div>
      <Container>
        <Row>
          <Card>
            <Card.Body>
              <Card.Title>{data.title}</Card.Title>
              <Card.Subtitle className="mt-2 text-muted d-flex gap-3">
                <small>By:{data.user}</small>
                <small> {getDate(data.createdAt)} </small>
              </Card.Subtitle>
              <div
                className="mt-5"
                dangerouslySetInnerHTML={{ __html: data.body }}
              ></div>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </article>
  );
};

export default MainArticle;
