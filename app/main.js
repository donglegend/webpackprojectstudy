import Vue from "vue";
import Mountain from "./components/mountains.vue";

if(module.hot){
	module.hot.accept("./components/mountains.vue", function (){
		alert("ddj")
	});
}

new Vue({
	el: "body",
	components: {
		Mountain
	}
})