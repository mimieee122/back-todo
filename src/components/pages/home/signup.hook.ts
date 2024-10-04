import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

type FormData2 = {
    id: string
    password: string
    nickname: string
}

export function useSignUp() {
    // 사용자 정보 쿼리
    const me = useQuery({
        queryKey: ['me'],
        queryFn: async () => await axios.get('/api/me'),
    })

    const signUpMutation = useMutation({
        mutationFn: async ({ id, password, nickname }: FormData2) => {
            await axios.post('/api/signup', { id, password, nickname })
        },
        onSuccess: async () => {
            // 아래 두 문장 덕분에 nickname 띄우기를 성공하게 됨 ..
            window.location.href = '/'
            await me.refetch()
            toast.success('회원가입이 완료되었습니다.')
        },
    })

    const onSubmitSignUp = (data: FormData2) => {
        signUpMutation.mutate({
            id: data.id,
            password: data.password,
            nickname: data.nickname,
        })
    }
    return { onSubmitSignUp }
}
