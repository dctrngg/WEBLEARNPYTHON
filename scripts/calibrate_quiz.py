import json
import re

with open(r'c:\Users\Admin\Documents\WEBLEARNPYTHON\src\services\quizData.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

for q in questions:
    txt = q['question'].lower()
    opts = [o.strip() for o in q['options']]
    opts_l = [o.lower() for o in opts]
    
    if 'ngôn ngữ lập trình là gì' in txt:
        q['correctIndex'] = 2
        q['explanation'] = 'Ngôn ngữ lập trình là ngôn ngữ dùng để viết các chương trình máy tính.'
    elif 'chọn phát biểu sai' in txt and any('print' in o for o in opts_l):
        for idx, o in enumerate(opts_l):
            if 'nhập dữ liệu' in o:
                q['correctIndex'] = idx
                q['explanation'] = 'Lệnh print() chỉ xuất dữ liệu ra màn hình, không thể dùng để nhập dữ liệu.'
                break
    elif 'gần với ngôn ngữ tự nhiên' in txt:
        for idx, o in enumerate(opts_l):
            if 'bậc cao' in o:
                q['correctIndex'] = idx
                q['explanation'] = 'Ngôn ngữ lập trình bậc cao có các câu lệnh được viết gần với ngôn ngữ tự nhiên.'
                break
    elif 'chỉ có một ngôn ngữ lập trình bậc cao' in ' '.join(opts_l):
        for idx, o in enumerate(opts_l):
            if 'chỉ có một' in o:
                q['correctIndex'] = idx
                q['explanation'] = 'Phát biểu SAI vì có rất nhiều ngôn ngữ lập trình bậc cao như C, C++, Java, Pascal, Python...'
                break
    elif 'mấy kỹ thuật dịch' in txt:
        for idx, o in enumerate(opts_l):
            if 'thông dịch và biên dịch' in o:
                q['correctIndex'] = idx
                q['explanation'] = 'Có 2 loại kĩ thuật dịch: Thông dịch (Interpreter) và Biên dịch (Compiler).'
                break
    elif 'trong quá trình dịch' in txt and 'lỗi' in txt:
        for idx, o in enumerate(opts_l):
            if o in ['cú pháp', 'lỗi cú pháp']:
                q['correctIndex'] = idx
                q['explanation'] = 'Chương trình dịch phát hiện và báo lỗi cú pháp.'
                break
    elif 'kiểm tra kiểu dữ liệu' in txt:
        for idx, o in enumerate(opts_l):
            if 'type' in o:
                q['correctIndex'] = idx
                q['explanation'] = 'Hàm type() dùng để kiểm tra kiểu dữ liệu của một giá trị hoặc biến.'
                break
    elif 'int là kiểu dữ liệu' in txt:
        for idx, o in enumerate(opts_l):
            if 'nguyên' in o:
                q['correctIndex'] = idx
                q['explanation'] = 'Kiểu int đại diện cho số nguyên trong Python.'
                break
    elif 'float là kiểu dữ liệu' in txt:
        for idx, o in enumerate(opts_l):
            if 'thực' in o:
                q['correctIndex'] = idx
                q['explanation'] = 'Kiểu float đại diện cho số thực trong Python.'
                break
    elif 'str là kiểu dữ liệu' in txt:
        for idx, o in enumerate(opts_l):
            if 'xâu' in o or 'chuỗi' in o:
                q['correctIndex'] = idx
                q['explanation'] = 'Kiểu str đại diện cho xâu kí tự trong Python.'
                break
    elif 'len(' in txt:
        for idx, o in enumerate(opts_l):
            if 'độ dài' in o or 'số phần tử' in o or 'số kí tự' in o:
                q['correctIndex'] = idx
                q['explanation'] = 'Hàm len() trả về độ dài (số lượng phần tử) của danh sách hoặc xâu kí tự.'
                break

with open(r'c:\Users\Admin\Documents\WEBLEARNPYTHON\src\services\quizData.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print('Successfully calibrated questions in quizData.json!')
