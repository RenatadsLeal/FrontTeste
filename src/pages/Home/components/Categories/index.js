import './style.css';
import useAxios from '../../../../hooks/useAxios';
import { Link } from 'react-router-dom';

const Categories = () => {

    const categories  = useAxios('/category');

    return (
            <div id="searchByCategory">
            <div id="searchByCategoryTitle">
                <h2>Buscar por tipo de acomodação</h2>
                <p>Escolha a sua preferência</p>
            </div>

            <div id="categories">
            {categories.map(category => 
                <Link key={category.id} to={`/categoria/${category.title}`}><div  className="category">
                    <img src={category.urlImage} alt="" />
                    <div className="categoryInfo">
                        <h5>{category.title}</h5>
                        <p>{3 * (543 - (category.id * 63))} resultados</p>
                    </div>
                </div></Link>
             )}
            </div>
        </div>

    );
}

export default Categories;