/* eslint-disable react/prop-types */
import Table from "../../ui/Table";
import StatusBtn from '../../components/dashboard/btns/StatusBtn'
import moment from "moment";
import Modal from '../../components/dashboard/modals/Modal'
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import UserModal from '../../components/dashboard/modals/UserModal'
import ConfirmDelete from "../../components/dashboard/modals/ConfirmDelete";
import useDeleteUser from './useDeleteUser'

export default function UserRow({ user, index }) {
    const { deleteUser, isDeleting } = useDeleteUser()

    return (
        <Table.Row>
            <Table.Cell className="table-cell">{index + 1}</Table.Cell>
            <Table.Cell className="table-cell">{user.first_name}</Table.Cell>
            <Table.Cell className="table-cell">{user.last_name}</Table.Cell>
            <Table.Cell className="table-cell">{user.email}</Table.Cell>
            <Table.Cell className="table-cell">{user.password}</Table.Cell>
            <Table.Cell className="table-cell">{moment(user?.date).format('L') || 'N/A'}</Table.Cell>
            <Table.Cell className="table-cell">
                <div className="flex items-center">
                    <StatusBtn user={user} />
                    <Modal>
                        <div className="flex items-center justify-end">
                            <Menus.Toggle id={user._id} />

                            <Menus.List id={user._id}>
                                <Modal.Open opens='edit-form'>
                                    <Menus.Button icon={<HiPencil className="text-blue-500" />}>Edit</Menus.Button>
                                </Modal.Open>

                                <Modal.Open opens='delete'>
                                    <Menus.Button icon={<HiTrash className="text-red-500" />}>Delete</Menus.Button>
                                </Modal.Open>
                            </Menus.List>

                            <Modal.Window name='edit-form'>
                                <UserModal user={user} />
                            </Modal.Window>

                            <Modal.Window name='delete'>
                                <ConfirmDelete type='user' disabled={isDeleting} onAction={() => deleteUser(user._id)} />
                            </Modal.Window>
                        </div>
                    </Modal>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}
