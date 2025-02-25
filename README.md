# FutManagerFE - Ứng dụng đặt sân bóng đá

**FutManagerFE** là một ứng dụng di động được phát triển bằng React Native, giúp người dùng dễ dàng tìm kiếm, đặt sân bóng đá và quản lý lịch đặt sân của mình. Ứng dụng này kết nối với backend để lấy thông tin sân bóng, lịch đặt, và hỗ trợ thanh toán trực tuyến.

## Tính năng chính

- **Đăng ký/Đăng nhập**: Người dùng có thể tạo tài khoản và đăng nhập vào hệ thống.
- **Tìm kiếm sân bóng**: Người dùng có thể tìm kiếm sân bóng theo khu vực, thời gian, và loại sân.
- **Đặt sân**: Người dùng có thể đặt sân bóng và xem chi tiết thông tin sân.
- **Quản lý lịch đặt**: Người dùng có thể xem, hủy, hoặc chỉnh sửa lịch đặt sân của mình.
- **Thanh toán**: Hỗ trợ thanh toán trực tuyến thông qua các cổng thanh toán phổ biến.
- **Thông báo**: Người dùng nhận thông báo về trạng thái đặt sân, thanh toán, và các ưu đãi.

## Công nghệ sử dụng

- **Frontend**: React Native, React Navigation, Redux (hoặc Context API)
- **Backend**: (Kết nối với API từ backend) Node.js, Express.js, MongoDB (hoặc bất kỳ công nghệ nào bạn sử dụng)
- **Styling**: CSS-in-JS (Styled Components hoặc Emotion) hoặc một thư viện UI như React Native Paper
- **Authentication**: JWT (JSON Web Token) hoặc OAuth
- **API**: RESTful API hoặc GraphQL

## Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js (phiên bản 14.x trở lên)
- npm hoặc yarn
- React Native CLI hoặc Expo CLI (tùy thuộc vào cách bạn thiết lập dự án)

### Các bước cài đặt

1. **Clone dự án**:
   ```bash
   git clone https://github.com/tranlequocthong313/FutManagerFE.git
   cd FutManagerFE
   ```

2. **Cài đặt các dependencies**:
   ```bash
   npm install
   # hoặc
   yarn install
   ```

3. **Chạy dự án**:
   - Nếu sử dụng React Native CLI:
     ```bash
     npx react-native run-android
     # hoặc
     npx react-native run-ios
     ```
   - Nếu sử dụng Expo CLI:
     ```bash
     expo start
     ```

4. **Quét mã QR (nếu dùng Expo)**: Mở ứng dụng Expo Go trên điện thoại và quét mã QR để chạy ứng dụng.

### Cấu hình môi trường

Tạo file `.env` trong thư mục gốc của dự án và thêm các biến môi trường cần thiết (nếu có):

```env
API_URL=http://your-api-url.com
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## Cấu trúc thư mục

```
FutManagerFE/
├── assets/                  # Thư mục chứa hình ảnh, font, và các file tĩnh khác
├── src/                     # Source code chính
│   ├── components/          # Các component React Native
│   ├── screens/             # Các màn hình của ứng dụng
│   ├── navigation/          # Cấu hình React Navigation
│   ├── store/               # Redux store (quản lý state)
│   ├── services/            # Các service để gọi API
│   ├── styles/              # File CSS-in-JS hoặc global styles
│   ├── utils/               # Các hàm tiện ích
│   ├── App.js               # File khởi tạo ứng dụng
│   └── index.js             # File entry point
├── .env                     # File cấu hình môi trường
├── package.json             # Danh sách dependencies và scripts
└── README.md                # Tài liệu hướng dẫn
```

## API Endpoints

Dưới đây là một số API endpoints chính (kết nối với backend):

- **Authentication**:
  - `POST /api/auth/register` - Đăng ký người dùng mới.
  - `POST /api/auth/login` - Đăng nhập và nhận JWT token.
  - `POST /api/auth/logout` - Đăng xuất.

- **Quản lý sân bóng**:
  - `GET /api/fields` - Lấy danh sách sân bóng.
  - `GET /api/fields/{id}` - Lấy thông tin chi tiết của một sân bóng.
  - `POST /api/fields` - Thêm sân bóng mới (dành cho admin).
  - `PUT /api/fields/{id}` - Cập nhật thông tin sân bóng (dành cho admin).
  - `DELETE /api/fields/{id}` - Xóa sân bóng (dành cho admin).

- **Quản lý đặt sân**:
  - `GET /api/bookings` - Lấy danh sách lịch đặt sân của người dùng.
  - `POST /api/bookings` - Đặt sân bóng.
  - `PUT /api/bookings/{id}` - Cập nhật lịch đặt sân.
  - `DELETE /api/bookings/{id}` - Hủy lịch đặt sân.

- **Thanh toán**:
  - `POST /api/payments` - Tạo thanh toán cho lịch đặt sân.
  - `GET /api/payments/{id}` - Lấy thông tin chi tiết thanh toán.

## Đóng góp

Nếu bạn muốn đóng góp vào dự án, vui lòng làm theo các bước sau:

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/YourFeatureName`)
3. Commit các thay đổi (`git commit -m 'Add some feature'`)
4. Push lên branch (`git push origin feature/YourFeatureName`)
5. Mở một Pull Request

## Liên hệ

Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, vui lòng liên hệ:

- **Tên**: Trần Lê Quốc Thông
- **Email**: tranlequocthong313@gmail.com
- **GitHub**: [tranlequocthong313](https://github.com/tranlequocthong313)
