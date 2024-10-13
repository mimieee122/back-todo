import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const priorities = [
        { label: 'High' },
        { label: 'Medium' },
        { label: 'Low' },
    ]

    // 우선 순위 데이터 추가
    for (const priority of priorities) {
        await prisma.priority.create({
            data: priority,
        })
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
