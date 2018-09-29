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
                <a href="#" class="logo">Jan Czizikow</a>
                <a aria-label="mobile menu" class="nav-toggle" @click="toggle" :class="[showMenu ? 'open': '']">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
                <ul class="menu-left" :class="[showMenu ? 'collapse': '']">
                    <li><a href="#about">About</a></li>
                    <li><a href="#exp">Resume</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
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
            //console.log("Aaaa")
            //sconsole.dir(window.scrollTop)
            let st = window.scrollY;

            if (Math.abs(this.lastScrollTop - st) <= this.delta) {
                return;
            }

            if (st > this.lastScrollTop && st > this.navbarHeight) {
                // scroll Down
                console.log(111)
                this.showNav = false;
                this.showMenu = false;
            } else {
                // scroll Up
                console.log(222)
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
        }
    },
    mounted() {
        console.dir(this.$refs.header);
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
/*
.header {
    border-bottom: 1px solid #F5F5F5;
    flex: 0 0 auto;
    //background-color: #fcad26;

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
*/
.header {
    flex: 0 0 auto;
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
  color: black;
}

.menu-left a {
    display: inline-block;
    position: relative;
    padding-bottom: 0px;
    transition: color .35s ease;
}
.menu-left a:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 0;
    transition: width 0s ease, background .35s ease;
}
.menu-left a:after {
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
.menu-left a:hover:before {
    width: 100%;
    background: #000;
    transition: width .35s ease;
}
.menu-left a:hover:after {
    width: 100%;
    background: transparent;
    transition: all 0s ease;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: .5rem 0;
  background: rgba(255, 255, 255, 0.92);
  z-index: 3;
  will-change: transform;
  transition: background 0.3s, -webkit-transform 0.5s cubic-bezier(0.694, 0.048, 0.335, 1);
  transition: transform 0.5s cubic-bezier(0.694, 0.048, 0.335, 1), background 0.3s;
  transition: transform 0.5s cubic-bezier(0.694, 0.048, 0.335, 1), background 0.3s, -webkit-transform 0.5s cubic-bezier(0.694, 0.048, 0.335, 1);
  transform: translateY(0);
  -webkit-transform: translateY(0);
}
header nav .logo {
  float: left;
  padding-top: .25rem;
  padding-bottom: .25rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  font-weight: 500;
  color: black;
}
header nav .logo:after {
  content: '';
  display: table;
  clear: both;
}
header nav ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
header nav ul li {
  float: none;
  margin-left: 0;
}
@media (min-width: 768px) {
  header nav ul li {
    float: left;
    margin-left: 1rem;
  }
}
header nav ul li a {
  display: block;
}
@media (min-width: 576px) {
  header nav ul li a {
    display: block;
    padding: .425rem 0rem;
  }
}

@media (max-width: 768px) {
  ul {
    clear: both;
  }
  ul li {
    padding: .5em 0;
  }
}
.hide-nav {
  transform: translateY(-120% !important);
  -webkit-transform: translateY(-120%) !important;
}

ul.menu-left {
  display: block;
  max-height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  z-index: 10;
}
@media (min-width: 768px) {
  ul.menu-left {
    display: block !important;
    float: right;
    max-height: none;
  }
}
ul.menu-left:before {
  content: '';
  display: table;
  clear: both;
}
ul.menu-left.collapse {
  max-height: 15em !important;
}

.nav-toggle {
  display: block;
  border-radius: 5px;
  background-color: transparent;
  float: right;
  height: 38px;
  width: 38px;
  cursor: pointer;
  padding: 8px 8px;
}
.nav-toggle.open span:first-child {
  transform: rotate(45deg) translate(4.4px, 4.4px);
}
.nav-toggle.open span:nth-child(2) {
  width: 0%;
  opacity: 0;
}
.nav-toggle.open span:last-child {
  transform: rotate(-45deg) translate(4.4px, -4.4px);
}
@media (min-width: 768px) {
  .nav-toggle {
    display: none;
  }
}
.nav-toggle span {
  position: relative;
  display: block;
  height: 2px;
  width: 100%;
  margin-top: 4px;
  background-color: #000;
  transition: all .25s;
}

.signature {
  position: fixed;
  font-weight: 100;
  bottom: 10px;
  color: #000;
  left: 0;
  letter-spacing: 4px;
  font-size: 10px;
  width: 100vw;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
}

</style>
