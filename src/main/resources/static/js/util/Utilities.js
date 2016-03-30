const split = require('lodash/split')
const isempty = require('lodash/isempty')
const trim = require('lodash/trim')
const sortby = require('lodash/sortby')
const remove = require('lodash/remove')

const Utilities =  {
    addUrlMonitor(urlMonitors, newUrlMonitor) {
        urlMonitors.push(newUrlMonitor)

        return urlMonitors
    },

    updateUrlMonitor(urlMonitors, newUrlMonitor) {
        // Remove the old URL Monitor
        urlMonitors = this.removeUrlMonitor(urlMonitors, newUrlMonitor)
        // console.log(urlMonitors)

        // Add the verified object
        urlMonitors = this.addUrlMonitor(urlMonitors, newUrlMonitor)
        // console.log(urlMonitors)

        return urlMonitors
    },

    removeUrlMonitor(urlMonitors, newUrlMonitor) {
        urlMonitors = remove(urlMonitors, function(obj) {
            // console.log(obj.url +', '+ newUrlMonitor.url +', '+ (obj.url != newUrlMonitor.url) )
            // console.log(obj.id +', '+ newUrlMonitor.id +', '+ (obj.id != newUrlMonitor.id) )

            return obj.id != newUrlMonitor.id
        });

        return urlMonitors
    },

    sortUrlMonitors(urlMonitors) {
        let tmp = sortby(urlMonitors, ["valid", "url"])
        // console.log(tmp)

        return tmp
    },

    // Dispaly format for the countdown timer
    formatRefreshTime(milliseconds) {
        var totalSeconds = Math.round(milliseconds / 1000);

        var seconds = parseInt(totalSeconds % 60, 10);

        seconds = (seconds < 10 ? '0'+seconds : seconds);

        // return seconds + 's remaining';
        return // Empty return will hide the countdown timer
    },

    formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    },

    getLastUpdated() {
        let date = new Date()
        return this.formatAMPM(date)
    },

    jsonToCsv(urlMonitorsList) {
        let csv = [];
        let row = '';

        for (let urlMonitor of urlMonitorsList) {
            row = '';
            row = urlMonitor.url +','+ urlMonitor.expectedContent
            csv.push(row)
        }

        return csv.join("\r\n")
    },

    csvToJson(data) {
        // console.log(data)

        if (isempty(data)) {
            return []
        }

        let rows = data.split("\n")
        let objArray = []
        let splitArray = []
        let obj = {}

        for (let row of rows) {
            splitArray = split(row, ',')
            // console.log(splitArray)

            obj = {}
            obj.url = trim(splitArray[0])
            obj.expectedContent = trim(splitArray[1])
            // console.log(obj)

            if (!isempty(obj.url)) {
                objArray.push(obj)
            }
        }

        return objArray
    }
}

export default Utilities;