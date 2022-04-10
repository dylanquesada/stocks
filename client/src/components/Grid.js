import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export const Grid = ({rowData}) => {

    const columnDefs = [
        { field: "Timestamp" },
        { field: "Total Volume" },
        { field: "Min Price", headerName: "Min. Price" },
        { field: "Max Price", headerName: "Max. Price" },
        { field: "Opening Price" },
        { field: "Closing Price" },
    ]

    return (
        <div>
            <div className="ag-theme-alpine" style={{ height: 400, width: "90vw", margin: 20 }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}>
                </AgGridReact>
            </div>
        </div>

    )
}