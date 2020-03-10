<template>
  <div>
    <Header />
    <section style="min-height: calc(100vh - 125px);">
      <nuxt />
    </section>
    <Footer />
  </div>
</template>
<script>
import Header from '~/components/Header';
import Footer from '~/components/Footer';
export default {
  components: {
    Header,
    Footer,
  },
};
</script>
