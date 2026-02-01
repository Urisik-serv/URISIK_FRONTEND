export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("setItem 실패: ", error);
    }
  };
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.log("getItem 실패: ", error);
    }
  };
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log("removeItem 실패: ", error);
    }
  };

  return { setItem, getItem, removeItem };
};
