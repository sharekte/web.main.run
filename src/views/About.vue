<template>
    <section class="section">
        <div class="content">
            <h2>About</h2>
            <p>Hi,欢迎来到这里！</p>
            <h3>联系我</h3>
            <p>目前我工作生活在北京，你可以给我发送邮件或者QQ</p>
            <p>邮箱：<a href="mailto:danc@main.run">danc@main.run</a></p>
            <p>QQ： 571855866</p>
        </div>
    </section>
</template>

<style lang="stylus" scoped>
.section {
    padding 10px

    .title {
        text-align center
    }

    .content {
        margin 40px auto
        max-width 860px;
        padding: 20px 0 10px 0;
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
        transition: box-shadow 0.3s ease-in-out;
        
        &:hover {
            box-shadow: 0 3px 3px rgba(170,170,170,.2);
        }
    }
}
</style>
