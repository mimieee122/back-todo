/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

// 데이터의 형식을 동일하게 강제하는 것
// (데이터가 공유되는 게 아니라, 타입 정의만 동일한 것.)

type FormData = {
    id: string
    password: string
}

export function useLogin() {
    // 사용자 정보 쿼리
    const me = useQuery({
        queryKey: ['me'],
        queryFn: async () => await axios.get('/api/me'),
    })

    // 로그인 폼 제출 핸들러
    const onSubmitLogin = (data: FormData) => {
        if (me.isSuccess) {
            toast.error('이미 로그인 상태입니다.')
            return
        } else {
            loginMutation.mutate({
                id: data.id,
                password: data.password,
            })
        }
    }

    // 로그인 API 호출을 위한 mutation
    const loginMutation = useMutation({
        mutationFn: async ({ id, password }: FormData) => {
            const response = await axios.post('/api/login', {
                id,
                password,
            })

            const { payload } = response.data

            const userIdx = payload.idx

            if (!userIdx || userIdx === undefined) {
                console.error(
                    'Failed to set userIdx: value is undefined or null'
                )
                throw new Error('로그인 실패: 유효하지 않은 데이터입니다.')
            }

            return response.data
        },
        onSuccess: async () => {
            window.location.reload()
            await me.refetch() // 로그인 성공 시 사용자 정보 다시 가져오기
            toast.success('로그인이 완료되었습니다.')
        },
        onError: (error: any) => {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message)
            }
        },
    })

    return {
        onSubmitLogin, // 로그인 폼 제출 함수 반환
    }
}
