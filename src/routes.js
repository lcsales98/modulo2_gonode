const express = require("express");
const routes = express.Router();
const multer_cfg = require("./config/multer");
const upload = require("multer")(multer_cfg);

const authMiddleware = require("./app/middlewares/auth");
const guestMiddleware = require("./app/middlewares/guest");

routes.use((req, res, next) => {
	res.locals.flashSuccess = req.flash("success");
	res.locals.flashError = req.flash("error");

	return next();
});

//define que todas as rotas que contenham '/app' usarão o middleware de autenticação
routes.use("/app", authMiddleware);

//controllers
const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const DashboardController = require("./app/controllers/DashboardController");
const FileController = require("./app/controllers/FileController");
const AgendamentoController = require("./app/controllers/AgendamentoController");

//rota generica para visualizar qualquer tipo de arquivo
routes.get("/files/:file", FileController.show);

//login
routes.get("/", guestMiddleware, SessionController.create);
routes.post("/signin", SessionController.store);

//signup routes
routes.get("/signup", guestMiddleware, UserController.create);
routes.post("/signup", upload.single("avatar"), UserController.store);

//app routes

//principal
routes.get("/app/dashboard", DashboardController.index);

//sair
routes.get("/app/logout", SessionController.destroy);

//agendar barbeiro
routes.get("/app/agendamentos/new/:provider", AgendamentoController.create);

module.exports = routes;
