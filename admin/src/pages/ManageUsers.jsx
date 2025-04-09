import CreateBtn from '../components/dashboard/btns/CreateBtn';
import Title from '../components/dashboard/Title';
import Modal from '../components/dashboard/modals/Modal'
import CreateEditUserModal from '../features/user/CreateEditUserModal';
import UserTable from '../features/user/UserTable'

export default function ManageUsers() {
    return (
        <section className='flex flex-col gap-y-4'>
            <div className="flex items-center justify-between">
                <Title title={"Manage Users"} />
                <Modal>
                    <Modal.Open opens={'create-user'}>
                        <div>
                            <CreateBtn />
                        </div>
                    </Modal.Open>

                    <Modal.Window name={'create-user'} width='450px'>
                        <CreateEditUserModal />
                    </Modal.Window>
                </Modal>
            </div>
            <UserTable />
        </section>
    );
}
