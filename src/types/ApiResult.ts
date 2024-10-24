
type apiResult<T> = {
    code: number,
    error?: string,
    data: T | null
}

export default apiResult;