const digitalRE = /(\d{3})(?=\d)/g
// value 传入的值
// currency 货币单位
// decimals 小数点后面的位数

// Number.NEGATIVE_INFINITY Number.POSITIVE_INFINITY
// isFinite 判断是否是有限的数
// 12235145.562
export function currency(value, currency, decimals) {
  var value = parseFloat(value);
  // !value判断是不是NaN !NaN = true
  if (!isFinite(value) || (!value && value !== 0)) return '';
  currency = currency != null?  currency: "￥";
  decimals = decimals != null?  decimals: "2";
  var stringified = Math.abs(value).toFixed(decimals);
  // 12235145.56
  // 取出整数部分 decimals = 0 直接返回 否则截取
  var _int = decimals? stringified.slice(0, -decimals - 1): stringified;
  // 12235145
  // 求出开头的几位（被3除余数）
  var i = _int.length % 3;
  var head = i > 0 ? (_int.slice(0, i) +( _int.length > 3? ',': '')): '';
  // 12,
  // 取出小数部分
  var _float = decimals? stringified.slice(-decimals - 1): '';
  // .56
  var sign = value < 0 ? '-' : '';
  return sign + currency + head + _int.slice(i).replace(digitalRE, '$1,') + _float;
  // ￥12,235,145.562
}
