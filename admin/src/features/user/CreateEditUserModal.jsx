/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserFormFieldSchema } from "../../utils/zSchema";
import { cn } from "../../utils/cn";
import { UserCog, UserPlus } from "lucide-react";
import toast from "react-hot-toast"
import useCreateUser from "./useCreateUser";
import useEditUser from "./useEditUser";

export default function CreateEditUserModal({ user = {}, onCloseModal }) {
    const { createUser: createUserApi, isCreating } = useCreateUser()
    const { editUser, isEditing } = useEditUser()

    const [isEdit, setIsEdit] = useState(false)
    const [pPic, setPpic] = useState('')
    const [preview, setPreview] = useState('')

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(createUserFormFieldSchema)
    })

    const isWorking = isSubmitting || isCreating || isEditing

    //? Data popoulation on edit
    useEffect(() => {
        if (user._id) {
            setIsEdit(true)
            reset({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password
            })
            setPreview(user.image)
        }
    }, [user._id, user.email, user.first_name, user.last_name, user.password, user.image, reset])

    const onSubmitForm = async (data) => {
        if (!pPic && !isEdit) {
            toast.error("Please select a profile picture!")
            return;
        }

        //? server update
        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('email', data.email);
        formData.append('password', data.password);

        if (isEdit) {
            pPic ? formData.append('image', pPic) : formData.append('image', user.image);
            editUser({ userId: user._id, userData: formData }, {
                onSuccess: () => {
                    onCloseModal?.()
                    reset({
                        first_name: '',
                        last_name: '',
                        email: '',
                        password: ''
                    })
                }
            })
        }
        else {
            if (pPic) {
                formData.append('image', pPic);
            }
            createUserApi(formData, {
                onSuccess: () => {
                    onCloseModal?.()
                    reset({
                        first_name: '',
                        last_name: '',
                        email: '',
                        password: ''
                    })
                }
            })
        }
    };

    const onHandleFileChange = (e) => {
        setPpic(e.target.files[0])
    }

    const onHandlePreview = (file) => {
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
            setPreview(reader.result)
        }
    }

    useEffect(() => {
        if (pPic) onHandlePreview(pPic)
    }, [pPic])

    return (
        <>
            <h2 className="flex items-center gap-2 pb-4 mb-4 text-xl font-bold text-indigo-700 border-b border-slate-300">
                {isEdit ? <UserCog /> : <UserPlus />}
                <span>{isEdit ? "Edit User" : "Create User"}</span>
            </h2>
            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
                <div className="flex w-full gap-4">
                    <div className="flex flex-col w-1/2 space-y-1">
                        <label className="text-sm" htmlFor="">First Name <span className="text-red-600">*</span></label>
                        <input
                            disabled={isWorking}
                            {...register('first_name')}
                            type="text"
                            placeholder="First Name"
                            className={cn(errors.first_name ? 'border-red-500 focus:border-red-500' : 'focus:border-indigo-500', ' w-full px-3 py-2 transition-all duration-500 border rounded-md focus:outline-0')}
                        />
                        {errors.first_name && <span className="text-xs italic text-red-500">{errors.first_name.message}</span>}
                    </div>
                    <div className="flex flex-col w-1/2 space-y-1">
                        <label className="text-sm" htmlFor="">Last Name <span className="text-red-600">*</span></label>
                        <input
                            disabled={isWorking}
                            {...register('last_name')}
                            type="text"
                            placeholder="Last Name"
                            className={cn(errors.last_name ? 'border-red-500 focus:border-red-500' : 'focus:border-indigo-500', ' w-full px-3 py-2 transition-all duration-500 border rounded-md focus:outline-0')}
                        />
                        {errors.last_name && <span className="text-xs italic text-red-500">{errors.last_name.message}</span>}
                    </div>
                </div>
                <div className="flex flex-col space-y-1">
                    <label className="text-sm" htmlFor="">Email <span className="text-red-600">*</span></label>
                    <input
                        disabled={isWorking}
                        {...register('email')}
                        type="email"
                        placeholder="Email"
                        className={cn(errors.email ? 'border-red-500 focus:border-red-500' : 'focus:border-indigo-500', ' w-full px-3 py-2 transition-all duration-500 border rounded-md focus:outline-0')}
                    />
                    {errors.email && <span className="text-xs italic text-red-500">{errors.email.message}</span>}
                </div>
                <div className="flex flex-col space-y-1">
                    <label className="text-sm" htmlFor="">Password <span className="text-red-600">*</span></label>
                    <input
                        disabled={isWorking}
                        {...register('password')}
                        type="password"
                        placeholder="Password"
                        className={cn(errors.password ? 'border-red-500 focus:border-red-500' : 'focus:border-indigo-500', ' w-full px-3 py-2 transition-all duration-500 border rounded-md focus:outline-0')}
                    />
                    {errors.password && <span className="text-xs italic text-red-500">{errors.password.message}</span>}
                </div>
                <div className="flex flex-col space-y-1">
                    <label className="text-sm" htmlFor="">Profile Image <span className="text-red-600"></span></label>
                    <div className="flex items-center justify-between">
                        <input
                            disabled={isWorking}
                            onChange={onHandleFileChange}
                            type="file"
                            className=""
                        />
                        {!!preview && <img alt="profile_image" src={preview} className="w-10 h-10 bg-gray-500 rounded-full" />}
                    </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        disabled={isWorking}
                        type="button"
                        onClick={onCloseModal}
                        className="px-4 py-2 text-gray-600 transition-all duration-200 bg-gray-200 rounded-md disabled:cursor-not-allowed hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isWorking}
                        type="submit"
                        className="px-4 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md disabled:cursor-not-allowed disabled:bg-gray-300 hover:bg-indigo-700"
                    >
                        {isWorking ? isEdit ? 'Updating...' : 'Creating...' : isEdit ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        </>
    )
}
