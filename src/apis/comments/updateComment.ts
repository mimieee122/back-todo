import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

const prisma = new PrismaClient()

export const updateComment = async (
    req: NextApiRequest,
    res: NextApiResponse,
    commentIdx: number
) => {
    const cookies = parseCookies({ req })
    const token = cookies['token']

    if (!token) {
        return res.status(401).json({ message: '토큰이 없습니다.' })
    }

    try {
        const { content, userIdx } = req.body
        const decoded = verify(token, process.env.SECRET_JWT as string) as {
            idx: number
            nickname: string
        }

        const comment = await prisma.comment.findUnique({
            where: { idx: commentIdx },
        })

        if (!comment) {
            return res
                .status(404)
                .json({ message: '게시물을 찾을 수 없습니다.' })
        }

        if (decoded.idx !== userIdx) {
            return res
                .status(400)
                .json({ message: '게시물을 수정할 권한이 없습니다.' })
        }

        const result = await prisma.comment.update({
            where: { idx: commentIdx },
            data: {
                content: content,
            },
        })
        res.status(200).json(result)
    } catch (error) {
        console.error('댓글 업데이트 중 오류 발생:', error)
        return res.status(500).json({ message: '서버 오류.' })
    }
}
