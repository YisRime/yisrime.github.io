import { ref, onMounted, onUnmounted } from 'vue'

export function useResponsive() {
  const deviceType = ref('')
  const orientation = ref('')
  const screenSize = ref({ width: 0, height: 0 })
  const aspectRatio = ref(0)

  const updateResponsiveData = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const ratio = width / height

    screenSize.value = { width, height }
    aspectRatio.value = ratio

    // 检测设备类型
    if (width <= 480) {
      deviceType.value = 'mobile'
    } else if (width <= 768) {
      deviceType.value = 'tablet'
    } else if (width <= 1024) {
      deviceType.value = 'desktop-small'
    } else {
      deviceType.value = 'desktop-large'
    }

    // 检测屏幕方向
    if (ratio > 1.3) {
      orientation.value = 'landscape'
    } else if (ratio < 0.8) {
      orientation.value = 'portrait'
    } else {
      orientation.value = 'square'
    }
  }

  const getDeviceClass = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const ratio = width / height

    // 手机端
    if (width <= 480) {
      return 'mobile'
    }
    
    // 平板端
    if (width <= 768) {
      return 'tablet'
    }
    
    // 桌面端 - 横屏
    if (ratio > 1.5) {
      return 'landscape'
    }
    
    // 桌面端 - 竖屏
    if (ratio < 0.8) {
      return 'portrait'
    }
    
    // 桌面端 - 默认
    return 'desktop'
  }

  const isMobile = () => deviceType.value === 'mobile'
  const isTablet = () => deviceType.value === 'tablet'
  const isDesktop = () => deviceType.value.includes('desktop')
  const isLandscape = () => orientation.value === 'landscape'
  const isPortrait = () => orientation.value === 'portrait'

  onMounted(() => {
    updateResponsiveData()
    window.addEventListener('resize', updateResponsiveData)
    window.addEventListener('orientationchange', () => {
      // 延迟更新以确保屏幕方向变化完成
      setTimeout(updateResponsiveData, 100)
    })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateResponsiveData)
    window.removeEventListener('orientationchange', updateResponsiveData)
  })

  return {
    deviceType,
    orientation,
    screenSize,
    aspectRatio,
    getDeviceClass,
    isMobile,
    isTablet,
    isDesktop,
    isLandscape,
    isPortrait,
    updateResponsiveData
  }
}