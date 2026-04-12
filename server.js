
import app from './src/app.js'

const PORT=process.env.PORT || 5000

const start=async()=>{
    //connect to db
    app.listen(PORT,()=>{
        console.log(`Server is running at ${PORT}`);      
    })
}

start().catch((err)=>{
    console.error(err);
    process.exit(1)
})
