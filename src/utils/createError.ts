const MAP_STATUS_TO_MESSAGE = {
    404: 'Not Found'
};

/**
 * 创建一个包含 status 参数的 Error 对象
 * 若省略第二个参数，则会根据状态码取一个对应的错误信息
 *
 * @param status HTTP 状态码
 * @param messageOrError 错误信息或 Error 对象
 */
export default function createError(status: keyof typeof MAP_STATUS_TO_MESSAGE, messageOrError?: string | Error) {
    if (messageOrError instanceof Error) {
        messageOrError.status = status;
        return messageOrError;
    }

    let message = messageOrError;
    if (typeof message === 'undefined') {
        message = MAP_STATUS_TO_MESSAGE[status];
    }
    const error = new Error(message);
    error.status = status;
    return error;
}
