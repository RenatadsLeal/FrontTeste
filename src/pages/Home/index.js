import Search from './components/Search';
import Categories from './components/Categories';
import Recommendations from './components/Recommendations';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Search />
            <Categories />
            <Recommendations />
        </>
    );
};

export default Home;