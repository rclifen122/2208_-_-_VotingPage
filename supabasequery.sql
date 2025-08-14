-- Create the table for restaurants
CREATE TABLE restaurants (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  votes INT DEFAULT 0
);

-- Insert the initial restaurant data
INSERT INTO restaurants (id, name, votes) VALUES
(1, 'Pink Pong Buffet', 0),
(2, 'Yaki Yaki Yo - Buffet băng chuyền Nướng', 0),
(3, 'PANDA BBQ', 0),
(4, 'Hải sản Xóm Chài', 0),
(5, 'Tiệm Bia Leng Keng - 351 Tây Thạnh', 0),
(6, 'Bia Hơi Hà Nội Một Không Hai', 0),
(7, 'Buffet Bếp Nhà 168k - Lẩu Nướng Bò Hải Sản', 0);
