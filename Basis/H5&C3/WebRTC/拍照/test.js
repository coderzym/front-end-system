(async function () {
    let stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true })
    document.querySelector('video').srcObject = stream
})();

new Vue({
    el: "#app",
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            this.$refs.video.srcObject = await navigator.mediaDevices.getUserMedia({ audio: false, video: true })
            this._context2d = this.$refs.canvas.getContext("2d")
        },
        takePhoto() {
            this._context2d.drawImage(this.$refs.video, 0, 0, 400, 300)
        }
    }
})