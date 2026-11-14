import re
import json

with open(r'c:\Users\Admin\Documents\WEBLEARNPYTHON\HHT_PHT TIN 10-49-118.md', 'r', encoding='utf-8') as f:
    text = f.read()

lessons_info = [
    ('bai_16', 'BÀI 16: NGÔN NGỮ LẬP TRÌNH BẬC CAO PYTHON', 'BÀI 16', 'Bài 16: Ngôn ngữ lập trình bậc cao Python', 'Lesson 16: High-Level Python Programming Language'),
    ('bai_17', 'BÀI 17: BIẾN VÀ LỆNH GÁN', 'BÀI 17', 'Bài 17: Biến và lệnh gán', 'Lesson 17: Variables and Assignment Statement'),
    ('bai_18', 'BÀI 18: CÁC CÂU LỆNH VÀO RA ĐƠN GIẢN', 'BÀI 18', 'Bài 18: Các câu lệnh vào ra đơn giản', 'Lesson 18: Basic Input and Output Statements'),
    ('bai_19', 'BÀI 19: CÂU LỆNH RẼ NHÁNH IF', 'BÀI 19', 'Bài 19: Câu lệnh rẽ nhánh if', 'Lesson 19: Conditional Branching If Statement'),
    ('bai_20', 'BÀI 20: CÂU LỆNH LẶP FOR', 'BÀI 20', 'Bài 20: Câu lệnh lặp for', 'Lesson 20: For Loop Statement'),
    ('bai_21', 'BÀI 21: CÂU LỆNH LẶP WHILE', 'BÀI 21', 'Bài 21: Câu lệnh lặp while', 'Lesson 21: While Loop Statement'),
    ('bai_22', 'BÀI 22: KIỂU DỮ LIỆU DANH SÁCH', 'BÀI 22', 'Bài 22: Kiểu dữ liệu danh sách', 'Lesson 22: Python List Data Type'),
    ('bai_23', 'BÀI 23: MỘT SỐ LỆNH LÀM VIỆC VỚI DỮ LIỆU DANH SÁCH', 'BÀI 23', 'Bài 23: Một số lệnh làm việc với dữ liệu danh sách', 'Lesson 23: Working with Lists in Python'),
    ('bai_24', 'BÀI 24: XÂU KÍ TỰ', 'BÀI 24', 'Bài 24: Xâu kí tự', 'Lesson 24: Python String Data Type'),
    ('bai_25', 'BÀI 25: MỘT SỐ LỆNH LÀM VIỆC VỚI XÂU KÍ TỰ', 'BÀI 25', 'Bài 25: Một số lệnh làm việc với xâu kí tự', 'Lesson 25: Working with Strings in Python'),
    ('bai_26', 'BÀI 26: HÀM TRONG PYTHON', 'BÀI 26', 'Bài 26: Hàm trong Python', 'Lesson 26: Functions in Python'),
    ('bai_27', 'BÀI 27: THAM SỐ CỦA HÀM', 'BÀI 27', 'Bài 27: Tham số của hàm', 'Lesson 27: Function Parameters and Arguments'),
    ('bai_28', 'BÀI 28: PHẠM VI CỦA BIẾN', 'BÀI 28', 'Bài 28: Phạm vi của biến', 'Lesson 28: Variable Scope in Python'),
    ('bai_29', 'BÀI 29: NHẬN BIẾT LỖI CHƯƠNG TRÌNH', 'BÀI 29', 'Bài 29: Nhận biết lỗi chương trình', 'Lesson 29: Identifying Program Errors in Python'),
    ('bai_30', 'BÀI 30: KIỂM THỬ VÀ GỠ LỖI CHƯƠNG TRÌNH', 'BÀI 30', 'Bài 30: Kiểm thử và gỡ lỗi chương trình', 'Lesson 30: Testing and Debugging Programs'),
    ('bai_31', 'BÀI 31: THỰC HÀNH VIẾT CHƯƠNG TRÌNH ĐƠN GIẢN', 'BÀI 31', 'Bài 31: Thực hành viết chương trình đơn giản', 'Lesson 31: Comprehensive Python Practice'),
]

curriculum = []

for lid, htitle, code, vi, en in lessons_info:
    start = text.find('## ' + htitle)
    next_start = len(text)
    for lid2, htitle2, code2, vi2, en2 in lessons_info:
        if htitle2 != htitle:
            pos = text.find('## ' + htitle2, start)
            if pos != -1 and pos < next_start:
                next_start = pos
    sec = text[start:next_start]
    
    # Locate main practice/quiz section at the end of the lesson
    # Look for last heading matching BÀI TẬP or CÂU HỎI TRẮC NGHIỆM
    quiz_split_idx = -1
    for kw in ['## CÂU HỎI TRẮC NGHIỆM', '## BÀI TẬP']:
        matches = [m.start() for m in re.finditer(re.escape(kw), sec)]
        if matches:
            last_match = matches[-1]
            if last_match > quiz_split_idx and last_match > 500:
                quiz_split_idx = last_match
                
    if quiz_split_idx != -1:
        theory_content = sec[:quiz_split_idx].strip()
    else:
        # Fallback if no specific quiz section header
        theory_content = sec.strip()
        
    # Clean redundant text & headers
    theory_content = re.sub(r'Tin học 10 \d+', '', theory_content)
    theory_content = re.sub(r'\n{3,}', '\n\n', theory_content)
    
    # Extract summary
    lines = [l.strip() for l in theory_content.split('\n') if len(l.strip()) > 35 and not l.startswith('#') and not l.startswith('.')]
    summary_vi = lines[0] if lines else f'Nội dung lý thuyết trọng tâm của {code} theo chương trình Tin học 10.'
    
    curriculum.append({
        'id': lid,
        'code': code,
        'glyph': '◆',
        'titleVi': vi,
        'titleEn': en,
        'summaryVi': summary_vi[:220],
        'summaryEn': f'Key concepts and core knowledge of {code} from CS Grade 10 textbook.',
        'keyPointsVi': [
            f'Nắm vững kiến thức trọng tâm của {code} từ tài liệu HHT_PHT Tin học 10.',
            'Hiểu rõ cú pháp, cách sử dụng các hàm và câu lệnh liên quan.',
            'Thực hành qua các ví dụ minh họa và bài tập chấm tự động.'
        ],
        'theoryMarkdownVi': theory_content,
        'theoryMarkdownEn': f'### {en}\n\nPlease review detailed Vietnamese theory notes extracted from Tin hoc 10 textbook.',
        'sampleCode': f'# Code mẫu minh họa {code}\nprint("Xin chào, đây là bài thực hành {code}!")\n',
        'sampleOutput': [f'Xin chào, đây là bài thực hành {code}!']
    })

with open(r'c:\Users\Admin\Documents\WEBLEARNPYTHON\src\services\pdfCurriculum.json', 'w', encoding='utf-8') as f:
    json.dump(curriculum, f, ensure_ascii=False, indent=2)

print('Updated pdfCurriculum.json successfully')
for item in curriculum:
    cid = item['id']
    ccode = item['code']
    clen = len(item['theoryMarkdownVi'])
    print(f'{cid} ({ccode}) length = {clen}')
