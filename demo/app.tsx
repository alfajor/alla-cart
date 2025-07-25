import styled from 'styled-components';
import { useCart } from '../src/components/cart/cart-provider';
import { sampleProducts } from "./data/sample-products.json";
import NavigationMenu from './components/nav-menu';
import Footer from './components/footer';
import Button from './components/atoms/button';

// demo w/cart & sample product catalog
const App = () => {
  const { addToCart } = useCart();

  return (
    <>
    <NavigationMenu />
    
    <MainWrapper>
      <h1>Alla Cart Demo</h1>

      <ProductGrid>
        {sampleProducts.map((product) => {
          return (
              <ProductInner>
                <h2>{product.name}</h2> <p>${product.unit_price}</p>
                <img src={product.image} />
                <Button buttonClassName="cart-add" buttonText='Add to cart' buttonCallback={() => addToCart(product.id)} />
              </ProductInner>          
            )
        })}
      </ProductGrid>

      <Footer />
    </MainWrapper>
    </>
  )
}

const MainWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-left: 3%;
  margin-right: 3%;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const ProductInner = styled.div`
  padding: 0 10px;

  img {
    width: 100%;
    border: 1px solid #ddd;
  }
`;

export default App
