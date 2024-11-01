import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.project.deleteMany()
    await prisma.category.deleteMany()
    await prisma.priority.deleteMany()
    const priorities = [
        { label: 'HIGH' },
        { label: 'MEDIUM' },
        { label: 'LOW' },
    ]

    const categories = [
        { title: 'STUDY' },
        { title: 'EXERCISE' },
        { title: 'ROUTINE' },
        { title: 'HOBBY' },
        { title: 'SHOPPING' },
    ]

    // 우선 순위 데이터 추가
    for (const priority of priorities) {
        await prisma.priority.create({
            data: priority,
        })
    }

    for (const category of categories) {
        await prisma.category.create({
            data: category,
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
