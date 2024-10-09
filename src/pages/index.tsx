import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Login } from '@/components/pages/home/login'
import { LogOut } from '@/components/pages/home/logout'
import Link from 'next/link'

export default function Home() {
    // useRouter를 사용하면 현재 URL에 대한 정보에 쉽게 접근

    const me = useQuery({
        queryKey: ['me'],
        queryFn: async () => await axios.get('/api/me'),
    })

    return (
        <div className="flex flex-row justify-center w-screen min-h-screen">
            <div className="blue text-black w-[1000px]  flex flex-col gap-[30px] justify-center items-center ">
                <div className="text-black login ">
                    {me.isSuccess ? (
                        <div className="flex flex-col gap-[10px] contents-center  justify-center">
                            <div className=" flex flex-col font-extrabold justify-center items-center   border-gray-500 border-[3px] text-center gap-[30px] w-100 h-[50px] p-4 bg-white bg-opacity-70  rounded-xl">
                                <p className="text-black  text-center now">
                                    <span> HI. </span>
                                    <span>{me.data.data.nickname}!</span>
                                </p>
                            </div>
                            <div className=" flex flex-col justify-center items-center  border-[black] border-[5px] text-center gap-[30px] w-100 text-black p-4 bg-gray-100 bg-opacity-60 rounded-xl">
                                <p className="flan text-[30px] font-thin text-black">
                                    로그인 성공
                                </p>
                            </div>
                            <div className="flex flex-row justify-center">
                                <Link href="/main">
                                    <button className="text-[25px] text-yellow-300">
                                        FLAN 바로가기
                                    </button>
                                </Link>
                            </div>
                            <div className="flex flex-row gap-[15px]">
                                <LogOut />
                                <Link href="/signUp">
                                    <button className="w-[200px] h-[40px]  shadow-2xl hover:shadow-[0_0_10px_white] transition-shadow bg-[yellow] bg-opacity-30 border-black border-[3px] border-solid rounded-md">
                                        회원가입
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col  gap-[10px]">
                            <Login />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
