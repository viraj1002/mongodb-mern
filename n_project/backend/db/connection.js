const M=require('mongoose')
M.connect('mongodb+srv://vriajvgund:JDAUxQAnBCDnTsql@cluster1.91z5ieh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')
.then( ()=>{
    console.log("server is connected to database")
})
.catch( ()=>{
    console.log("database is not connected")
})
