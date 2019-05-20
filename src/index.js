require('dotenv').config();

const mongoose = require('mongoose');
const {
    PORT : port = 4000, // 기본포트 4000 
    MONGO_URI : mongoURI
} = process.env;

mongoose.Promise = global.Promise; //Node의 Promise를 사용하도록 설정
mongoose.connect(mongoURI).then(()=>{
    console.log('connected to mongodb');
}).catch((e) => {
    console.error(e);
});



const Koa = require('koa'); //미들웨어의 배열로 구성되어있음
const Router = require('koa-router'); 
const bodyParser = require('koa-bodyparser');

const api = require('./api');

const app = new Koa();
const router = new Router();

//라우터 설정
router.use('/api', api.routes()); //api 라우트 적용

//라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log('listening to port' , port)
})