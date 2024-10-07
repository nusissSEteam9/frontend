export default defineEventHandler((event) => {
  const url = event.node.req.url;
  console.log('URL:', url);

  // 用来循环使用的图片
  const images = ['recipe1.jpg', 'recipe2.jpg', 'recipe3.jpg', 'recipe4.jpg'];

  // 用来生成20个模拟食谱的函数
  const generateRecipes = (category) => {
    const recipes = [];
    for (let i = 1; i <= 20; i++) {
      recipes.push({
        id: i,
        name: `${category} Recipe ${i}`,
        description: `A delicious ${category} dish. Recipe number ${i}.`,
        image: images[i % images.length],
        member: {
          id: i,
          username: `${category}_chef_${i}`,
        },
      });
    }
    return recipes;
  };

  // 默认情况下生成所有类别的食谱
  const generateAllRecipes = () => {
    const categories = [
      'African',
      'American',
      'Asian',
      'Italian',
      'Mexican',
      'French',
      'Indian',
      'Vegan',
      'Vegetarian',
      'Gluten-Free',
    ];
    let allRecipes = [];
    categories.forEach((category) => {
      allRecipes = [...allRecipes, ...generateRecipes(category)];
    });
    return allRecipes;
  };

  switch (url) {
    case url.includes('/african'):
      return generateRecipes('African');
    case url.includes('/american'):
      return generateRecipes('American');
    case url.includes('/asian'):
      return generateRecipes('Asian');
    case url.includes('/italian'):
      return generateRecipes('Italian');
    case url.includes('/mexican'):
      return generateRecipes('Mexican');
    case url.includes('/french'):
      return generateRecipes('French');
    case url.includes('/indian'):
      return generateRecipes('Indian');
    case url.includes('/vegan'):
      return generateRecipes('Vegan');
    case url.includes('/vege'):
      return generateRecipes('Vegetarian');
    case url.includes('/gluten'):
      return generateRecipes('Gluten-Free');
    default:
      return generateAllRecipes();
  }
});
