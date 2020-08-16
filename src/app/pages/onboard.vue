<template>
  <section id="app" class="onboard">
    <figure>
      <img :src="logo" alt="Logo passaro roxo" />
    </figure>
    <div class="onboard-info">
      <h1>Olá.</h1>
      <p>
        Bem-vindo ao
        <b class="text-underline">BirdTranslate</b>,
        <br />o sistema ideal para tradução de legendas.
      </p>
    </div>
    <div class="onboard-action">
      <p>Podemos começar?</p>
      <a href="?view=start" class="btn-theme">Início</a>
    </div>
  </section>
</template>
<script>
import image from "../../assets/images/logo.svg";
export default {
  data() {
    return {
      logo: image,
    };
  },
};
</script>
