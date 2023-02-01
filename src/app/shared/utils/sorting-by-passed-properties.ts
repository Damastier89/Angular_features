/**
 * Функция для сортировки вложенных элементов массива.
 * @param param - исходный массив
 * @param propertyName - искомый объект
 * @param insertProperty - поле в искомом объекте
 * */
export function sortingByPassedProperties<T, K extends keyof T, InsertProperty extends keyof T[K]>(
	param: T[],
	propertyName: K,
	insertProperty?: InsertProperty,
): T[] {
	return param?.sort(function (a: T, b: T) {
		if (insertProperty) {
			return a[propertyName][insertProperty] >= b[propertyName][insertProperty] ? 1 : -1;
		}

		return a[propertyName] >= b[propertyName] ? 1 : -1;
	});
}
