import { useForm } from 'react-hook-form'
import { useSignUp } from './signup.hook'
import Image from 'next/image'
import Link from 'next/link'

type FormData2 = {
    id: string
    password: string
    nickname: string
}

export function SignUp() {
    const { onSubmitSignUp } = useSignUp()

    // useForm으로 폼 관리
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData2>()

    return (
        <form
            className="flex flex-col gap-[10px]  justify-center items-center h-screen w-screen"
            onSubmit={handleSubmit(onSubmitSignUp)}
        >
            {/* 달력과 SIGN UP 폼을 포함하는 부모 div */}
            <div className="relative flex flex-col gap-[20px] items-center mb-[20px] ">
                <div className="relative w-[250px] h-[265px] z-20 ">
                    <Image
                        src="/assets/images/emoji0.svg"
                        alt="flan 이모지"
                        layout="fill"
                        objectFit="cover"
                        unoptimized
                    />
                </div>

                {/* SIGN UP 폼 */}
                <div className="flex flex-col  bg-opacity-70   justify-center items-center w-[370px]    gap-[8px]  relative z-0">
                    <p className=" text-[black] text-[24px]  mb-[10px] font-extrabold">
                        Get Started
                    </p>

                    <input
                        {...register('id', { required: 'id를 입력해 주세요.' })}
                        type="text"
                        id="name"
                        name="id"
                        className="text-center w-[300px] h-[40px] bg-[#FF9800] bg-opacity-20 rounded-xl"
                        placeholder="id"
                    />
                    {errors.id && <p>{errors.id.message}</p>}

                    <input
                        {...register('password', {
                            required: 'password를 입력해 주세요.',
                        })}
                        type="password"
                        id="password"
                        name="password"
                        className="text-center w-[300px] h-[40px] bg-[#FF9800] bg-opacity-20 rounded-xl"
                        placeholder="password"
                    />
                    {errors.password && <p>{errors.password.message}</p>}

                    {/* <label
                        htmlFor="nickname "
                        className="mt-[20px]  text-[12px]"
                    >
                        NICKNAME
                    </label> */}
                    <input
                        {...register('nickname', {
                            required: 'nickname을 입력해 주세요.',
                            maxLength: {
                                value: 3,
                                message:
                                    '⚠️ nickname은 세 글자 이내로 입력해 주세요.',
                            },
                        })}
                        type="text"
                        id="nickname"
                        name="nickname"
                        className="text-center w-[300px] h-[40px] bg-[#FF9800] bg-opacity-20 rounded-xl "
                        placeholder="nickname"
                    />
                    {errors.nickname && (
                        <p className="mb-[0px] text-red-500 text-sm">
                            {errors.nickname.message}
                        </p>
                    )}

                    <button className="w-[160px] h-[40px] mt-[10px] bg-[#FF9800] text-white hover:shadow-[0_0_10px_white] transition-shadow   border-solid rounded-3xl">
                        SIGN UP
                    </button>
                </div>
            </div>

            <div className=" text-[18px] text-gray-500 ">
                <Link href="/">
                    <button>HOME</button>
                </Link>
            </div>
        </form>
    )
}
