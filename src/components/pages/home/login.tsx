/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/button'
import { useLogin } from './login.hook'
import { useForm } from 'react-hook-form'

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
            className="flex flex-col border-black border-[2px] border-solid justify-center items-center text-center gap-[30px] w-[600px] text-black p-4 bg-white bg-opacity-35 rounded-xl"
        >
            <p className="text-[40px] signIn text-[#5fbfe9]">SIGN IN</p>

            <label htmlFor="nickname">ID</label>
            <input
                {...register('id', { required: 'id를 입력해 주세요.' })} // id 필드를 useForm과 연결
                type="text"
                id="name"
                name="id"
                className="text-center border-black border-[1px]"
            />
            {errors.id && <p>{errors.id.message}</p>}

            <label htmlFor="password">Password</label>
            <input
                {...register('password', {
                    required: 'password를 입력해 주세요.',
                    // 필수 입력 유효성 검사
                })}
                type="password"
                id="password"
                name="password"
                className="text-center border-black border-[1px]"
            />
            {errors.password && <p>{errors.password.message}</p>}

            <Button>로그인</Button>
        </form>
    )
}
