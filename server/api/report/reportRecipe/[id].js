export default defineEventHandler((event) => {
    const recipeId = event.context.params.recipeId;

    // 模拟的食谱举报数据
    const reports = {
        1: {
            member: { id: 1, username: 'reporterUser' }, // 举报人
            recipeReported: { id: 1, name: 'Chocolate Cake' }, // 被举报的食谱
        },
        2: {
            member: { id: 2, username: 'reporterUser2' },
            recipeReported: { id: 2, name: 'Vegan Salad' },
        },
    };

    const report = reports[recipeId] || null;

    if (!report) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Recipe not found',
        });
    }

    return { value: report };
});
