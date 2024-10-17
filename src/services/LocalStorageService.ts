class LocalStorageService {
    setItem<T>(key: string, value: T): void {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error("Error saving to localStorage", error);
      }
    }
  
    getItem<T>(key: string): T | null {
      try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) return null;
        return JSON.parse(serializedValue) as T;
      } catch (error) {
        console.error("Error reading from localStorage", error);
        return null;
      }
    }
  
    removeItem(key: string): void {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error("Error removing from localStorage", error);
      }
    }
  
    clear(): void {
      try {
        localStorage.clear();
      } catch (error) {
        console.error("Error clearing localStorage", error);
      }
    }
  }
  
  const localStorageService = new LocalStorageService();
  export default localStorageService;