/* eslint-disable react/prop-types */
import { createContext } from "react"

const TableContext = createContext()

export default function Table({ children }) {
    return (
        <TableContext.Provider value={{}}>
            <table className="table">
                {children}
            </table>
        </TableContext.Provider>
    )
}

const Header = ({ children }) => {
    return (
        <thead className="table-header">
            {children}
        </thead>
    )
}

const Head = ({ children }) => {
    return <th className="table-head">{children}</th>
}

const Row = ({ children }) => {
    return (
        <tr className="table-row">
            {children}
        </tr>
    )
}

const Body = ({ data, render }) => {
    return <tbody className="dark:text-slate-50">{data.map(render)}</tbody>
}

const Cell = ({ children }) => {
    return (
        <td className="table-cell">
            {children}
        </td>
    )
}

Table.Header = Header
Table.Head = Head
Table.Row = Row
Table.Body = Body
Table.Cell = Cell   
