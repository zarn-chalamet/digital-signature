import CreateBtn from "@/ui/btns/CreateBtn";
import Title from "@/ui/Title";
import TemplatesList from "@/features/template/TemplatesList";
import Modal from "@/ui/modals/Modal";
import UploadTemplateModal from "../features/template/UploadTemplateModal";

export default function TemplatePage() {


    return (
        <section className='flex flex-col gap-y-4'>
            <div className="flex items-center justify-between">
                <Title title={"Manage Templates"} />
                <Modal>
                    <Modal.Open opens='upload-template'>
                        <div>
                            <CreateBtn text='Upload' />
                        </div>
                    </Modal.Open>

                    <Modal.Window name='upload-template'  width='450px'>
                        <UploadTemplateModal />
                    </Modal.Window>
                </Modal>
            </div>
            <TemplatesList />
        </section>
    )
}
