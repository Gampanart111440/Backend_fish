require('tls').DEFAULT_MIN_VERSION = 'TLSv1'
const soap = require('soap');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const url = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';

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
        'fish_detail': 'ปลาสลาด หรือ ปลาฉลาด เป็นปลาน้ำจืดชนิดหนึ่ง มีชื่อวิทยาศาสตร์ว่า Notopterus notopterus อยู่ในวงศ์ปลากราย มีปากกว้างไม่เกินลูกตาเหมือนปลาในวงศ์นี้ชนิดอื่น ๆ พื้นลำตัวมีสีเรียบ ยกเว้นปลาวัยอ่อนจะมีลายบั้งเหมือนปลากราย วัยอ่อน จมูกมีสองคู่ คู่หน้ายื่นออกมาคล้ายหลอดหรือหนวด',
        'like': 0
    },
    {
        'id': 0,
        'local_name': 'ป๋ามะแปบ',
        'common_name': 'ปลาน้ำหมึก',
        'scientific_name': 'Opsarius sp.',
        'image': 'https://upload.wikimedia.org/wikipedia/commons/f/fb/OP2.jpg',
        'fish_detail': 'ปลาน้ำหมึก เป็นปลาน้ำจืดชนิดหนึ่ง มีชื่อวิทยาศาสตร์ว่า Opsarius pulchellus อยู่ในวงศ์ปลาตะเพียน รูปร่างคล้ายปลาน้ำหมึกโคราช ซึ่งเป็นปลาในสกุลเดียวกัน ต่างกันที่น้ำหมึกมีลำตัวที่ป้อมสั้นกว่า ปลายปากป้าน มีสีสันที่สดใสกว่าและลายขีดข้างลำตัวใหญ่และชัดเจนกว่า เกล็ดมีขนาดใหญ่กว่า ครีบหลังมีแต้มสีแดงเห็นชัดเจน',
        'like': 0
    },
]

app.post('/login', (req, res) => {
    soap.createClient(url, (err, client) => {
        if (err) console.error(err);
        else {
            let user = {}
            user.username = req.body.username
            user.password = req.body.password
            client.GetStudentDetails(user, function (err, response) {
                if (err) console.error(err);
                else {
                    res.send(response);
                }
            });
        }
    });
})

app.get("/datafish", (req, res) => {
    res.json(data_fishs)
});

app.get('/datafish/:id', (req, res) => {
    let id = req.params.id
    let data_fish = data_fishs.find(p => (p.id === +id))
    res.json(data_fish);
})

app.post('/fish', (req, res) => {
    var data_fish = {}
    data_fish.id = data_fishs.length > 0 ? data_fishs[0].id + 1 : 0
    data_fish.local_name = req.body.local_name
    data_fish.common_name = req.body.common_name
    data_fish.scientific_name = req.body.scientific_name
    data_fish.image = req.body.image
    data_fish.fish_detail = req.body.fish_detail
    data_fish.like = req.body.like
    data_fishs.unshift(data_fish)
    res.json({ message: "Successfully" })
})

app.put('/update/:id_fish', (req, res) => {
    let id = req.params.id_fish
    let idx = data_fishs.findIndex(p => (p.id === +id))
    data_fishs[idx].local_name = req.body.local_name
    data_fishs[idx].common_name = req.body.common_name
    data_fishs[idx].scientific_name = req.body.scientific_name
    data_fishs[idx].image = req.body.image
    data_fishs[idx].fish_detail = req.body.fish_detail
    data_fishs[idx].like = req.body.like
    res.json({ message: 'Data fish updated! id: ' + req.params.id_fish });
})

app.delete('/delete/:id_fish', (req, res) => {
    let id = req.params.id_fish
    let idx = data_fishs.findIndex(p => p.id === +id)
    data_fishs.splice(idx, 1)
    res.json({ message: 'Data fish deleted! id: ' + req.params.id_fish });
})

app.use("*", (req, res) => res.status(404).send('404 Not found'));

const server = app.listen(app.get("port"), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});