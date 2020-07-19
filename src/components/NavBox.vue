<template>
  <div>
    <div
      v-for="navBoxIndex in 2"
      :key="navBoxIndex"
      :class="{
            'nav-box': navBoxIndex === 1,
            'hide-nav-box': navBoxIndex === 2,
            hide: navBoxIndex === 2 && navHide
        }"
    >
      <ul class="nav-list">
        <li
          class="nav"
          :class="{
                    active: navIndex === navActiveIndex,
                    big: nav.title.length === 3 && navBoxIndex === 2 
                }"
          v-for="(nav, navIndex) in navList"
          :key="nav.id"
          @click="handleNavActive(navIndex)"
        >{{ nav.title }}</li>
      </ul>
      <div class="down" v-if="navBoxIndex === 1" @click="handleHide">
        <svg width="16" height="32" viewBox="0 0 1024 1024">
          <path
            d="M515.2 649.6L169.6 304c-12.8-12.8-32-12.8-44.8 0s-12.8 35.2 0 48l368 364.8c12.8 12.8 32 12.8 44.8 0l361.6-361.6c12.8-12.8 12.8-35.2 0-48s-32-12.8-44.8 0L515.2 649.6z"
            fill="#ccc"
          />
        </svg>
      </div>
      <div class="up" v-else @click="handleHide">
        <svg width="16" height="32" viewBox="0 0 1024 1024">
          <path
            d="M854.4 713.6c12.8 12.8 32 12.8 44.8 0s12.8-35.2 0-48L537.6 304c-12.8-12.8-32-12.8-44.8 0L124.8 672c-12.8 12.8-12.8 35.2 0 48s32 12.8 44.8 0l345.6-342.4 339.2 336z"
            fill="#ccc"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapActions, mapState} from 'vuex' 
export default {
  mounted(){
      this.getData();
  },
  computed: mapState('navBox',['navList', 'navHide', 'navActiveIndex']),
  methods: {
      ...mapMutations('navBox',['handleNavActive','handleHide']),
      ...mapActions('navBox',['getData'])
  }
};
</script>

<style scoped>

.nav-box {
    position: fixed;
    top: 54px;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: #fff;
}

.nav-box .nav-list {
    width: 85%;
    white-space: nowrap;
    overflow-x: scroll;
    padding-left: 24px;
}

.nav-box .nav-list .nav {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    margin-right: 40px;
    font-size: 14px;
    color: #757575;
    border-bottom: 2px solid transparent;
}

.nav-box .nav-list::-webkit-scrollbar {
    display: none;
}

.nav-box .nav.active {
    border-color: #fb7299;
    color: #fb7299;
}

.nav-box .down {
    position: absolute;
    top: -5px;
    right: 13px;
}

.hide-nav-box {
    position: fixed;
    top: 54px;
    left: 0;
    right: 0;
    padding-bottom: 20px;
    z-index: 2;
    transition: top .3s;
    background-color: #fff;
}

.hide-nav-box.hide {
    top: -117px;
}

.hide-nav-box .nav-list {}

.hide-nav-box .nav-list .nav {
    display: inline-block;
    width: 32px;
    text-align: center;
    margin-left: 14px;
    margin-right: 14px;
    margin-bottom: 10px;
    padding-top: 6px;
    padding-bottom: 6px;
    font-size: 14px;
    color: #757575;
    border-bottom: 2px solid transparent;
}

.hide-nav-box .nav.big {
    width: 46px;
    margin-left: 7px;
    margin-right: 7px;
}

.hide-nav-box .nav.active {
    border-color: #fb7299;
    color: #fb7299;
}

.hide-nav-box .up {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}

</style>