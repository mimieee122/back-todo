import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useLogin } from '@/components/pages/home/login.hook'
import { Login } from '@/components/pages/home/login'

export default function Home() {
    const router = useRouter()
    const { me } = useLogin() // 로그인 상태 확인

    // ✅ useEffect에서 로그인 성공 시 `/category`로 이동 (return null 제거)
    useEffect(() => {
        if (me.isSuccess && me.data) {
            router.replace('/category') // 안전한 페이지 이동
        }
    }, [me.isSuccess, me.data, router])

    return (
        <div className="flex flex-row justify-center w-screen min-h-screen">
            <div className="blue text-black w-full flex flex-col gap-[10px] justify-center items-center">
                <div className="flex flex-col all justify-center items-center text-center text-black h-screen overflow-hidden">
                    <Login />
                </div>
            </div>
        </div>
    )
}
