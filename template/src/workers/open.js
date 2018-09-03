import { UI, API, Page, App } from '@uneed/jsbridge-runtime'

if (typeof console == 'undefined') {
    global.console = {
        log: () => {},
        error: () => {},
    }
}

async function main() {
    let user = (await App.getUserInfo()).data
    let cvs = (await Page.getData('cvs')).data


    let resp = await API.request({
        url: '/v2/chatlet/open/' + user.uid,
        type: 'POST',
        data: {
            appid: {{ name }},
            type: cvs.cvsType,
            remoteid: cvs.cvsid,
            creatorid: user.uid,
        },
    })

    if (resp.ec !== 200) {
        UI.toast(resp.em || '打开失败').then(() => {
            Page.close()
        })
    } else {
        Page.close()
    }
}

main().catch(error => {
    UI.toast('打开戏精失败').then(() => Page.close())
})
