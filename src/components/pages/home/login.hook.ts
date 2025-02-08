/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { UseQueryOptions } from '@tanstack/react-query'

type FormData = {
    id: string
    password: string
}

export function useLogin() {
    const router = useRouter()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const me = useQuery<any, Error>({
        queryKey: ['me'],
        queryFn: async () => {
            const response = await axios.get('/api/me')
            return response.data
        },

        staleTime: 1000 * 60 * 5, // 5분 동안 데이터 캐시 유지
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as UseQueryOptions<any, Error>)

    // 로그인 처리
    const loginMutation = useMutation({
        mutationFn: async ({ id, password }: FormData) => {
            const response = await axios.post('/api/login', { id, password })
            return response.data
        },
        onSuccess: (data) => {
            localStorage.setItem('nickname', data.nickname) // ✅ localStorage에도 저장
            toast.success('로그인 성공!')
            router.replace('/category') // 로그인 성공 시 즉시 이동
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || '로그인 실패')
        },
    })

    // ✅ `onSubmitLogin`을 명확하게 정의하여 반환
    const onSubmitLogin = (data: FormData) => {
        loginMutation.mutate(data)
    }

    return { me, onSubmitLogin }
}
