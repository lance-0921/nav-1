
const $siteList = $(`.siteList`)
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

const hashMap = xObject || [
    {logo:'A', logotype:'text', url:'https://www.acfun.cn'},
    {logo:'B',logotype:'text', url:'https://www.bilibili.com'},

]

const simplifyUrl = (url) =>{   //简化显示的url
    return url.replace('https://','') 
    .replace('http://','')
    .replace('www.','')
    .replace( /\/.*/,'')    //(正则表达式)删除/开头后面的内容
}
const render=()=> {
    $siteList.find('li:not(.last)').remove()  //每次添加新卡片，先删除之前的网址，然后重新渲染一次
    hashMap.forEach((node,index) =>{  //将用户输入的网址变成一个卡片
       // console.log(index)
        const $li = $(`
        <li>
            <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
                <svg class="icon">
                <use xlink:href="#icon-shanchu"></use>
                </svg>
            </div>
            </div>
        </li>
      `).insertBefore($lastLi)  

    $li.on('click',() =>{
        window.open(node.url)   //用js控制代替a标签，用a标签无法阻止冒泡
    })
    $li.on('click','.close',(e)=>{
        e.stopPropagation()       //阻止冒泡
       // console.log(hashMap)
        hashMap.splice(index,1)
        render()  //删除后从新渲染hashMap
    })



    })
}

render()

$('.addButton').on('click', ()=>{
     //让用户增加网址，并纠错
    let url = window.prompt('请输入网址：')
    if(url.indexOf('http')!==0){
        url = 'https://'+url
    }
    hashMap.push({
        logo:(simplifyUrl(url)[0]).toUpperCase(),    //将logo变为大写字母
        logotype:Text,
        url:url,
    })
    render()
});


//用户关闭网址时，将地址自动保存到localStorage
window.onbeforeunload = () =>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)  
}

$(document).on('keypress',(e) =>{
    const {key} = e
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }

})
