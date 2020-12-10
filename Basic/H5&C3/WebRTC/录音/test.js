new Vue({
    el: ".audio",
    data: {
        mediaDevices: [],
        deviceIndex: 0,
        currentWebData: null
    },
    mounted() {
        this.getDevices()
    },
    methods: {
        async getDevices() {
            // 获取设备的服务
            let list = await navigator.mediaDevices.enumerateDevices()
            let res = list.filter(v => v.kind === "audioinput")
            this.mediaDevices = []
            this.mediaDevices.push(...res)
            this.getUser()
        },
        async getUser() {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            this._record = new MediaRecorder(this.stream)
            this._record.ondataavailable = this.record.bind(this)
        },
        btnRecord() {
            this._record.start();
        },
        btnStop() {
            this._record.stop();
        },
        record(e) {
            this.currentWebData = e.data
        },
        btnPaly() {
            this.$refs.audio.src = URL.createObjectURL(this.currentWebData)
        }
    },
    watch: {
        deviceIndex(val, oldVal) {
            this.getUser()
        }
    }
})