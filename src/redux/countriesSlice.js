import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    selectedCca3: -1,
    limit: 30,
    countries: [],
    loading: true,
    search: "",
    continent: "all",
    failed: false
}

const checkForError = response => {
    if (!response.ok)
        throw Error("ERROR" + response.statusText)
    return response.json();
};

export const getCountries = createAsyncThunk(
    "countries/getCountries",
    async (url) => {
        return await fetch(url)
            .then(checkForError)
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error("FETCH_ERR: ", error);
                state.failed = true;
            });
    }
);

export const countriesSlice = createSlice({
    name: 'countrySelected',
    initialState,
    reducers: {
        deselect: (state) => {
            state.selectedCca3 = -1
        },
        select: (state, action) => {
            state.selectedCca3 = action.payload
        },
        setLimit: (state, action) => {
            state.limit += action.payload
        },
        changeSearch: (state, action) => {
            state.search = action.payload;
        },
        changeContinent: (state, action) => {
            state.continent = action.payload;
            state.search = "";
        }
    },
    extraReducers: {
        [getCountries.pending]: (state) => {
            state.failed = false;
            state.loading = true;
        },
        [getCountries.fulfilled]: (state, action) => {
            state.loading = false;
            state.failed = false;
            state.countries = action.payload;
        },
        [getCountries.rejected]: (state) => {
            state.failed = true;
        },
    }
})

export const { deselect, select, setLimit, changeSearch, changeContinent } = countriesSlice.actions

export default countriesSlice.reducer