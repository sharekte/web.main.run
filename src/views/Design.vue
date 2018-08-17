<template>
    <div class="main">
        <div class="section">
            <div class="title">
                Button
            </div>
            <div class="content">
                <h3>default</h3>
                <m-button design="default" fit size="small"><i class="fa fa-flag" aria-hidden="true"></i>default</m-button>
                <m-button design="default" fit>default</m-button>
                <m-button design="default" fit size="small" special>default</m-button>
                <m-button design="default" fit size="big" special next><i class="fa fa-flag" aria-hidden="true"></i>default</m-button>
                <m-button design="default" fit size="small" special disabled>default</m-button>
                <h3>winona</h3>
                <m-button design="winona">winona default</m-button>
                <m-button design="winona" special>winona special</m-button>
                <m-button design="winona" special fit>winona fit</m-button>
                <m-button design="winona" special fit>winona fit</m-button>
                <m-button design="winona" special size="small">winona fit 注销</m-button>
                <m-button design="winona" special size="big">winona fit 注销</m-button>
                <m-button design="winona" special disabled>winona special</m-button>
                <h3>ujarak</h3>
                <m-button design="ujarak" size="small" special>ujarak</m-button>
                <m-button design="ujarak">ujarak</m-button>
                <m-button design="ujarak" size="big">ujarak</m-button>
                <m-button design="ujarak" fit>ujarak</m-button>
                <m-button design="ujarak" fit special>ujarak</m-button>
                <m-button design="ujarak" fit special disabled>ujarak</m-button>

                <h3>wayra</h3>
                <m-button design="wayra" size="small">wayra注销 small</m-button>
                <m-button design="wayra">wayra注销</m-button>
                <m-button design="wayra" size="big">wayra注销 big</m-button>
                <m-button design="wayra" size="large">wayra注销 large</m-button>
                <m-button design="wayra" size="small" fit>wayra注销 small</m-button>
                <m-button design="wayra" fit>wayra注销</m-button>
                <m-button design="wayra" size="big" fit>wayra注销 big</m-button>
                <m-button design="wayra" size="large" fit>wayra注销 large</m-button>
                <m-button design="wayra" disabled>wayra注销</m-button>
                <h3>rayen</h3>
                <div style="background: #fcd04b">
                    <m-button design="rayen" size="small">rayen注销 small</m-button>
                    <m-button design="rayen">rayen注销 asdad</m-button>
                    <m-button design="rayen" size="big">rayen注销 big</m-button>
                    <m-button design="rayen" size="large">rayen注销 large</m-button>
                    <m-button design="rayen" size="small" fit>rayen注销 small</m-button>
                    <m-button design="rayen" fit>rayen注销 asdad</m-button>
                    <m-button design="rayen" size="big" fit>rayen注销 big</m-button>
                    <m-button design="rayen" size="large" fit>rayen注销 large</m-button>
                    <m-button design="rayen" disabled>rayen注销 asdad</m-button>
                </div>
                <h3>moema</h3>
                <m-button design="moema" size="small">moema注销 small</m-button>
                <m-button design="moema">moema注销</m-button>
                <m-button design="moema" size="big">moema注销 big</m-button>
                <m-button design="moema" size="large">moema注销 large</m-button>
                <m-button design="moema" size="small" fit>moema注销 small</m-button>
                <m-button design="moema" fit>moema注销</m-button>
                <m-button design="moema" size="big" fit>moema注销 big</m-button>
                <m-button design="moema" size="large" fit>moema注销 large</m-button>
                <m-button design="moema" disabled>moema注销</m-button>
            </div>
        </div>
        <div class="section">
            <div class="title">
                Input
            </div>
            <h3>default</h3>
            <m-input v-model="aa"></m-input>{{aa}}
            <m-input size="small"></m-input>
            <m-input size="big"></m-input>
            <m-input disabled></m-input>
            <h3>Haruki</h3>
            <div style="margin-top: 50px;"></div>
            <m-input design="haruki"></m-input>
            <h3>Yoko</h3>
            <div style="margin-top: 50px;"></div>
            <m-input design="yoko"></m-input>
            <h3>Ichiro</h3>
            <div style="margin-top: 50px;"></div>
            <m-input design="ichiro"></m-input>
            <h3>Juro</h3>
            <div style="margin-top: 50px;"></div>
            <m-input design="juro"></m-input>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      aa: "a"
    };
  }
};
</script>
<style lang="stylus" scoped>
.main {
    margin: 10px auto;
    max-width: 980px;
    padding 0 10px 0 10px;
    
    .section {
        .title {
            font-size: 2rem;
            border-left 4px solid #fcad26;
            padding-left 10px;
            margin: 5px 0 5px 0;
        }
        
        .content {

        }
    }
}
</style>
