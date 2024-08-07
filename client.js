const grpc=require("@grpc/grpc-js");
const protoLoader=require("@grpc/proto-loader");
const packageDef=protoLoader.loadSync("todo.proto",{})
const grpcObject=grpc.loadPackageDefinition(packageDef);
const todopackage=grpcObject.todopackage;

const client=new todopackage.Todo("0.0.0.0:40000",
    grpc.credentials.createInsecure()
)


client.createTodo({
    "id":-1,
    "text":"Do Lauandary"
},(err,response)=>{
    if(err) console.log(err);
    
    console.log("Recieved from server " + JSON.stringify(response))
});


client.readTodos({},
    (err,response)=>{
        console.log("Recieved from server " + JSON.stringify(response)) 
    }
)


