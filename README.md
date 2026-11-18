# 🧩 RouxCraft - Visual Roux Method Cheat Sheet & Cube Studio

**RouxCraft** là ứng dụng web cao cấp, chuyên nghiệp dành cho người học và luyện tập giải Rubik 3x3 theo **phương pháp Roux (Roux Method)**. Ứng dụng cung cấp đầy đủ công cụ vẽ lại khối Rubik, ghi chú công thức, xem hoạt ảnh 3D từng bước và xuất ra tờ hướng dẫn giải chuẩn A4 (PDF hoặc ảnh PNG) để bàn hoặc dán tường.

---

## 🚀 Cách Khởi Động Nhanh

Bạn có thể sử dụng RouxCraft theo bất kỳ cách nào dưới đây:

### Cách 1: Nhấp đúp vào `start.bat` (Khuyên dùng)
- Chỉ cần nhấp đúp vào file **`start.bat`** trong thư mục này.
- Trình duyệt sẽ tự động mở trang web tại địa chỉ: `http://localhost:8080/index.html`.

### Cách 2: Mở trực tiếp `index.html`
- Nhấp đúp trực tiếp vào file **`index.html`** để mở bằng Chrome, Edge, Firefox, Cốc Cốc hoặc Safari.
- Ứng dụng đã được tích hợp đầy đủ thư viện offline trong thư mục `vendor/`, **chạy 100% không cần kết nối internet!**

### Cách 3: Chạy qua Python
```bash
python server.py
```

---

## 🌟 Các Tính Năng Nổi Bật

### 1. Tờ Hướng Dẫn Giải Trực Quan (Visual Cheat Sheet)
- **Cấu trúc 4 giai đoạn chuẩn mực của Roux Method**:
  1. **First Block (FB)**: Xây dựng khối 1x2x3 bên trái (Trắng - Xanh dương). Giải tự do, không xoay khối (rotationless), không cần căn tâm.
  2. **Second Block (SB)**: Xây dựng khối 1x2x3 bên phải (Trắng - Xanh lá). Chỉ dùng nhóm bước xoay `<r, R, U, M>` để không làm hỏng First Block bên trái.
  3. **CMLL (Corners of Last Layer)**: Định hướng và hoán vị 4 góc tầng cuối cùng một lúc (bao gồm các nhóm T, U, Sune, Anti-Sune, L, Pi, H).
  4. **LSE (Last Six Edges)**: Giải 6 cạnh cuối cùng:
     - **4a: EO**: Đếm bad edges (0, 2, 4, 6) và lật cạnh bằng `M' U M`.
     - **4b: UL/UR**: Đưa 2 cạnh đỉnh trái và phải về đúng vị trí.
     - **4c: EP**: Hoán vị 4 cạnh M-slice bằng các công thức huyền thoại như `M2 U2 M2 U2` (Dots) hoặc `M2 U2 M2`.
- Mỗi trường hợp (Case Card) hiển thị:
  - **Hình vẽ Rubik sắc nét (SVG vector)**: Có tô màu sticker và làm mờ các viên không liên quan để bạn tập trung cao độ.
  - **Mũi tên chỉ hướng**: Thể hiện trực quan hoán vị góc hoặc cạnh.
  - **Công thức chuẩn (Algorithm)**: Font monospace dễ nhìn kèm nút **Copy 1-chạm**.
  - **Nhận diện & Cần làm gì**: Hướng dẫn chi tiết đặc điểm nhận diện và thao tác giải quyết.
  - **Mẹo ngón tay (Finger-tricks)**: Ghi chú trigger, sexy move, sledgehammer...

---

### 2. Xưởng Vẽ Rubik & Thêm Case Tự Tạo (Cube Studio & Draw Lab)
- **Tô màu sticker trực quan**:
  - Chọn màu từ bảng màu (Vàng, Trắng, Đỏ, Cam, Xanh dương, Xanh lá, Xám Dimmed, Đen).
  - Nhấp chuột trực tiếp lên các ô của khối Rubik để tô màu.
- **Nút Preset Mask 1-Click dành riêng cho Roux**:
  - `Mask First Block`: Tự động làm xám mọi viên, chỉ giữ sáng khối 1x2x3 bên trái.
  - `Mask Second Block`: Giữ sáng cả 2 khối bên trái và bên phải.
  - `Mask CMLL`: Tầng 1 và 2 làm xám, chỉ nổi bật 4 góc tầng U.
  - `Mask CMLL Top Only`: Chuẩn góc nhìn CMLL thi đấu.
  - `Mask LSE`: Tập trung 6 cạnh cuối cùng.
  - `Khối Đã Giải`: Trả về trạng thái Rubik 6 màu hoàn chỉnh.
  - `Xám Toàn Bộ`: Xóa sạch màu về xám để tự vẽ từ đầu.
- **4 Chế độ góc nhìn**:
  - **3D U-F-R**: Góc nhìn phối cảnh 3 mặt U-F-R với hiệu ứng ánh sáng nổi khối.
  - **3D U-F-L**: Góc nhìn tối ưu hóa cho First Block (nhìn rõ khối bên trái).
  - **Top-Down (CMLL/EO)**: Nhìn thẳng từ trên mặt U xuống, có dải viền cạnh xung quanh (chuẩn sách cẩm nang thế giới).
  - **Trải phẳng 2D**: Trải phẳng cả 6 mặt hình chữ thập để kiểm tra toàn diện 54 ô.
- **Vẽ Mũi Tên Chỉ Dẫn**: Thêm mũi tên hoán vị (Corner swap, Edge cycle) trên mặt khối.
- **Bộ giả lập thuật toán (Simulator)**:
  - Nhập công thức (VD: `r U R' U' r' R U R U' R'` hoặc `M' U M`) và bấm **Xoay Thử** để khối Rubik tự biến đổi.
  - Bấm **Nghịch Đảo (Scramble)** để tạo trạng thái xáo trộn cho bạn luyện tập giải lại.
- **Lưu vào Sheet**: Lưu trường hợp bạn vừa vẽ vào ngay Tờ hướng dẫn giải để ôn tập.

---

### 3. Đồng Hồ Bấm Giờ & Bộ Giải Roux Thuần Túy (Speedcubing Timer & Pure Roux Solver)
- **Đồng hồ bấm giờ thi đấu chuyên nghiệp**:
  - Hỗ trợ giữ phím Spacebar để đếm ngược sẵn sàng (đổi màu xanh lục khi sẵn sàng).
  - Tự động thống kê: Best Time, Ao5 (Average of 5), Ao12 (Average of 12) và bảng lịch sử giải chi tiết.
- **Chế độ Luyện Tập Theo Từng Giai Đoạn Roux (Roux Training Scrambles)**:
  - **WCA 3x3**: Scramble chuẩn 21 bước thi đấu thế giới.
  - **First 2 Blocks (F2B)**: Luyện tập ghép khối 1x2x3 hai bên.
  - **CMLL (4 Góc Tầng Cuối)**: Giữ nguyên 2 khối F2B đã giải, chỉ xáo trộn 4 góc tầng U để luyện nhận diện 42 công thức CMLL.
  - **LSE (6 Cạnh Cuối)**: Scramble tạo ra CHỈ gồm các bước xoay lát cắt `<M, U>`, giúp rèn luyện khả năng đếm bad edges và finger-trick M-slice siêu tốc!
- **Bộ Giải Thuần Túy Phương Pháp Roux (Pure Roux IDDFS & BFS Solver Engine)**:
  - Bấm nút **"Xem Lời Giải Roux"** trên bất kỳ scramble nào:
    - **Bước 1: First Block (FB)**: Xây dựng khối 1x2x3 bên trái (DL line + FL/BL pairs) bằng STM.
    - **Bước 2: Second Block (SB)**: Xây dựng khối 1x2x3 bên phải **TUÂN THỦ NGHIÊM NGẶT `<r, R, U, M>`** để không bao giờ phá vỡ First Block!
    - **Bước 3: CMLL**: Nhận diện trường hợp và giải bằng công thức Roux CMLL chuẩn xác.
    - **Bước 4: LSE (Last Six Edges)**: Giải 6 cạnh cuối **CHỈ DÙNG DUY NHẤT CÁC BƯỚC `<M, U>`**!
  - Bấm **"Xem Hoạt Ảnh 3D Xoay Giải Khối Này"** để xem trực tiếp khối Rubik tự vặn từng lát cắt từ trạng thái xáo trộn về trạng thái hoàn thành 100%.

---

### 4. Trình Chiếu Mô Phỏng Vật Lý 3D (Physical 3D Slice Simulation)
- Mô hình Rubik 3D thật cấu thành từ 26 viên khối vật lý độc lập (cubies) chuyển động trong không gian 3 chiều (`transform-style: preserve-3d`).
- Khi xoay các lát cắt `U, D, L, R, F, B, M, r...`, cả 9 viên liên quan được gom vào một nhóm xoay vật lý (`rotating-slice-group`), tạo cảm giác vặn Rubik thật 100%, không bị hiệu ứng trượt đổi màu giả tạo.
- **Thanh tua bước tương tác (Interactive Scrubber Bar)**: Kéo thanh trượt hoặc nhấp trực tiếp vào bất kỳ bước xoay nào trên dải công thức để tua nhanh/chậm tức thì.
- **Khởi tạo đúng trạng thái cần giải (Pre-solve Setup)**: Khối Rubik 3D bắt đầu ở trạng thái xáo trộn/chưa giải, khi chạy thuật toán sẽ biến đổi từng bước đưa khối về trạng thái giải hoàn chỉnh 100% kèm âm thanh chuông mừng chiến thắng.

---

### 5. Xuất File PDF & Ảnh Poster Chất Lượng Cao
- **Xuất PDF (A4)**:
  - Bấm nút **"Xuất PDF (A4)"** (hoặc `Ctrl + P`).
  - Hệ thống sử dụng stylesheet in ấn chuyên nghiệp: tự động chuyển nền trắng tiết kiệm mực, ẩn thanh công cụ, chia trang thông minh (`page-break`) không làm đứt đôi thẻ case. Bạn có thể chọn "Save as PDF" để lưu file PDF hoặc in trực tiếp ra giấy kẹp bàn học.
- **Xuất Ảnh Poster**:
  - Bấm nút **"Xuất Ảnh Poster"** để xuất toàn bộ tờ hướng dẫn thành một bức ảnh PNG độ nét cao (2K) để lưu trong điện thoại tra cứu mọi lúc.
- **Tải riêng ảnh từng khối Rubik**:
  - Mỗi thẻ case đều có nút **"Ảnh"** để tải riêng hình SVG/PNG của khối đó (dùng chèn vào Word, slide hoặc Anki flashcards).

---

### 6. Sao Lưu & Phục Hồi Dữ Liệu
- Toàn bộ dữ liệu bạn tạo được lưu tự động vào `localStorage` của trình duyệt.
- Nút **Sao lưu JSON**: Tải file `.json` về máy để lưu trữ an toàn hoặc chuyển sang máy tính khác.
- Nút **Nạp JSON**: Chọn file `.json` để khôi phục toàn bộ các case đã vẽ.

---

Chúc bạn có những giờ phút luyện tập Rubik phương pháp Roux thật hiệu quả và đạt sub-20, sub-15 nhanh chóng! 🚀
