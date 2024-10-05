export default defineEventHandler((event) => {
    // 获取请求中的 id 参数
    const recipeId = event.context.params.id;
    console.log(recipeId);
    // 模拟食谱数据
    const recipes = {
      1: {
        id: 1,
        name: "Grilled Chicken Salad",
        image: "recipe1.jpg",
        rating: 4.5,
        numberOfUserRatings: 120,
        numberOfSaved: 450,
        submittedDate: "2022-09-15",
        member: {
          id: 1,
          username: "john_doe",
        },
        tags: ["Healthy", "Chicken", "Salad"],
        servings: 2,
        preparationTime: 30,
        ingredients: [
          { foodText: "2 chicken breasts" },
          { foodText: "1/4 cup olive oil" },
          { foodText: "2 cups mixed greens" },
        ],
        steps: [
          "Marinate the chicken with olive oil, salt, and pepper.",
          "Grill the chicken on medium heat for 5 minutes on each side.",
          "Mix greens with dressing, top with sliced grilled chicken.",
        ],
        healthScore: 5,
        calories: 400,
        protein: "25g",
        carbohydrate: "15g",
        sugar: "5g",
        sodium: "300mg",
        fat: "20g",
        saturatedFat: "5g",
        reviews: [
          {
            member: {
              id: 102,
              username: "jane_doe",
            },
            reviewDate: "2023-01-05",
            rating: 5,
            comment: "Delicious and easy to make! My family loved it.",
          },
          {
            member: {
              id: 103,
              username: "bob_smith",
            },
            reviewDate: "2023-01-10",
            rating: 4,
            comment: "Tasty, but could use more seasoning.",
          },
        ],
      },
      2: {
        id: 2,
        name: "Vegan Buddha Bowl",
        image: "recipe2.jpg",
        rating: 4.7,
        numberOfUserRatings: 89,
        numberOfSaved: 320,
        submittedDate: "2022-10-10",
        member: {
          id: 2,
          username: "vegan_chef",
        },
        tags: ["Vegan", "Healthy", "Bowl"],
        servings: 1,
        preparationTime: 20,
        ingredients: [
          { foodText: "1 cup quinoa" },
          { foodText: "1/2 cup roasted chickpeas" },
          { foodText: "1 avocado" },
        ],
        steps: [
          "Cook the quinoa according to package instructions.",
          "Layer quinoa, roasted chickpeas, and avocado in a bowl.",
          "Top with tahini dressing.",
        ],
        healthScore: 6,
        calories: 350,
        protein: "15g",
        carbohydrate: "40g",
        sugar: "8g",
        sodium: "200mg",
        fat: "12g",
        saturatedFat: "2g",
        reviews: [
          {
            member: {
              id: 104,
              username: "plant_power",
            },
            reviewDate: "2023-02-01",
            rating: 5,
            comment: "Perfect for a light lunch! Will make again.",
          },
        ],
      },
    };
  
    // 根据请求的 ID 返回相应的食谱数据
    const recipe = recipes[recipeId] || null;
  
    if (!recipe) {
      throw createError({
        statusCode: 404,
        statusMessage: "Recipe not found",
      });
    }
  
    return recipe;
  });
  