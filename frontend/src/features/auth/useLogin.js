import { useMutation } from "@tanstack/react-query"

const useLogin = () => {
    const { mutate: logInUser, isPending: isLoggingIn } = useMutation({
        mutationFn: () => { },
        onSuccess: () => {

        },
        onError: () => {

        }
    })

    return { logInUser, isLoggingIn }
}

export default useLogin