import Title from '@/ui/Title';
import Modal from '@/ui/modals/Modal'
import CreateEditUserModal from '@/features/user/CreateEditUserModal';
import UserTable from '@/features/user/UserTable'
import CreateBtn from '@/ui/btns/CreateBtn';

export default function ManageUsersPage() {
    return (
        <section className='flex flex-col gap-y-4'>
            <div className="flex items-center justify-between">
                <Title title={"Manage Users"} />
                <Modal>
                    <Modal.Open opens={'create-user'}>
                        <div>
                            <CreateBtn text='Create New User' />
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
