import { UI, API, Page, App, KVDB } from '@uneed/jsbridge-runtime'

const chatletId = '{{ name }}'
const GUIDE_KEY = 'chatlet-guide'

async function popupGuideIf(options) {
    let id = options.id
    let guide = await KVDB.get(GUIDE_KEY)

    // 如不需要引导
    if (!options.alwaysGuide && guide === 'no') {
        return { open: true }
    }

    Page.popup({
        id,
        page_name: 'pages/guide.html',
        width: 310,
        height: 470,
    })

    return new Promise(resolve => {
        Page.once('page.result', result => {
            if (result && result.open) {
                // 只有点击打开时才触发,关闭页面不触发
                KVDB.set(GUIDE_KEY, 'no') // 设置下次不引导
            }
            resolve(result)
        })
    })
}

async function main() {
    let resp = await App.getNetwork() // wifi noticed cellular
    if (resp && resp.state == 'none') {
        // 无网络
        UI.toast('操作失败，请检查网络设置').then(() => Page.close())
        return
    }

    let result = await popupGuideIf({ id: chatletId, alwaysGuide: false })
    if (!result || !result.open) {
        Page.close()
        return
    }

    let user = await App.getUserInfo()
    let cvs = await Page.getData('cvs')

    // 在此申请权限，由于qtalk没有需要的权限，所以不用申请，直接打开
    try {
        let resp = await API.request({
            url: '/v2/chatlet/open/' + user.uid,
            type: 'POST',
            data: {
                appid: chatletId,
                type: cvs.cvsType,
                remoteid: cvs.cvsid,
                creatorid: user.uid,
            },
        })
        Page.close()
    } catch (err) {
        if (err.em) {
            let msg = '操作失败，请稍后重试'
            switch (parseInt(err.em)) {
                case 1:
                    msg = '操作失败，对方已不是您的好友'
                    break
                case 2:
                    msg = '操作失败，您已不在群中'
                    break
                case 3:
                    msg = '操作失败，没有管理员权限'
                    break
                case 4:
                    msg = '当前正在使用此应用'
                    break
                case 5:
                case 6:
                    msg = '操作失败，没有操作权限'
                    break
                case 7:
                    msg = '服务器异常，请稍后重试'
                    break
            }
            UI.toast(msg)
        }
        Page.close()
    }
}

main().catch(error => {
    UI.toast('操作失败，请稍后重试').then(() => Page.close())
})
