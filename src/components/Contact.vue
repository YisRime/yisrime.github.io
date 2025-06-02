<template>
  <section id="contact" class="contact">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">联系我</h2>
        <p class="section-subtitle">有项目想法或者想要合作？随时联系我！</p>
      </div>
      
      <div class="contact-content">
        <div class="contact-info">
          <div class="info-card">
            <h3>联系方式</h3>
            <p>选择最适合您的联系方式</p>
            
            <div class="contact-methods">
              <div class="contact-method">
                <div class="method-icon">📧</div>
                <div class="method-content">
                  <h4>邮箱</h4>
                  <a href="mailto:yisrime@example.com">yisrime@example.com</a>
                </div>
              </div>
              
              <div class="contact-method">
                <div class="method-icon">🐙</div>
                <div class="method-content">
                  <h4>GitHub</h4>
                  <a href="https://github.com/yisrime" target="_blank">@yisrime</a>
                </div>
              </div>
              
              <div class="contact-method">
                <div class="method-icon">💬</div>
                <div class="method-content">
                  <h4>微信</h4>
                  <span>yisrime_wechat</span>
                </div>
              </div>
            </div>
            
            <div class="social-links">
              <h4>社交媒体</h4>
              <div class="social-icons">
                <a href="https://github.com/yisrime" target="_blank" class="social-link">
                  <span class="social-icon">🐙</span>
                  <span>GitHub</span>
                </a>
                <a href="#" target="_blank" class="social-link">
                  <span class="social-icon">💼</span>
                  <span>LinkedIn</span>
                </a>
                <a href="#" target="_blank" class="social-link">
                  <span class="social-icon">🐦</span>
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="contact-form">
          <form @submit.prevent="submitForm" class="form">
            <h3>发送消息</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label for="name">姓名 *</label>
                <input 
                  type="text" 
                  id="name"
                  v-model="form.name"
                  :class="{ error: errors.name }"
                  placeholder="请输入您的姓名"
                >
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>
              
              <div class="form-group">
                <label for="email">邮箱 *</label>
                <input 
                  type="email" 
                  id="email"
                  v-model="form.email"
                  :class="{ error: errors.email }"
                  placeholder="请输入您的邮箱"
                >
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="subject">主题</label>
              <input 
                type="text" 
                id="subject"
                v-model="form.subject"
                placeholder="请输入邮件主题（可选）"
              >
            </div>
            
            <div class="form-group">
              <label for="message">消息 *</label>
              <textarea 
                id="message"
                v-model="form.message"
                :class="{ error: errors.message }"
                rows="5"
                placeholder="请输入您想说的话..."
              ></textarea>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>
            
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? '发送中...' : '发送消息' }}
            </button>
          </form>
          
          <div v-if="submitStatus" class="submit-status" :class="submitStatus.type">
            {{ submitStatus.message }}
          </div>
        </div>
      </div>
      
      <div class="availability">
        <div class="availability-card">
          <div class="status-indicator">
            <div class="status-dot"></div>
            <span class="status-text">当前状态：可接项目</span>
          </div>
          <p>我目前有时间接受新的项目和合作机会。无论是短期项目还是长期合作，都欢迎联系讨论。</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = ref({})
const isSubmitting = ref(false)
const submitStatus = ref(null)

const validateForm = () => {
  errors.value = {}
  
  if (!form.name.trim()) {
    errors.value.name = '请输入您的姓名'
  }
  
  if (!form.email.trim()) {
    errors.value.email = '请输入您的邮箱'
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.value.email = '请输入有效的邮箱地址'
  }
  
  if (!form.message.trim()) {
    errors.value.message = '请输入您的消息'
  } else if (form.message.trim().length < 10) {
    errors.value.message = '消息内容至少需要10个字符'
  }
  
  return Object.keys(errors.value).length === 0
}

const submitForm = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  submitStatus.value = null
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 这里应该是实际的API调用
    console.log('Form submitted:', form)
    
    submitStatus.value = {
      type: 'success',
      message: '消息发送成功！我会尽快回复您。'
    }
    
    // 重置表单
    Object.keys(form).forEach(key => {
      form[key] = ''
    })
    
  } catch (error) {
    submitStatus.value = {
      type: 'error',
      message: '发送失败，请稍后重试或直接发送邮件联系我。'
    }
  } finally {
    isSubmitting.value = false
    
    // 3秒后清除状态消息
    setTimeout(() => {
      submitStatus.value = null
    }, 3000)
  }
}
</script>

<style scoped>
.contact {
  padding: 3rem 2rem;
  height: 100%;
  display: flex;
  align-items: center;
}

.container {
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  position: relative;
}

.section-title::after {
  content: '';
  width: 60px;
  height: 4px;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.6;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.info-card {
  background: rgba(248, 249, 250, 0.7);
  padding: 1.5rem;
  border-radius: 12px;
  height: fit-content;
}

.info-card h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.info-card > p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.contact-methods {
  margin-bottom: 1.5rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.contact-method:hover {
  transform: translateY(-2px);
}

.method-icon {
  font-size: 1.2rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  border-radius: 8px;
  color: white;
}

.method-content h4 {
  color: #2c3e50;
  margin-bottom: 0.2rem;
  font-size: 0.9rem;
}

.method-content a,
.method-content span {
  color: #666;
  text-decoration: none;
  font-size: 0.8rem;
  transition: color 0.3s ease;
}

.method-content a:hover {
  color: #3498db;
}

.social-links h4 {
  color: #2c3e50;
  margin-bottom: 0.8rem;
  font-size: 1rem;
}

.social-icons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.8rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  text-decoration: none;
  color: #666;
  transition: all 0.3s ease;
  font-size: 0.8rem;
}

.social-link:hover {
  transform: translateY(-2px);
  color: #3498db;
}

.social-icon {
  font-size: 1rem;
}

.form {
  background: rgba(248, 249, 250, 0.7);
  padding: 1.5rem;
  border-radius: 12px;
}

.form h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.6rem;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.form-group input.error,
.form-group textarea.error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 0.7rem;
  margin-top: 0.2rem;
  display: block;
}

.submit-btn {
  width: 100%;
  padding: 0.8rem;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-status {
  margin-top: 0.8rem;
  padding: 0.8rem;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
  font-size: 0.8rem;
}

.submit-status.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.submit-status.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.availability {
  text-align: center;
}

.availability-card {
  background: linear-gradient(45deg, #3498db, #2ecc71);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #2ecc71;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.status-text {
  font-weight: 600;
  font-size: 1rem;
}

.availability-card p {
  font-size: 0.9rem;
  line-height: 1.6;
  opacity: 0.9;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .contact {
    padding: 2rem 1rem;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .social-icons {
    justify-content: center;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .info-card,
  .form {
    padding: 1rem;
  }

  .availability-card {
    padding: 1rem;
  }
}

@media (prefers-color-scheme: dark) {
  .section-title {
    color: #ffffff;
  }

  .section-subtitle {
    color: #cccccc;
  }

  .info-card,
  .form {
    background: rgba(42, 42, 42, 0.7);
  }

  .info-card h3,
  .form h3 {
    color: #ffffff;
  }

  .info-card > p {
    color: #cccccc;
  }

  .contact-method,
  .social-link {
    background: rgba(60, 60, 60, 0.8);
  }

  .method-content h4 {
    color: #ffffff;
  }

  .method-content a,
  .method-content span {
    color: #cccccc;
  }

  .social-links h4 {
    color: #ffffff;
  }

  .social-link {
    color: #cccccc;
  }

  .form-group label {
    color: #ffffff;
  }

  .form-group input,
  .form-group textarea {
    background: rgba(60, 60, 60, 0.8);
    border-color: #555;
    color: #ffffff;
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: #999;
  }
}
</style>