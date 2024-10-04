/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

// 데이터의 형식을 동일하게 강제하는 것
// (데이터가 공유되는 게 아니라, 타입 정의만 동일한 것.)

export function useLogOut() {
    // 사용자 정보 쿼리
    const me = useQuery({
        queryKey: ['me'],
        queryFn: async () => await axios.get('/api/me'),
    })

    // 로그아웃 폼 제출 핸들러
    const onSubmitLogOut = () => {
        if (me.isSuccess) {
            logoutMutation.mutate()
        } else {
            toast.error('이미 로그아웃 상태입니다.')
        }
    }

    // mutation은 데이터를 변경하는 작업을 의미
    const logoutMutation = useMutation({
        mutationFn: async () => await axios.post('/api/logout'),
        onSuccess: async () => {
            await me.refetch()
            toast.success('로그아웃이 완료되었습니다.')
            window.location.reload()
        },
    })

    return {
        onSubmitLogOut, // 로그아웃 폼 제출 함수 반환
    }
}
