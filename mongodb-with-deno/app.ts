import {Application, Router} from "https://deno.land/x/oak/mod.ts";
import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

console.log(typeof config().PORT);

await init();
const client = new MongoClient();
client.connectWithUri(config().DATABASE_URL);
const db = client.database("coursedb1");
const users = db.collection("users");


// const insertId = await users.insertOne({
//     courseName:"Javascript",
//     duration:3
//   });

export const getUsers = async ({request , response }:{request:any , response:any})=>{
    const user = await users.find({});
    response.body = user
}

export const addUser =async ({request , response }:{request:any , response:any})=>{
    const body = await request.body()
    const userss = body.value
    console.log(userss);
    const user = await users.insertOne(userss);
    response.body = user
}

export const getUser =async ({request , response , params }:{request:any , response:any , params:any})=>{
    // console.log(params.id);
   const user1 = await users.findOne({ _id:{ $oid: params.id }});
//    console.log(user1);  
    response.body = user1
}

export const updateUser =async ({request , response , params }:{request:any , response:any , params:any})=>{
   const body = await request.body()
   console.log(body.value);
   const user1 = await users.findOne({ _id:{ $oid: params.id }});
   //updateOne(matchedCount, modifiedCount, upsertedId)
   const updatedUser = await users.updateOne(user1 , {$set:body.value} );
   console.log(updatedUser)
   response.body = updatedUser
}

export const deleteUser = async({request , response , params }: {request:any , response:any, params:any })=>{
    const deleteCount = await users.deleteOne({ _id: { $oid: params.id} });
    response.body = deleteCount  // 1 means data deleted successfully
}

const router = new Router()

router
.get("/",getUsers)
.post("/course",addUser)
.get("/course/:id", getUser)
.put("/course/:id", updateUser)
.delete("/course/:id",deleteUser)

const app = new Application()
app.use(router.routes());
app.use(router.allowedMethods());
console.log(`http://localhost:3000`);

await app.listen({
    port: parseInt(config().PORT)
});
