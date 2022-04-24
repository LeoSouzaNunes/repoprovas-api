export interface AppError {
    type: string;
    message: string;
}

export function unauthorized(message: string): AppError {
    return { type: "unauthorized", message };
}

export function invalidSchema(message: string): AppError {
    return { type: "unprocessable_entity", message };
}

export function badRequest(message: string): AppError {
    return { type: "bad_request", message };
}
