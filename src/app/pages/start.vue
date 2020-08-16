<template>
  <section id="app" class="start">
    <figure>
      <img :src="logo" alt="Logo passaro roxo" />
    </figure>
    <div class="start-info">
      <h1 class="text-underline">Como funciona:</h1>
      <p>
        Preencha o campo “Chave da API”, informando a sua chave de acesso a API de tradução da
        <b>Microsoft</b>.
      </p>
      <p>Adicione o diretório de entrada contendo os arquivos “.srt”, e o diretório de saída onde os arquivos traduzidos seráo salvos.</p>
    </div>
    <form class="start-form">
      <div class="group">
        <label for="key">
          Chave da API:
          <span class="info">?</span>
        </label>
        <div class="input-icon">
          <input type="password" placeholder="6bdbdde80fdmsh7jsn1f82..." name="key" id="key" />
          <span class="icon">
            <i>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 17 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.2384 6.5C6.2384 7.09226 6.46846 7.66027 6.87796 8.07906C7.28747 8.49785 7.84288 8.73313 8.42201 8.73313C9.00114 8.73313 9.55655 8.49785 9.96606 8.07906C10.3756 7.66027 10.6056 7.09226 10.6056 6.5C10.6056 5.90774 10.3756 5.33973 9.96606 4.92094C9.55655 4.50215 9.00114 4.26687 8.42201 4.26687C7.84288 4.26687 7.28747 4.50215 6.87796 4.92094C6.46846 5.33973 6.2384 5.90774 6.2384 6.5ZM16.8874 5.98558C15.0391 2.00383 12.2453 0 8.5 0C4.75276 0 1.96086 2.00383 0.112583 5.98758C0.0384485 6.14812 0 6.32345 0 6.501C0 6.67854 0.0384485 6.85388 0.112583 7.01442C1.96086 10.9962 4.75471 13 8.5 13C12.2472 13 15.0391 10.9962 16.8874 7.01242C17.0375 6.68942 17.0375 6.31457 16.8874 5.98558ZM8.42201 10.0092C6.52695 10.0092 4.99062 8.43804 4.99062 6.5C4.99062 4.56196 6.52695 2.9908 8.42201 2.9908C10.3171 2.9908 11.8534 4.56196 11.8534 6.5C11.8534 8.43804 10.3171 10.0092 8.42201 10.0092Z"
                  fill="white"
                />
              </svg>
            </i>
          </span>
        </div>
      </div>
      <div class="group">
        <label for="input-dir">Diretório de entrada:</label>
        <div class="input-icon">
          <input type="text" placeholder="C://dir/subtitles" name="input-dir" id="input-dir" />
          <span class="icon">
            <i>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H7L9 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V10C16 10.5304 15.7893 11.0391 15.4142 11.4142C15.0391 11.7893 14.5304 12 14 12H2C1.46957 12 0.960859 11.7893 0.585786 11.4142C0.210714 11.0391 0 10.5304 0 10V2Z"
                  fill="white"
                />
                <path d="M8 9L8 5L8 9ZM8 5L10 7L8 5ZM8 5L6 7L8 5Z" fill="white" />
                <path
                  d="M8 5L6 7M8 9L8 5L8 9ZM8 5L10 7L8 5Z"
                  stroke="#2E2E2E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </i>
          </span>
        </div>
      </div>
      <div class="group">
        <label for="output-dir">Diretório de saída:</label>
        <div class="input-icon">
          <input
            type="text"
            placeholder="C://dir/subtitles/translated"
            name="output-dir"
            id="output-dir"
          />
          <span class="icon">
            <i>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H7L9 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V10C16 10.5304 15.7893 11.0391 15.4142 11.4142C15.0391 11.7893 14.5304 12 14 12H2C1.46957 12 0.960859 11.7893 0.585786 11.4142C0.210714 11.0391 0 10.5304 0 10V2Z"
                  fill="white"
                />
                <path d="M8 5V9V5ZM8 9L6 7L8 9ZM8 9L10 7L8 9Z" fill="white" />
                <path
                  d="M8 9L10 7M8 5V9V5ZM8 9L6 7L8 9Z"
                  stroke="#2E2E2E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </i>
          </span>
        </div>
      </div>
    </form>
    <div class="start-action">
      <a href="?view=translating" class="btn-theme">Traduzir</a>
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
