require('tls').DEFAULT_MIN_VERSION = 'TLSv1'
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 6969);

let data_fishs = [
    {
        'id': 1,
        'local_name': 'ป๋าต๋อง',
        'common_name': 'ปลาสลาด',
        'scientific_name': 'Notopterus notopterus',
        'image': 'https://4.bp.blogspot.com/-B5lNXtPJ288/TfCR7x8GuiI/AAAAAAAAAwo/5GAPVYW0gLY/s400/Notopterus+notopterus+%2528FOLI%2529.jpg',
        'fish_detail': 'ปลาสลาด หรือ ปลาฉลาด เป็นปลาน้ำจืดชนิดหนึ่ง มีชื่อวิทยาศาสตร์ว่า Notopterus notopterus อยู่ในวงศ์ปลากราย มีปากกว้างไม่เกินลูกตาเหมือนปลาในวงศ์นี้ชนิดอื่น ๆ พื้นลำตัวมีสีเรียบ ยกเว้นปลาวัยอ่อนจะมีลายบั้งเหมือนปลากราย วัยอ่อน จมูกมีสองคู่ คู่หน้ายื่นออกมาคล้ายหลอดหรือหนวด'
    },
    {
        'id': 0,
        'local_name': 'ป๋ามะแปบ',
        'common_name': 'ปลาน้ำหมึก',
        'scientific_name': 'Opsarius sp.',
        'image': 'https://upload.wikimedia.org/wikipedia/commons/f/fb/OP2.jpg',
        'fish_detail': 'ลาน้ำหมึก เป็นปลาน้ำจืดชนิดหนึ่ง มีชื่อวิทยาศาสตร์ว่า Opsarius pulchellus อยู่ในวงศ์ปลาตะเพียน รูปร่างคล้ายปลาน้ำหมึกโคราช ซึ่งเป็นปลาในสกุลเดียวกัน ต่างกันที่น้ำหมึกมีลำตัวที่ป้อมสั้นกว่า ปลายปากป้าน มีสีสันที่สดใสกว่าและลายขีดข้างลำตัวใหญ่และชัดเจนกว่า เกล็ดมีขนาดใหญ่กว่า ครีบหลังมีแต้มสีแดงเห็นชัดเจน'
    },
]

app.get("/datafish", (req, res) => {
    res.json(data_fishs)
});

app.use("*", (req, res) => res.status(404).send('404 Not found'));

const server = app.listen(app.get("port"), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});