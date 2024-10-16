const get = <T>(endpoint: string): Array<T> => {
    console.log("get");
    
    return new Array<T>();
}

const post = <T>(endpoint: string, payload: T) => {
    console.log("post");
}

const apiClient = {
    get,
    post
}

export default apiClient;