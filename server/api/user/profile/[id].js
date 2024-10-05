export default defineEventHandler((event) => {
    const userId = event.context.params.id;
  
    // 模拟的用户数据
    const users = {
      1: {
        member: {
          id: 1,
          username: 'john_doe',
        },
        recipes: [
          {
            id: 1,
            name: 'Grilled Chicken Salad',
            description: 'A delicious chicken salad with mixed greens.',
            image: 'recipe1.jpg',
          },
          {
            id: 2,
            name: 'Vegan Buddha Bowl',
            description: 'A healthy vegan bowl with quinoa and chickpeas.',
            image: 'recipe2.jpg',
          },
          {
            id: 3,
            name: 'Spaghetti Carbonara',
            description: 'Classic Italian pasta with creamy sauce.',
            image: 'recipe3.jpg',
          },
          {
            id: 4,
            name: 'Beef Tacos',
            description: 'Tasty beef tacos with fresh toppings.',
            image: 'recipe4.jpg',
          },
          {
            id: 5,
            name: 'Chicken Alfredo',
            description: 'Creamy Alfredo pasta with grilled chicken.',
            image: 'recipe1.jpg',
          },
          {
            id: 6,
            name: 'Vegetable Stir Fry',
            description: 'A mix of fresh vegetables stir-fried with soy sauce.',
            image: 'recipe2.jpg',
          },
          {
            id: 7,
            name: 'Shrimp Scampi',
            description: 'Garlic butter shrimp with pasta.',
            image: 'recipe3.jpg',
          },
          {
            id: 8,
            name: 'BBQ Ribs',
            description: 'Slow-cooked ribs with BBQ sauce.',
            image: 'recipe4.jpg',
          },
          {
            id: 9,
            name: 'Caesar Salad',
            description: 'Classic Caesar salad with croutons and Parmesan.',
            image: 'recipe1.jpg',
          },
          {
            id: 10,
            name: 'Margherita Pizza',
            description: 'Pizza with fresh tomatoes, mozzarella, and basil.',
            image: 'recipe2.jpg',
          },
          {
            id: 11,
            name: 'Beef Stroganoff',
            description: 'Tender beef in a creamy mushroom sauce.',
            image: 'recipe3.jpg',
          },
          {
            id: 12,
            name: 'Fish Tacos',
            description: 'Crispy fish tacos with fresh salsa.',
            image: 'recipe4.jpg',
          },
          {
            id: 13,
            name: 'Chicken Parmesan',
            description: 'Breaded chicken with marinara and mozzarella.',
            image: 'recipe1.jpg',
          },
          {
            id: 14,
            name: 'Vegetable Curry',
            description: 'Spicy vegetable curry with coconut milk.',
            image: 'recipe2.jpg',
          },
          {
            id: 15,
            name: 'Lamb Chops',
            description: 'Grilled lamb chops with rosemary.',
            image: 'recipe3.jpg',
          },
          {
            id: 16,
            name: 'Pancakes',
            description: 'Fluffy pancakes with maple syrup.',
            image: 'recipe4.jpg',
          },
          {
            id: 17,
            name: 'Chicken Tikka Masala',
            description: 'Spicy chicken in a creamy tomato sauce.',
            image: 'recipe1.jpg',
          },
          {
            id: 18,
            name: 'Falafel Wrap',
            description: 'Falafel with hummus and veggies in a wrap.',
            image: 'recipe2.jpg',
          },
          {
            id: 19,
            name: 'Beef Bourguignon',
            description: 'French beef stew with red wine.',
            image: 'recipe3.jpg',
          },
          {
            id: 20,
            name: 'Chocolate Cake',
            description: 'Rich chocolate cake with frosting.',
            image: 'recipe4.jpg',
          },
        ],
      },
      2: {
        member: {
          id: 2,
          username: 'jane_doe',
        },
        recipes: [],
      },
    };
  
    const user = users[userId] || null;
  
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      });
    }
  
    return user;
  });
  