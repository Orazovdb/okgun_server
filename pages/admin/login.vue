<template>
  <div class="login">
    <div class="login__wrapper">
      <div class="login__box">
        <form @submit.prevent="handleSubmit" class="login__form" action="/admin">
          <div class="login__logo">
            <img src="@/assets/img/logo.svg" alt="" />
          </div>
          <base-input @updateValue="(val) => (form[`username`] = val)" :value="form.username" label="Ulanyjy ady" />
          <base-input @updateValue="(val) => (form[`password`] = val)" :value="form.password" type="password" label="Acar sozi" />
          <div class="login__remember flex flex-y-center gap-20">
            <span></span>
            <span>Ýatda sakla</span>
          </div>
          <button class="login__button" type="submit" login>Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { LOGIN } from '@/api/admin.api'

  export default {
    layout: 'empty',
    data() {
      return {
        form: { username: '', password: '' }
      }
    },
    methods: {
      async handleSubmit() {
        if (!this.form.username || !this.form.password) {
          alert('Doldur')
        } else {
          try {
            const { data, status } = await LOGIN({ data: this.form })
            if (status) {
              this.$cookies.set('Authorization', data.token)
              localStorage.setItem('Authorization', data.token)
              this.$router.push(`/admin`)
            } else {
              this.$router.push(`/admin/login`)
            }
          } catch (err) {
            console.error(err)
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100vh;
    background-color: #f7f8fa;
    &__button {
      min-width: 150px;
      height: 40px;
      padding: 6.5px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--primary);
      color: #fff;
      border: 1px solid transparent;
      font-weight: 500;
      font-size: 16px;
      border-radius: 50px;
      gap: 14px;
      white-space: nowrap;
      text-transform: uppercase;
      cursor: pointer;
    }
    &__wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__box {
      width: 530px;
      padding: 60px 40px;
      border-radius: 26px;
      border: 1px solid #d6d6d6;
      background: #fff;
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    &__logo {
    }

    &__remember {
      span {
        &:first-child {
          display: block;
          width: 20px;
          height: 20px;
          border: 2px solid;
          border-radius: 6px;
        }
      }
    }
  }
</style>
