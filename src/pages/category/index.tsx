import CategoriesComponent from '@/components/pages/categories/categoriescomponent'
import { LogOut } from '@/components/pages/home/logout'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import { UseQueryOptions } from '@tanstack/react-query'
import { useState, useEffect } from 'react'

export default function Main() {
    const [nickname, setNickname] = useState<string | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // ✅ 브라우저 환경에서만 실행하도록 체크
            const storedNickname = localStorage.getItem('nickname')
            if (storedNickname) {
                setNickname(storedNickname) // ✅ localStorage에서 닉네임을 가져와서 업데이트
            }
        }
    }, [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useQuery<any, Error>({
        queryKey: ['me'],
        queryFn: async () => {
            const response = await axios.get('/api/me')
            return response.data
        },

        staleTime: 1000 * 60 * 5, // 5분 동안 데이터 캐시 유지
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as UseQueryOptions<any, Error>)

    return (
        <div className="flex flex-col items-center justify-center">
            <nav className="flex flex-row text-[18px] justify-between nav w-screen  p-[10px] pl-[20px] h-[60px] pr-[20px] bg-white bg-opacity-5 ">
                <div className="flex flex-row gap-[10px]">
                    <div className=" relative flex flex-col gap-0 items-start w-[30px] h-[30px] mt-[8px] overflow-hidden">
                        <Image
                            src="/assets/images/profile.png"
                            fill // 부모 요소에 가득 차게 함
                            alt="프로필 사진"
                            className="object-fill"
                        />
                    </div>
                    <p className="user  mt-[7px]">USER : {nickname}</p>
                </div>
                <div className="">
                    <LogOut />
                </div>
            </nav>
            <div className="flex flex-col two justify-center items-center  gap-[10px] mt-[30px]">
                <h1 className="text-[70px] text-[#ff8fab] title font-thin category yellow">
                    CATEGORY
                </h1>
                <CategoriesComponent />
            </div>
            {/* <div className="flex flex-row gap-[30px] items-center mt-[50px] justify-center   ">
                <div className="text-center ">
                    <Link href="/priority">
                        <button className="border-[2px] border-[black] bg-white bg-opacity-10 border-solid rounded-md w-[250px] text-[20px] text-[black]">
                            PRIORITY 분류
                        </button>
                    </Link>
                </div>
            </div> */}
        </div>
    )
}
