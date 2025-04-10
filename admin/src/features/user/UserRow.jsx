/* eslint-disable react/prop-types */
import Table from "@/ui/Table";
import StatusBtn from '@/ui/btns/StatusBtn'
import moment from "moment";
import Modal from '@/ui/modals/Modal'
import Menus from "@/ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import CreateEditUserModal from './CreateEditUserModal'
import ConfirmDelete from "@/ui/modals/ConfirmDelete";
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
                            {/* More Btn */}
                            <Menus.Toggle id={user._id} />

                            {/* Edit & Delete */}
                            <Menus.List id={user._id}>
                                <Modal.Open opens='edit-form'>
                                    <Menus.Button icon={<HiPencil className="text-blue-500" />}>Edit</Menus.Button>
                                </Modal.Open>

                                <Modal.Open opens='delete'>
                                    <Menus.Button icon={<HiTrash className="text-red-500" />}>Delete</Menus.Button>
                                </Modal.Open>
                            </Menus.List>

                            {/* Edit Form */}
                            <Modal.Window name='edit-form'>
                                <CreateEditUserModal userToEdit={user} />
                            </Modal.Window>

                            {/* Delete Form */}
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
