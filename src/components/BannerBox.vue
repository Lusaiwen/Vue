<template>
  <div class="banner-box">
    <transition-group tag="ul" name="image" class="banner-list">
      <li
        class="banner"
        v-for="(banner, bannerIndex) in bannerList"
        :key="banner.id"
        v-show="bannerIndex === mark"
      >
        <img class="poster" :src="banner.poster" :alt="banner.title" />
      </li>
    </transition-group>
    <ul class="index-list">
      <li
        class="index"
        v-for="(index, listIndex) in bannerList.length"
        :key="index"
        :class="{
                    active: mark === listIndex
                }"
        @click="handleBanner(listIndex)"
      ></li>
    </ul>
  </div>
</template>

<script>
import Axios from 'axios'
import { mapState, mapMutations, mapActions, } from 'vuex'
export default {
    created(){
        this.getData();
        this.play();
    },
    data(){
        return {
            bannerList: [],
            bannerWidth: 350,
            timer: null,
            mark: 0
        }
    },
    methods: {
         autoBanner() {
            this.mark++;
            if (this.mark === this.bannerList.length) {
                this.mark = 0;
                return;
            }         
        },
        play(context) {
            this.timer = setInterval(this.autoBanner, 3000);
        },
        handleBanner(listIndex) {
            clearInterval(this.timer);
            this.mark = listIndex;
            this.play();
        },
        getData(context){
            Axios.get('/banner').then(res => {
                this.bannerList = res;
            });
        }
    }
};
</script>


<style scoped>

.banner-box {
    position: relative;
    top: 90px;
    left: 50%;
    transform: translateX(-50%);
    width: 350px;
    height: 110px;
    overflow: hidden;
    border-radius: 6px;
}

.banner-box .banner-list {
    /* position: absolute;
    left: 0;
    top: 0;  */
    width: 100%;
    height: 100%;
}

.banner-box .banner-list .banner {
    position: absolute;
    width: 100%;
    height: 100%;
    /* overflow: hidden; */
}

.banner-box .banner-list .banner .poster {
    width: 100%;
    height: 100%;
}

.banner-box .index-list {
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 3px;
    left: 50%;
    height: 10px;
    padding-left: 3px;
    padding-right: 3px;
    transform: translateX(-50%);
    border-radius: 5px;
    background-color: rgba(0, 0, 0, .5);
}

.banner-box .index-list .index {
    width: 5px;
    height: 5px;
    background-color: #fff;
    border-radius: 50%;
    margin-left: 3px;
    margin-right: 3px;
}

.banner-box .index-list .index.active {
    background-color: #fb7299;
}

.image-enter-active {
    transform: translateX(0);
    transition: all 1s ease;
}

.image-leave-active {
    transform: translateX(-100%);
    transition: all 1s ease;
}

.image-enter {
    transform: translateX(100%);
}

.image-leave {
    transform: translateX(0);
}

.list-enter-active {
    transition: all 1s ease;
    transform: translateX(0)
}

.list-leave-active {
    transition: all 1s ease;
    transform: translateX(-100%)
}

.list-enter {
    transform: translateX(100%)
}

.list-leave {
    transform: translateX(0)
}
</style>