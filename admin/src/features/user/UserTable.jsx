import { tableHeaders } from "../../constants";
import Spinner from "../../ui/Spinner";
import Table from '../../ui/Table'
import UserRow from "./UserRow";
import useUserLists from './useUserLists'

export default function UserTable() {
    const { userLists, usersLoading } = useUserLists()

    if (usersLoading) return <Spinner />

    return (
        <div className='card'>
            <div className="card-header">
                <p className='card-title'>Current Users</p>
            </div>
            <div className="p-0 card-body">
                <div className="relative h-[500px] flex-shrink-0 w-full overflow-auto rounded-none [scrollbar-width:_thin]">
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                {
                                    tableHeaders.map((header, index) => (
                                        <Table.Head key={index}>{header}</Table.Head>
                                    ))
                                }
                            </Table.Row>
                        </Table.Header>
                        <Table.Body
                            data={userLists}
                            render={(user, index) => (
                                <UserRow key={index} user={user} index={index} />
                            )}
                        />
                    </Table>
                </div>
            </div>
        </div>
    )
}
