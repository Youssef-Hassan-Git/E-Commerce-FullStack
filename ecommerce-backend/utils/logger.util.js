const {createLogger, format, transports} = require("winston");
// const { stack } = require("../routes/auth.route");

const logger = createLogger({
    level: process.env.Node_ENV === "production" ? "info" : "debug",
    format: format.combine(
        format.timestamp({format: 'YYYY/MM/DD HH:mm:ss'}),
        format.errors({stack:true}),
        format.printf(({ timestamp, level, message, stack })=>{
            return `${timestamp} | ${level.toUpperCase()} | ${message} ${stack ?  `\n${stack}`: ''}`
        }) 
    ),
    transports:[
        new transports.Console(),
        new transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),
            new transports.File({
                filename: 'logs/combined.log',
            })
    ]
})

module.exports = logger;