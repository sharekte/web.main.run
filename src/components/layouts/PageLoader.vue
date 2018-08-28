<template>
    <div id="page-loader">
        <div class="preloader preloader--xl preloader--light">
            <svg viewBox="25 25 50 50">
                <circle cx="50" cy="50" r="20" />
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    name: "PageLoader",
    data() {
        return {};
    },
    mounted() {
        function fade(element) {
            var op = 1; // initial opacity
            var timer = setInterval(function() {
                if (op <= 0.1) {
                    clearInterval(timer);
                    element.style.display = "none";
                }
                element.style.opacity = op;
                element.style.filter = "alpha(opacity=" + op * 100 + ")";
                op -= op * 0.1;
            }, 10);
        }

        //if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        setTimeout(function() {
            fade(document.getElementById("page-loader"));
        }, 200);
    //}
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html:not(.ismobile) #page-loader {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100000;
  background-color: #1e2a31;
}
html:not(.ismobile) #page-loader .preloader {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
html.ismobile #page-loader {
  display: none;
}
@media (max-width: 767px) {
  #page-loader {
    display: none;
  }
}

/* Preloaders */
.preloader {
  position: relative;
  display: inline-block;
}
.preloader > svg {
  animation: rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.preloader > svg > circle {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-width: 2;
  stroke-miterlimit: 10;
  fill: none;
  animation: dash 1.5s ease-in-out infinite;
}
.preloader:not(.preloader--xl):not(.preloader--lg):not(.preloader--sm):not(.preloader--xs) {
  width: 40px;
}
.preloader:before {
  content: "";
  display: block;
  padding-top: 100%;
}
.preloader--xs {
  width: 20px;
}
.preloader--sm {
  width: 30px;
}
.preloader--lg {
  width: 50px;
}
.preloader--xl {
  width: 60px;
}
.preloader--light circle {
  stroke: #b4bfc3;
}
.preloader--red circle {
  stroke: #ef5350;
}
.preloader--blue circle {
  stroke: #1e88e5;
}
.preloader--green circle {
  stroke: #4caf50;
}
.preloader--yellow circle {
  stroke: #ffeb3b;
}
.preloader--bluegray circle {
  stroke: #607d8b;
}
.preloader--amber circle {
  stroke: #ffa000;
}
.preloader--teal circle {
  stroke: #009688;
}
.preloader--pink circle {
  stroke: #e91e63;
}
.preloader--purple circle {
  stroke: #9c27b0;
}
.preloader--white circle {
  stroke: #fff;
}
@-webkit-keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
