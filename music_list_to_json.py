import json
import pandas as pd

# 📌 1. Excel 文件名
EXCEL_FILE = './二吖歌单.xlsx' 

# 📌 2. 生成的 JSON 文件保存路径
JSON_FILE = './public/music_list_7.json'

def main():
    try:
        print(f"⏳ 正在读取表格: {EXCEL_FILE} ...")
        # 读取表格
        song_df = pd.read_excel(EXCEL_FILE)
        
        # 【终极防错】把所有空白、NaN 强制替换为空字符串
        song_df = song_df.fillna("")
        
        song_list = []
        for index, row_data in song_df.iterrows():
            row = row_data.tolist()
            
            # 防错：如果列数不够 8 列，自动补齐
            while len(row) < 8:
                row.append("")

            # 安全转换“是否置顶”：如果是空的或者奇奇怪怪的符号，统统变成 0
            try:
                sticky_top = int(float(row[5])) if row[5] != "" else 0
            except:
                sticky_top = 0
                
            # 安全转换“是否付费”
            try:
                paid = int(float(row[6])) if row[6] != "" else 0
            except:
                paid = 0

            song_data = {
                "index": index + 1,  
                "song_name": str(row[0]).strip(), # A列: 歌名
                "artist": str(row[1]).strip(),    # B列: 歌手
                "language": str(row[2]).strip(),  # C列: 语言
                "remarks": str(row[3]).strip(),   # D列: 备注/类型
                "initial": str(row[4]).strip(),   # E列: 首字母
                "sticky_top": sticky_top,         # F列: 置顶
                "paid": paid,                     # G列: 付费
                "BVID": str(row[7]).strip()       # H列: BV号
            }
            
            # 置顶的歌放最前面
            if sticky_top == 1:
                song_list.insert(0, song_data)
            else:
                song_list.append(song_data)
                
        print("⏳ 正在生成 JSON 文件...")
        with open(JSON_FILE, 'w', encoding='utf-8') as f:
            json.dump(song_list, f, ensure_ascii=False, indent=2)
            
        print(f"🎉 转换成功！共打包了 {len(song_list)} 首歌。")
        print(f"📁 文件已成功保存至: {JSON_FILE}")

    except FileNotFoundError:
        print(f"❌ 错误：找不到名为 {EXCEL_FILE} 的文件！")
    except Exception as e:
        print(f"❌ 发生错误：{e}")

if __name__ == '__main__':
    main()