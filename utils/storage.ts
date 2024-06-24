import AsyncStorage from "@react-native-async-storage/async-storage";

export const FAVORITES_POSTS_KEY = process.env.EXPO_PUBLIC_FAVORITES_POSTS_KEY || "favorites-post";

export async function saveFavoritesPosts(favorites: number[]) {
  try {
    await AsyncStorage.setItem(FAVORITES_POSTS_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error('Failed to save favorites to storage', e);
  }
};


export async function getFavoritesPosts(): Promise<number[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_POSTS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch favorites from storage', e);
    return [];
  }
}

export async function removeFavoritesPosts() {
  try {
    await AsyncStorage.removeItem(FAVORITES_POSTS_KEY);
  } catch (e) {
    console.error('Failed to remove favorites from storage', e);
  }
}