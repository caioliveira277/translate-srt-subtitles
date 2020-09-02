<template>
  <section id="app" class="start">
    <figure>
      <img :src="logo" alt="Logo passaro roxo" />
    </figure>
    <div class="start-info">
      <h1 class="text-underline">Como funciona:</h1>
      <p>
        Preencha o campo “Chave da API”, informando a sua chave de acesso a API
        de tradução da
        <b>Microsoft</b>.
      </p>
      <p>
        Adicione o diretório de entrada contendo os arquivos “.srt”, e o
        diretório de saída onde os arquivos traduzidos seráo salvos.
      </p>
    </div>
    <form class="start-form">
      <div class="group">
        <label for="key">
          Chave da API:
          <span class="info">?</span>
        </label>
        <div class="input-icon">
          <input
            type="password"
            v-model="keyAPI"
            placeholder="6bdbdde80fdmsh7jsn1f82..."
            name="key"
            id="key"
            ref="inputKey"
          />
          <span class="icon key" ref="visibility" @mouseup="showKeyInput" @mousedown="showKeyInput">
            <i class="hide">
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
            <i class="show">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.42201 9.81575C9.00113 9.81575 9.55655 9.58569 9.96605 9.17618C10.3756 8.76668 10.6056 8.21127 10.6056 7.63214C10.6056 7.56819 10.6027 7.50482 10.5972 7.44224L8.23211 9.80736C8.29469 9.81282 8.35786 9.81575 8.42201 9.81575ZM15.6498 0.877759L14.8169 0.0456469C14.7876 0.0164186 14.748 0 14.7066 0C14.6653 0 14.6256 0.0164186 14.5964 0.0456469L12.465 2.17759C11.2892 1.57671 9.96756 1.27627 8.49999 1.27627C4.75276 1.27627 1.95696 3.22787 0.112583 7.13107C0.0384484 7.28805 0 7.45951 0 7.63311C0 7.80672 0.0384484 7.97817 0.112583 8.13515C0.849552 9.68746 1.73697 10.9317 2.77483 11.8678L0.712297 13.9295C0.683068 13.9588 0.666649 13.9984 0.666649 14.0398C0.666649 14.0811 0.683068 14.1208 0.712297 14.15L1.5446 14.9823C1.57385 15.0116 1.61351 15.028 1.65486 15.028C1.69621 15.028 1.73586 15.0116 1.76511 14.9823L15.6498 1.09846C15.6643 1.08397 15.6758 1.06677 15.6836 1.04784C15.6915 1.0289 15.6955 1.00861 15.6955 0.988109C15.6955 0.967612 15.6915 0.947316 15.6836 0.928381C15.6758 0.909446 15.6643 0.892244 15.6498 0.877759ZM4.99062 7.63214C4.99056 7.03945 5.14402 6.45686 5.43605 5.94111C5.72807 5.42537 6.14871 4.99405 6.65697 4.68919C7.16523 4.38433 7.7438 4.21631 8.33629 4.20151C8.92879 4.1867 9.51502 4.32562 10.0379 4.60471L9.08996 5.55264C8.70767 5.43023 8.29905 5.41549 7.90893 5.51003C7.51882 5.60457 7.16228 5.80474 6.87845 6.08858C6.59461 6.37241 6.39444 6.72895 6.2999 7.11907C6.20536 7.50918 6.2201 7.9178 6.3425 8.30009L5.39458 9.24801C5.12857 8.751 4.98979 8.19585 4.99062 7.63214V7.63214Z"
                  fill="white"
                />
                <path
                  d="M16.8874 7.12913C16.2011 5.68378 15.3843 4.50522 14.4369 3.59343L11.6266 6.40386C11.8635 7.02309 11.916 7.69768 11.7778 8.34611C11.6396 8.99455 11.3166 9.58909 10.8477 10.0579C10.3789 10.5267 9.7844 10.8497 9.13596 10.988C8.48753 11.1262 7.81294 11.0737 7.1937 10.8368L4.81006 13.2204C5.9159 13.7321 7.14587 13.988 8.49997 13.988C12.2472 13.988 15.043 12.0364 16.8874 8.1332C16.9615 7.97622 17 7.80477 17 7.63116C17 7.45755 16.9615 7.2861 16.8874 7.12913V7.12913Z"
                  fill="white"
                />
              </svg>
            </i>
          </span>
        </div>
      </div>
      <div class="group">
        <label for="inputDir">Diretório de entrada:</label>
        <div class="input-icon">
          <input type="text" readonly v-model="inputDir" placeholder="C://dir/subtitles" />
          <span class="icon" @click="HandlerInputFile('inputDir')">
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
        <label for="outputDir">Diretório de saída:</label>
        <div class="input-icon">
          <input
            type="text"
            readonly
            v-model="outputDir"
            placeholder="C://dir/subtitles/translated"
          />
          <span class="icon" @click="HandlerInputFile('outputDir')">
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
import APP from "../index";
export default {
  name: "Start",
  data() {
    return {
      logo: image,
    };
  },
  methods: {
    HandlerInputFile(inputTarget) {
      window.postMessage({
        type: "selectDirectory",
        target: inputTarget,
      });
    },
    showKeyInput({ type }) {
      this.$refs.visibility.classList.toggle("active");
      if (type === "mousedown") {
        this.$refs.inputKey.setAttribute("type", "text");
      } else {
        this.$refs.inputKey.setAttribute("type", "password");
      }
    },
  },
  computed: {
    inputDir: function () {
      return APP.$data.inputDir;
    },
    outputDir: function () {
      return APP.$data.outputDir;
    },
    keyAPI: {
      get: function () {
        return APP.$data.keyAPI;
      },
      set: function (newValue) {
        APP.$data.keyAPI = newValue;
        localStorage.setItem("keyAPI", newValue);
        return newValue;
      },
    },
  },
};
</script>
