import localStorageService from "./LocalStorageService";

class ApiClient {
    get = <T>(endpoint: string): T | null => {
    
        return localStorageService.getItem<T>(endpoint);
    }

    post = <T>(endpoint: string, payload: T): void => {
        const items = localStorageService.getItem<T[]>(endpoint);
        const newItems = items == null ? [payload] : [...items, payload];

        localStorageService.removeItem(endpoint);
        localStorageService.setItem(endpoint, newItems);
    }

}

const apiClient = new ApiClient();
export default apiClient;