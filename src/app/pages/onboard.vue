<template>
  <section id="app" class="onboard">
    <figure>
      <img :src="logo" alt="Logo passaro roxo" />
    </figure>
    <div class="onboard-info">
      <h1>Olá,</h1>
      <p>
        Bem-vindo ao <strong class="text-underline">BirdTranslate</strong>,
        <br />
        um simples utilitário tradutor de legendas.
      </p>
    </div>
    <div class="onboard-action">
      <p>Podemos começar?</p>
      <button class="btn-theme">Início</button>
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
