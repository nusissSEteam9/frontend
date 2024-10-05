export default defineEventHandler(async (event) => {
    try {
        const body = await useBody(event);
        console.log('Received report data:', body);

        if (!body.reason || !body.member || !body.recipeReported) {
            throw new Error('Missing required fields');
        }

        // 返回成功响应
        return { status: 'success', message: 'Report submitted successfully' };
    } catch (error) {
        console.error('Error processing report:', error);
        return {
            statusCode: 500,
            statusMessage: `Internal Server Error: ${error.message}`,
        };
    }
});
