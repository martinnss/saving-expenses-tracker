const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "process": require.resolve("process/browser"),
      "fs": false,

      "child_process": false,

      
    },
  },
};
