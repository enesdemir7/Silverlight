const express = require("express");
const app = express();
const cors = require("cors");
const Wappalyzer = require('wappalyzer');




  const options = {
    debug: false,
    delay: 500,
    headers: {},
    maxDepth: 3,
    maxUrls: 10,
    maxWait: 5000,
    recursive: true,
    probe: true,
    proxy: false,
    userAgent: 'Wappalyzer',
    htmlMaxCols: 2000,
    htmlMaxRows: 2000,
    noScripts: false,
    noRedirect: false,
  };

    const wappalyzer = new Wappalyzer(options);

    async function analyzingUrl(url) {
    try {
        await wappalyzer.init()

        // Optionally set additional request headers
        const headers = {}

        const site = await wappalyzer.open(url, headers)

        // Optionally capture and output errors
        site.on('error', console.error)

        const results = await site.analyze()
      //  let tek = JSON.stringify(results.technologies, null, 2)
        let techs = results.technologies;
       // console.log(tek[0].name);
        
        techs.forEach(element => {
          console.log(element.name);
        });
        console.log(results);
        
        await wappalyzer.destroy()
        return results;
    } catch (error) {
        console.error(error)
    }

  
   
    }

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions));


app.use(express.urlencoded()); 
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello.");
});


app.post("/post", async (req, res) => {
    console.log(req.body.url);
    const results = await analyzingUrl(req.body.url);
    //let techs = results.technologies;
    res.send(results);
});



const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
