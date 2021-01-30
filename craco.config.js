const path = require("path");

module.exports = {

    webpack: {

        alias: {
            "@classes": path.resolve(__dirname, "src/classes/"),
            "@components": path.resolve(__dirname, "src/components/"),
            "@fonts": path.resolve(__dirname, "src/fonts/"),
            "@hooks": path.resolve(__dirname, "src/state/hooks"),
            "@images": path.resolve(__dirname, "src/images/"),
            "@reducers": path.resolve(__dirname, "src/state/reducers/"),
            "@styles": path.resolve(__dirname, "src/styles/"),
            "@utils": path.resolve(__dirname, "src/utils/")
        }

    }

};
