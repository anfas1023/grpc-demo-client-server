const grpc=require("@grpc/grpc-js");
const protoLoader=require("@grpc/proto-loader");
const packageDef=protoLoader.loadSync("todo.proto",{})
const grpcObject=grpc.loadPackageDefinition(packageDef);
const todopackage=grpcObject.todopackage;


const server=new grpc.Server();
server.addService(todopackage.Todo.service, {
    "createTodo": createTodo,
    "readTodos": readTodos
  });
  
  // Bind the server to port 40000 and start it
  server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error("eee",err);
      return;
    }
    console.log(`Server running at http://0.0.0.0:40000`);
    server.start();
  });


const todos=[];


function createTodo(call,callback){
    // console.log("dfwe",call,call.request);
 const todoItem={
"id":todos.length+1,
"text":call.request.text
    }
    todos.push(todoItem)
    callback(null, todoItem);
}

function readTodos(call,callback){
    // console.log("ewdwe",call);
    callback(null,{"items":todos})
}