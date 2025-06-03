// 颜色提取工具
export class ColorExtractor {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
  }

  // 从图片URL提取主色调
  async extractColorsFromImage(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        try {
          const colors = this.analyzeImage(img)
          resolve(colors)
        } catch (error) {
          reject(error)
        }
      }
      
      img.onerror = () => {
        reject(new Error('图片加载失败'))
      }
      
      img.src = imageUrl
    })
  }

  // 分析图片并提取颜色
  analyzeImage(img) {
    // 设置画布大小（降低分辨率以提高性能）
    const maxSize = 200
    const scale = Math.min(maxSize / img.width, maxSize / img.height)
    this.canvas.width = img.width * scale
    this.canvas.height = img.height * scale
    
    // 绘制图片
    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
    
    // 获取图片数据
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    
    // 提取颜色
    return this.extractDominantColors(imageData)
  }

  // 提取主要颜色
  extractDominantColors(imageData) {
    const data = imageData.data
    const colorMap = new Map()
    
    // 采样像素（每隔4个像素采样一次以提高性能）
    for (let i = 0; i < data.length; i += 16) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const a = data[i + 3]
      
      // 跳过透明像素
      if (a < 125) continue
      
      // 量化颜色（减少颜色数量）
      const quantizedR = Math.floor(r / 32) * 32
      const quantizedG = Math.floor(g / 32) * 32
      const quantizedB = Math.floor(b / 32) * 32
      
      const colorKey = `${quantizedR},${quantizedG},${quantizedB}`
      colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1)
    }
    
    // 获取最频繁的颜色
    const sortedColors = Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([color]) => {
        const [r, g, b] = color.split(',').map(Number)
        return { r, g, b }
      })
    
    return this.generateThemeColors(sortedColors)
  }

  // 生成主题颜色
  generateThemeColors(dominantColors) {
    if (dominantColors.length === 0) {
      return this.getFallbackColors()
    }
    
    // 选择最合适的主色调
    const primaryColor = this.selectPrimaryColor(dominantColors)
    
    // 生成配色方案
    return {
      primaryColor: this.rgbToHex(primaryColor.r, primaryColor.g, primaryColor.b),
      primaryDark: this.darkenColor(primaryColor, 0.2),
      primaryLight: this.lightenColor(primaryColor, 0.3),
      textPrimary: this.getContrastText(dominantColors[0]),
      textSecondary: this.getSecondaryText(dominantColors[0]),
      textMuted: this.getMutedText(dominantColors[0]),
      bgPrimary: this.getDarkBg(dominantColors[0]),
      gradientBg: this.generateGradient(dominantColors),
      avatarShadow: this.getColorWithAlpha(primaryColor, 0.3),
      avatarShadowHover: this.getColorWithAlpha(primaryColor, 0.4),
      segmentGlow: this.getColorWithAlpha(primaryColor, 0.6)
    }
  }

  // 选择主色调（选择饱和度和亮度适中的颜色）
  selectPrimaryColor(colors) {
    return colors.find(color => {
      const hsl = this.rgbToHsl(color.r, color.g, color.b)
      return hsl.s > 0.3 && hsl.l > 0.2 && hsl.l < 0.8
    }) || colors[0]
  }
  // 获取对比文本颜色
  getContrastText(bgColor) {
    const luminance = this.getLuminance(bgColor.r, bgColor.g, bgColor.b)
    return luminance > 0.4 ? '#1e293b' : '#f1f5f9'
  }

  // 获取次要文本颜色
  getSecondaryText(bgColor) {
    const luminance = this.getLuminance(bgColor.r, bgColor.g, bgColor.b)
    return luminance > 0.4 ? '#475569' : '#cbd5e1'
  }

  // 获取静音文本颜色
  getMutedText(bgColor) {
    const luminance = this.getLuminance(bgColor.r, bgColor.g, bgColor.b)
    return luminance > 0.4 ? '#64748b' : '#94a3b8'
  }

  // 获取深色背景
  getDarkBg(color) {
    return this.darkenColor(color, 0.8)
  }

  // 生成渐变背景
  generateGradient(colors) {
    const dark1 = this.darkenColor(colors[0], 0.8)
    const dark2 = colors[1] ? this.darkenColor(colors[1], 0.7) : this.darkenColor(colors[0], 0.7)
    const dark3 = colors[2] ? this.darkenColor(colors[2], 0.6) : this.darkenColor(colors[0], 0.6)
    
    return `linear-gradient(135deg, ${dark1} 0%, ${dark2} 50%, ${dark3} 100%)`
  }

  // 工具函数
  rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  }

  rgbToHsl(r, g, b) {
    r /= 255
    g /= 255
    b /= 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2
    
    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }
    
    return { h, s, l }
  }

  getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  darkenColor(color, amount) {
    const r = Math.max(0, Math.floor(color.r * (1 - amount)))
    const g = Math.max(0, Math.floor(color.g * (1 - amount)))
    const b = Math.max(0, Math.floor(color.b * (1 - amount)))
    return this.rgbToHex(r, g, b)
  }

  lightenColor(color, amount) {
    const r = Math.min(255, Math.floor(color.r + (255 - color.r) * amount))
    const g = Math.min(255, Math.floor(color.g + (255 - color.g) * amount))
    const b = Math.min(255, Math.floor(color.b + (255 - color.b) * amount))
    return this.rgbToHex(r, g, b)
  }

  getColorWithAlpha(color, alpha) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
  }
  getFallbackColors() {
    return {
      primaryColor: '#6366f1',
      primaryDark: '#4f46e5',
      primaryLight: '#a5b4fc',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      bgPrimary: '#0f172a',
      gradientBg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      avatarShadow: 'rgba(99, 102, 241, 0.3)',
      avatarShadowHover: 'rgba(99, 102, 241, 0.4)',
      segmentGlow: 'rgba(99, 102, 241, 0.6)'
    }
  }
}

export default ColorExtractor