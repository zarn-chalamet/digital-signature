/* eslint-disable react/prop-types */
import { FileTextIcon } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "../../../utils/cn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadTemplateFormFieldSchema } from "../../../utils/zSchema";
import { useClickOutside } from "../../../hooks/useClickOutside";
import toast from "react-hot-toast";
import api from "../../../utils/api";
import useAuth from "../../../hooks/useAuth";
import { useDispatch } from 'react-redux';
import { createTemplate } from "../../../features/template/templateSlice";

export default function UploadTemplateModal({ setShowModal }) {
    const { accessToken } = useAuth()
    const dispatch = useDispatch()
    const [file, setFile] = useState(null);
    const [isPublic, setIsPublic] = useState(false);
    const inputRef = useRef();
    const modalRef = useRef(null)

    useClickOutside([modalRef], () => setShowModal(false));

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(uploadTemplateFormFieldSchema)
    })

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected && selected.type === "application/pdf") {
            setFile(selected);
        } else {
            toast.error("Please select a PDF file.");
            e.target.value = null;
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const dropped = e.dataTransfer.files[0];
        if (dropped && dropped.type === "application/pdf") {
            setFile(dropped);
        } else {
            toast.error('Only PDF files are allowed.');
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleUpload = async (data) => {
        try {
            const formData = new FormData();

            formData.append("pdf", file);
            formData.append("title", data.title);
            formData.append("isPublic", isPublic);

            const res = await api.post("/api/admin/upload-template", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(createTemplate(res.data.template))
                reset({
                    title: ''
                })
                setFile(null);
                setIsPublic(false);
                setShowModal(false)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xs animate-fadeIn">
            <form ref={modalRef} onSubmit={handleSubmit(handleUpload)} className="p-6 bg-white rounded-lg shadow-lg animate-slideUp w-[450px] md:w-[600px]">
                <h2 className="mb-6 text-xl font-semibold">Upload new template</h2>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Template Title</label>
                    <input
                        disabled={isSubmitting}
                        type="text"
                        {...register('title')}
                        className={cn(errors.title ? 'border-red-500 focus:border-red-500' : 'focus:border-indigo-500', ' w-full px-3 py-2 transition-all duration-500 border rounded-md focus:outline-0')}
                        placeholder="Enter template title"
                    />
                    {errors.title && <span className="text-xs italic text-red-500">{errors.title.message}</span>}
                </div>

                <div
                    disabled={isSubmitting}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => inputRef.current.click()}
                    className="flex flex-col items-center justify-center h-56 mb-4 border border-indigo-300 border-dashed rounded-md cursor-pointer bg-indigo-50"
                >
                    <FileTextIcon className="mb-2 text-slate-500 size-10" />
                    <p className="text-sm text-gray-600">
                        Drag and drop a PDF file or <span className="text-indigo-600 underline">choose file</span>
                    </p>
                    <input
                        disabled={isSubmitting}
                        ref={inputRef}
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>

                {!!file && (
                    <div className="mb-4 text-sm text-gray-700">
                        <span className="font-medium">Selected file:</span> {file.name}
                    </div>
                )}

                <div className="flex items-center mb-6 space-x-2">
                    <input
                        disabled={isSubmitting}
                        type="checkbox"
                        id="isPublic"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded accent-indigo-700 focus:ring-indigo-500"
                    />
                    <label htmlFor="isPublic" className="text-sm text-gray-700">Make this public</label>
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="px-4 py-2 text-white bg-indigo-700 rounded-md disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        {isSubmitting ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            </form>
        </div>
    );
}