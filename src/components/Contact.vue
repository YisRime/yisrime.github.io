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
            <h3>让我们开始对话</h3>
            <p>我很乐意听到您的想法并讨论可能的合作机会。无论是项目咨询、技术交流还是简单的问候，都欢迎联系我。</p>
            
            <div class="contact-methods">
              <div class="contact-method">
                <div class="method-icon">📧</div>
                <div class="method-content">
                  <h4>邮箱</h4>
                  <a href="mailto:yisrime@example.com">yisrime@example.com</a>
                </div>
              </div>
              
              <div class="contact-method">
                <div class="method-icon">💬</div>
                <div class="method-content">
                  <h4>微信</h4>
                  <span>YisRime2024</span>
                </div>
              </div>
              
              <div class="contact-method">
                <div class="method-icon">📱</div>
                <div class="method-content">
                  <h4>QQ</h4>
                  <span>123456789</span>
                </div>
              </div>
            </div>
            
            <div class="social-links">
              <h4>社交媒体</h4>
              <div class="social-icons">
                <a href="https://github.com/yisrime" target="_blank" class="social-link">
                  <span class="social-icon">📂</span>
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
                <a href="#" target="_blank" class="social-link">
                  <span class="social-icon">📝</span>
                  <span>Blog</span>
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
                  required
                  :class="{ error: errors.name }"
                >
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>
              
              <div class="form-group">
                <label for="email">邮箱 *</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  required
                  :class="{ error: errors.email }"
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
                placeholder="简短描述您要讨论的内容"
              >
            </div>
            
            <div class="form-group">
              <label for="message">消息 *</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                rows="6"
                required
                :class="{ error: errors.message }"
                placeholder="请详细描述您的需求或想法..."
              ></textarea>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>
            
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="isSubmitting">发送中...</span>
              <span v-else>发送消息 🚀</span>
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
          <p>我目前正在寻找新的合作机会和有趣的项目。如果您有想法需要实现，让我们聊一聊！</p>
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
  padding: 6rem 0;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
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
  font-size: 1.1rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.info-card {
  background: #f8f9fa;
  padding: 2.5rem;
  border-radius: 15px;
  border: 1px solid #e9ecef;
}

.info-card h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.info-card > p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.contact-methods {
  margin-bottom: 2rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.method-icon {
  font-size: 1.5rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  border-radius: 10px;
  color: white;
}

.method-content h4 {
  color: #2c3e50;
  margin-bottom: 0.3rem;
  font-size: 1rem;
}

.method-content a,
.method-content span {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.method-content a:hover {
  color: #3498db;
}

.social-links h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: white;
  border-radius: 25px;
  text-decoration: none;
  color: #666;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.social-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  color: #3498db;
}

.social-icon {
  font-size: 1.2rem;
}

.form {
  background: #f8f9fa;
  padding: 2.5rem;
  border-radius: 15px;
  border: 1px solid #e9ecef;
}

.form h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background: white;
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
  font-size: 0.8rem;
  margin-top: 0.3rem;
  display: block;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
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
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
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
  padding: 2rem;
  border-radius: 15px;
  max-width: 600px;
  margin: 0 auto;
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.status-dot {
  width: 12px;
  height: 12px;
  background: #2ecc71;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.status-text {
  font-weight: 600;
  font-size: 1.1rem;
}

.availability-card p {
  font-size: 1rem;
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
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .social-icons {
    justify-content: center;
  }

  .section-title {
    font-size: 2rem;
  }

  .info-card,
  .form {
    padding: 1.5rem;
  }
}

@media (prefers-color-scheme: dark) {
  .contact {
    background: #1a1a1a;
  }

  .section-title {
    color: #ffffff;
  }

  .section-subtitle {
    color: #cccccc;
  }

  .info-card,
  .form {
    background: #2a2a2a;
    border: 1px solid #333;
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
    background: #333;
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
    background: #333;
    border-color: #444;
    color: #ffffff;
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: #999;
  }
}
</style>