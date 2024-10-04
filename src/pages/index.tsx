import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Login } from '@/components/pages/home/login'
import Image from 'next/image'
import { LogOut } from '@/components/pages/home/logout'
import Link from 'next/link'
import Button from '@/components/button'

export default function Home() {
    const me = useQuery({
        queryKey: ['me'],
        queryFn: async () => await axios.get('/api/me'),
    })

    return (
        <div className="flex flex-row justify-center w-screen min-h-screen">
            <div className="absolute w-screen h-screen -z-10">
                <Image
                    src="/assets/images/background.jpg"
                    fill // 부모 요소에 가득 차게 함
                    alt="디폴트 배경"
                    className="object-cover"
                />
            </div>
            <div className="blue text-black w-[1000px]  flex flex-col gap-[30px] justify-center items-center ">
                <div className="text-black login ">
                    {me.isSuccess ? (
                        <div className="flex flex-col gap-[10px] contents-center  justify-center">
                            <div className=" flex flex-col justify-center items-center   border-gray-500 border-[3px] text-center gap-[30px] w-96 h-[50px] p-4 bg-white bg-opacity-70  rounded-xl">
                                <p className="text-black text-center now ">
                                    <span>현재 접속중인 유저 ID : </span>
                                    <span>{me.data.data.id}</span>
                                </p>
                            </div>
                            <div className=" flex flex-col justify-center items-center  border-[#3eb9ed] border-[5px] text-center gap-[30px] w-96 text-black p-4 bg-gray-100 bg-opacity-60 rounded-xl">
                                <p className="text-[40px] signIn text-black">
                                    로그인 성공
                                </p>
                            </div>
                            <LogOut />
                            <Link href="/signUp">
                                <Button>회원가입</Button>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="absolute w-screen h-screen -z-10">
                                <Image
                                    src="/assets/images/background.jpg"
                                    fill // 부모 요소에 가득 차게 함
                                    alt="디폴트 배경"
                                    className="object-cover"
                                />
                            </div>
                            <Login />
                            <Link href="/signUp">
                                <Button>회원가입</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
