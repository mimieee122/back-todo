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
            <div className="blue  text-black w-full  flex flex-col gap-[10px] justify-center items-center ">
                <div className="text-black login ">
                    {me.isSuccess ? (
                        <div className="flex flex-col gap-[10px] contents-center  justify-center">
                            <div className="flex  flex-row items-center gap-[0px] justify-center">
                                <div className=" flex name flex-row justify-center items-center  border-solid  h-[50px]  gap-[5px] text-black p-4 bg-[#ff3f6f]  rounded-xl">
                                    <p className="yellow text-[30px] font-thin text-[white]">
                                        <span>HI, </span>
                                        <span>{me.data.data?.nickname}</span>
                                    </p>
                                </div>
                                <div className="relative think w-[450px]  h-[400px] ">
                                    <Image
                                        src="/assets/images/think.png"
                                        fill // 부모 요소에 가득 차게 함
                                        alt="think emoji"
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            <Link className="self-center" href="/category">
                                <div className="flex pink flex-col w-[580px] shadow-[0_0_20px_white] transition-shadow rounded-xl  bg-white bg-opacity-15 border-[#ff517d] border-[5px] border-solid  gap-[5px] justify-center">
                                    <button className="signIn font-thin text-[30px] text-[#ff8fab]">
                                        IT&#39;S YOUR FLAN
                                    </button>

                                    <div className="flex flex-row justify-center items-center gap-[10px]">
                                        <div className="self-center relative w-[200px]  h-[150px] mt-[2px] mb-[15px]">
                                            <Image
                                                src="/assets/images/calendar_width.png"
                                                fill // 부모 요소에 가득 차게 함
                                                alt="달력"
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="self-center cursor relative w-[100px]  h-[100px] mt-[2px] mb-[15px]">
                                            <Image
                                                src="/assets/images/cursor.png"
                                                fill // 부모 요소에 가득 차게 함
                                                alt="마우스 커서"
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <div className="flex under relative flex-row justify-center mt-[15px] ">
                                <LogOut />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col mb-[5px] gap-[10px]">
                            <Login />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
