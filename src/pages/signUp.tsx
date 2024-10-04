import { SignUp } from '@/components/pages/home/signup'
import Link from 'next/link'
import Button from '@/components/button'

export default function Signup() {
    return (
        <div>
            <SignUp />
            <Link href="/">
                <Button>HOME</Button>
            </Link>
        </div>
    )
}
