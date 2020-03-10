<template>
  <div class="container py-5">
    <div class="row justify-content-center" v-if="loaded">
      <div class="col-12 col-md-6 col-lg-5 col-xl-4">
        <div>
          <div class="text-center mb-5">
            <h2>Ingresa tus datos</h2>
          </div>
          <form @submit.stop.prevent="login">
            <div class="form-group">
              <label for="">
                <b>Correo electrónico</b>
                <input v-model="credentials.email" type="email" class="form-control mt-2" required>
              </label>
            </div>
            <div class="form-group">
              <label for="">
                <b>Contraseña</b>
                <input v-model="credentials.password" type="password" class="form-control mt-2" required>
              </label>
            </div>
            <div v-if="messageError !== ''" class="small text-danger">
              {{ messageError }}
            </div>
            <div class="row">
              <div class="col" />
            </div>
            <p>
              <button :disabled="loading" class="btn btn-primary btn-lg btn-block" type="submit">
                <div v-show="loading" class="loader">
                  Loading...
                </div>
                {{ loading ? 'Conectando' : 'Ingresar' }}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  components: {
  },
  data () {
    return {
      loaded: false,
      domainHome: process.env.DOMAIN_HOME,
      apiURL: process.env.API_URL,
      messageError: '',
      credentials: {
        email: '',
        password: '',
      },
      returnTo: '',
      continue: '',
      reRequestEmail: false,
      accessToken: '',
      loading: false,
    };
  },
  asyncData (context) {
    return {
    };
  },
  mounted () {
    const user = localStorage.getItem('user');
    console.log('user', user);
    if (user) {
      this.$router.push('/home');
    }
    this.loaded = true;
  },
  methods: {
    login () {
      console.log(this.apiURL);
      this.iframeURL = '';
      this.loading = true;
      this.messageError = '';
      axios.post('/api/login', this.credentials)
        .then((res) => {
          console.log(res.data);
          // eslint-disable-next-line no-unreachable
          if (res.data.status) {
            localStorage.setItem('user', JSON.stringify(res.data.data));
            this.$router.push('/home');
          } else {
            this.loading = false;
            this.messageError = 'Error, datos incorrectos!';
          }
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },
  },
};
</script>
