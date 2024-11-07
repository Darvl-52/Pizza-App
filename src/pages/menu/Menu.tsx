import {Title} from "../../shared/title/Title.tsx";
import styles from './menu.module.css';
import {ProductCardList} from "../../widgets/productCardList/ProductCardList.tsx";

export function Menu() {

  return (
      <>
          <div className={styles.header}>
              <Title>
                  Меню
              </Title>
          </div>
          <ProductCardList/>
      </>
  )
}