<template>
    <header class="header" ref="header" :class="[showNav ? '': 'hide-nav']">
        <!-- <div class="header-main">
            <div class="logo" @click="$router.push({name: 'home'})">
                MAIN.RUN
            </div>
            <div class="about" @click="$router.push({name: 'about'})">
                About
            </div>
        </div> -->


        <div class="container">
            <nav id="navigation">
                <a href="#" class="logo" @click.prevent="linkTo('home')">MAIN.RUN</a>
                <a aria-label="mobile menu" class="nav-toggle" @click="toggle" :class="[showMenu ? 'open': '']">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
                <ul class="menu-left" :class="[showMenu ? 'collapse': '']">
                    <li><a href="#about" @click.prevent="linkTo('home')">文章</a></li>
                    <li><a href="#exp">专题</a></li>
                    <li><a href="#skills" @click.prevent="linkTo('about')">关于</a></li>
                </ul>
            </nav>
        </div>

    </header>
</template>

<script>
export default {
    data() {
        return {
            didScroll: false,
            lastScrollTop: 0,
            delta: 5,
            navbarHeight: 0,
            showNav: true,
            showMenu: false
        }
    },
    computed: {

    },
    methods: {
        hasScrolled() {
            //sconsole.dir(window.scrollTop)
            let st = window.scrollY;

            if (Math.abs(this.lastScrollTop - st) <= this.delta) {
                return;
            }

            if (st > this.lastScrollTop && st > this.navbarHeight) {
                // scroll Down
                this.showNav = false;
                this.showMenu = false;
            } else {
                // scroll Up
                this.showNav = true;
            }

            this.lastScrollTop = st;
        },
        toggle() {
            if (this.showMenu) {
                this.showMenu = false;
            } else {
                this.showMenu = true;
            }
        },
        closeMenu() {
            this.showMenu = false;
        },
        linkTo(name) {
            this.closeMenu();
            this.$router.push({name: name});
        }
    },
    mounted() {
        //console.dir(this.$refs.header);
        this.navbarHeight = this.$refs.header.clientHeight;

        let _this = this;

        window.onscroll = function() {
            //console.log("aaaa")
            //console.log(window.scrollY)
            _this.didScroll = true;
        }

        setInterval(function() {
            if (_this.didScroll) {
                _this.hasScrolled();
                _this.didScroll = false;
            }
        }, 250);
    }
};
</script>

<style lang="stylus" scoped>
.header {
    flex: 0 0 auto;
    border-bottom: 1px solid #F5F5F5;
    z-index: 199;
}

.container {
  padding: 0px 15px 0px 15px;
}

breakpoint(min-width, max-width) {
    @media (min-width: min-width) {
        .container {
            max-width: max-width;
            margin-left: auto;
            margin-right: auto;
        }
        .container:after {
            content: " ";
            display: block;
            clear: both;
        }
    }
}

breakpoint(0, 100%)
breakpoint(576px, 540px)
breakpoint(768px, 720px)
breakpoint(992px, 960px)
breakpoint(1200px, 1170px)

a {
  text-decoration: none;
  color: rgba(34, 34, 34, 0.8);
}
a:hover, a :focus {
  color: #000000;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: .5rem 0;
    background: rgba(255, 255, 255, 0.92);
    //z-index: 3;
    will-change: transform;
    transition: background 0.3s, -webkit-transform 0.5s cubic-bezier(0.694, 0.048, 0.335, 1);
    transition: transform 0.5s cubic-bezier(0.694, 0.048, 0.335, 1), background 0.3s;
    transition: transform 0.5s cubic-bezier(0.694, 0.048, 0.335, 1), background 0.3s, -webkit-transform 0.5s cubic-bezier(0.694, 0.048, 0.335, 1);
    transform: translateY(0);

    &.hide-nav {
        transform: translateY(-120%);
    }

    nav {
        .logo {
            float: left;
            padding-top: .25rem;
            padding-bottom: .25rem;
            margin-right: 1rem;
            font-size: 2.2rem;
            line-height: inherit;
            font-weight: 600;
            //color: black;

            &:after {
                content: '';
                display: table;
                clear: both;
            }
        }

        ul {
            list-style: none;
            padding-left: 0;
            margin: 0;

            @media (max-width: 768px) {
                clear: both;

                li {
                    padding: .5em 0;
                }
            }

            li {
                float: none;
                margin-left: 0;

                @media (min-width: 768px) {
                    float: left;
                    margin-left: 1rem;
                }

                a {
                    display: block;

                    @media (min-width: 576px) {
                        display: block;
                        padding: .6rem 0rem;
                    }
                }
            }

            &.menu-left {
                display: block;
                max-height: 0;
                overflow: hidden;
                transition: all 0.3s ease-out;
                z-index: 209;

                @media (min-width: 768px) {
                    display: block !important;
                    float: right;
                    max-height: none;
                }

                &:before {
                    content: '';
                    display: table;
                    clear: both;
                }

                &.collapse {
                    max-height: 25rem !important;
                }

                a {
                    display: inline-block;
                    position: relative;
                    padding-bottom: 0px;
                    transition: color .35s ease;
                    font-size: 1.8rem;
                    //line-height: 3.2rem;

                    &:before {
                        content: '';
                        display: block;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        height: 2px;
                        width: 0;
                        transition: width 0s ease, background .35s ease;
                    }

                    &:after {
                        content: '';
                        display: block;
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        height: 2px;
                        width: 0;
                        background: #000;
                        transition: width .35s ease;
                    }

                    &:hover:before {
                        width: 100%;
                        background: #000;
                        transition: width .35s ease;
                    }

                    &:hover:after {
                        width: 100%;
                        background: transparent;
                        transition: all 0s ease;
                    }
                }
            }
        }

        .nav-toggle {
            display: block;
            border-radius: 5px;
            background-color: transparent;
            float: right;
            height: 42px;
            width: 42px;
            cursor: pointer;
            padding: 8px 8px;

            @media (min-width: 768px) {
                display: none;
            }

            &.open {
                span:first-child {
                    transform: rotate(45deg) translate(5.4px, 4.4px);
                }

                span:nth-child(2) {
                    width: 0%;
                    opacity: 0;
                }

                span:last-child {
                    transform: rotate(-45deg) translate(5.4px, -4.4px);
                }
            }

            span {
                position: relative;
                display: block;
                height: 3px;
                width: 100%;
                margin-top: 4px;
                background-color: #000;
                transition: all .25s;
            }
        }
    }
}

// .hide-nav {
//     transform: translateY(-120% !important) !important;
// }
</style>
