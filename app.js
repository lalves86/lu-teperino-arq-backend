require('dotenv/config');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const authMiddleware = require('./middlewares/auth');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const etapasRouter = require('./routes/etapas');
const orcamentosRouter = require('./routes/orcamentos');
const sessionRouter = require('./routes/session');
const cadastroRouter = require('./routes/cadastro');
const projetoRouter = require('./routes/projetos');
const arquivosRouter = require('./routes/arquivos');
const pagamentosRouter = require('./routes/pagamentos');

const app = express();
const mongodb =
  'mongodb+srv://lalves86:p3SXGK6PBUHCGuBL@cluster0-sammj.mongodb.net/lu-teperino-arq?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true';

mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rotas públicas
app.use('/login', sessionRouter);
app.use('/cadastro', cadastroRouter);
app.use('/', indexRouter);
// Middleware de autenticação
app.use(authMiddleware.authHeader);

// Rotas que exigem validação
app.use('/projetos', projetoRouter);
app.use('/usuarios', usersRouter);
app.use('/etapas', etapasRouter);
app.use('/orcamentos', orcamentosRouter);
app.use('/arquivos', arquivosRouter);
app.use('/pagamentos', pagamentosRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
