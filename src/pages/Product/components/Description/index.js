import { useProductContext } from '../../../../contexts/ProductContext';
import './style.css';

const Description = () => {

    const { product } = useProductContext();

    return (
        <div id="description">
            <h3>Fique no coração de {product.city?.name}</h3>
            <p>{product.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis nostrum est fugiat in, commodi facere quidem, vero nisi aliquid, voluptatum sit laudantium. Unde sint deserunt esse doloremque at, accusamus quae! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime doloribus totam minima! Animi quod similique, doloremque blanditiis veritatis corporis rerum labore quos fugit quam magni cupiditate, ipsum, impedit iusto excepturi.</p>
        </div>
    );
};

export default Description;