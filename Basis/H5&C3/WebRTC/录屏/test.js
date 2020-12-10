new Vue({
    el: ".audio",
    data: {
        currentWebData: null
    },
    mounted() {
        this.getDevices()
    },
    methods: {
        async getDevices() {
            this.getUser()
        },
        async getUser() {
            this.stream = await navigator.mediaDevices.getDisplayMedia()
            this.$refs.pre.srcObject = this.stream
            this._record = new MediaRecorder(this.stream)
            this._record.ondataavailable = this.record.bind(this)
        },
        btnRecord() {
            console.log("开始录音。。。");
            this._record.start();
        },
        btnStop() {
            console.log("录音结束");
            this._record.stop();
        },
        record(e) {
            console.log("录音已就绪，可播放");
            this.currentWebData = e.data
        },
        btnPaly() {
            this.$refs.video.src = URL.createObjectURL(this.currentWebData)
        }
    },
    watch: {
        deviceIndex(val, oldVal) {
            this.getUser()
        }
    }
})