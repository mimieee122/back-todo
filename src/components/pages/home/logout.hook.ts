/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
// 데이터의 형식을 동일하게 강제하는 것
// (데이터가 공유되는 게 아니라, 타입 정의만 동일한 것.)

export function useLogOut() {
    const router = useRouter()
    // 사용자 정보 쿼리
    const me = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            try {
                const response = await axios.get('/api/me')
                return response.data // 로그인된 사용자 데이터 반환
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                return null // 오류 발생 시(null 반환하여 로그아웃 상태를 명확히 인식)
            }
        },
    })
    // 로그아웃 폼 제출 핸들러
    const onSubmitLogOut = () => {
        if (me.data) {
            logoutMutation.mutate()
        } else {
            toast.error('이미 로그아웃 상태입니다.')
        }
    }

    // mutation은 데이터를 변경하는 작업을 의미
    const logoutMutation = useMutation({
        mutationFn: async () => await axios.post('/api/logout'),
        onSuccess: async () => {
            toast.success('로그아웃이 완료되었습니다.')

            await me.refetch() // 어 얘 넣으니까 바로 문제 해결됐다 !!
            router.push('/')
        },
    })

    return {
        onSubmitLogOut, // 로그아웃 폼 제출 함수 반환
    }
}
