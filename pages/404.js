import Link from 'next/link'
import styles from '../styles/Home.module.css' // 或者你自定义的样式

export default function Custom404() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      textAlign: 'center',
      background: '#f8f9fa' // 建议换成和你歌单接近的颜色
    }}>
      <h1 style={{ fontSize: '64px', color: '#1D0C26' }}>404</h1>
      <p style={{ fontSize: '20px', marginBottom: '20px' }}>哎呀，二吖的这个页面走丢了...</p>
      
      <Link href="/">
        <a style={{
          padding: '10px 20px',
          background: '#B4A96D',
          color: 'white',
          borderRadius: '5px',
          textDecoration: 'none'
        }}>
          返回歌单首页
        </a>
      </Link>
    </div>
  )
}