<template>
  <div class="video-box">
    <ul class="video-list">
      <li class="video" v-for="video in videoList" :key="video.id">
        <div class="poster">
          <img :src="video.poster" alt />
          <div class="info">
            <div class="play">
              <svg id="icon-bofangshu" viewBox="0 0 1024 1024">
                <path
                  d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z"
                />
                <path
                  d="M684.8 483.2l-256-112c-22.4-9.6-44.8 6.4-44.8 28.8v224c0 22.4 22.4 38.4 44.8 28.8l256-112c25.6-9.6 25.6-48 0-57.6z"
                />
              </svg>
              {{ video.play }}
            </div>
            <div class="rank">
              <svg viewBox="0 0 1024 1024">
                <path
                  d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z"
                />
                <path
                  d="M240 384h64v64h-64zM368 384h384v64h-384zM432 576h352v64h-352zM304 576h64v64h-64z"
                />
              </svg>
              {{ video.rank || '1.5万' }}
            </div>
          </div>
        </div>
        <div class="title">{{ video.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import Axios from "axios";
import Vue from "vue";
export default {
  data() {
    return {
      VideoOldList: [],
      videoGettingData: false,
      videoCount: 0
    };
  },
  created() {
    this.getData();
    this.$root.$el.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    getData() {
      Axios.get("/video", {
        params: {
          start: 0,
          offset: 12
        }
      }).then(res => {
        this.VideoOldList = res;
      });
    },
    videoScroll(toBottomHeight) {
      const len = this.VideoOldList.length;
      if (len === this.videoCount) {
        return;
      }
     
      if (toBottomHeight < 200 && !this.videoGettingData && len < 100) {
        this.videoGettingData = true;
        Axios.get("/video", {
          params: {
            start: this.VideoOldList.length,
            offset: 12
          }
        }).then(res => {
          this.VideoOldList.push(...res);
          this.videoGettingData = false;
        });
      }
    }
  },
  computed: {
    videoList() {
      return this.VideoOldList.map(video => {
        video.play =
          video.play > 10000 ? video.play / 10000 + "万" : video.play;
        video.rank =
          video.rank > 10000 ? video.rank / 10000 + "万" : video.rank;
        return video;
      });
    }
  },
};
</script>

<style scoped>
.video-box {
  padding-top: 100px;
  padding-left: 6px;
  padding-right: 6px;
}

.video-box .video-list {
}

.video-box .video-list::after {
  display: block;
  content: "";
  clear: both;
}

.video-box .video-list .video {
  width: 50%;
  float: left;
}

.video-box .poster {
  position: relative;
  height: 106px;
  margin-left: 6px;
  margin-right: 6px;
  overflow: hidden;
  border-radius: 6px;
}

.video-box .poster img {
  width: 100%;
  height: 100%;
}

.video-box .info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  padding-left: 10px;
  color: #fff;
  font-size: 12px;
  background-image: linear-gradient(rgba(33, 33, 33, 0), rgba(33, 33, 33, 0.5));
}

.video-box .info div {
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
}

.video-box .info svg {
  margin-right: 3px;
  width: 14px;
  height: 14px;
  fill: #fff;
}

.video .title {
  margin: 6px 6px 10px 6px;
  height: 38px;
  line-height: 20px;
  font-size: 13px;
  /* 单行文本溢出打点：
  设置文本不换行
  white-space: nowrap;
  设置文字溢出用省略号代替
  text-overflow: ellipsis; */
  /* 多行文本溢出打点： */
  overflow: hidden;
  /* 设置盒子为伸缩盒 */
  display: -webkit-box;
  /* 设置伸缩盒内子元素的排列方式为vertical */
  -webkit-box-orient: vertical;
  /* 限制一个块元素内显示的文本行数 */
  -webkit-line-clamp: 2;
}
</style>