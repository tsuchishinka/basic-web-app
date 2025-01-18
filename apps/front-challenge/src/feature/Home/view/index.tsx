import { useNavigate } from "react-router";
import styles from "./index.module.scss";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/map");
  };
  return (
    <div className={styles.home}>
      <button onClick={handleClick}>Mapへ</button>
    </div>
  );
};

export { Home };
