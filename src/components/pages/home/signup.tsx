import { useForm } from 'react-hook-form'
import { useSignUp } from './signup.hook'
import Button from '@/components/button'

type FormData = {
    id: string
    password: string
}

export function SignUp() {
    const { onSubmitSignUp } = useSignUp()

    // useForm으로 폼 관리
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    return (
        <form onSubmit={handleSubmit(onSubmitSignUp)}>
            <p className="text-[40px] signIn text-[#7809ff]">SIGN UP</p>
            <label htmlFor="id">ID</label>
            <input
                {...register('id', { required: 'id를 입력해 주세요.' })}
                type="text"
                id="name"
                name="id"
                className="text-center border-black border-[1px]"
            />
            {errors.id && <p>{errors.id.message}</p>}

            <label htmlFor="password">PASSWORD</label>
            <input
                {...register('password', {
                    required: 'password를 입력해 주세요.',
                })}
                type="password"
                id="password"
                name="password"
                className="text-center border-black border-[1px]"
            />
            {errors.password && <p>{errors.password.message}</p>}
            <Button>회원가입</Button>
        </form>
    )
}