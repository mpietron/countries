import { useSelector, useDispatch } from 'react-redux';
import { select, deselect } from '../redux/countriesSlice';

import './countries.styles.scss';


const Country = ({ country }) => {
    const dispach = useDispatch();
    return (
        <div onClick={() => dispach(select(country.cca3))}>
            <img src={country.flags.png} />
            <p>
                <b>{country.name.common}</b><br />
                <b>Population:</b> {country.population}<br />
                <b>Region:</b> Europe<br />
                <b>Capital:</b> {country.capital ? country.capital.join(", ") : null}<br />
            </p>
        </div>
    )
}

const Countries = () => {
    const { countries } = useSelector(state => state.countries);
    const { limit } = useSelector(state => state.limit);
    const { search } = useSelector(state => state.search);
    const { continent } = useSelector(state => state.continent);
    const { failed } = useSelector(state => state.failed);

    if (failed) {
        return null
    }

    // filter by search
    let result = search !== "" ? countries.filter(country => country.name.common.toLowerCase().search(search.toLowerCase()) != -1) : countries;

    // filter by continent
    result = (continent != "all") ? result.filter(country => country.continents.indexOf(continent) >= 0) : result;



    return (
        <div className="countries">
            {
                result.length > 0 ? (
                    result.slice(0, limit).map(country => <Country country={country} key={country.cca3} /*select={select}*/ />)
                ) :
                    (
                        <h2>No result, change filter criteria.</h2>
                    )
            }
        </div>
    )
}

const CountryDetails = () => {
    const dispach = useDispatch();
    const { selectedCca3 } = useSelector((state) => state.selectedCca3);
    const { countries } = useSelector((state) => state.countries);

    const country = countries.filter(country => country.cca3 == selectedCca3)[0];
    return (
        <section className="countries">
            <div>
                <p>{country.name.common}</p>
                <p>
                    <button onClick={() => dispach(deselect())}>Back</button>
                </p>
            </div>
        </section>
    )
}

export { Countries, CountryDetails };