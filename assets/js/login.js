
$('#link_reg').on('click',function(e){
    $('.login-box').css('display', 'none')
    $('.reg-box').css('display', 'block')
})
$('#link_login').on('click',function(e){
    $('.reg-box').css('display', 'none')
    $('.login-box').css('display', 'block')
})

var form = layui.form
var layer = layui.layer
form.verify({
    pwd:[/^[\S]{6,12}$/,'密码必须6-12位，且不能有空格'],
    repwd:function(value){
        var pwd = $('.reg-box [name=password]').val()
        if( pwd !==value){
            return '两次密码不一致'
        }
    }
})

$('#form_reg').on('submit',function(e){
    e.preventDefault()
    var data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser',data,function(res){
        if(res.status!==0){
            return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录！')
        // 模拟人的点击行为
        $('#link_login').click()
    })
})

$('#form_login').on('submit',function(e){
    e.preventDefault()
    var data ={
        username: $('#form_login [name=username]').val(),
        password: $('#form_login [name=password]').val()
    }
    $.post('/api/login',data,function(res){
        if(res.status!==0){
            return layer.msg(res.message)
        }
        layer.msg('登錄成功')
        localStorage.setItem('token',res.token)
        location.href= '/index.html'

    })
})


// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
})