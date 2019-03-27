export const dict = {
  custom: {
    username: {
      required: '请输入您的手机号码',
      numeric: '您输入的手机号码有误',
      length: '请输入11位手机号码'
    },
    password: {
      required: '请输入密码',
      min: '密码不少于6位',
      max: '密码不超过18位'
    },
    imgcode: {
      required: '请输入图片验证码',
      alpha: '您输入的验证码有误',
      length: '您输入的验证码有误'
    },
    code: {
      required: '请输入短信验证码',
      numeric: '您输入的验证码有误',
      length: '您输入的验证码有误'
    },
    agreement: {
      required: '请阅读并确认注册协议'
    },
    agree: {
      required: '请阅读并确认《用户协议》'
    },
    image_field: {
      required: '请上传图片',
      image: '仅支持jpg、png、gif格式',
      size: '图片太大了，不能超过1M'
    },
    description: {
      min: '简介应该包含至少6个字符'
    }
  }
}
