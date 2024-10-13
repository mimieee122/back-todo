import { createProject } from '@/apis/projects/createProject'
import { getProjects } from '@/apis/projects/getProject'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const secret = process.env.SECRET_JWT

    if (!secret) {
        console.error('JWT_SECRET is not defined.')
        return res.status(500).json({
            message: 'JWT_SECRET 환경 변수가 설정되지 않았습니다.',
        })
    }

    try {
        if (req.method === 'POST') {
            const { categoryIdx, title, priorityIdx } = req.body

            // 데이터 검증
            if (!categoryIdx || !priorityIdx || !title) {
                return res
                    .status(400)
                    .json({ message: '필수 필드가 누락되었습니다.' })
            }

            try {
                await createProject(req, res)
                return res
                    .status(201)
                    .json({ message: '프로젝트가 성공적으로 생성되었습니다.' })
            } catch (error) {
                console.error('프로젝트 생성 중 오류 발생:', error)
                return res
                    .status(500)
                    .json({ message: '프로젝트 생성에 실패했습니다.' })
            }
        } else if (req.method === 'GET') {
            await getProjects(req, res)
            return res.status(202).json({ message: '프로젝트 조회 완료.' })
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
