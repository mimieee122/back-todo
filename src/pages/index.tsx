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
        queryFn: async () => {
            const response = await axios.get('/api/me')
            return response.data
        },
    })

    return (
        <div className="flex flex-row justify-center w-screen min-h-screen">
            <div className="blue text-black w-[1000px]  flex flex-col gap-[30px] justify-center items-center ">
                <div className="text-black login ">
                    {me.isSuccess ? (
                        <div className=" flex flex-col gap-[10px] contents-center  justify-center">
                            <div className="flex relative flex-row items-center gap-[10px]">
                                <div className=" flex flex-row justify-center items-center  border-solid  h-[50px]  gap-[5px] w-56 text-black p-4 bg-yellow-200 bg-opacity-30 rounded-xl">
                                    <p className="yellow text-[30px] font-thin text-[#ffbd43]">
                                        HI,
                                    </p>
                                    <p className="yellow text-[30px] font-thin text-[#ffbd43]">
                                        {me.data.data?.nickname}
                                    </p>
                                </div>
                                <div className="relative w-[300px]  h-[300px] ">
                                    <Image
                                        src="/assets/images/hi.png"
                                        fill // 부모 요소에 가득 차게 함
                                        alt="hi emoji"
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col  shadow-[0_0_20px_white] transition-shadow rounded-xl  bg-white bg-opacity-15 border-[#ffe136] border-[5px] border-solid  gap-[5px] justify-center">
                                <Link className="self-center" href="/category">
                                    <button className="signIn font-thin text-[40px] text-[#ffbd43]">
                                        IT&#39;S YOUR FLAN
                                    </button>
                                </Link>

                                <div className="self-center relative w-[320px]  h-[150px] mt-[2px] mb-[15px]">
                                    <Link href="/category">
                                        <Image
                                            src="/assets/images/calendar_width.png"
                                            fill // 부모 요소에 가득 차게 함
                                            alt="달력"
                                            className="object-contain"
                                        />
                                    </Link>
                                </div>
                            </div>

                            <div className="flex flex-row justify-center mt-[25px] gap-[15px]">
                                <LogOut />
                                <Link href="/signUp">
                                    <button className="w-[340px] h-[40px]  shadow-2xl hover:shadow-[0_0_10px_white] transition-shadow bg-[gray] bg-opacity-30 border-black border-[3px] border-solid rounded-md">
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
