import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

type FormData = {
    id: string
    password: string
}

export function useSignUp() {
    // 사용자 정보 쿼리
    const me = useQuery({
        queryKey: ['me'],
        queryFn: async () => await axios.get('/api/me'),
    })

    const signUpMutation = useMutation({
        mutationFn: async ({ id, password }: FormData) => {
            await axios.post('/api/signup', { id, password })
        },
        onSuccess: () => {
            me.refetch()
            toast.success('회원가입이 완료되었습니다.')
            window.location.reload()
        },
    })

    const onSubmitSignUp = (data: FormData) => {
        signUpMutation.mutate({
            id: data.id,
            password: data.password,
        })
    }
    return { onSubmitSignUp }
}
