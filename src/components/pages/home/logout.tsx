/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { useLogOut } from './logout.hook'

// 데이터의 형식을 동일하게 강제하는 것
// (데이터가 공유되는 게 아니라, 타입 정의만 동일한 것.)
type FormData = {
    id: string
    password: string
}

export function LogOut() {
    // useLogin hook에서 가져온 onSubmitLogin 사용
    const { onSubmitLogOut } = useLogOut()

    // useForm으로 폼 관리
    const { handleSubmit } = useForm<FormData>()

    return (
        <form onSubmit={handleSubmit(onSubmitLogOut)}>
            <button className="w-[600px] h-[40px]   bg-[black] text-white bg-opacity-40  border-solid rounded-md">
                로그아웃
            </button>
        </form>
    )
}
