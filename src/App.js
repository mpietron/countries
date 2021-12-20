import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// COMPONENTS
import { Countries, CountryDetails } from './components/Countries.jsx';
import Filter from './components/Filter.jsx';

import './app.styles.scss'
import { getCountries, setLimit } from './redux/countriesSlice.js';

const App = () => {
  // REDUX:
  const dispatch = useDispatch();
  const { selectedCca3 } = useSelector((state) => state.selectedCca3);
  const { loading } = useSelector((state) => state.loading);
  const { failed } = useSelector((state) => state.failed);
  const { countries } = useSelector((state) => state.countries);
  const { limit } = useSelector((state) => state.limit);


  // Infinit scroll effect:
  const [scrollLimit, changeScrollLimit] = useState(false);
  const loadMore = useRef(() => {
    if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
      changeScrollLimit(change => !change);
    }
  });
  useEffect(() => {
    if (limit < countries.length) {
      dispatch(setLimit(10))
    }
  }, [scrollLimit])

  // First load effect:
  useEffect(() => {
    dispatch(getCountries("https://restcountries.com/v3.1/all"));
    window.addEventListener('scroll', () => loadMore.current());
  }, []);

  return (
    <>
      {
        failed ?
          <h1>Network error</h1>
          :
          (
            !loading ? (
              <>
                {
                  selectedCca3 == -1 ? (
                    <Filter />
                  ) : null
                }
                <section className="container">
                  {
                    selectedCca3 == -1 ? (
                      <Countries />
                    ) : (
                      <CountryDetails />
                    )
                  }
                </section>
              </>
            ) : (
              <div>loading</div>
            )
          )
      }
    </>

  )
}

export default App
