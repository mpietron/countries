import { useSelector, useDispatch } from 'react-redux';
import { changeSearch, changeContinent } from '../redux/countriesSlice';

import './filter.styles.scss';

const Filter = () => {
    const dispatch = useDispatch();
    const { search } = useSelector((state) => state.search);
    const { continent } = useSelector((state) => state.continent);

    const handleChangeSearch = (e) => {
        dispatch(changeSearch(e.target.value))
    }

    const handleChangeContinent = (e) => {
        dispatch(changeContinent(e.target.value))
    }

    return (
        <header>
            <div className="container">
                <div className="search">
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><path d="m18 16.5-5.14-5.18h-.35a7 7 0 10-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 112 7a5 5 0 0110 0Z"></path></svg>
                    <input autoComplete="off" placeholder="Type country name" type="text" name="filter" onChange={handleChangeSearch} value={search} />
                </div>
                <select name="continent" value={continent} onChange={handleChangeContinent}><option value="all">All</option><option value="Africa">Africa</option><option value="Americas">Americas</option><option value="Asia">Asia</option><option value="Europe">Europe</option><option value="Oceania">Oceania</option></select>
            </div>
        </header>
    )
}


export default Filter;