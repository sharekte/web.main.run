<template>
    <header class="header">
        <div class="header-main">
            <div class="logo" @click="$router.push({name: 'home'})">
                MAIN.RUN
            </div>
            <div class="about" @click="$router.push({name: 'about'})">
                About
            </div>
        </div>
    </header>
</template>

<script>
export default {
    computed: {

    },
    methods: {
      
    }
};
</script>

<style lang="stylus" scoped>
.header {
    border-bottom: 1px solid #F5F5F5;
    flex: 0 0 auto;

    .header-main {
        margin: 0 auto;
        height: 6rem;
        max-width: 120rem;
        display: flex;
        justify-content: space-between;
        
        .logo {
            font-size: 3rem;
            line-height: 6rem;
            cursor: pointer;
            color: rgba(0, 0, 0, .2);
            transition: color 0.15s ease-in-out;
            
            &:hover {
                color: rgba(0, 0, 0, .75);
            }
        }
        
        .about {
            font-size: 2rem;
            line-height: 6rem;
            cursor: pointer;
            padding-right: 100px;
            transition: color 0.15s ease-in-out;
            
            &:hover {
                color: #f58500;
            }
        }
    }
}
</style>
