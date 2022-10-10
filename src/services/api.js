export async function getCategories() {
  try {
    const url = 'https://api.mercadolibre.com/sites/MLB/categories';
    const request = await fetch(url);
    const data = await request.json();
    return data;
  } catch (erro) {
    return erro;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    if (categoryId && query) {
      const urlCategoryAndQuery = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
      const requestCategoryAndQuery = await fetch(urlCategoryAndQuery);
      const dataCategoryAndQuery = await requestCategoryAndQuery.json();
      return dataCategoryAndQuery;
    }
    if (categoryId) {
      const urlCategory = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
      const requestCategory = await fetch(urlCategory);
      const dataCategory = await requestCategory.json();
      return dataCategory;
    }
    const urlQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const requestQuery = await fetch(urlQuery);
    const dataQuery = await requestQuery.json();
    return dataQuery;
  } catch (erro) {
    return erro;
  }
}

export async function getProductById(id) {
  const endpoint = `https://api.mercadolibre.com/items/${id}`;
  const dado = await fetch(endpoint);
  const json = await dado.json();
  return json;
}
