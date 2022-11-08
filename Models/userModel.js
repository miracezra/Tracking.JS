// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const userSchema = new Schema(
//   {
//     userToken: {
//       type: String,
//       required: true,
//     },
//     userIPV4: {
//       type: String,
//       required: false,
//     },
//     userLocationInfo: {
//       userLocation: {
//         type: Object,
//         required: false,
//       },
//       userContinent: {
//         type: Object,
//         required: false,
//       },
//       userCompany: {
//         type: Object,
//         required: false,
//       },
//       userCurrency: {
//         type: Object,
//         required: false,
//       },
//       userCountryInfo: {
//         type: Object,
//         required: false,
//       },
//     },
//     userAgent: {
//       operationSystem: {
//         type: Object,
//         required: false,
//       },
//       browser: {
//         type: Object,
//         required: false,
//       },
//     },
//     news: {
//       Url: {
//         type: String,
//         required: false,
//       },

//       Title: {
//         type: String,
//         required: false,
//       },

//       Category: {
//         type: String,
//         required: false,
//       },
//       Subcategory: {
//         type: String,
//         required: false,
//       },
//     },
//     clickTime: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model("User", userSchema);

// module.exports = User;


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    userToken: {
      type: String,
      required: true,
    },
    userIPV4: {
      type: String,
      required: false,
    },
    userLocationInfo: {
      userLocation: {
        type: Object,
        required: false,
      },
      userContinent: {
        type: Object,
        required: false,
      },
      userCompany: {
        type: Object,
        required: false,
      },
      userCurrency: {
        type: Object,
        required: false,
      },
      userCountryInfo: {
        type: Object,
        required: false
      }
    },
    userAgent: {
      operationSystem: {
        type: Object,
        required: false,
      },
      browser: {
        type: Object,
        required: false,
      },
    },
    referrer: {
      type: String,
      required: false,
    },
    clickTime: {
      type: String,
      required: false,
    },
    news: {
      Url: {
        type: String,
        required: false,
      },
      Title: {
        type: String,
        required: false,
      },
      Category: {
        type: String,
        required: false,
      },
      Subcategory: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;