<template>
    <ul class="tree">
        <li 
            class="tree-node"
            v-for="(node,index) in data"
            :key="node[defaults.label]"
        >
            <i 
                class="iconfont"
                :class="{
                    'iconfont-below': !showChildren[index],
                    'iconfont-right': showChildren[index]
                }"
                v-if="node[defaults.children]"
            ></i>
            <span class="tree-label"
             @click="show(index)"
            >{{ node[defaults.label] }}</span>
            <keep-alive>
                <base-tree 
                    :data="node[defaults.children]"
                    v-if="showChildren[index] && node[defaults.children]"
                ></base-tree>
            </keep-alive>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'base-tree',
    props: {
        data: {
            type: Array,
            required: true
        },
        defaults: {
            type: Object,
            default: () => ({
                label: 'label',
                children: 'children'
            })
        }
    },
    data(){
        return {
            showChildren: []
        }
    },
    methods: {
        show(index){
            const flag = this.showChildren[index];
            this.$set(this.showChildren, index, !flag)
        }
    }
}
</script>


<style scoped>
@import './assest/font.css';
li {
    list-style: none;
}
.tree {
    cursor: pointer;
    user-select: none;
}
.tree-node {
    margin: 10px 0 0 10px;
}
</style>