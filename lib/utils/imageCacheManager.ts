/**
 * 图片缓存管理器
 * 用于将生成的图片保存在浏览器本地缓存中，以便在页面刷新后仍然可以显示
 */

interface CachedImage {
  id: string;
  prompt: string;
  imageData: string;
  timestamp: number;
  settings: Record<string, any>;
}

// 存储键名
const CACHE_KEY = 'dreamfinityx_image_cache';
// 缓存过期时间 (24小时)
const CACHE_TTL = 24 * 60 * 60 * 1000;
// 最大缓存数量
const MAX_CACHE_SIZE = 50;

class ImageCacheManager {
  // 保存图片到缓存
  static saveImages(
    taskId: string, 
    prompt: string, 
    images: string[], 
    settings: Record<string, any>
  ): void {
    if (typeof window === 'undefined') return; // 确保在浏览器环境中运行
    
    try {
      // 获取当前缓存
      const currentCache = this.getCache();
      const timestamp = Date.now();
      
      // 为每个图片创建一个唯一ID并添加到缓存
      const newEntries: CachedImage[] = images.map((imageData, index) => ({
        id: `${taskId}_${index}`,
        prompt,
        imageData,
        timestamp,
        settings
      }));
      
      // 合并并按照时间戳排序
      const updatedCache = [...newEntries, ...currentCache]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, MAX_CACHE_SIZE); // 限制缓存大小
      
      // 保存更新后的缓存
      localStorage.setItem(CACHE_KEY, JSON.stringify(updatedCache));
      
      console.log(`成功缓存 ${images.length} 张图片`);
    } catch (error) {
      console.error('保存图片到缓存失败:', error);
    }
  }
  
  // 获取当前缓存
  static getCache(): CachedImage[] {
    if (typeof window === 'undefined') return []; // 确保在浏览器环境中运行
    
    try {
      const cacheJson = localStorage.getItem(CACHE_KEY);
      if (!cacheJson) return [];
      
      const cache = JSON.parse(cacheJson) as CachedImage[];
      
      // 清理过期缓存
      const now = Date.now();
      const validCache = cache.filter(item => (now - item.timestamp) < CACHE_TTL);
      
      // 如果有过期项目，更新存储
      if (validCache.length !== cache.length) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(validCache));
      }
      
      return validCache;
    } catch (error) {
      console.error('读取缓存失败:', error);
      return [];
    }
  }
  
  // 根据ID获取单张图片
  static getImageById(id: string): CachedImage | null {
    const cache = this.getCache();
    return cache.find(item => item.id === id) || null;
  }
  
  // 根据ID删除单张图片
  static removeImageById(id: string): boolean {
    try {
      const cache = this.getCache();
      const updatedCache = cache.filter(item => item.id !== id);
      
      if (updatedCache.length !== cache.length) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(updatedCache));
        return true;
      }
      return false;
    } catch (error) {
      console.error('删除缓存图片失败:', error);
      return false;
    }
  }
  
  // 清空所有缓存
  static clearCache(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(CACHE_KEY);
      console.log('图片缓存已清空');
    } catch (error) {
      console.error('清空缓存失败:', error);
    }
  }
}

export default ImageCacheManager; 