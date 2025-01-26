/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/button'
import { useLogin } from './login.hook'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import Link from 'next/link'

// 데이터의 형식을 동일하게 강제하는 것
// (데이터가 공유되는 게 아니라, 타입 정의만 동일한 것.)
type FormData = {
    id: string
    password: string
}

export function Login() {
    // useLogin hook에서 가져온 onSubmitLogin 사용
    const { onSubmitLogin } = useLogin()

    // useForm으로 폼 관리
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    return (
        <form
            onSubmit={handleSubmit(onSubmitLogin)} // handleSubmit으로 폼 제출
            className="flex flex-col all justify-center items-center text-center  text-black p-4"
        >
            <div className="flex flex-col gap-[0px] items-center inLogo justify-center">
                <div className=" relative flex flex-col emoji gap-0 items-end w-[280px] h-[252px]">
                    <Image
                        src="/assets/images/final face.svg"
                        fill // 부모 요소에 가득 차게 함
                        alt="flan 이모지"
                        className="object-fill"
                    />
                </div>

                <div className="relative gap-0 loGo w-[300px]   ">
                    <Image
                        src="/assets/images/flan.png"
                        width={400} // 원하는 가로 길이
                        height={100} // 원하는 세로 길이
                        alt="flan 로고"
                        className="object-cover"
                    />

                    {/* <div className="flex flex-row gap-[10px] mt-1 font-thin w-[400px] tell h-[5px] text-[18px] sub p-0 ">
                        <p className=" text-[black] font-thin">CREATE </p>
                        <p className="yellow text-[#ffbd43] font-thin">PLAN</p>
                        <p className="yellow text-[#ffbd43]">FAST</p>
                        <p className=" text-[black]"> WITH</p>
                        <p className="yellow text-[#ffbd43]">FLAN</p>
                    </div> */}
                </div>
            </div>
            <div className="flex flex-col yellowBox text-black bg-[white] bg-opacity-10   justify-center items-center text-center gap-[10px] w-[360px] py-2  rounded-2xl">
                {/* <label
                    htmlFor="id"
                    className="text-[24px] signIn text-[#ffbd43]"
                >
                    SIGN IN
                </label> */}
                <p className=" text-[black] text-[24px]  mt-[20px] mb-[4px] font-extrabold">
                    Welcome Back
                </p>
                <input
                    {...register('id', { required: 'id를 입력해 주세요.' })} // id 필드를 useForm과 연결
                    type="text"
                    id="name"
                    name="id"
                    placeholder="id"
                    className="text-center w-[360px] h-[40px] bg-[#DCDCDC] rounded-xl"
                />
                {errors.id && <p>{errors.id.message}</p>}

                {/* <label
                    htmlFor="password"
                    className="text-[24px] signIn text-[#ffbd43]"
                >
                    pw
                </label> */}
                <input
                    {...register('password', {
                        required: 'password를 입력해 주세요.',
                        // 필수 입력 유효성 검사
                    })}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    className="text-center w-[360px] h-[40px] bg-[#DCDCDC] rounded-xl"
                />
                {errors.password && <p>{errors.password.message}</p>}
                <div className="flex flex-row justify-center items-center mt-[10px] gap-[20px]">
                    <Button>SIGN IN</Button>
                    <Link href="/signUp">
                        <button className="w-[160px] h-[40px] mt-[20px]   shadow-2xl hover:shadow-[0_0_10px_white] transition-shadow bg-[white] bg-opacity-70  border-solid rounded-3xl">
                            SIGN UP
                        </button>
                    </Link>
                </div>
            </div>
        </form>
    )
}
