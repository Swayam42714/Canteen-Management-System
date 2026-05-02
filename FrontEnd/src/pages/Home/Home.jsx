import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import './Home.css'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import { Link } from 'react-router-dom'
function Home(){
    return(<div>
        <Header/>
        <ExploreMenu/>
        <FoodDisplay/>
    </div>)
}
export default Home