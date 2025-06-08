// 图像优化工具
export class ImageOptimizer {
  constructor() {
    this.cache = new Map()
    this.isMobile = window.innerWidth <= 768
  }

  // 预加载图像
  async preloadImage(src, options = {}) {
    if (this.cache.has(src)) {
      return this.cache.get(src)
    }

    const promise = new Promise((resolve, reject) => {
      const img = new Image()
      
      // 移动端使用较低的优先级
      if (this.isMobile) {
        img.loading = 'lazy'
        img.decoding = 'async'
      } else {
        img.loading = 'eager'
        img.decoding = 'sync'
      }

      img.onload = () => {
        this.cache.set(src, img)
        resolve(img)
      }
      
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
      
      // 设置超时
      const timeout = options.timeout || (this.isMobile ? 10000 : 5000)
      setTimeout(() => reject(new Error('Image load timeout')), timeout)
      
      img.src = src
    })

    this.cache.set(src, promise)
    return promise
  }

  // 检查图像是否已缓存
  isCached(src) {
    return this.cache.has(src)
  }

  // 清理缓存
  clearCache() {
    this.cache.clear()
  }

  // 获取优化的图像URL（如果有CDN服务）
  getOptimizedUrl(src, { width, height, quality = 80 } = {}) {
    // 如果是移动端，可以请求较小尺寸的图像
    if (this.isMobile && width && height) {
      // 这里可以根据实际的CDN服务来调整URL
      // 例如：return `${src}?w=${width}&h=${height}&q=${quality}`
    }
    return src
  }
}

export default new ImageOptimizer()