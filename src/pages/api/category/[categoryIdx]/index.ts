import { NextApiRequest, NextApiResponse } from 'next'
import { getOneCategory } from '@/apis/categories/getCategory'

// 현재 이 파일에 토큰 검증이 필요한지 아닌지 모르겠는 상태.

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const secret = process.env.SECRET_JWT

    if (!secret) {
        return res.status(500).json({
            message: 'JWT_SECRET 환경 변수가 설정되지 않았습니다.',
        })
    }
    try {
        const title = req.body

        if (req.method === 'GET') {
            const category = await getOneCategory(req, res, title)
            return res
                .status(202)
                .json({ message: '카테고리 조회 완료.', category })
        } else {
            return res
                .status(405)
                .json({ message: '지원하지 않는 메서드입니다.' })
        }
    } catch (error) {
        console.error('토큰 검증 중 오류 발생:', error)
        return res.status(401).json({ message: '토큰이 올바르지 않습니다.' })
    }
}

export default handler
