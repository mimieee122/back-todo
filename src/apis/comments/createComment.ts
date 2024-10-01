import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

const prisma = new PrismaClient()

export const createComment = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: '허용되지 않은 메서드입니다.' })
    }

    const cookies = parseCookies({ req })
    const token = cookies['token']

    if (!token) {
        return res
            .status(401)
            .json({ message: '로그인 후 게시물 작성이 가능합니다.' })
    }

    try {
        const decoded = verify(token, process.env.SECRET_JWT as string) as {
            idx: number
        }
        const idx = req.query.commentIdx
        const { projectIdx, content } = req.body

        if (!content) {
            return res.status(400).json({ message: '내용 필수입니다.' })
        }
        const commentIdx = Number(idx)
        const comment = await prisma.comment.create({
            data: {
                userIdx: decoded.idx,
                projectIdx: Number(projectIdx),
                idx: commentIdx,
                content: content,
            },
        })
        res.status(200).json(comment)
    } catch (error) {
        console.error('댓글 생성 중 오류 발생:', error)
        return res.status(500).json({ message: '서버 오류' })
    }
}
