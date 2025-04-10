import { useEffect, useState } from "react";
import CreateBtn from "@/ui/btns/CreateBtn";
import Title from "@/ui/Title";
import useAuth from '@/hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast"
import api from '@/utils/api'
import { deleteTemplate, getTemplates, setTemplates } from '@/features/template/templateSlice'
import { ImageMinus, MoreVertical } from "lucide-react";
import MoreTemplateModal from "@/ui/modals/MoreTemplateModal";
import UploadTemplateModal from "@/ui/modals/UploadTemplateModal";

export default function TemplatePage() {
    const { accessToken } = useAuth()
    const dispatch = useDispatch()
    const templatesList = useSelector(getTemplates)
    const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);
    const [isOpenMore, setIsOpenMore] = useState({});

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                let res = await api.get('/api/admin/templates')

                if (res.data.success) {
                    dispatch(setTemplates(res.data.templates))
                }
                else {
                    toast.error(res.data.message)
                }
            }
            catch (err) {
                console.log('Error: ', err.message)
                toast.error(err.message)
            }
        }

        fetchTemplates()
    }, [accessToken, dispatch])

    const onDeleteTemplate = async (templateId) => {
        try {
            let res = await api.post('/api/admin/delete-template', { templateId }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            dispatch(deleteTemplate(templateId))

            toast.success(res.data.message)
        }
        catch (err) {
            console.log(err.message)
            toast.error(err.message)
        }
    }

    return (
        <section className='flex flex-col gap-y-4'>
            <div className="flex items-center justify-between">
                <Title title={"Manage Templates"} />
                <CreateBtn text={'+ Upload'} setShowModal={setIsOpenUploadModal} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {
                    templatesList?.map((template, index) => {
                        const fileUrl = `http://localhost:5001/files/${template.filePath}`;

                        return (
                            <div
                                key={index}
                                className="relative p-4 border rounded-lg bg-slate-50 border-slate-300"
                            >
                                <MoreVertical
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpenMore((prev) =>
                                            prev === template._id ? null : template._id
                                        );
                                    }}
                                    className="absolute cursor-pointer top-7 right-7"
                                />

                                <div
                                    className="cursor-pointer"
                                    onClick={() => window.open(fileUrl, "_blank")}
                                >
                                    <div className="flex items-center justify-center w-full h-64 rounded-lg md:h-44 bg-slate-300">
                                        <ImageMinus className="text-slate-500 size-8" />
                                    </div>
                                    <h3 className="mt-3 text-xl font-semibold text-center">
                                        {template.title}
                                    </h3>
                                </div>

                                {isOpenMore === template._id && (
                                    <MoreTemplateModal
                                        setShowModal={setIsOpenMore}
                                        template={template}
                                        onAction={onDeleteTemplate}
                                    />
                                )}
                            </div>
                        );
                    })
                }
            </div>

            {
                isOpenUploadModal && <UploadTemplateModal setShowModal={setIsOpenUploadModal} />
            }

        </section>
    )
}
