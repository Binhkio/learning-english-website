const handlePayload = (payload) => ({
    message: payload.message,
    data: payload.hasOwnProperty('data') ? payload.data : {},
    code: payload.hasOwnProperty('result') ? payload.result : payload.hasOwnProperty('code') ? payload.code : undefined,
});

export default handlePayload;
