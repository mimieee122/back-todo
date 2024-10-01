import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'
import { verify } from 'jsonwebtoken'
import { getComment } from '@/apis/comments/getComment'
import { createComment } from '@/apis/comments/createComment'
import { deleteComment } from '@/apis/comments/deleteComment'
import { updateComment } from '@/apis/comments/updateComment'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const cookies = parseCookies({ req })

        const token = cookies['token']
        const secret = process.env.SECRET_JWT

        const commentIdx = req.query.commentIdx

        if (!secret) {
            throw new Error('SECRET_JWT 환경 변수가 설정되지 않았습니다.')
        }

        if (!token) {
            return res
                .status(400)
                .json({ message: '토큰이 발급되지 않았습니다.' })
        }
        verify(token, secret) as string

        if (req.method === 'GET') {
            const comment = await getComment(req, res)
            if (comment === null) {
                return res
                    .status(404)
                    .json({ message: '게시물을 찾을 수 없습니다.' })
            }
            return res.status(202).json(comment)
        } else if (req.method === 'PUT') {
            const comment = await updateComment(req, res, Number(commentIdx))
            if (comment === null) {
                return res
                    .status(404)
                    .json({ message: '게시물을 찾을 수 없습니다.' })
            }
            return res.status(202).json(comment)
        } else if (req.method === 'POST') {
            const comment = await createComment(req, res)
            if (comment === null) {
                return res
                    .status(404)
                    .json({ message: '게시물을 찾을 수 없습니다.' })
            }
            return res.status(202).json(comment)
        } else if (req.method === 'DELETE') {
            const comment = await deleteComment(req, res)
            if (comment === null) {
                return res
                    .status(404)
                    .json({ message: '게시물을 찾을 수 없습니다.' })
            }
            return res.status(202).json({ message: '댓글이 삭제되었습니다.' })
        } else {
            res.status(405).json({ message: '지원하지 않는 메서드입니다.' })
        }
    } catch {
        res.status(500).json('error')
    }
}

export default handler
