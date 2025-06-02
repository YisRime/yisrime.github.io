<template>
  <div class="contact-form">
    <div class="section-header">
      <h2>联系我</h2>
      <div class="header-line"></div>
    </div>
    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="name">姓名</label>
        <input 
          type="text" 
          id="name" 
          v-model="form.name" 
          :class="{ error: errors.name }"
          @blur="validateName"
        />
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>
      
      <div class="form-group">
        <label for="email">邮箱</label>
        <input 
          type="email" 
          id="email" 
          v-model="form.email" 
          :class="{ error: errors.email }"
          @blur="validateEmail"
        />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>
      
      <div class="form-group">
        <label for="message">留言</label>
        <textarea 
          id="message" 
          v-model="form.message" 
          rows="4"
          :class="{ error: errors.message }"
          @blur="validateMessage"
        ></textarea>
        <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
      </div>
      
      <button type="submit" class="submit-btn" :disabled="isSubmitting">
        <span v-if="!isSubmitting">发送消息</span>
        <div v-else class="loading-spinner"></div>
      </button>
      
      <div v-if="submitStatus" class="status-message" :class="submitStatus.type">
        {{ submitStatus.message }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref(null)

const validateName = () => {
  if (!form.name.trim()) {
    errors.name = '请输入您的姓名'
    return false
  }
  errors.name = ''
  return true
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = '请输入邮箱地址'
    return false
  }
  if (!emailRegex.test(form.email)) {
    errors.email = '请输入有效的邮箱地址'
    return false
  }
  errors.email = ''
  return true
}

const validateMessage = () => {
  if (!form.message.trim()) {
    errors.message = '请输入留言内容'
    return false
  }
  if (form.message.trim().length < 10) {
    errors.message = '留言内容至少需要10个字符'
    return false
  }
  errors.message = ''
  return true
}

const validateForm = () => {
  const nameValid = validateName()
  const emailValid = validateEmail()
  const messageValid = validateMessage()
  return nameValid && emailValid && messageValid
}

const submitForm = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  submitStatus.value = null
  
  try {
    // 模拟表单提交
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 这里可以集成实际的表单提交服务，如 EmailJS、Netlify Forms 等
    console.log('Form submitted:', form)
    
    submitStatus.value = {
      type: 'success',
      message: '消息发送成功！感谢您的留言。'
    }
    
    // 重置表单
    Object.keys(form).forEach(key => {
      form[key] = ''
    })
    
  } catch (error) {
    submitStatus.value = {
      type: 'error',
      message: '发送失败，请稍后再试。'
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
.contact-form {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  transition: all var(--transition-normal);
  grid-area: contact;
}

.contact-form:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
  background: rgba(255, 255, 255, 0.08);
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.header-line {
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  border-radius: 2px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.form-group input,
.form-group textarea {
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: all var(--transition-normal);
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-muted);
}

.form-group input.error,
.form-group textarea.error {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.error-message {
  font-size: 0.8rem;
  color: #ef4444;
  margin-top: 0.25rem;
}

.submit-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.status-message {
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
  font-weight: 500;
}

.status-message.success {
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
}

.status-message.error {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

@media (max-width: 768px) {
  .contact-form {
    padding: 1.5rem;
  }
  
  .form {
    gap: 1.2rem;
  }
  
  .form-group input,
  .form-group textarea {
    padding: 0.7rem;
  }
  
  .submit-btn {
    padding: 0.8rem 1.5rem;
  }
}
</style>