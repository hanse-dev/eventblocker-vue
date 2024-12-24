const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const logFile = path.join(logsDir, 'app.log');

function formatMessage(level, message, data) {
    const timestamp = new Date().toISOString();
    const dataStr = data ? `\n${JSON.stringify(data, null, 2)}` : '';
    return `[${timestamp}] ${level}: ${message}${dataStr}\n`;
}

function writeToLog(message) {
    fs.appendFileSync(logFile, message);
}

const logger = {
    info: (message, data) => {
        const logMessage = formatMessage('INFO', message, data);
        console.log(logMessage);
        writeToLog(logMessage);
    },
    
    error: (message, error) => {
        const errorData = {
            message: error.message,
            stack: error.stack,
            ...(error.meta && { meta: error.meta }),
        };
        const logMessage = formatMessage('ERROR', message, errorData);
        console.error(logMessage);
        writeToLog(logMessage);
    },
    
    debug: (message, data) => {
        const logMessage = formatMessage('DEBUG', message, data);
        console.debug(logMessage);
        writeToLog(logMessage);
    },

    // Get the full path to the log file
    getLogPath: () => logFile
};

module.exports = logger;
