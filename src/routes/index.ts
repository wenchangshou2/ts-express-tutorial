import mongoose = require("mongoose")
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { IUser } from "../interfaces/user"
import { User, UserModel } from "../models/user"



/**
 * / route
 *
 * @class User
 */
export class IndexRoute extends BaseRoute {
  private data: IUser;
  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[IndexRoute::create] Creating index route.");

    //add home page route
    // router.get("/", (req: Request, res: Response, next: NextFunction) => {
    //   new IndexRoute().index(req, res, next);
    // });
    const user=new User({
    })
    user.save(function (data) {
      console.log('fff');
    })

    router.get('/users',(req:Request,res:Response,next:NextFunction)=>{
      new IndexRoute().showUser(req, res, next);
    })
  }

  /** * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
    this.data = {
      email: "wenchangshou@bar.com",
      firstName: "Brian",
      lastName: "Love"
    };
  }
  public showUser(req:Request,res:Response,next:NextFunction){
    //set custom title
    // let user = new User(this.data)
    // user.save().then(function(data){
    //   console.log('ffffff');
    // })
    const user=new User(this.data)
    // user.save().then(user=>{
    //   res.json(user.toObject())
    //   next()
    // }).catch(next)
    User.find().then(users=>{
      res.json(users.map(user=>user.toObject()))
      next()
    })


  }
  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Home | Tour of Heros";

    //set options
    let options: Object = {
      "message": "Welcome to the Tour of Heros"
    };
    //render template
    this.render(req, res, "index", options);
  }
}
