
import type { Category } from "../types";

export const getAllCategories = (): Category[] => {
	const raw = localStorage.getItem('Categories')
	if (!raw) return []
	try {
		const parsed = JSON.parse(raw)
		return Array.isArray(parsed) ? parsed : [parsed]
	} catch (e) {
		return []
	}
}

export const createCategory = (category: Partial<Category>) => {
	const categories = getAllCategories()
	const newCategory: Category = {
		id: category.id ?? Date.now(),
		title: category.title ?? 'Untitled'
	}
	categories.push(newCategory)
	localStorage.setItem('Categories', JSON.stringify(categories))
	return { success: true, msg: 'Category created.', data: newCategory }
}

export const getCategoryById = (id: number) => {
	return getAllCategories().find((c) => c.id === id)
}

