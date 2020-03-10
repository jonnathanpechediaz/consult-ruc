<template>
  <div class="container py-5">
    <h2>CONSULTAR RUC</h2>
    <div class="container py-5" v-if="loaded">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6 col-lg-5 col-xl-4">
          <div class="form-group">
            <input v-model="search" type="text" class="form-control" placeholder="RUC">
          </div>
          <div class="form-group">
            <button @click="getData" class="btn btn-primary">
              Consultar
            </button>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-12 col-md-6 col-lg-5 col-xl-4">
          <table class="table">
            <tr>
              <th>RUC</th>
              <td>{{ dataRUC.ruc }}</td>
            </tr>
            <tr>
              <th>Razon social</th>
              <td>{{ dataRUC.razon_social }}</td>
            </tr>
            <tr>
              <th>Estado</th>
              <td>{{ dataRUC.estado }}</td>
            </tr>
            <tr>
              <th>Dirección</th>
              <td>{{ dataRUC.direccion }}</td>
            </tr>
            <tr>
              <th>Ubigeo</th>
              <td>{{ dataRUC.ubigeo }}</td>
            </tr>
            <tr>
              <th>Departamento</th>
              <td>{{ dataRUC.departamento }}</td>
            </tr>
            <tr>
              <th>Provincia</th>
              <td>{{ dataRUC.provincia }}</td>
            </tr>
            <tr>
              <th>Distrito</th>
              <td>{{ dataRUC.distrito }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  components: {},
  data () {
    return {
      loaded: false,
      search: '',
      hasData: false,
      dataRUC: {
        ruc: '',
        razon_social: '',
        estado: '',
        direccion: '',
        ubigeo: '',
        departamento: '',
        provincia: '',
        distrito: '',
      },
    };
  },
  mounted () {
    const user = localStorage.getItem('user');
    console.log('user', user);
    if (!user) {
      this.$router.push('/');
    }
    this.loaded = true;
  },
  methods: {
    getData () {
      this.loading = true;
      this.messageError = '';
      const data = {
        search: this.search,
      };
      console.log('data', data);

      axios.post('/api/ruc', data)
        .then((res) => {
          console.log(res.data);
          // eslint-disable-next-line no-unreachable
          if (res.data.status) {
            this.hasData = true;
            this.dataRUC = res.data.data;
          } else {
            this.loading = false;
            this.messageError = 'Error, no se econtró RUC!';
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
