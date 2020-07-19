<template>
  <div id="app" @scroll="handleScroll">
    <Header></Header>
    <nav-box></nav-box>
    <banner-box></banner-box>
    <video-box ref="video"></video-box>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import NavBox from "./components/NavBox";
import BannerBox from "./components/BannerBox";
import VideoBox from "./components/VideoBox";
import Footer from './components/Footer';
import Axios from 'axios';
import https from "./http";
export default {
  name: "App",
  components: {
    Header,
    NavBox,
    BannerBox,
    VideoBox,
    Footer
  },
  methods: {
    handleScroll(e) {
      const dom = e.target;
      const { scrollHeight, offsetHeight, scrollTop } = dom;
      const toBottomHeight = scrollHeight - offsetHeight - scrollTop;
      this.$refs.video.videoScroll(toBottomHeight);
    }
  }
};
</script>

<style>
body,
html {
  height: 100%;
}

#app {
  height: 100%;
  overflow-y: scroll;
}
</style>
