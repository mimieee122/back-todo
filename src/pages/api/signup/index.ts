import { createUser } from '@/apis/users/createUser'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const secret = process.env.SECRET_JWT

        if (!secret) {
            console.error('JWT_SECRET is not defined.')
            return res.status(500).json({
                message: 'JWT_SECRET 환경 변수가 설정되지 않았습니다.',
            })
        }

        if (req.method === 'POST') {
            createUser(req, res)
            return res.status(200).json({ message: '성공' })
        } else {
            return res
                .status(405)
                .json({ message: '허용되지 않은 메서드입니다.' })
        }
    } catch {
        return res.status(401).json({ message: '서버 오류 발생.' })
    }
}

export default handler
