<template>
        <section class="section">
            <!-- <div class="articles">
                <div class="article" v-for="article in articles" :key="article.id">
                    <div class="box" @click="linkTo(article.id)">
                        <img v-bind:src="article.img" alt>
                        <div class="caption">
                            <h4>{{article.title}}</h4>
                            <p>
                        
                            </p>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="articles">
                <div class="article" v-for="article in articles" :key="article.id" @click="linkTo(article.id)">
                    <div class="title">{{article.title}}</div>
                    <div class="description">{{article.summary}}</div>
                    <div class="info">
                        <span>{{article.create_at}}</span>
                    </div>
                </div>
            </div>
            <div class="page">
                <span><m-button @click="prev_page" :disabled="!has_prev_page">上一页</m-button></span>
                <span>第{{listQuery.page}}页</span>
                <span><m-button @click="next_page" :disabled="!has_next_page">下一页</m-button></span>
            </div>
            <!-- <m-button design="moema" class="fit" icon="fa-hourglass-half" @click="loadMore" v-bind:disabled="!hasMore" v-if="hasMore">加载更多</m-button>
            <m-button design="moema" class="fit" icon="fa-hourglass-o" disabled v-else>没有更多了</m-button> -->
        </section>
</template>

<script>
import { listArticle } from "@/api/article";

export default {
    data() {
        return {
            listQuery: {
                page: 1,
                per_page: 10
            },
            articles: [],
            count: 0
        };
    },
    created() {
        const query = this.$route.query;

        console.log("22222222222")

        if (query.page) {
            this.listQuery.page = query.page - 0;
        } else {
            this.listQuery.page = 1;
        }

        this.fecthDate();
    },
    methods: {
        fecthDate() {
            listArticle(this.listQuery).then(response => {
                if (response.data.articles.length === 0) {
                    this.$router.replace({ name: "page404" });
                }

                this.articles = response.data.articles;
                this.count = response.data.count;
            });
        },
        linkTo(id) {
            this.$router.push({ name: "post", params: { id: id } });
        },
        next_page() {
            // this.listQuery.page += 1;
            // this.fecthDate();
            this.$router.push({ name: "home", query: { page: this.listQuery.page + 1}});
        },
        prev_page() {
            // this.listQuery.page -= 1;
            // this.fecthDate();
            this.$router.push({ name: "home", query: { page: this.listQuery.page - 1}});
        }
    },
    computed: {
        has_next_page() {
            if (this.listQuery.page * this.listQuery.per_page >= this.count) {
                return false;
            } else {
                return true;
            }
        },
        has_prev_page() {
            if (this.listQuery.page === 1) {
                return false;
            } else {
                return true;
            }
        }
    },
    watch: {
        "$route" (to, from) {
            const query = to.query;

            console.log("111111111111")

            if (query.page) {
                this.listQuery.page = query.page - 0;
            } else {
                this.listQuery.page = 1;
            }

            this.fecthDate();
        }
    }
};
</script>
<style lang="stylus" scoped>
.section {
    margin: 10px auto;
    max-width: 980px;
    
    .page {
        margin-top: 10px;
        text-align: center;
        
        span {
            margin: 0 5px 0 5px;
        }
    }

    .articles {
        padding-top: 40px;

        .article {
            margin-bottom: 40px;
            // border-bottom: 1px solid #F5F5F5;
            cursor: pointer;
            
            &:hover .title {
                color: #f58500;
            }

            .title {
                //color: font-a-color
                transition: color 0.15s ease-in-out;
                display: inline-block;
                font-size: 2.4rem;
            }
            
            .description {
                color: #9ea0a6;
            }
            
            .info {
                color: rgba(0,0,0,.4);
            }
        }
    }

    // .articles {
    //     padding-top: 20px;
    //     padding-bottom: 20px;
    //     display: flex;
    //     flex-flow: row wrap;
    //     align-content: flex-start;
        
    //     .article {
    //         flex: 1;
    //         flex: 0 0 25%;
    //         padding-left: 0.5rem;
    //         padding-right: 0.5rem;
          
    //         .box {
    //             margin-bottom: 1rem;
    //             padding: 3px;
    //             box-shadow: inset 0 0 0 1px #F5F5F5;
    //             cursor: pointer;
    //             border-radius: 1px;
                
    //             &:hover {
    //                 box-shadow: inset 0 0 0 1px #f29e0d;
    //             }
                
    //             img {
    //                 display: block;
    //                 max-width: 100%;
    //                 height: auto;
    //             }
                
    //             .caption {
    //                 margin-top: 0.5rem;
    //                 padding: 0.5rem;

    //                 h4 {
    //                     font-size: 1.4rem;
    //                     line-height: 1.6rem;
    //                 }
                      
    //                 p {
    //                     font-size: 1.3rem;
    //                     line-height: 1.6rem;
    //                     margin-bottom: 0;
    //                 }
    //             }
    //         }
    //     }
        
    //     @media (max-width: 900px) {
    //       .article {
    //         flex: 0 0 33.3333333%;
    //       }
    //     }
        
    //     @media (max-width: 600px) {
    //       .article {
    //         flex: 0 0 50%;
    //       }
    //     }
        
    //     @media (max-width: 400px) {
    //       .article {
    //         flex: 0 0 100%;
    //       }
    //     }
    //   }
}

</style>
