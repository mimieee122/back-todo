import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'
import { JwtPayload } from 'jsonwebtoken' // ?
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 토큰이 올바르게 제공되었는지 check / GET 메소드 일 수행

export default async function me(req: NextApiRequest, res: NextApiResponse) {
    const cookies = parseCookies({ req })
    const token = cookies['token']

    if (token === undefined) {
        return res
            .status(401)
            .json({ status: 'fail', message: '토큰이 없습니다.' })
    }
    let payload
    try {
        payload = verify(token, process.env.SECRET_JWT as string)

        const { id, idx } = payload as JwtPayload

        const user = await prisma.user.findUnique({
            where: {
                idx: idx,
            },
        })

        if (user === null) {
            return res.status(401).json({ message: '유저가 없습니다.' })
        }
        return res.status(200).json({
            status: 'success',
            message: '올바르게 토큰 제공 완료',
            id,
            idx,
            nickname: user.nickname,
        })
    } catch {
        return res
            .status(402)
            .json({ status: 'fail', message: '토큰이 올바르지 않습니다.' })
    }
}
