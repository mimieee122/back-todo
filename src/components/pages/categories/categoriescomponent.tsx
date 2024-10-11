import { categories } from './categories'

export default function CategoriesComponent() {
    return (
        <div>
            <ul className="flex flex-row justify-center gap-[30px]">
                {categories.map((category) => (
                    <li
                        className="w-[250px] h-[250px] text-center text-[20px] font-extrabold bg-white bg-opacity-10 border-solid border-[1px] rounded-xl border-black"
                        key={category.categoryIdx}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
