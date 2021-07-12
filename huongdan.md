Website History Quiz Game hoạt động như sau:

- Admin có thể tạo và lưu trữ các câu hỏi trắc nghiệm bằng cách đánh lưu nội dung câu hỏi vào file có đuôi ".questions.txt"
  và sau đó lưu nó vào thư mục "questions_dir". Mỗi câu hỏi trắc nghiệm phải tuân thủ cấu trúc 2 phần:

  - phần câu hỏi: "Câu <số thứ tự>:" (VD: "Câu 1:", "Câu 2:"...) + <Nội dung câu hỏi (bao gồm cả các câu trả lời tự chọn - tối đa 7 câu từ A đến G).>
    (LƯU Ý: Mỗi câu trả lời tự chọn đều phải được xuống dòng, và bắt đầu bằng một ký tự in hoa từ A đến G và liền sau là một dấu chấm. VD: 'A.','B.','C.','D.', ...)
    VD: <pre>"Câu 29: Sau Chiến tranh lạnh (1989) nội dung chủ yếu trong cuộc cạnh tranh
    giữa các cường quốc là xây dựng sức mạnh
    A. Quốc gia tổng hợp.
    B. Khoa học - công nghệ.
    C. Quân sự - chính trị.
    D. Kinh tế - văn hóa."</pre>

  - phần lời giải: "Lời giải:" + lời giải thích (nếu có) + "Đáp án cần chọn là:" + <đáp án đúng>.
    VD: <pre>
    "Lời giải:
    Sau chiến tranh lạnh (1989), các quốc gia đều chủ trương xây dựng sức mạnh tổng
    hợp thay thế chạy đua vũ trang. Sức mạnh của mỗi quốc gia dựa trên nền sản xuất
    phồn vinh, một nền tài chính vững chắc, một nền công nghệ có trình độ cao cùng
    với một lực lượng quốc phòng hùng mạnh.
    Đáp án cần chọn là: A"</pre>

- Người dự thi bất kỳ tham gia một bài Kiểm tra (Câu hỏi được lựa chọn ngẫu nhiên lấy từ nội dung các file "\*.questions.txt", số câu hỏi do người dự thi tự chọn, tối thiểu 30)
- Sau khi người dự thi submit bài kiểm tra, server sẽ tự động chấm điểm và trả về client kết quả
  - Nếu điểm >=9, người dự thi sẽ được công nhận là "Nhà thông thái Lịch sử", và có thể được lưu vào danh sách "Top List" (nếu muốn). Thông tin được lưu vào Top List sẽ là: họ tên, ngày sinh, số CMND, địa chỉ, nghề nghiệp.
  - Ngoài ra những ai được lưu danh vào Top List sẽ được cấp một mã token duy nhất. Nếu sau này họ muốn thay đổi thông tin của mình trên Top List thì token sẽ được yêu cầu để xác thực
