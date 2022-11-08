const User = require("../Models/userModel");
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
var filter = require("underscore");
var json = require("../datas/countryClassification.json")

exports.create = async (req, res) => {
    console.log(req.body)
    var time = new Date();
    console.log(time.getTime())
    var havekey;
    //User Browser
    var { browser: userBrowser } = req.body;
    userBrowser = {
        userBrowser: userBrowser,
    }
    //User Token Check and/or Set
    havekey = req.body.userKey
    if (req.body.userKey == "" || !req.body.userKey) {
        var key = uuidv4();
    }
    //User Click Time
    const clickTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    //Get User IP
    await axios.get("https://api.ipify.org/?format=json").then((result) => {
        userIPV4 = result.data.ip;
    });
    //Get User Location
    var currency, company, continent, callingCode, location, classification = {}
    var country;
    await axios
        .get(`https://api.ipregistry.co/${userIPV4}?key=27rn3tacmk6purui`)
        .then((result) => {
            const { domain: companyDomain, name: companyName, type: companyType } = result.data.company
            const { name: curencyName, code: currencyCode, symbol_native: currencySymbol } = result.data.currency
            const { code: ContinentCode, name: ContinentName } = result.data.location.continent
            const { calling_code: countryCallingCode, capital: countryCapital } = result.data.location.country
            const { code: cityCode, name: cityName } = result.data.location.region //şehir no 34 ve istanbul
            const userPostalCode = result.data.location.postal;
            const userLocationLatitude = result.data.location.latitude;
            const userLocationLongitude = result.data.location.longitude;
            const countryTime = result.data.time_zone.current_time;
            country = result.data.location.country.name;
            const filtered = filter.where(json, { country: `${country}` });
            const { country: userCountry, humanDevelopmentIndex: classinfo, pop2022: countryPopulation } = filtered[0]
            classification = {
                rating: classinfo,
                population: countryPopulation
            }
            company = {
                company_Domain: companyDomain, //sabah.com.tr
                company_Name: companyName, //Turkuvaz Haberlesme Ve Yayincilik A.S
                company_Type: companyType, //"business"
            };
            currency = {
                currency_name: curencyName, //"Turkish Lira"
                currency_code: currencyCode, //"TRY"
                currency_symbol: currencySymbol, //"₺"
            };
            continent = {
                ContinentCode: ContinentCode, //"EU"
                ContinentName: ContinentName, //"Europe"
            };
            location = {
                city: cityName, //City İstanbul
                cityCode: cityCode, //City Code 34
                postalCode: userPostalCode, //Postal Code 35332
                locationLatitude: userLocationLatitude, //Location coordinate 
                locationLongitude: userLocationLongitude, //Location coordinate 
            }
            callingCode = {
                country: userCountry,
                callingCode: countryCallingCode,  // 90
                Capital: countryCapital, //Ankara
                countryTime: countryTime, // Country Time
                classification
                //*Bu şekilde Kategorilendir*// 
                // 1-0.80       Çok İyi 
                // 0.79-0.60    İyi
                // 0.59-0.50    Orta
                // 4.99-4.00    Kötü
                // 3.99-0       Çok Kötü
            };
        });

    //User UA 
    var ua = req.headers['user-agent']
    $ = {};
    if (/mobile/i.test(ua)) {
        $.Mobile = true;
    }
    if (/like Mac OS X/.test(ua)) {
        $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
        $.iPhone = /iPhone/.test(ua);
        $.iPad = /iPad/.test(ua);
    }
    if (/Android/.test(ua)) {
        $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];
    }
    if (/webOS\//.test(ua)) {
        $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];
    }
    if (/(Intel|PPC) Mac OS X/.test(ua)) {
        $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;
    }
    if (/Windows NT/.test(ua)) {
        $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];
    }

    //user Referrer
    let whoReferrer = req.body.referrer;


    const newUser = new User({
        userToken: havekey == "" ? key : havekey,
        userIPV4: userIPV4,
        referrer: whoReferrer,
        userLocationInfo: {
            userLocation: location,
            userContinent: continent,
            userCompany: company,
            userCurrency: currency,
            userCountryInfo: callingCode,
        },
        userAgent: {
            operationSystem: $,
            browser: userBrowser,
        },

        clickTime: clickTime,
        news: {
            Url: req.body.url,
            Title: req.body.title,
            Category: req.body.category,
            Subcategory: req.body.subCategory,
        }
        // news: {

        //     /*
        //                 Url: fullurl,
        //                 Title: newsTitle,
        //                 Category: category,
        //                 Subcategory: subcategory,
        //                 browser: userBrowser,
        //                 userKey: localStorage.getItem("userKey") ? localStorage.getItem("userKey") : "",
        //                 category: category
        //      */
        //     Url: req.body.Url,
        //     Title: req.body.Title,
        //     Category: req.body.Category,
        //     Subcategory: req.body.Subcategory,
        // }
    });
    //Save on mongodb area
    newUser
        .save()

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.status(200).json({
        success: true,
        message: "çalışıyor",
        key: havekey ? havekey : key
    })
}
