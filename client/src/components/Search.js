import React, { useState } from "react"
import axios from 'axios'
import { ReactSearchAutocomplete } from "react-search-autocomplete"

export const Search = ({ items, setItems, setRowData }) => {
    const [symbol, setSymbol] = useState("")
    const [error, setError] = useState("")

    const handleOnSearch = (string) => {
        setError("")
        setSymbol(string)
        axios.get(`http://localhost:3001/search?symbol=${string}`)
            .then((response) => {
                setItems(response.data)
            })
    }

    const handleOnSelect = (item) => {
        setSymbol(item.name)
    }

    const handleOnClear = () => {
        setSymbol("")
    }

    const handleClick = (e) => {
        axios.get(`http://localhost:3001/stocks?symbol=${symbol}`)
            .then((response) => {
                if (response.data["Note"]) {
                    setError(response.data["Note"])
                } else if (response.data["Error Message"]) {
                    setError(response.data["Error Message"])
                } else {
                    setRowData(response.data)
                    setError("")

                }
            })
            .catch(e => { setError(e) })
    }

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{
                width: 200, margin: 20, display: "inline-block"
            }}>
                <ReactSearchAutocomplete
                    items={items}
                    onSearch={handleOnSearch}
                    onSelect={handleOnSelect}
                    onClear={handleOnClear}
                    styling={{ zIndex: 4 }} // To display it on top of the search box below
                    autoFocus
                />            <button
                    style={{
                        fontSize: 20,
                        padding: 10,
                        borderRadius: 5,
                        margin: 15
                    }}
                    disabled={!symbol}
                    onClick={handleClick}
                >Search</button>
            </div>
            {error && <div><p>{error}</p></div>}
        </div>

    )
}

