export const SUCCESS_CODE = 10_000

export const ERROR_CODE = {
  111001: {
    code: 111001,
    isShow: true,
    message: '請確認輸入內容',
  },
  111002: {
    code: 111002,
    isShow: false,
    message: '系統忙碌中，請稍後再試',
  },
  111005: {
    code: 111005,
    isShow: true,
    message: '登入態已失效，請重新登入',
  },
  112001: {
    code: 112001,
    isShow: true,
    message: '邀請碼不存在',
  },
  112008: {
    code: 112008,
    isShow: false,
    message: '邀請碼已失效',
  },
  116001: {
    code: 116001,
    isShow: true,
    message: '訂單資料有誤，請重新確認',
  },
  116002: {
    code: 116002,
    isShow: true,
    message: '找不到對應會員資料',
  },
  116003: {
    code: 116003,
    isShow: true,
    message: '商品不存在或已下架',
  },
  116004: {
    code: 116004,
    isShow: true,
    message: '此商品尚未開放',
  },
  116005: {
    code: 116005,
    isShow: true,
    message: '庫存不足，請調整數量',
  },
  116006: {
    code: 116006,
    isShow: false,
    message: '建立訂單失敗，請稍後再試',
  },
  116007: {
    code: 116007,
    isShow: false,
    message: '查詢會員資料失敗，請稍後再試',
  },
  116008: {
    code: 116008,
    isShow: false,
    message: '查詢商品資料失敗，請稍後再試',
  },
  116009: {
    code: 116009,
    isShow: false,
    message: '查詢規格資料失敗，請稍後再試',
  },
  116010: {
    code: 116010,
    isShow: false,
    message: '查詢庫存資料失敗，請稍後再試',
  },
}
