const express=require("express");
const app=express();
const searchRoutes=require("./api/search");
const coverRoutes=require("./api/cover");
const feedRoutes=require("./api/feed");
const bookRoutes=require("./api/book");
const ebookRoutes=require("./api/getEbook");
const getRedirectedRoutes=require("./api/getRedirected");
const genresRoutes=require("./api/genres");
const morgan=require("morgan");
const parser=require("body-parser");
app.use(morgan("dev"));
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");
    if(req.method=="OPTIONS"){
        res.header("Access-Control-Allow-Methods","*");
        return res.status(200).json({});   
    }
    next()
})
app.use("/search",searchRoutes);
app.use("/cover",coverRoutes);
app.use("/ebook",ebookRoutes);
app.use("/book",bookRoutes);
app.use("/redirected",getRedirectedRoutes);
app.use("/feed",feedRoutes);
app.use("/genres",genresRoutes);

app.use("/",(res,req,next)=>{

    GoogleImageSearch.searchImage("cats")
.then((res) => {
    console.log(res); // This will return array of image URLs
})
});

app.use((res,req,next)=>{
 const error=new Error("Not Found");
 error.status=404;
 next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({message:error.message});
   });

module.exports=app;