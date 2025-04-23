import CreateBtn from "@/ui/btns/CreateBtn";
import Title from "@/ui/Title";
import TemplatesList from "@/features/template/TemplatesList";
import Modal from "@/ui/modals/Modal";
import UploadTemplateModal from "../features/template/UploadTemplateModal";
import TemplateOperation from "../features/template/TemplateOperation";

export default function TemplatePage() {


    return (
        <section className='flex flex-col gap-y-4'>
            <div className="flex flex-col justify-between gap-2 md:items-center md:flex-row">
                <Title title={"Manage Templates"} />
                <div className="flex items-center justify-between gap-2 md:justify-normal">
                    <TemplateOperation />
                    <Modal>
                        <Modal.Open opens='upload-template'>
                            <div>
                                <CreateBtn text='Upload' />
                            </div>
                        </Modal.Open>

                        <Modal.Window name='upload-template' width='450px'>
                            <UploadTemplateModal />
                        </Modal.Window>
                    </Modal>
                </div>
            </div>
            <TemplatesList />
        </section>
    )
}
