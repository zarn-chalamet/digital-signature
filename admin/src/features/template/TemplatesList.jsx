import Spinner from "@/ui/Spinner";
import useAllTemplates from "./useAllTemplates";
import useDeleteTemplate from './useDeleteTemplate'
import { ImageMinus } from "lucide-react";
import Menus from "@/ui/Menus";
import Modal from "@/ui/modals/Modal";
import ConfirmDelete from '@/ui/modals/ConfirmDelete'
import { HiPencil, HiTrash } from "react-icons/hi2";
import RenameTemplateModal from "./RenameTemplateModal";
import { useSearchParams } from "react-router-dom";

export default function TemplatesList() {
    const { templates, templatesLoading } = useAllTemplates()
    const { deleteTemplate, isDeleting } = useDeleteTemplate()

    const [searchParams] = useSearchParams()

    const filterValue = searchParams.get('isPublic') ?? 'all'
    let filteredTemplates;

    if (filterValue === 'all') filteredTemplates = templates
    if (filterValue === 'true') filteredTemplates = templates?.filter(template => template.isPublic)
    if (filterValue === 'false') filteredTemplates = templates?.filter(template => !template.isPublic)

    if (templatesLoading) return <Spinner />

    return (
        <Menus>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {
                    filteredTemplates?.map((template, index) => {
                        const fileUrl = `http://localhost:5001/files/${template.filePath}`;
                        return (
                            <div key={index} className="relative p-4 border rounded-lg bg-slate-50 dark:bg-slate-900 dark:border-slate-700 border-slate-300">
                                <Modal>
                                    <div className="absolute z-50 top-6 right-7">
                                        <Menus.Toggle id={template._id} />
                                    </div>
                                    {/* Edit & Delete */}
                                    <Menus.List id={template._id}>
                                        <Modal.Open opens='rename-form'>
                                            <Menus.Button icon={<HiPencil className="text-blue-500" />}>Edit</Menus.Button>
                                        </Modal.Open>

                                        <Modal.Open opens='delete'>
                                            <Menus.Button icon={<HiTrash className="text-red-500" />}>Delete</Menus.Button>
                                        </Modal.Open>
                                    </Menus.List>

                                    {/* Edit Form */}
                                    <Modal.Window name='rename-form' width='450px'>
                                        <RenameTemplateModal currentId={template._id} currentTitle={template.title} />
                                    </Modal.Window>

                                    {/* Delete Form */}
                                    <Modal.Window name='delete' width='450px' padding={false}>
                                        <ConfirmDelete type='template' disabled={isDeleting} onAction={() => deleteTemplate(template._id)} />
                                    </Modal.Window>

                                    <div className="cursor-pointer" onClick={() => window.open(fileUrl, "_blank")}>
                                        <div className="relative w-full h-64 overflow-hidden border rounded-lg md:h-44 bg-slate-300 dark:border-slate-700">
                                            {fileUrl ? (
                                                <embed
                                                    src={`${fileUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0`}
                                                    type="application/pdf"
                                                    className="absolute inset-0 object-cover w-full h-full"
                                                    style={{
                                                        pointerEvents: "none",
                                                    }}
                                                />
                                            ) : (
                                                <ImageMinus className="mx-auto text-slate-500 size-8" />
                                            )}
                                        </div>
                                        <h3 className="mt-3 text-xl font-semibold text-center dark:text-slate-50">
                                            {template.title}
                                        </h3>
                                    </div>
                                </Modal>
                            </div>
                        );
                    })
                }
            </div>
        </Menus>
    )
}
