/* eslint-disable react/prop-types */
import Table from "../../ui/Table";
import StatusBtn from '../../components/dashboard/btns/StatusBtn'
import moment from "moment";

export default function UserRow({ user, index }) {
    return (
        <Table.Row>
            <Table.Cell className="table-cell">{index + 1}</Table.Cell>
            <Table.Cell className="table-cell">{user.first_name}</Table.Cell>
            <Table.Cell className="table-cell">{user.last_name}</Table.Cell>
            <Table.Cell className="table-cell">{user.email}</Table.Cell>
            <Table.Cell className="table-cell">{user.password}</Table.Cell>
            <Table.Cell className="table-cell">{moment(user?.date).format('L') || 'N/A'}</Table.Cell>
            <Table.Cell className="table-cell">
                <StatusBtn user={user} />
            </Table.Cell>
        </Table.Row>
    )
}
