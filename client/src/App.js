import React, { useState } from 'react'
import { Grid } from './components/Grid'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { Search } from './components/Search'
import "./App.css"

const App = () => {
  const [items, setItems] = useState([])
  const [rowData, setRowData] = useState([])
  return (
    <div className="App">
      <header className="App-header">
        <h1>Stocks Checker</h1>
        <Search items={items} setItems={setItems} setRowData={setRowData} />
        <Grid rowData={rowData} />
      </header>
    </div>

  )
}

export default App