import apiResult from "../types/ApiResult";
import localStorageService from "./LocalStorageService";

class ApiClient {
    get = async <T>(endpoint: string): Promise<apiResult<T>> => {
        await this.stall(500);

        try {
            return {
                code: 200,
                data: localStorageService.getItem<T>(endpoint)
            }
        } catch {
            return {
                code: 500,
                error: 'server error',
                data: null
            }
        }
    }

    post = async <T>(endpoint: string, payload: T): Promise<apiResult<null>> => {
        try {
                await this.stall(500);

                const items = localStorageService.getItem<T[]>(endpoint);
                
                const newItems = items == null ? [payload] : [...items, payload];

                localStorageService.removeItem(endpoint);
                localStorageService.setItem(endpoint, newItems);
                
                return {
                    code: 201,
                    data: null,
                }
        } catch {
                return {
                    code: 500,
                    error: 'server error',
                    data: null
                }
        }
    }

    private stall = async (stallTime = 3000) => {
        await new Promise(resolve => setTimeout(resolve, stallTime));
    }
}

const apiClient = new ApiClient();
export default apiClient;