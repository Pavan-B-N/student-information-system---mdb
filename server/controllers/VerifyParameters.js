function VerifyParameters(req, res, obj) {
    let requiredParameters = []

    const keys = Object.keys(obj)

    keys.forEach((key, index) => {

        if (obj[key] == "" || obj[key] == null || obj[key] == undefined) {
            requiredParameters.push(key)
        }
    });
    
    if (requiredParameters.length > 0) {
       return  res.status(400).json({ message: "Required parameters are missing", missingParameters: requiredParameters })
    }
}

module.exports = VerifyParameters