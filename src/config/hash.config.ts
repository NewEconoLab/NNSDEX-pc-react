export default {
  ID_CGAS: Neo.Uint160.parse('74f2dc36a68fdc4682034178eb2220729231db76'),
  ID_NNC: Neo.Uint160.parse("fc732edee1efdf968c23c20a9628eaa5a6ccb934"),
  // baseContract : Neo.Uint160.parse("348387116c4a75e420663277d9c02049907128c7"), 
  ID_GAS:"0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7",
  ID_NEO:"0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b",
  DEX_HASH:Neo.Uint160.parse("afc0a0954e343b705e9e4360c99f3ce2351581f4"), // 域名的出售，求购，取消出售，取消求购，充值，提取
  NNC_HASH:Neo.Uint160.parse("348387116c4a75e420663277d9c02049907128c7"), // 域名的转让，映射，续约
  bindContract: Neo.Uint160.parse("960b41a05588d2f55acbc13a1e3aa464eec6fff5"), // 域名的绑定
  assetDecimal:
  {
    "74f2dc36a68fdc4682034178eb2220729231db76":8, // CGAS 小数位数8位
    "fc732edee1efdf968c23c20a9628eaa5a6ccb934":2, // NNC 
  }
}