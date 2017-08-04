import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser"
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as cors from "cors";
import errorHandler = require("errorhandler")
import methodOverride = require("method-override")
import mongoose = require("mongoose")
import { IndexRoute } from "./routes/index";
import { IUser } from './interfaces/user'
import { IModel } from './models/model'
import { IUserModel } from "./models/user"
import { userSchema } from './schemas/user'


export class Server {
    public app: express.Application
    private model: IModel;
    public static bootstrap(): Server {
        return new Server()
    }
    constructor() {
        this.model = Object()
        this.app = express()
        this.config()
        this.routes()
        this.api()
    }
    public api() {

    }
    public config() {
        console.log();
        const MONGODB_CONNECTION: string = "mongodb://localhost:27017/wcs"
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");
        this.app.use(logger("dev"))
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }))
        this.app.use(cookieParser("SECRET_GOES_HERE"))
        this.app.use(methodOverride())
        global.Promise = require("q").Promise
        mongoose.Promise = global.Promise
        let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

        this.model.user = connection.model("User", userSchema);


        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404
            next(err)
        })
        this.app.use(errorHandler());
    }
    private routes() {
        let router: express.Router
        router = express.Router()
        const corsOptions: cors.CorsOptions = {
            allowedHeaders: [ "Origin","X-Requested-With","Content-Type","Accept","X-Access-Token"],
            credentials: true,
            methods:"GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin:"http://ocalhost:8080",
            preflightContinue:false
        };
        router.use(cors(corsOptions))
        router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.json({ announcement: "welcome to our API." });
        })
        // var index: indexRoute.Index = new indexRoute.Index()
        IndexRoute.create(router)
        this.app.use('/api', router)
        router.options("*", cors(corsOptions))
    }
}