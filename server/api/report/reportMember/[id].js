export default defineEventHandler((event) => {
    const memberId = event.context.params.memberId;
  
    // 模拟数据：通过 memberId 查找成员和被举报成员
    const reports = {
      1: {
        member: { id: 1, username: 'reporter1' }, // 举报人
        memberReported: { id: 2, username: 'reportedUser1' }, // 被举报人
      },
      2: {
        member: { id: 2, username: 'reporter2' },
        memberReported: { id: 1, username: 'reportedUser2' },
      },
    };
  
    const report = reports[memberId] || null;
  
    if (!report) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Member not found',
      });
    }
  
    return { value: report };
  });
  