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
                    <div class="title"><h1>{{article.title}}</h1></div>
                    <div class="info">
                        <span>{{article.create_at}}</span>
                    </div>
                    <div class="image" v-if="article.image[0]">
                        <img :src="article.image[0] + '?imageView2/1/w/1200/h/560/q/75'">
                    </div>
                    <div class="description">{{article.summary}}</div>
                    <!-- <div class="info">
                        <span>{{article.create_at}}</span>
                    </div> -->
                </div>
            </div>
            <!-- <div class="articles Grid">
                <div class="article Cell -mb-c10of10 -tb-c5of10 -c4of12" v-for="article in articles" :key="article.id" @click="linkTo(article.id)">
                    <div class="img">
                        <img src="https://cdn.danclive.com/upload/FgWQ9BiSA5Immx8Wzvtj2F-FawcY.png">
                    </div>
                    <div class="content">
                        <div class="info">
                            <span>{{article.create_at}}</span>
                        </div>
                        <div class="title">{{article.title}}</div>
                    </div>
                </div>
            </div> -->
            <!-- <div class="page">
                <span><m-button @click="prev_page" :disabled="!has_prev_page">上一页</m-button></span>
                <span>第{{page}}页</span>
                <span><m-button @click="next_page" :disabled="!has_next_page">下一页</m-button></span>
            </div> -->
            <div class="page">
                <m-button special next icon="fa-hourglass-half" @click="next_page" v-if="has_next_page">加载更多</m-button>
                <m-button special next icon="fa-hourglass-o" disabled v-else>没有更多了<!-- <m-icon icon-class="more"/> --></m-button>
            </div>
        </section>
</template>

<script>
import { listArticle } from "@/api/article";
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            // listQuery: {
            //     page: 1,
            //     per_page: 10
            // },
            // articles: [],
            // count: 0
        };
    },
    created() {
        // const query = this.$route.query;

        //console.log("22222222222")

        // if (query.page) {
        //     this.listQuery.page = query.page - 0;
        // } else {
        //     this.listQuery.page = 1;
        // }
        if (this.articles.length === 0) {
            this.fecthDate();
        }
    },
    methods: {
        fecthDate() {
            // listArticle(this.listQuery).then(response => {
            //     if (response.data.articles.length === 0) {
            //         this.$router.replace({ name: "page404" });
            //     }

            //     this.articles = response.data.articles;
            //     this.count = response.data.count;
            // });
            this.GetArticles().then(() => {

            }).catch(() => {

            });
        },
        linkTo(id) {
            this.$router.push({ name: "post", params: { id: id } });
        },
        next_page() {
            // this.listQuery.page += 1;
            // this.fecthDate();
            // this.$router.push({ name: "home", query: { page: this.listQuery.page + 1}});
            this.SET_PAGE(this.page + 1);
            this.fecthDate();
        },
        prev_page() {
            // this.listQuery.page -= 1;
            // this.fecthDate();
            // this.$router.push({ name: "home", query: { page: this.listQuery.page - 1}});
        },
        ...mapMutations([
            "SET_PAGE"
        ]),
        ...mapActions([
            "GetArticles"
        ])
    },
    computed: {
        has_next_page() {
            if (this.page * this.per_page >= this.count) {
                return false;
            } else {
                return true;
            }
        },
        has_prev_page() {
            if (this.page === 1) {
                return false;
            } else {
                return true;
            }
        },
        ...mapState({
            articles: state => state.article.articles,
            count: state => state.article.count,
            page: state => state.article.page,
            per_page: state => state.article.per_page
        })
    },
    watch: {
        "$route" (to, from) {
            // const query = to.query;

            // console.log("111111111111")

            // if (query.page) {
            //     this.listQuery.page = query.page - 0;
            // } else {
            //     this.listQuery.page = 1;
            // }

            // this.fecthDate();
        }
    }
};
</script>
<style lang="stylus" scoped>
.section {
    margin: 10px auto;
    max-width: 860px;
    
    .page {
        margin-top: 10px;
        text-align: center;
        
        span {
            margin: 0 5px 0 5px;
        }
    }

    .articles {
        padding: 0 0 20px 0;

        .article {
            margin-bottom: 20px;
            padding: 20px 0 10px 0;
            //border: 1px solid #F5F5F5;
            cursor: pointer;
            //background-color: #FAFAFA;
            //box-shadow: 0 1px 1px rgba(0,0,0,.05);
            transition: box-shadow 0.3s ease-in-out;
            
            &:hover {
                //box-shadow: 0 3px 3px rgba(170,170,170,.2);
            }
            
            &:hover .title {
                color: #f58500;
            }

            .title {
                padding: 0 10px;
                //color: font-a-color
                transition: color 0.15s ease-in-out;
                //display: inline-block;
                //font-size: 2.4rem;
                //text-align: center;
            }
            
            .image {
                padding: 10px 0 10px 0;
            }
            
            .description {
                //color: #9ea0a6;
                padding: 0 10px;
                font-size: 1.8rem;
            }
            
            .info {
                color: rgba(0,0,0,.4);
                padding: 0 10px;
            }
        }
    }
    // .articles {

    //     .article {
    //         position: relative;
    //         cursor: pointer;

    //         .img {
    //             width: 100%;
    //             background-color: #000000;

    //             img {
    //                 width: 100%;
    //                 height: 100%;
    //                 opacity: 0.8;
    //                 transition: opacity 0.15s ease-in-out, filter 0.15s ease-in-out;
    //                 filter: grayscale(20%)
    //             }
    //         }
            
    //         .content {
    //             position: absolute;
    //             padding: 10px;
    //             bottom: 0;
    //             z-index: 99;
                
    //             .title {
    //                 color: #ffffff;
    //                 font-size: 1.6rem;
    //                 font-weight: 600;
    //             }
                
    //             .info {
    //                 color: #ffffff;
    //                 font-size: 1.4rem;
    //             }
    //         }
            
    //         &:hover {
    //             .img img {
    //                 opacity: 1;
    //                 filter: grayscale(0%)
    //             }
    //         }
    //     }
    // }

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
