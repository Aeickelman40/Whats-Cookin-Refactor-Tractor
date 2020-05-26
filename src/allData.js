function fetchData() {
  let wcUsersData = fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData')
    .then(response => response.json())
    .then(data => {
      return data.wcUsersData;
    })
    .catch(err => console.log(err.message))

  let ingredientsData = fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/ingredients/ingredientsData')
    .then(response => response.json())
    .then(data => {
      return data.ingredientsData;
    })
    .catch(err => console.log(err.message))

  let recipeData = fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/recipes/recipeData')
    .then(response => response.json())
    .then(data => {
      return data.recipeData;
    })
    .catch(err => console.log(err.message))

  return Promise.all([wcUsersData, ingredientsData, recipeData])
    .then(data => {
      let allData = {}
      allData.wcUsersData = data[0];
      allData.ingredientsData = data[1];
      allData.recipeData = data[2];
      return allData;
    })
}

export default fetchData;