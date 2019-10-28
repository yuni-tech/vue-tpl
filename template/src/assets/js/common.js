import '@/assets/css/base.css'
{{#mobile}}
import '@/assets/css/common.css'


const setRemUnit = () => {
    /*
        这样写逻辑很简单
        为了方便计算 就定 1rem = 100px
        设计图是 375px 那么我们需要的宽度就应该是 3.75rem  (如果设计图是 750px  那么需要的宽度就是 7.5rem)
        如何实现界面为3.75rem宽度? 
        可推导 (3.75rem * 转换比例px/rem = 设备宽度) => (设备宽度 / 3.75 = 转换比例px) 
        继续推导  document.documentElement.clientWidth / 3.75  + 'px'  这就是我们需要的转换比例
        这样ui 60pt  就是  60 / 100(我们定义了1rem = 100) = 0.6rem  (这里需要明白rem的意义)

        如果是vw  就是 100 / 3.75 + 'vw'  (100就是设备宽度,vw的意义就是100vw等于document.documentElement.clientWidth+'px')

        简单来说 因为我们定义了1rem=100px 设计图是375px 所以我们需要3.75的界面宽度  
        所以  width(px或者vw) / 3.75  
    */
    let html = document.documentElement
    html.style.fontSize = 100 / 3.75 + 'vw'
    let width = html.clientWidth
    const set_width = width / 3.75
    // const now_width = Number(document.documentElement.style.fontSize.slice(0, -2))
    // if (set_width != now_width) {
    //     document.documentElement.style.fontSize = width / 3.75 + 'px'
    // }
    // 安卓部分机型rem计算不准,二货安卓
    let whileCount = 0
    while (true) {
        let settingFs = Number(html.style.fontSize.slice(0, -2))
        let realFs = Number(window.getComputedStyle(html).fontSize.slice(0, -2))
        let delta = realFs - set_width
        if (Math.abs(delta) >= 0.5) {
            if (delta > 0) {
                // settingFs--
                settingFs = settingFs - 0.3
            } else {
                // settingFs++
                settingFs = settingFs + 0.3
            }
            // html.style.fontSize = settingFs + 'px'
            html.style.fontSize = settingFs + 'vw'
        } else {
            break
        }
        if (whileCount++ > 30) {
            break
        }
    }
}
// 根据环境运行一些逻辑
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //ios active失效问题
    document.body.addEventListener('touchstart', () => {})
    document.documentElement.style.fontSize = 100 / 3.75 + 'vw'
} else if (/(Android)/i.test(navigator.userAgent)) {
    setRemUnit()
} 
   
{{/mobile}}


