import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Login } from '@/components/pages/home/login'
import { LogOut } from '@/components/pages/home/logout'
import Link from 'next/link'
import Image from 'next/image'

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
                            <div className=" flex flex-col justify-center items-center shadow-[0_0_15px_white] transition-shadow border-[#ff3f6f] border-[3px] border-solid text-center gap-[30px] w-100 text-black p-4 bg-gray-100 bg-opacity-60 rounded-xl">
                                <p className="flan text-[30px] font-thin text-[#ff3f6f]">
                                    WELCOME , {me.data.data.nickname} !
                                </p>
                            </div>
                            <div className="flex flex-col  border-black gap-[5px] justify-center">
                                <Link className="self-center" href="/main">
                                    <button className="signIn font-thin underline text-[25px] text-yellow-300">
                                        {me.data.data.nickname}님의 FLAN
                                        바로가기
                                    </button>
                                </Link>
                                {/* <div className="self-center relative w-[320px]  h-[150px] mt-[2px]">
                                    <Link href="/main">
                                        <Image
                                            src="/assets/images/calendar_width.png"
                                            fill // 부모 요소에 가득 차게 함
                                            alt="달력"
                                            className="object-contain"
                                        />
                                    </Link>
                                </div> */}
                            </div>
                            <div className="flex flex-row mt-[50px] gap-[15px]">
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
