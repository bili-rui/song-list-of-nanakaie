module.exports = {
  // 忽略打包时的代码规范检查
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 关闭图片自动压缩功能（静态导出必须开启）
  images: {
    unoptimized: true,
  }
}
