import { useMutation, useQueryClient } from "@tanstack/react-query"
import { uploadNewTemplate } from "@/services/apiTemplates"
import useAuth from '@/hooks/useAuth'
import toast from "react-hot-toast"

const useUploadTemplate = () => {
    const { accessToken } = useAuth()
    const queryClient = useQueryClient()

    const { mutate: uploadTemplate, isPending: isUploading } = useMutation({
        mutationFn: (newTemplateData) => uploadNewTemplate({ accessToken, newTemplateData }),
        onSuccess: () => {
            toast.success('Template Successfully uploaded.')
            queryClient.invalidateQueries({ queryKey: ['templates'] })
        },
        onError: () => {
            toast.error('Something went wrong with uploading template.')
        }
    })


    return { uploadTemplate, isUploading }
}

export default useUploadTemplate