import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./PostCard.module.css";

const getDate = (d) => {
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const PostCard = ({ post }) => {
  return (
    <Link to={"/blogs/" + post.slug} className={styles.card_Link}>
      <Card>
        <div className={styles.postCard_Img_and_Info}>
          <Card.Img variant="top" src={post.image} />
          <div className={styles.postCard_Info}>
            <small>By:{post.user}</small>
            <small>{getDate(post.createdAt)}</small>
          </div>
        </div>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.excert}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PostCard;
