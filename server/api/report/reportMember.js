export default defineEventHandler(async (event) => {
  try {
    const body = await useBody(event);
    console.log('Received report data:', body); // 确保请求体中的数据是正确的

    // 模拟保存数据的操作
    if (!body.reason || !body.member || !body.memberReported) {
      throw new Error('Missing required fields');
    }

    // 模拟返回成功
    return { status: 'success', message: 'Report submitted successfully' };
  } catch (error) {
    console.error('Error processing report:', error); // 输出错误到控制台
    return {
      statusCode: 500,
      statusMessage: `Internal Server Error: ${error.message}`,
    };
  }
});

